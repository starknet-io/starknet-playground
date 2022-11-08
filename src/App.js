import React, {useContext, useEffect} from 'react';
import styles from './App.module.scss';
import {Footer} from './components/Containers/Footer/Footer';
import {Header} from './components/Containers/Header/Header';
import {Main} from './components/Containers/Main/Main';
import {AppContext} from './context/app/app-context';
import {TabsProvider} from './context/tabs/TabsProvider';
import {WalletProvider} from './context/wallet/WalletProvider';

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
      <TabsProvider>
        <WalletProvider>
          <Header />
          <Main />
        </WalletProvider>
      </TabsProvider>
      <Footer />
    </div>
  );
};

export {App};
