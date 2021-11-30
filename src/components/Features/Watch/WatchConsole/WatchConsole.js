import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '../../../Containers/Box/Box';
import styles from './WatchConsole.module.scss';

const WATCH_CONSOLE_TITLE_TXT = 'watch';

const WatchConsole = ({children}) => {
  return (
    <Box title={WATCH_CONSOLE_TITLE_TXT}>
      <div className={styles.watchConsole}>
        <div className={styles.container}>{children}</div>
      </div>
    </Box>
  );
};

WatchConsole.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {WatchConsole};
