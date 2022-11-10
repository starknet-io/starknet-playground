import {
  ChainInfo,
  ChainType,
  ChainTypeL2,
  WalletErrorType,
  WalletStatus
} from '@starkware-industries/commons-js-enums';
import {
  connect as getStarknetWallet,
  disconnect as resetStarknetWallet,
  getStarknet
} from '@starkware-industries/commons-js-libs/get-starknet';
import {useState} from 'react';
import {getLogger} from '../utils/logger';

export const useStarknetWallet = () => {
  const AUTO_CONNECT = process.env.REACT_APP_AUTO_CONNECT;
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [chainName, setChainName] = useState('');
  const [status, setStatus] = useState(WalletStatus.DISCONNECTED);
  const logger = getLogger('UseStarknetWallet');

  const connect = async walletConfig => {
    try {
      const wallet = await getStarknetWallet({
        modalOptions: {
          theme: 'dark'
        }
      });
      if (!wallet) {
        return;
      }
      setStatus(WalletStatus.CONNECTING);
      const enabled = await wallet
        .enable(!AUTO_CONNECT && {showModal: true})
        .then(address => address?.length && address[0]);
      if (enabled) {
        updateAccount();
        addAccountChangedListener();
        return {
          ...walletConfig,
          name: wallet.name || walletConfig.name,
          logoPath: wallet.icon || walletConfig.logoPath
        };
      }
    } catch {
      setStatus(WalletStatus.ERROR);
    }
  };

  const reset = () => {
    const disconnected = resetStarknetWallet({
      clearLastWallet: true,
      clearDefaultWallet: true
    });
    if (disconnected) {
      setStatus(WalletStatus.DISCONNECTED);
      setAccount('');
    }
  };

  const addAccountChangedListener = () => {
    getStarknet().on('accountsChanged', () => {
      updateAccount();
    });
  };

  const updateAccount = () => {
    const chainId = getCurrentChainId();
    setChainId(chainId);
    setChainName(ChainInfo.L2[chainId].NAME);
    if (chainId === ChainTypeL2.GOERLI) {
      const {selectedAddress} = getStarknet();
      setAccount(selectedAddress);
      setStatus(
        selectedAddress
          ? WalletStatus.CONNECTED
          : WalletStatus.DISCONNECTED
      );
      setError(null);
    } else {
      setStatus(WalletStatus.ERROR);
      const err = {name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR};
      setError(err);
      logger.error(err);
    }
  };

  const getCurrentChainId = () => {
    const {baseUrl} = getStarknet().provider;
    if (baseUrl.includes('alpha-mainnet.starknet.io')) {
      return ChainType.L2.MAIN;
    } else if (baseUrl.includes('alpha4.starknet.io')) {
      return ChainType.L2.GOERLI;
    } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
      return 'localhost';
    }
  };

  return {
    account,
    chainId,
    chainName,
    status,
    error,
    connect,
    reset
  };
};
