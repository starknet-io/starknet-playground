import PropTypes from 'prop-types';
import React from 'react';
import {ReactComponent as NextIcon} from '../../../../assets/svg/next.svg';
import {ReactComponent as PrevIcon} from '../../../../assets/svg/prev.svg';
import {ReactComponent as StepInIcon} from '../../../../assets/svg/step-in.svg';
import {ReactComponent as StepOutIcon} from '../../../../assets/svg/step-out.svg';
import {ReactComponent as StepOverIcon} from '../../../../assets/svg/step-over.svg';
import colors from '../../../../styles/colors.module.scss';
import {Button} from '../../../UI/Button/Button';
import styles from './TraceButtons.module.scss';

const TraceButtons = ({
  isDisabled,
  onStep,
  onStepOut,
  onPreviousStep,
  onPreviousStepOver,
  onStepOver
}) => {
  const {color2, color2Hover, txtColorLight} = colors;

  const buttons = [
    {
      icon: PrevIcon,
      onClick: onPreviousStep
    },
    {
      icon: NextIcon,
      onClick: onStep
    },
    {
      icon: StepInIcon,
      onClick: onPreviousStepOver
    },
    {
      icon: StepOverIcon,
      onClick: onStepOver
    },
    {
      icon: StepOutIcon,
      onClick: onStepOut,
      style: {padding: '20px'}
    }
  ];

  const renderButtons = () => {
    return buttons.map((button, index) => {
      const {icon, onClick, style} = button;
      return (
        <Button
          key={index}
          colorBackground={color2}
          colorBackgroundHover={color2Hover}
          colorText={txtColorLight}
          height={'45px'}
          icon={{Component: icon}}
          isDisabled={isDisabled}
          style={style || {padding: '10px'}}
          onClick={onClick}
        />
      );
    });
  };

  return <div className={styles.traceButtons}>{renderButtons()}</div>;
};

TraceButtons.propTypes = {
  isDisabled: PropTypes.bool,
  onPreviousStep: PropTypes.func,
  onStep: PropTypes.func,
  onPreviousStepOver: PropTypes.func,
  onStepOver: PropTypes.func,
  onStepOut: PropTypes.func
};

export {TraceButtons};
