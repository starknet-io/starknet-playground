import PropTypes from 'prop-types';
import React from 'react';
import styles from './TraceConsole.module.scss';

const TraceConsole = ({children}) => {
  return (
    <div className={styles.traceConsole}>
      <div className={styles.traceRows}>{children}</div>
    </div>
  );
};

TraceConsole.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export {TraceConsole};
