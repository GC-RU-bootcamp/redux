import orm from "../orm";
import { loginAsync } from '../../features/login/loginActions.js';

const initialState = orm.getEmptyState()

const ormReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOAD_SESSSIONS_SUCCESS':

  const session = orm.session(state);
  const { payload } = action
  const { Session } = session;


  payload.forEach(sesh => Session.parse(sesh));

  // return a new version of the entities state object with the inserted entries
  return session.state;


    default:
      return state;
    }
}

export default ormReducer
