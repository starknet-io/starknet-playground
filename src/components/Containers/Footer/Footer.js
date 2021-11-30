import React from 'react';
import StarkWareLogo from '../../../assets/svg/starkware.svg';
import styles from './Footer.module.scss';

const RIGHTS_TXT = '© 2021 All Rights Reserved';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.copyright}>
      <img alt={'starkware-logo'} src={StarkWareLogo} /> &nbsp;
      {RIGHTS_TXT}
    </div>
  </footer>
);

export {Footer};
