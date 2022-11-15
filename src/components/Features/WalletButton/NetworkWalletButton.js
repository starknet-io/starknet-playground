import {WalletStatus} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React from 'react';
import {useStarknetWallet} from '../../../context/StarknetWalletProvider';
import {WalletButton} from './WalletButton';

export const NetworkWalletButton = ({
  account,
  chain,
  logoPath,
  network,
  status
}) => {
  const {connect} = useStarknetWallet();

  const handleWalletButtonClick = () => {
    switch (status) {
      case WalletStatus.ERROR:
      case WalletStatus.CONNECTING:
      case WalletStatus.DISCONNECTED:
        return handleConnectWallet();
      case WalletStatus.CONNECTED:
      default:
        break;
    }
  };

  const handleConnectWallet = () => {
    connect({
      id: 'gsw'
    });
  };

  return (
    <WalletButton
      account={account}
      chain={chain}
      logoPath={logoPath}
      network={network}
      status={status}
      onClick={handleWalletButtonClick}
    />
  );
};

NetworkWalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  logoPath: PropTypes.string,
  network: PropTypes.string,
  status: PropTypes.string,
  error: PropTypes.object
};
