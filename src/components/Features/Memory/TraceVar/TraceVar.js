import PropTypes from 'prop-types';
import React from 'react';
import styles from './TraceVar.module.scss';

const TraceVarType = {
  PC: 'pc',
  AP: 'ap',
  FP: 'fp'
};

const TraceVar = ({type, isClickable, onClick}) => {
  const classes = [
    styles.traceVar,
    styles[type],
    isClickable && styles.isClickable
  ].join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {type}
    </div>
  );
};

TraceVar.propTypes = {
  type: PropTypes.string,
  isClickable: PropTypes.bool,
  onClick: PropTypes.func
};

export {TraceVar, TraceVarType};
