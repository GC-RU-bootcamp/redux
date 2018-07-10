import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './app/store';

import './index.css';
import App from './app/layout/App';

const MOUNT_NODE = document.getElementById('root')



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE);
