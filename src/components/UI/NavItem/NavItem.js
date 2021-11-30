import PropTypes from 'prop-types';
import React from 'react';
import {ReactComponent as XIcon} from '../../../assets/svg/x.svg';
import styles from './NavItem.module.scss';

const NavItem = ({text, isActive, onClick, onDelete}) => {
  const classes = [styles.navItem, isActive && styles.isActive].join(
    ' '
  );

  return (
    <button className={classes} onClick={onClick}>
      {text}
      <XIcon onClick={onDelete} />
    </button>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};

export {NavItem};
