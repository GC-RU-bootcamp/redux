import axios from 'axios'
import { take , call ,put} from 'redux-saga/es/effects'
import { attendAsync } from './sessionsActions.js';

axios.defaults.withCredentials = true;

const attend = ({people_id,logon_id,session_id}) => {
  const body = {
    user_id: people_id,
    session_id,
    logon_id
  }

  return axios.post("/api/client/register", body)
  .then(function(response){
    return response
  })
  .catch(function(error){
    return error
  })
}

function* attendFlow() {
  while (true) {
    const { payload } = yield take(attendAsync.TYPE)
    const { status } = yield call(attend, payload)
    if(status === 200){
      yield put({ type: attendAsync.success.TYPE})
    }
    else {
      yield put({ type: attendAsync.failure.TYPE})
    }
  }
}


export default attendFlow;
