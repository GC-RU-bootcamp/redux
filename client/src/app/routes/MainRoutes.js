
import React, { Component } from 'react';
import { Fragment } from 'redux-little-router';
import MainPage from '../../features/main/MainPage';
import MainNavBar from '../../common/components/MainNavBar';
import Footer from '../../common/components/Footer';
import LoginPage from '../../features/login/loginPage';
import RegisterPage from "../../features/register/registerPage";

export default class mainRoutes extends Component {
  render() {
    return(
      <Fragment withConditions={location => [ "/" , "/login" , "/register" ].includes(location.pathname)}>
        <div className=" flex flex-column vh-100 ">
          <MainNavBar/>
          <Fragment className="flex-auto" withConditions={location => location.pathname === "/"}>
            <MainPage/>
          </Fragment>
          <Fragment forRoute="/login">
            <LoginPage/>
          </Fragment>
          <Fragment forRoute="/register">
            <RegisterPage/>
          </Fragment>
          <Footer />
        </div>
      </Fragment>
    )
  }
}
