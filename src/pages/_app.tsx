import axios from 'axios';
import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import * as React from 'react';
import { SWRConfig } from 'swr';

import 'react-tippy/dist/tippy.css';
import '@/styles/globals.scss';
import '@/styles/nprogress.css';

import { getFromLocalStorage } from '@/lib/helper';

import {getCategories } from '@/services';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

interface AppState {
  categories: [] | never[]
  menu: boolean
  [key:string]: unknown
}


const initialState: AppState = {
  categories: [],
  menu: false,
}; 

export const StateContext = React.createContext(initialState);

  

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Don't increment views if not on main domain
    if (window.location.host !== 'seeabletarlac.com') {
      if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
        localStorage.setItem('incrementMetaFlag', 'false');
        // reload page to make changes
        window.location.reload();
      }
    }
  }, []);

  const [appState, setAppState ] = React.useState<AppState>(initialState);

  React.useEffect(()=>{
    getCategories().then((result) => {
      
      setAppState({
          ...appState, 
          categories: result,
          setAppState: setAppState
        }
      );

      // eslint-disable-next-line no-console
      console.log("appSate: ", appState);
    
    });

  }, [appState]);

  return (
    
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <StateContext.Provider value={appState}> 

          <Component {...pageProps} />
          
          </StateContext.Provider>
      </SWRConfig>
    
  );
}

export default MyApp;