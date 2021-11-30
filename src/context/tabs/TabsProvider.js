import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import {deleteParam, setParam} from '../../utils/url-params';
import {TabsContext} from './tabs-context';
import {actions, initialState, reducer} from './tabs-reducer';

const TabsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTabHandler = tab => {
    setParam(tab.type, tab.file);
    dispatch({type: actions.ADD_TAB, payload: tab});
  };

  const removeTabHandler = id => {
    const tab = getTabById(id);
    deleteParam(tab.type);
    dispatch({type: actions.REMOVE_TAB, payload: id});
  };

  const setTabActiveHandler = id => {
    const tab = getTabById(id);
    setParam(tab.type, tab.file);
    dispatch({type: actions.SET_TAB_ACTIVE, payload: id});
  };

  const getActiveTabHandler = () => getTabById(state.activeTabId);

  const getTabById = id => state.tabs.find(tab => tab.id === id);

  const context = {
    tabs: state.tabs,
    activeTabId: state.activeTabId,
    tabsCount: state.tabsCount,
    removeTab: removeTabHandler,
    setTabActive: setTabActiveHandler,
    addTab: addTabHandler,
    getActiveTab: getActiveTabHandler
  };

  return (
    <TabsContext.Provider value={context}>
      {children}
    </TabsContext.Provider>
  );
};

TabsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export {TabsProvider};
