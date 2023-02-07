import {StarknetWalletProvider} from '@starkware-industries/commons-js-components';
import React, {useContext, useEffect} from 'react';
import styles from './App.module.scss';
import {Footer} from './components/Containers/Footer/Footer';
import {Header} from './components/Containers/Header/Header';
import {Main} from './components/Containers/Main/Main';
import {AUTO_CONNECT} from './config/envs';
import {AppContext} from './context/app/app-context';
import {TabsProvider} from './context/tabs/TabsProvider';

const App = () => {
  const {isCairoMode} = useContext(AppContext);

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    if (title) {
      title.innerHTML = `${
        isCairoMode ? 'Cairo' : 'StarkNet'
      } Playground`;
    }
  }, []);

  return (
    <div className={styles.app}>
      <StarknetWalletProvider
        autoConnect={AUTO_CONNECT}
        options={{starknetVersion: 'v4'}}
      >
        <TabsProvider>
          <Header />
          <Main />
        </TabsProvider>
      </StarknetWalletProvider>
      <Footer />
    </div>
  );
};

export {App};
