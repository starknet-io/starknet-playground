const actions = {
  SET_EDITOR_CONTENT: 'Program/SET_EDITOR_CONTENT',
  SET_DEBUG_RESULT: 'PROGRAM/SET_DEBUG_RESULT',
  SET_IS_RUNNING: 'Program/SET_IS_RUNNING',
  SET_IS_DEPLOYING: 'Program/SET_IS_DEPLOYING',
  SET_IS_DEBUGGING: 'Program/SET_IS_DEBUGGING',
  SET_CURRENT_STEP: 'Program/SET_CURRENT_STEP',
  ADD_OUTPUT: 'Program/ADD_OUTPUT',
  STOP: 'Program/STOP'
};

const initialState = {
  isRunning: false,
  isDebugging: false,
  isDeploying: false,
  currentStep: -1,
  content: '',
  trace: [],
  memory: {},
  outputs: [],
  currentIdentifiers: [],
  instLocations: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_EDITOR_CONTENT:
      return {
        ...state,
        content: action.payload
      };

    case actions.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };

    case actions.SET_IS_RUNNING:
      return {
        ...state,
        isRunning: action.payload
      };

    case actions.SET_IS_DEPLOYING:
      return {
        ...state,
        isDeploying: action.payload
      };

    case actions.SET_IS_DEBUGGING:
      return {
        ...state,
        isDebugging: action.payload
      };

    case actions.ADD_OUTPUT:
      return {
        ...state,
        outputs: [...state.outputs, action.payload]
      };

    case actions.SET_DEBUG_RESULT:
      return {
        ...state,
        ...action.payload,
        currentStep: 0,
        outputs: [
          ...state.outputs,
          {output: action.payload.output, isError: false}
        ]
      };

    case actions.STOP:
      return {
        ...initialState,
        content: state.content,
        outputs: state.outputs
      };

    default:
      return state;
  }
};

export {reducer, actions, initialState};
