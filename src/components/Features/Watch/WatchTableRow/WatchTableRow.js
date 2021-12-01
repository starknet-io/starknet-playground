import PropTypes from 'prop-types';
import React from 'react';

const WatchTableRow = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

WatchTableRow.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export {WatchTableRow};
