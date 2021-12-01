import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import {TraceVar} from '../TraceVar/TraceVar';
import styles from './TraceRow.module.scss';

const TraceRow = forwardRef(
  ({number, value, isActive, vars}, ref) => {
    const classes = [
      styles.traceRow,
      isActive && styles.isActive
    ].join(' ');

    const renderVars = () => {
      return vars.map((varType, index) => (
        <TraceVar key={index} type={varType} />
      ));
    };

    return (
      <div ref={ref} className={classes}>
        <span className={styles.number}>{number}</span>
        <span>{value}</span>
        <div className={styles.vars}>{vars && renderVars()}</div>
      </div>
    );
  }
);

TraceRow.displayName = 'TraceRow';

TraceRow.propTypes = {
  number: PropTypes.string,
  value: PropTypes.string,
  isActive: PropTypes.bool,
  vars: PropTypes.array
};

export {TraceRow};
