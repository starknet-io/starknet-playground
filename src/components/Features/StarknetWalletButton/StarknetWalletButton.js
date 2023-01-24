import {
  WalletButton,
  useStarknetWallet
} from '@starkware-industries/commons-js-components';
import {
  ChainInfo,
  ChainTypeL2,
  NetworkType
} from '@starkware-industries/commons-js-enums';
import {evaluate} from '@starkware-industries/commons-js-utils';
import React from 'react';
import {addAddressPadding} from 'starknet';
import {Links} from '../../../constants/links';

export const StarknetWalletButton = () => {
  const {CONTRACT_URL} = Links;
  const {account, config, error, status, connect, disconnect} =
    useStarknetWallet();

  return (
    <WalletButton
      account={addAddressPadding(account)}
      chain={ChainInfo.L2[ChainTypeL2.GOERLI].NAME}
      error={error}
      logoPath={config?.logoPath || ''}
      menuOptions={{
        enable: true,
        explorerUrl: evaluate(`${CONTRACT_URL}{{account}}`, {
          account
        }),
        onDisconnect: disconnect
      }}
      network={NetworkType.L2}
      status={status}
      onClick={connect}
    />
  );
};
