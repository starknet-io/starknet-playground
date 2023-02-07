import PropTypes from 'prop-types';
import React from 'react';
import {CONTRACT_URL, TX_URL} from '../../../constants/links';

const DEPLOY_MSG_PARTS = [
  'The deployment transaction was sent.',
  'Contract address:',
  'Transaction hash:',
  'It may take a few minutes until you can see your contract in the block explorer.'
];

const DeployOutput = ({address, txHash}) => {
  return (
    <>
      {'> '} {DEPLOY_MSG_PARTS[0]}
      <br />
      &nbsp;&nbsp;{DEPLOY_MSG_PARTS[1]}{' '}
      <a
        href={`${CONTRACT_URL}${address}`}
        rel="noreferrer"
        target="_blank"
      >
        {address}
      </a>
      <br />
      &nbsp;&nbsp;{DEPLOY_MSG_PARTS[2]}{' '}
      <a href={`${TX_URL}${txHash}`} rel="noreferrer" target="_blank">
        {txHash}
      </a>
      <br />
      &nbsp;&nbsp;
      {DEPLOY_MSG_PARTS[3]}
    </>
  );
};

DeployOutput.propTypes = {
  address: PropTypes.string,
  txHash: PropTypes.string
};

export {DeployOutput};
