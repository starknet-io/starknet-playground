import PropTypes from 'prop-types';
import React from 'react';
import styles from './Box.module.scss';

const Box = ({title, children}) => (
  <div className={styles.box}>
    <div className={styles.title}>{title}</div>
    {children}
  </div>
);

Box.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {Box};
