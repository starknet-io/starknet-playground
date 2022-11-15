import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {ReactComponent as FormatIcon} from '../../../../assets/svg/auto-format.svg';
import {ReactComponent as DeployIcon} from '../../../../assets/svg/deploy-to-starknet.svg';
import {ReactComponent as PlayIcon} from '../../../../assets/svg/play.svg';
import {ReactComponent as ProveIcon} from '../../../../assets/svg/prove-with-sharp.svg';
import {ReactComponent as DebugIcon} from '../../../../assets/svg/run-debug.svg';
import {ReactComponent as StopIcon} from '../../../../assets/svg/stop.svg';
import {useStarknetWallet} from '../../../../context/StarknetWalletProvider';
import {AppContext} from '../../../../context/app/app-context';
import colors from '../../../../styles/colors.module.scss';
import {EditorButton} from './EditorButton';
import styles from './EditorButtons.module.scss';

const EDITOR_BTN_TXT = {
  RUN: 'run',
  COMPILE: 'compile',
  DEBUG: 'debug',
  STOP: 'stop',
  PROVE: 'prove',
  DEPLOY_ON_STARKNET: 'deploy on starknet',
  DEPLOY: 'deploy',
  FORMAT: 'format'
};

const EditorButtons = ({
  isRunning,
  onRun,
  onCompile,
  onDebug,
  onStop,
  onProve,
  onDeploy,
  onFormat
}) => {
  const {color5, color5Hover} = colors;
  const {isCairoMode} = useContext(AppContext);
  const {account} = useStarknetWallet();
  const buttons = {
    left: [
      isCairoMode
        ? {
            icon: PlayIcon,
            text: EDITOR_BTN_TXT.RUN,
            onClick: onRun
          }
        : {
            icon: PlayIcon,
            text: EDITOR_BTN_TXT.COMPILE,
            onClick: onCompile
          },
      {
        icon: DebugIcon,
        text: EDITOR_BTN_TXT.DEBUG,
        onClick: onDebug,
        cairoOnly: true
      },
      {
        icon: StopIcon,
        text: EDITOR_BTN_TXT.STOP,
        colorBackground: color5,
        colorBackgroundHover: color5Hover,
        isDisabled: !isRunning,
        onClick: onStop,
        cairoOnly: true
      },
      {
        icon: ProveIcon,
        text: EDITOR_BTN_TXT.PROVE,
        onClick: onProve,
        cairoOnly: true
      },
      {
        icon: DeployIcon,
        isDisabled: !isCairoMode && !account,
        text: isCairoMode
          ? EDITOR_BTN_TXT.DEPLOY_ON_STARKNET
          : EDITOR_BTN_TXT.DEPLOY,
        onClick: onDeploy
      }
    ],
    right: [
      {
        icon: FormatIcon,
        text: EDITOR_BTN_TXT.FORMAT,
        onClick: onFormat
      }
    ]
  };

  const renderButtons = side => {
    return buttons[side].map((button, index) => {
      const {
        icon,
        text,
        colorBackground,
        colorBackgroundHover,
        isDisabled,
        onClick,
        cairoOnly
      } = button;

      if (cairoOnly && !isCairoMode) {
        return undefined;
      }

      return (
        <EditorButton
          key={index}
          colorBackground={colorBackground}
          colorBackgroundHover={colorBackgroundHover}
          icon={icon}
          isDisabled={
            isDisabled !== undefined ? isDisabled : isRunning
          }
          text={text}
          onClick={onClick}
        />
      );
    });
  };

  return (
    <div className={styles.editorButtons}>
      <div className={styles.left}>{renderButtons('left')}</div>
      <div className={styles.right}>{renderButtons('right')}</div>
      <hr />
    </div>
  );
};

EditorButtons.propTypes = {
  isRunning: PropTypes.bool,
  onRun: PropTypes.func,
  onCompile: PropTypes.func,
  onDebug: PropTypes.func,
  onStop: PropTypes.func,
  onProve: PropTypes.func,
  onDeploy: PropTypes.func,
  onFormat: PropTypes.func
};

export {EditorButtons};
