import React from 'react';
import {connect} from 'react-redux';

import {loginAction,loginAsync} from './loginActions.js';

const mapState = state => ({
  user: state.login.user,
  password: state.login.password
})

const actions = {
  loginAction,
  loginAsync
}

const LoginPage = ({user,password,loginAction,loginAsync}) => (

  <div className="flex flex-column flex-auto">
    <div className="flex flex-auto items-center justify-center">
      <form
        className="measure ba br3 pa3"
        onSubmit={(e) => {
          e.preventDefault();
          loginAsync({ user, password});
        }}
      >
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="username"></label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              name="user"
             id="user"
             value={user}
             onChange={(e) => loginAction({user: e.target.value})}
            >
           </input>
         </div>
         <div className="mv3">
           <label className="db fw6 lh-copy f6" htmlFor="password"></label>
           <input
             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
             type="password"
             name="password"
             id="password"
             value={password}
             onChange={(e) => loginAction({password: e.target.value})}
            >
           </input>
         </div>

       </fieldset>
       <div className="">
         <input className="b ph3 pv2 input-reset ba br2 b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"></input>
       </div>
       <div className="lh-copy mt3">
         <a href="#0" className="f6 link dim black db">Sign up</a>
         <a href="#0" className="f6 link dim black db">Forgot your password?</a>
       </div>
     </form>
    </div>
  </div>
)

export default connect(mapState,actions)(LoginPage);
