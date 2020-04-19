import React from 'react';

import '../../scss/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { ToastProvider } from 'react-toast-notifications';
import { CookiesProvider } from 'react-cookie';
import { URLS } from '../../config';

function App() {
  return (
    <CookiesProvider>
      <ToastProvider>
        <BrowserRouter basename={URLS.BASENAME}>
          <Router/>
        </BrowserRouter>
      </ToastProvider>
    </CookiesProvider>
  );
}

export default App;
