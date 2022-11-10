import {
  ChainInfo,
  ChainTypeL2,
  NetworkType
} from '@starkware-industries/commons-js-enums';
import {addAddressPadding} from '@starkware-industries/commons-js-libs/starknet';
import React from 'react';
import {useWallet} from '../../../context/wallet/wallet-hooks';
import {NetworkWalletButton} from './NetworkWalletButton';

export const StarknetWalletButton = () => {
  const {account, config, error, status} = useWallet();

  return (
    <NetworkWalletButton
      account={addAddressPadding(account)}
      chain={ChainInfo.L2[ChainTypeL2.GOERLI].NAME}
      error={error}
      logoPath={config?.logoPath || ''}
      network={NetworkType.L2}
      status={status}
    />
  );
};
