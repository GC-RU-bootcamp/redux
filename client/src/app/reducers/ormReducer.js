import ramda from 'ramda';
import orm from "../orm";
import { loginAsync } from '../../features/login/loginActions.js';

const initialState = orm.getEmptyState()

const ormReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOAD_SESSSIONS_SUCCESS':

  const session = orm.session(state);
  const { payload } = action
  const { Session, User } = session;


  payload.forEach(sesh => {
    const clean_sesh = ramda.omit('Person' , sesh);
    const person_values = ramda.values(ramda.pick(['Person'],sesh))
    Session.parse(clean_sesh)
    User.parse(person_values[0]);
  });

  // return a new version of the entities state object with the inserted entries
  return session.state;


    default:
      return state;
    }
}

export default ormReducer
