import {useContext} from 'react';
import {WalletContext} from './wallet-context';

export const useWallet = () => {
  const wallet = useContext(WalletContext);

  return {
    ...wallet
  };
};
