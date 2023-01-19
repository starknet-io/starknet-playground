import {
  ChainInfo,
  ChainTypeL2,
  WalletErrorType,
  WalletStatus
} from '@starkware-industries/commons-js-enums';
import {evaluate} from '@starkware-industries/commons-js-utils';
import {
  connect as getStarknetWallet,
  disconnect as resetStarknetWallet
} from 'get-starknet';
import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import {useConstants} from '../../hooks/useConstants';
import {useEnvs} from '../../hooks/useEnvs';
import {StarknetWalletContext} from './starknet-wallet-context';
import {
  actions,
  initialState,
  reducer
} from './starknet-wallet-reducer';

const UNSUPPORTED_CHAIN_TXT =
  'Please select {{chainName}} in your wallet';

export const StarknetWalletProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {AUTO_CONNECT} = useEnvs();
  const {SUPPORTED_L2_CHAIN_ID} = useConstants();

  const connect = async () => {
    try {
      const wallet = await getStarknetWallet({
        modalOptions: {
          theme: 'dark'
        }
      });
      if (!wallet) {
        return;
      }
      updateWallet({status: WalletStatus.CONNECTING});
      const enabled = await wallet
        .enable({starknetVersion: 'v4'})
        .then(address => !!address?.length);

      if (enabled) {
        updateAccount(wallet);
        addAccountChangedListener(wallet);
      }
      return wallet;
    } catch (ex) {
      updateWallet({
        status: WalletStatus.ERROR,
        error: {
          name: WalletErrorType.CONNECTION_REJECTED_ERROR,
          message: ex.message
        }
      });
    }
  };

  const disconnect = () => {
    const disconnected = resetStarknetWallet({
      clearLastWallet: true,
      clearDefaultWallet: true
    });
    if (disconnected) {
      updateWallet({
        status: WalletStatus.DISCONNECTED,
        config: null,
        account: ''
      });
    }
  };

  const addAccountChangedListener = wallet => {
    wallet.on('accountsChanged', () => {
      updateWallet({status: WalletStatus.DISCONNECTED});
      updateAccount();
    });
  };

  const updateAccount = wallet => {
    const chainId = getCurrentChainId(wallet);
    if (chainId === SUPPORTED_L2_CHAIN_ID) {
      const {selectedAddress, name, icon} = wallet;
      updateWallet({
        account: selectedAddress,
        status: selectedAddress
          ? WalletStatus.CONNECTED
          : WalletStatus.DISCONNECTED,
        error: null,
        chainId,
        chainName: ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME,
        config: {
          name,
          logoPath: icon
        }
      });
    } else {
      updateWallet({
        status: WalletStatus.ERROR,
        error: {
          name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR,
          message: evaluate(UNSUPPORTED_CHAIN_TXT, {
            chainName: ChainInfo.L2.SN_GOERLI.NAME
          })
        }
      });
    }
  };

  const getCurrentChainId = wallet => {
    const provider = wallet.provider.provider || wallet.provider;
    const {baseUrl} = provider;
    if (baseUrl.includes('alpha-mainnet.starknet.io')) {
      return ChainTypeL2.MAIN;
    } else if (baseUrl.includes('alpha4.starknet.io')) {
      return ChainTypeL2.GOERLI;
    } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
      return 'localhost';
    }
  };

  const updateWallet = payload => {
    dispatch({
      type: actions.UPDATE_WALLET,
      payload
    });
  };

  const context = {
    ...state,
    connect,
    disconnect
  };

  return (
    <StarknetWalletContext.Provider
      displayName="StarknetWalletContext"
      value={context}
    >
      {children}
    </StarknetWalletContext.Provider>
  );
};

StarknetWalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
