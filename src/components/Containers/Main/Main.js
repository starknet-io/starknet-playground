import React, {
  createRef,
  useContext,
  useEffect,
  useState
} from 'react';
import {ReactComponent as CairoIcon} from '../../../assets/svg/cairo-logo-big.svg';
import {ReactComponent as PlusIcon} from '../../../assets/svg/plus.svg';
import {ReactComponent as StarkNetIcon} from '../../../assets/svg/starknet-logo-big.svg';
import {FileTypes} from '../../../constants/file-types';
import {AppContext} from '../../../context/app/app-context';
import {ProgramProvider} from '../../../context/program/ProgramProvider';
import {TabsContext} from '../../../context/tabs/tabs-context';
import {useLessons} from '../../../hooks/use-lessons';
import {usePuzzles} from '../../../hooks/use-puzzles';
import {useWindowSize} from '../../../hooks/use-window-size';
import vars from '../../../styles/variables.module.scss';
import {Program} from '../../Features/Program/Program';
import {NavItem} from '../../UI/NavItem/NavItem';
import {Navbar} from '../../UI/Navbar/Navbar';
import styles from './Main.module.scss';

const Main = () => {
  const {mainOffset} = vars;
  const [height, setHeight] = useState(null);
  const [refs, setRefs] = useState({});
  const {isCairoMode} = useContext(AppContext);
  const tabs = useContext(TabsContext);
  const windowSize = useWindowSize();
  const lessons = useLessons();
  const puzzles = usePuzzles();

  useEffect(() => {
    loadInitialTab();
  }, []);

  useEffect(() => {
    setHeight(document.body.offsetHeight - mainOffset);
  }, [windowSize]);

  useEffect(() => {
    const newRefs = {};
    tabs.tabs.forEach(tab => {
      const {id} = tab;
      newRefs[id] = refs[id] || createRef();
    });
    setRefs(newRefs);
  }, [tabs.activeTabId]);

  const loadInitialTab = () => {
    const loadTab = (type, file, files) => {
      const initialFileData = files.find(
        fileData => fileData[1] === file
      );
      const name = initialFileData ? initialFileData[0] : '';
      if (name) {
        tabs.addTab({type, name, file});
      }
    };
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(FileTypes.LESSON)) {
      loadTab(
        FileTypes.LESSON,
        urlParams.get(FileTypes.LESSON),
        lessons
      );
    } else if (urlParams.has(FileTypes.PUZZLE)) {
      loadTab(
        FileTypes.PUZZLE,
        urlParams.get(FileTypes.PUZZLE),
        puzzles
      );
    } else {
      loadTab(
        FileTypes.LESSON,
        isCairoMode ? 'hello_playground' : 'starknet_contract',
        lessons
      );
    }
  };

  const setTabActiveHandler = id => {
    tabs.setTabActive(id);
  };

  const removeTabHandler = (e, id) => {
    tabs.removeTab(id);
    e.stopPropagation();
  };

  const addEmptyTabHandler = () => {
    tabs.addTab({
      name: `Prog ${tabs.tabsCount + 1}`,
      type: isCairoMode ? '' : FileTypes.LESSON,
      file: isCairoMode ? '' : 'default_contract'
    });
  };

  const renderEmptyScreen = () => {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.logoWrapper}>
          {isCairoMode ? <CairoIcon /> : <StarkNetIcon />}
        </div>
        <div className={styles.emptyText}>
          Click on
          <PlusIcon
            className={styles.plus}
            style={{
              margin: '6px 0 0 7px'
            }}
            onClick={addEmptyTabHandler}
          />
          to open a new tab
        </div>
      </div>
    );
  };

  const renderNavItems = () => {
    const navItems = tabs.tabs.map((tab, index) => (
      <NavItem
        key={index}
        isActive={tabs.activeTabId === tab.id}
        text={tab.name}
        onClick={() => setTabActiveHandler(tab.id)}
        onDelete={e => removeTabHandler(e, tab.id)}
      />
    ));

    return (
      <>
        <PlusIcon
          className={styles.plus}
          onClick={addEmptyTabHandler}
        />
        {navItems}
      </>
    );
  };

  const renderPrograms = () => {
    return tabs.tabs.map(tab => {
      const {id, file, type} = tab;
      if (refs[id]?.current) {
        refs[id].current.style.display =
          id !== tabs.activeTabId ? 'none' : 'contents';
      }
      return (
        <ProgramProvider key={id}>
          <Program key={id} ref={refs[id]} file={file} type={type} />
        </ProgramProvider>
      );
    });
  };

  return (
    <main className={styles.main} style={{height}}>
      <Navbar>{renderNavItems()}</Navbar>
      {tabs.activeTabId ? renderPrograms() : renderEmptyScreen()}
    </main>
  );
};

export {Main};
