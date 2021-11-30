import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import {AppModes} from '../../constants/app-modes';
import {AppContext} from './app-context';
import {initialState, reducer} from './app-reducer';

const AppProvider = ({children}) => {
  const [state] = useReducer(reducer, initialState);

  const context = {
    mode: state.mode,
    isCairoMode: state.mode === AppModes.CAIRO,
    isStarkNetMode: state.mode === AppModes.STARKNET
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export {AppProvider};
