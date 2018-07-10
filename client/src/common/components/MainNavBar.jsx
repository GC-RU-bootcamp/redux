import React from 'react';
import { Link } from 'redux-little-router';


const MainNavBar = () => (

  <nav className="flex justify-between pa3 bb b--red items-center">
    <Link className="f6 ml3 link black dim" href="/">Brand here</Link>
    <div className="mr3">
      <Link className="f6 mr3 link black dim" href="/login">Signin</Link>
      <Link className="f6 mr3 link white dim pv2 ph3 ba b--red bg-red br-pill" href="/register">Signup</Link>
    </div>
  </nav>
)

export default MainNavBar;
