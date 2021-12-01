import React, {useContext} from 'react';
import {
  AnalyticsEventType,
  SendAnalyticsEvent
} from '../../../api/analytics';
import {ReactComponent as CairoLogo} from '../../../assets/svg/cairo-logo.svg';
import {ReactComponent as StarkNetLogo} from '../../../assets/svg/starknet-logo.svg';
import * as links from '../../../config/links.json';
import puzzleHashes from '../../../config/puzzle-hashes.json';
import {FileTypes} from '../../../constants/file-types';
import {AppContext} from '../../../context/app/app-context';
import {TabsContext} from '../../../context/tabs/tabs-context';
import {useLessons} from '../../../hooks/use-lessons';
import {usePuzzles} from '../../../hooks/use-puzzles';
import colors from '../../../styles/colors.module.scss';
import {Button} from '../../UI/Button/Button';
import {DropdownMenuItem} from '../../UI/DropdownMenuItem/DropdownMenuItem';
import styles from './Header.module.scss';

const LESSONS_DROPDOWN_TXT = 'all lessons';
const PUZZLES_DROPDOWN_TXT = 'the cairo games';
const DOCS_BTN_TXT = 'docs';
const PG_TXT = 'playground';

const Header = () => {
  const {isCairoMode} = useContext(AppContext);

  const renderLogo = () => {
    if (isCairoMode) {
      return <CairoLogo className={styles.cairoLogo} />;
    }
    return (
      <>
        <StarkNetLogo className={styles.starkNetLogo} />
        <span className={styles.starkNetTitle}>StarkNet</span>
      </>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        {renderLogo()}
        <div className={styles.separator} />
        <div className={styles.playground}>{PG_TXT}</div>
      </div>
      <div className={styles.right}>
        <DocsButton />
        <DropdownButtons />
      </div>
    </header>
  );
};

const DocsButton = () => {
  const {txtColorLight, color2, color2Hover} = colors;
  const {isCairoMode} = useContext(AppContext);

  const openDocsTab = () => {
    window
      .open(
        isCairoMode ? links.cairoDocsUrl : links.starkNetDocsUrl,
        '_blank'
      )
      .focus();
  };

  return (
    <Button
      colorBackground={color2}
      colorBackgroundHover={color2Hover}
      colorText={txtColorLight}
      height={'40px'}
      style={{fontWeight: 'bold'}}
      text={DOCS_BTN_TXT}
      onClick={openDocsTab}
    />
  );
};

const DropdownButtons = () => {
  const tabs = useContext(TabsContext);
  const {isCairoMode} = useContext(AppContext);
  const lessons = useLessons();
  const puzzles = usePuzzles();
  const {bgColor, color1Active, color3} = colors;

  const addNewTabHandler = (name, type, file, puzzleHash = null) => {
    tabs.addTab({
      name,
      type,
      file,
      puzzleHash
    });
    SendAnalyticsEvent(
      AnalyticsEventType.START_CHALLENGE,
      file,
      'lesson'
    );
    SendAnalyticsEvent(
      `${AnalyticsEventType.START_CHALLENGE}/${file}`,
      file,
      'lesson'
    );
  };

  const renderChallengeDropdowns = () => {
    return lessons.map((c, index) => (
      <DropdownMenuItem
        key={index}
        text={c[0]}
        onClick={() => addNewTabHandler(c[0], FileTypes.LESSON, c[1])}
      />
    ));
  };

  const renderPuzzlesDropdowns = () => {
    return puzzles.map((p, index) => {
      const isHeader = p[0] === 'header';
      const text = isHeader ? p[1] : p[0];
      return (
        <DropdownMenuItem
          key={index}
          isHeader={isHeader}
          text={text}
          onClick={() => {
            if (!isHeader) {
              addNewTabHandler(
                p[0],
                FileTypes.PUZZLE,
                p[1],
                puzzleHashes[p[1]]
              );
            }
          }}
        />
      );
    });
  };

  return (
    <>
      <Button
        colorBackground={'transparent'}
        colorBackgroundHover={color1Active}
        colorBorder={color3}
        colorBorderHover={'transparent'}
        colorText={color3}
        colorTextHover={bgColor}
        height={'40px'}
        isDropdown={true}
        text={LESSONS_DROPDOWN_TXT}
      >
        {renderChallengeDropdowns()}
      </Button>
      {isCairoMode && (
        <Button
          colorBackground={'transparent'}
          colorBackgroundHover={color1Active}
          colorBorder={color3}
          colorBorderHover={'transparent'}
          colorText={color3}
          colorTextHover={bgColor}
          height={'40px'}
          isDropdown={true}
          text={PUZZLES_DROPDOWN_TXT}
        >
          {renderPuzzlesDropdowns()}
        </Button>
      )}
    </>
  );
};

export {Header};
