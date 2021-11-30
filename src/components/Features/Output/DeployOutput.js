import PropTypes from 'prop-types';
import React from 'react';

const CONTRACT_URL = 'https://voyager.online/contract/';
const TX_URL = 'https://voyager.online/tx/';
const STRINGS = [
  'The deployment transaction was sent.',
  'Contract address:',
  'Transaction hash:',
  'It may take a few minutes until you can see your contract in the block explorer.'
];

const DeployOutput = ({address, txHash}) => {
  return (
    <>
      {'> '} {STRINGS[0]}
      <br />
      &nbsp;&nbsp;{STRINGS[1]}{' '}
      <a
        href={`${CONTRACT_URL}${address}`}
        rel="noreferrer"
        target="_blank"
      >
        {address}
      </a>
      <br />
      &nbsp;&nbsp;{STRINGS[2]}{' '}
      <a href={`${TX_URL}${txHash}`} rel="noreferrer" target="_blank">
        {txHash}
      </a>
      <br />
      &nbsp;&nbsp;
      {STRINGS[3]}
    </>
  );
};

DeployOutput.propTypes = {
  address: PropTypes.string,
  txHash: PropTypes.string
};

export {DeployOutput};
