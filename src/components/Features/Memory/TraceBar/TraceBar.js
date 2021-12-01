import PropTypes from 'prop-types';
import React from 'react';
import styles from './TraceBar.module.scss';

const TraceBar = ({children}) => {
  return <div className={styles.traceBar}>{children}</div>;
};

TraceBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {TraceBar};
