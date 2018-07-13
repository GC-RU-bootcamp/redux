import axios from 'axios'
import { take , call ,put} from 'redux-saga/es/effects'
import { attendAsync } from './sessionsActions.js';

axios.defaults.withCredentials = true;

const attend = (payload) => {


  return axios.post("/api/client/register", payload)
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
