import {createContext} from 'react';
import {initialState} from './program-reducer';

const ProgramContext = createContext({
  ...initialState,
  setEditorContent: () => {},
  setDebugResult: () => {},
  setIsRunning: () => {},
  setIsDebugging: () => {},
  setCurrentStep: () => {},
  addOutput: () => {},
  stop: () => {}
});

export {ProgramContext};
