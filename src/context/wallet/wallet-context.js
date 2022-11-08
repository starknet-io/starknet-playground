import {createContext} from 'react';
import {initialState} from './wallet-reducer';

export const WalletContext = createContext({
  ...initialState,
  connectWallet: () => {},
  resetWallet: () => {}
});
