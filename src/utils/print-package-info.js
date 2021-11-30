import {getLogger, getLogLevel, setLogLevel} from './logger';

/**
 * Prints a package info to the browser console
 * @param name - Package name
 * @param version - Package version
 * @param color - Text color
 */
const printPackageInfo = (name, version, color) => {
  const currentLogLevel = getLogLevel();
  setLogLevel(getLogger().INFO);
  getLogger().info(
    `%c ${name} v${version}`,
    `color: ${color || '#ff98f9'};  font-size: large`
  );
  setLogLevel(currentLogLevel);
};

export {printPackageInfo};
