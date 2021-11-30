import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ReactComponent as SelectUpIcon} from '../../../assets/svg/select-up.svg';
import {ReactComponent as SelectIcon} from '../../../assets/svg/select.svg';
import {DropdownMenu} from '../DropdownMenu/DropdownMenu';
import styles from './Button.module.scss';

const Button = ({
  text,
  width,
  height,
  icon,
  colorText,
  colorTextHover,
  colorBackground,
  colorBackgroundHover,
  colorBorder,
  colorBorderHover,
  style,
  isBig,
  isDisabled,
  isDropdown,
  onClick,
  children
}) => {
  const [isHover, setIsHover] = useState(false);

  const renderDropdown = () => {
    const icon = isHover ? <SelectUpIcon /> : <SelectIcon />;
    return (
      <>
        {icon}
        {isHover && <DropdownMenu>{children}</DropdownMenu>}
      </>
    );
  };

  const classes = [
    styles.button,
    isBig && styles.isBig,
    isDisabled && styles.isDisabled,
    isDropdown && styles.isDropdown
  ].join(' ');

  const styleObj = {
    width,
    height,
    color: isHover ? colorTextHover || colorText : colorText,
    backgroundColor: isHover
      ? colorBackgroundHover || colorBackground
      : colorBackground,
    borderColor: isHover
      ? colorBorderHover || colorBorder
      : colorBorder,
    ...style
  };

  return (
    <button
      className={classes}
      style={styleObj}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icon && <icon.Component {...icon.props} />}
      {text}
      {isDropdown && renderDropdown()}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  colorText: PropTypes.string,
  colorTextHover: PropTypes.string,
  colorBackground: PropTypes.string,
  colorBackgroundHover: PropTypes.string,
  colorBorder: PropTypes.string,
  colorBorderHover: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.object,
  isBig: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {Button};
