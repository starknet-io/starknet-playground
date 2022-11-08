import {WalletStatus} from '@starkware-industries/commons-js-enums';

export const actions = {
  UPDATE_WALLET: 'Wallets/UPDATE_WALLET',
  SET_WALLET_CONFIG: 'Wallets/SET_WALLET_CONFIG'
};

export const initialState = {
  account: '',
  status: WalletStatus.DISCONNECTED,
  chainName: '',
  chainId: null,
  error: null,
  config: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_WALLET:
      return {
        ...state,
        ...action.payload
      };

    case actions.SET_WALLET_CONFIG:
      return {
        ...state,
        config: action.payload
      };

    default:
      return state;
  }
};
