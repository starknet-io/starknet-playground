import PropTypes from 'prop-types';
import React from 'react';
import {createPortal} from 'react-dom';
import {ReactComponent as XIcon} from '../../../assets/svg/x.svg';
import styles from './Modal.module.scss';

const CANCEL_TXT = 'Cancel and return to editor';

const Modal = ({show, onClose, title, children}) => {
  return show ? (
    createPortal(
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className={styles.top}>
            <XIcon onClick={onClose} />
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.body}>
            {children}
            <a
              className={styles.cancelLink}
              href="#"
              onClick={onClose}
            >
              {CANCEL_TXT}
            </a>
          </div>
        </div>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export {Modal};
