import PropTypes from 'prop-types';
import React from 'react';
import styles from './DropdownMenu.module.scss';

const DropdownMenu = ({children}) => (
  <div className={styles.dropdownMenu}>{children}</div>
);

DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {DropdownMenu};
