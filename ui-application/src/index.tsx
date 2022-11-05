import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Bosnian from './lang/bs.json';
import English from './lang/en.json';
import { IntlProvider } from 'react-intl';

const locale = navigator.language;
const lang = locale === "bs" ? Bosnian: English;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement) ;
root.render(
  <IntlProvider locale ={locale} messages={lang}>
    <App />
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
