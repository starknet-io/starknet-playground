import {createContext} from 'react';
import {AppModes} from '../../constants/app-modes';
import {initialState} from './app-reducer';

const AppContext = createContext({
  ...initialState,
  isCairoMode: initialState.mode === AppModes.CAIRO,
  isStarkNetMode: initialState.mode === AppModes.STARKNET
});

export {AppContext};
