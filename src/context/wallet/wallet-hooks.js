import {useContext} from 'react';
import {WalletContext} from './wallet-context';

export const useWallet = () => {
  return useContext(WalletContext);
};
