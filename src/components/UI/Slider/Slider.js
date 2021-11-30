import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import styles from './Slider.module.scss';

const Slider = ({min, max, val, isDisabled, onChange}) => {
  const [value, setValue] = useState(0);
  const classes = [
    styles.slider,
    isDisabled && styles.isDisabled
  ].join(' ');

  const onChangeHandler = e => {
    setValue(Number(e.target.value));
    onChange(value);
  };

  useEffect(() => {
    setValue(val);
  }, [val]);

  return (
    <input
      className={classes}
      max={max}
      min={min}
      step={1}
      type="range"
      value={value}
      onChange={onChangeHandler}
    />
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  val: PropTypes.number,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func
};

export {Slider};
