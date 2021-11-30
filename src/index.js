import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {AppProvider} from './context/app/AppProvider';
import './index.scss';
import {getLogger, setLogLevel} from './utils/logger';
import {printPackageInfo} from './utils/print-package-info';
import {getUrlParameter} from './utils/url-params';

printPackageInfo(
  process.env.REACT_APP_NAME,
  process.env.REACT_APP_VERSION,
  '#734d7e'
);

if (
  process.env.NODE_ENV === 'development' ||
  getUrlParameter('debugApp')
) {
  setLogLevel(getLogger().DEBUG);
}

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
