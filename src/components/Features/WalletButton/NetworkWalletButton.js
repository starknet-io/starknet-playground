import {WalletStatus} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useWallet} from '../../../context/wallet/wallet-hooks';
import {WalletButton} from './WalletButton';

export const NetworkWalletButton = ({
  account,
  chain,
  logoPath,
  network,
  status,
  error
}) => {
  const {connectWallet} = useWallet();

  useEffect(() => {
    error && handleWalletError(error);
  }, [error]);

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
    connectWallet({
      id: 'gsw'
    });
  };

  const handleWalletError = () => {
    console.error(error.name);
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
