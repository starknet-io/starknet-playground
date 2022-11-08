import {
  ChainInfo,
  NetworkType
} from '@starkware-industries/commons-js-enums';
import {addAddressPadding} from '@starkware-industries/commons-js-libs/starknet';
import React from 'react';
import {useWallet} from '../../../context/wallet/wallet-hooks';
import {NetworkWalletButton} from './NetworkWalletButton';

export const StarknetWalletButton = () => {
  const {account, config, error, status} = useWallet();

  const SUPPORTED_L2_CHAIN_ID =
    process.env.REACT_APP_SUPPORTED_CHAIN_ID;

  return (
    <NetworkWalletButton
      account={addAddressPadding(account)}
      chain={ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME}
      error={error}
      logoPath={config?.logoPath || ''}
      network={NetworkType.L2}
      status={status}
    />
  );
};
