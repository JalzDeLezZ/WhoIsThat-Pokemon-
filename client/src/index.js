import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import STORE from './redux/store';

import './index.css';
import App from './App.routes';

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
npm install react-redux
npm i react-router-dom
npm i redux-thunk
npm install --save redux-devtools-extension
npm i axios


/* STYLES
npm install --save styled-components
npm install sass


https://github.com/remix-run/react-router/tree/main/docs
*/