import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './pages/base/ScrollToTop';
import { makeStoreWithApi } from './store';

const store = makeStoreWithApi({}, {});
const styleCache = createCache();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <CacheProvider value={styleCache}>
        <ScrollToTop />
        <App />
      </CacheProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
