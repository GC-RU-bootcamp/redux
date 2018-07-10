import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'redux-little-router';

const mapStateToProps = state => {
  return {
    role: state.login.data.role
  }
}


const AppNavBar = ({role}) => (
  <nav className="flex justify-between pa3 bb b--red items-center">
    <Link className="f6 ml3 link black dim" href="/">Brand here</Link>
    <div className="mr3">
      <Link
        className="f6 mr3 link black dim"
        href={ role === 'host' ? '/create-session' : '/sessions'}
      >
        { role === 'host' ? 'Create Session' : 'Find Sessions'}
      </Link>
      <Link className="f6 mr3 link white dim pv2 ph3 ba b--red bg-red br-pill" href="/">Logout</Link>
    </div>
  </nav>
)

export default connect(mapStateToProps)(AppNavBar);
