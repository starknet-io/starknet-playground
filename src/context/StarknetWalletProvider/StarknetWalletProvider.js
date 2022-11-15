import {
  ChainInfo,
  ChainTypeL2,
  WalletErrorType,
  WalletStatus
} from '@starkware-industries/commons-js-enums';
import {
  connect as getStarknetWallet,
  disconnect as resetStarknetWallet,
  getStarknet
} from '@starkware-industries/commons-js-libs/get-starknet';
import {evaluate} from '@starkware-industries/commons-js-utils';
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
        .enable(!AUTO_CONNECT && {showModal: true})
        .then(address => !!address?.length);

      if (enabled) {
        updateAccount();
        addAccountChangedListener();
      }
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

  const addAccountChangedListener = () => {
    getStarknet().on('accountsChanged', () => {
      updateWallet({status: WalletStatus.DISCONNECTED});
      updateAccount();
    });
  };

  const updateAccount = () => {
    const chainId = getCurrentChainId();
    if (chainId === SUPPORTED_L2_CHAIN_ID) {
      const {selectedAddress, name, icon} = getStarknet();
      updateWallet({
        account: selectedAddress,
        status: WalletStatus.CONNECTED,
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

  const getCurrentChainId = () => {
    const {baseUrl} = getStarknet().provider;
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
