import { takeEvery ,  call ,put} from 'redux-saga/es/effects'
import { push } from 'redux-little-router';
import { loginAsync } from '../../features/login/loginActions';


const loadSessions = () => {

  return fetch('/all-sessions', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': true
    },
    credentials: 'include'
  })
  .then(res => res.json(res))
}

const loadPeopleSessions = () => {

  return fetch('/api/client/my-sessions', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': true
    },
    credentials: 'include'
  })
  .then(res => res.json(res))
}


function* loadData(){
    const response = yield call(loadSessions)
    if(response){
      const { sessions } = response
      yield put({type: 'LOAD_SESSSIONS_SUCCESS', payload: sessions})
      yield put(push('/sessions'));
    }
    else {
      yield put({type: 'LOAD_SESSIONS_FAILURE'})
    }
    const people_response = yield call(loadPeopleSessions);
    console.log(people_response);
}



function* watchLoginSuccess() {
  yield takeEvery(loginAsync.success.TYPE, loadData)

}


export default watchLoginSuccess;
