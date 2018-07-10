import React from 'react';
import { connect } from 'react-redux';

import { registerAction, registerAsync } from "./regActions.js"

const mapState = state => {
return {
    email: state.registration.email,
    cell: state.registration.cell,
    pass: state.registration.pass,
    confirm: state.registration.confirm,
    first: state.registration.first,
    last: state.registration.last,
    role: state.registration.role,
    user: state.registration.user
  }
}

const actions = {
  registerAction,
  registerAsync,
}

const  RegisterPage = ({ email, cell, pass, confirm, first, last, role, user, registerAction, registerAsync }) => (
      <div className="flex flex-auto justify-center items-center">
        <form
          onSubmit={
          (e) => {
            e.preventDefault();
            registerAsync({ email, cell, pass, confirm, first, last, role, user})
          }}
          className="w-75 ba pa3 br2"
          action="sign-up_submit" method="get"
          acceptCharset="utf-8">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="flex justify-around items-center">
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                  <input className="pa2 input-reset ba bg-transparent" value={email} onChange={(e) => registerAction({email: e.target.value })} type="email" name="email-address"  id="email-address"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6">Cellphone</label>
                  <input className="pa2 input-reset ba bg-transparent" value={cell} onChange={(e) => registerAction({cell: e.target.value })}  id="cellphone"></input>
                </div>
              </div>
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent"  value={pass} onChange={(e) => registerAction({pass: e.target.value })} type="password" name="password"  id="password"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="password">Confirm Password</label>
                  <input className="b pa2 input-reset ba bg-transparent" value={confirm} onChange={(e) => registerAction({confirm: e.target.value })} type="password" name="confirmation"  id="confirm"></input>
                </div>
              </div>
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6">First Name</label>
                  <input className="pa2 input-reset ba bg-transparent"  value={first} onChange={(e) => registerAction({first: e.target.value })} id="first-name"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6">Last Name</label>
                  <input className="pa2 input-reset ba bg-transparent"  value={last} onChange={(e) => registerAction({last: e.target.value })} id="last-name"></input>
                </div>
              </div>
              <div className="flex flex-column  ba bg-dark-red white br4 v-mid pa3 justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6">Username</label>
                  <input className="pa2 input-reset ba bg-white-90"  value={user} onChange={(e) => registerAction({user: e.target.value })} id="username"></input>
                </div>
                <div className="flex justify-center items-center mt4">
                  <label className="db fw4 lh-copy f6 mr1">Role?</label>
                  <input  type="radio" id="contactChoice1"  onChange={(e) => registerAction({role: e.target.checked })} name="role" value="client"></input>
                  <label className="db fw4 lh-copy f6 mr1" htmlFor="contactChoice1">Client</label>
                  <input type="radio" id="contactChoice2" onChange={(e) => registerAction({role: !e.target.checked })} name="role" value="trainer"></input>
                  <label className="db fw4 lh-copy f6 " htmlFor="contactChoice2">Trainer</label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt3 flex justify-end">
            <input className="b br2 mr4 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"></input>
          </div>
        </form>
      </div>
    )

    export default connect(mapState, actions)(RegisterPage);
