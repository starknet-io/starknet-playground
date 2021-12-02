import PropTypes from 'prop-types';
import React from 'react';
import styles from './DropdownMenuItem.module.scss';

const DropdownMenuItem = ({text, isHeader, onClick}) => {
  const classes = [
    styles.dropdownMenuItem,
    isHeader && styles.isHeader
  ].join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {text}
    </div>
  );
};

DropdownMenuItem.propTypes = {
  text: PropTypes.string,
  isHeader: PropTypes.bool,
  onClick: PropTypes.func
};

export {DropdownMenuItem};
