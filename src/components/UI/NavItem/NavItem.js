import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ReactComponent as XIcon} from '../../../assets/svg/x.svg';
import styles from './NavItem.module.scss';

const NavItem = ({
  text,
  isActive,
  isEditable,
  onBlur,
  onClick,
  onDelete
}) => {
  const [tabNameInput, setTabNameInput] = useState(text);
  const classes = [
    styles.navItem,
    isActive && styles.isActive,
    isEditable && styles.isEditable
  ].join(' ');
  const handleKeyPress = event => {
    if (event?.key === 'Enter') {
      onBlur(tabNameInput);
    }
  };
  const editingStateStyle = {
    maxWidth: 200
  };
  const viewingStateStyle = {
    maxWidth: 142
  };
  const getInputSize = () => {
    return tabNameInput?.length
      ? (tabNameInput.length * 0.75).toFixed(0)
      : 5;
  };

  return (
    <button className={classes} onClick={onClick}>
      <div>
        <input
          autoFocus
          maxLength={30}
          readOnly={!isEditable}
          size={getInputSize()}
          style={isEditable ? editingStateStyle : viewingStateStyle}
          value={tabNameInput}
          onBlur={() => onBlur(tabNameInput)}
          onChange={e => setTabNameInput(e.target.value)}
          onKeyPress={e => handleKeyPress(e)}
        />
      </div>
      <XIcon onClick={onDelete} />
    </button>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};

export {NavItem};
