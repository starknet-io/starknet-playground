import PropTypes from 'prop-types';
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = ({children}) => (
  <div className={styles.navbar}>{children}</div>
);

Navbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {Navbar};
