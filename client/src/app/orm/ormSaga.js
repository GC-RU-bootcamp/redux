import { takeEvery ,  call ,put} from 'redux-saga/es/effects'
import { push } from 'redux-little-router';
import { loginAsync } from '../../features/login/loginActions';


const loadSessions = () => {

  return fetch('http://localhost:8080/all-sessions', {
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

  return fetch('http://localhost:8080/api/client/my-sessions', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': true
    },
    credentials: 'include'
  })
  .then(res => res.json(res))
  .then(res =>({
    status:200,
    data:res
  }))
  .catch(err => err)
}


function* loadData(){
    const response = yield call(loadSessions)
    if(response){
      const { sessions } = response
      yield put({type: 'LOAD_SESSIONS_SUCCESS', payload: sessions})
    }
    else {
      yield put({type: 'LOAD_SESSIONS_FAILURE'})
    }
    const {status, data} = yield call(loadPeopleSessions);
    if(status === 200){
        yield put({type: 'LOAD_PEOPLE_SESSIONS_SUCCESS', payload: data })
        yield put(push('/sessions'));
    }
    else {
      yield put({type: 'LOAD_PEOPLE_SESSIONS_FAILURE'})
    }
}



function* watchLoginSuccess() {
  yield takeEvery(loginAsync.success.TYPE, loadData)

}


export default watchLoginSuccess;
