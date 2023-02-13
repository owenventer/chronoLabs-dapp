import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useState } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import Notifications from '../components/Notification'
import SignInPage from 'components/SignInPage';
import { useWallet } from '@solana/wallet-adapter-react';



require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');


const App: FC<AppProps> = ({ Component, pageProps }) => {
  

    return (
        <>
          <Head>
            <title>ChronoLabs</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar/>
              <ContentContainer>
                {<Component {...pageProps} />}
                
              </ContentContainer>
              
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
