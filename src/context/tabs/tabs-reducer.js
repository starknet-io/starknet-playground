import {id} from '../../utils/id';

const actions = {
  ADD_TAB: 'Tab/ADD_TAB',
  REMOVE_TAB: 'Tab/REMOVE_TAB',
  SET_TAB_ACTIVE: 'Tab/SET_TAB_ACTIVE'
};

const initialState = {
  tabs: [],
  activeTabId: null,
  tabsCount: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TAB: {
      const tab = action.payload;
      const tabId = id();
      const {tabsCount, tabs} = state;
      return {
        ...state,
        tabs: [...tabs, {...tab, id: tabId}],
        activeTabId: tabId,
        tabsCount: tab.file === '' ? tabsCount + 1 : tabsCount
      };
    }

    case actions.REMOVE_TAB: {
      const id = action.payload;
      let {activeTabId, tabs} = state;
      const indexToRemove = tabs.findIndex(tab => tab.id === id);
      if (activeTabId === tabs[indexToRemove].id) {
        const n = tabs.length;
        if (n > 1) {
          const indexToSetActive = (indexToRemove + 1) % n;
          activeTabId = tabs[indexToSetActive].id;
        } else {
          activeTabId = null;
        }
      }
      return {
        ...state,
        tabs: [...tabs.filter(tab => tab.id !== id)],
        activeTabId
      };
    }

    case actions.SET_TAB_ACTIVE:
      return {
        ...state,
        activeTabId: action.payload
      };

    default:
      return initialState;
  }
};

export {reducer, actions, initialState};
