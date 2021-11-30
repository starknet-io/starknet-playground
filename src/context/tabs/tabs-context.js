import {createContext} from 'react';
import {initialState} from './tabs-reducer';

const TabsContext = createContext({
  ...initialState,
  removeTab: () => {},
  setTabActive: () => {},
  addTab: () => {},
  getActiveTab: () => {}
});

export {TabsContext};
