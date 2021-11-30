import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import {MessageOutput} from '../../components/Features/Output/MessageOutput';
import {ProgramContext} from './program-context';
import {actions, initialState, reducer} from './program-reducer';

const ProgramProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEditorContentHandler = content => {
    dispatch({
      type: actions.SET_EDITOR_CONTENT,
      payload: content
    });
  };

  const setDebugResultHandler = debugResult => {
    dispatch({
      type: actions.SET_DEBUG_RESULT,
      payload: {
        ...debugResult,
        output: buildOutput(debugResult.output)
      }
    });
  };

  const setIsRunningHandler = isRunning => {
    dispatch({
      type: actions.SET_IS_RUNNING,
      payload: isRunning
    });
  };

  const setIsDebuggingHandler = isDebugging => {
    dispatch({
      type: actions.SET_IS_DEBUGGING,
      payload: isDebugging
    });
  };

  const setCurrentStepHandler = step => {
    dispatch({
      type: actions.SET_CURRENT_STEP,
      payload: step
    });
  };

  const addOutputHandler = (output, isError) => {
    dispatch({
      type: actions.ADD_OUTPUT,
      payload: {output: buildOutput(output), isError}
    });
  };

  const stopHandler = () => {
    dispatch({
      type: actions.STOP
    });
  };

  const buildOutput = output => {
    if (Array.isArray(output) || typeof output === 'string') {
      return <MessageOutput message={output} />;
    }
    return output;
  };

  const context = {
    isRunning: state.isRunning,
    isDebugging: state.isDebugging,
    currentStep: state.currentStep,
    trace: state.trace,
    memory: state.memory,
    currentIdentifiers: state.currentIdentifiers,
    instLocations: state.instLocations,
    content: state.content,
    outputs: state.outputs,
    setEditorContent: setEditorContentHandler,
    setDebugResult: setDebugResultHandler,
    setIsRunning: setIsRunningHandler,
    setIsDebugging: setIsDebuggingHandler,
    setCurrentStep: setCurrentStepHandler,
    addOutput: addOutputHandler,
    stop: stopHandler
  };

  return (
    <ProgramContext.Provider value={context}>
      {children}
    </ProgramContext.Provider>
  );
};

ProgramProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export {ProgramProvider};
