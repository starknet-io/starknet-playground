import jsLogger from 'js-logger';

jsLogger.useDefaults({defaultLevel: jsLogger.ERROR});

/**
 * Gets a logger
 * @param name - Optional logger name
 * @returns {*}
 */
const getLogger = name => {
  if (!name) {
    return jsLogger;
  }
  return jsLogger.get(name);
};

const getLogLevel = name => {
  return getLogger(name).getLevel();
};

const setLogLevel = (level, name) => {
  getLogger(name).setLevel(level);
};

export {getLogger, getLogLevel, setLogLevel};
