
import React, { Component } from 'react';
import { Fragment } from 'redux-little-router';
import SessionsPage from '../../features/sessions/SessionsPage.js';
import AppNavBar from '../../common/components/AppNavBar.js';
import AppFooter from '../../common/components/AppFooter.js';
import CreateSessionPage from '../../features/trainer/createSession/createSessionPage'


export default class AppRoutes extends Component {
  render() {
    return(
      <Fragment withConditions={location => [ "/sessions", "/create-session", "/join-session" ].includes(location.pathname)}>
        <div className=" flex flex-column vh-100 ">
          <AppNavBar />
          <Fragment forRoute="/sessions">
            <SessionsPage />
          </Fragment>
          <Fragment forRoute="/create-session">
            <CreateSessionPage />
          </Fragment>
          <AppFooter />
        </div>
      </Fragment>
    )
  }
}
