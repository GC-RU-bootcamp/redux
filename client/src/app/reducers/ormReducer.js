import ramda from 'ramda';
import orm from "../orm";
import { loginAsync } from '../../features/login/loginActions.js';

const initialState = orm.getEmptyState()

const ormReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOAD_SESSIONS_SUCCESS': {

      const session = orm.session(state);
      const { payload } = action
      const { Session, User } = session;

      payload.forEach(sesh => {
        const clean_sesh = ramda.omit('Person' , sesh);
        const person_values = ramda.values(ramda.pick(['Person'],sesh))
        Session.parse(clean_sesh)
        User.parse(person_values[0]);
      });

      return session.state;
    }

    case 'LOAD_PEOPLE_SESSIONS_SUCCESS': {
      const session = orm.session(state);
      const { payload } = action
      const { PeopleSession } = session;

      payload.forEach(people_session => PeopleSession.parse(people_session));
      return session.state;
    }

    default: {
      return state;
    }
  }
}

export default ormReducer
