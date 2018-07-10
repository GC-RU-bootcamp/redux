import React, { Component } from 'react';
import { Fragment } from 'redux-little-router';
import MainRoutes from '../routes/MainRoutes.js';
import AppRoutes from '../routes/AppRoutes.js';


class App extends Component {
  render() {
    return (
      <div>
        <MainRoutes />
        <AppRoutes />
      </div>

    );
  }
}

export default App;
