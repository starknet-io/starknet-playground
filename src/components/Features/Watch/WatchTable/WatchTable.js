import PropTypes from 'prop-types';
import React from 'react';
import styles from './WatchTable.module.scss';

const WATCH_TABLE_NAME_TXT = 'Name';
const WATCH_TABLE_VAL_TXT = 'Value';

const WatchTable = ({children}) => {
  return (
    <table className={styles.watchTable}>
      <colgroup>
        <col />
        <col />
      </colgroup>
      <thead>
        <tr className={styles.tableHeader}>
          <td>
            <span className={styles.tableTitle}>
              {WATCH_TABLE_NAME_TXT}
            </span>
          </td>
          <td>
            <span className={styles.tableTitle}>
              {WATCH_TABLE_VAL_TXT}
            </span>
          </td>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

WatchTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {WatchTable};
