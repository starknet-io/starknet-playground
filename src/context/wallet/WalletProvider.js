import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {useStarknetWallet} from '../../hooks/use-starknet-wallet';
import {WalletContext} from './wallet-context';
import {actions, initialState, reducer} from './wallet-reducer';

export const WalletProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const wallet = useStarknetWallet();

  const {account, status, error} = wallet;

  useEffect(() => {
    updateWallet(wallet);
  }, [account, status, error]);

  const connectWallet = async walletConfig => {
    return wallet
      .connect(walletConfig)
      .then(chosenWalletConfig =>
        setWalletConfig(chosenWalletConfig)
      );
  };

  const resetWallet = () => {
    setWalletConfig(null);
    return wallet.reset();
  };

  const updateWallet = payload => {
    dispatch({
      type: actions.UPDATE_WALLET,
      payload
    });
  };

  const setWalletConfig = payload => {
    dispatch({
      type: actions.SET_WALLET_CONFIG,
      payload
    });
  };

  const context = {
    ...state,
    connectWallet,
    resetWallet
  };

  return (
    <WalletContext.Provider value={context}>
      {children}
    </WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
