import PropTypes from 'prop-types';
import React from 'react';
import colors from '../../../../styles/colors.module.scss';
import {Button} from '../../../UI/Button/Button';

const EditorButton = ({
  text,
  icon,
  colorBackground,
  colorBackgroundHover,
  isDisabled,
  onClick
}) => {
  const {color1, color1Hover} = colors;

  return (
    <Button
      colorBackground={colorBackground || color1}
      colorBackgroundHover={colorBackgroundHover || color1Hover}
      icon={{
        Component: icon
      }}
      isBig={true}
      isDisabled={isDisabled}
      text={text}
      onClick={onClick}
    />
  );
};

EditorButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  colorBackground: PropTypes.string,
  colorBackgroundHover: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};

export {EditorButton};
