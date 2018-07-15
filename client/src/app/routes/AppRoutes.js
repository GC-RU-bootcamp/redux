
import React, { Component } from 'react';
import { Fragment } from 'redux-little-router';
import SessionsPage from '../../features/sessions/SessionsPage.js';
import AppNavBar from '../../common/components/AppNavBar.js';
import AppFooter from '../../common/components/AppFooter.js';
import CreateSessionPage from '../../features/trainer/createSession/createSessionPage'
import WebRTCPage from '../../features/webRTC/webRTCPage.js';


export default class AppRoutes extends Component {
  render() {
    return(
      <Fragment withConditions={location => [ "/sessions", "/create-session", "/join-session/:uuid" ].includes(location.route)}>
        <div className=" flex flex-column vh-100 ">
          <AppNavBar />
          <Fragment forRoute="/sessions">
            <SessionsPage />
          </Fragment>
          <Fragment forRoute="/create-session">
            <CreateSessionPage />
          </Fragment>
          <Fragment withConditions={location => location.route === "/join-session/:uuid"}>
            <WebRTCPage />
          </Fragment>
          <AppFooter />
        </div>
      </Fragment>
    )
  }
}
