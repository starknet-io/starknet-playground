import PropTypes from 'prop-types';
import React from 'react';

const STRINGS = [
  'Cairo job sent to SHARP. ',
  'Click',
  'here',
  'to monitor the status of the job.'
];

const ProveOutput = ({statusUrl}) => {
  return (
    <>
      {STRINGS[0]}
      {STRINGS[1]}{' '}
      <a href={statusUrl} rel="noreferrer" target="_blank">
        {STRINGS[2]}{' '}
      </a>{' '}
      {STRINGS[3]}
    </>
  );
};

ProveOutput.propTypes = {
  statusUrl: PropTypes.string
};

export {ProveOutput};
