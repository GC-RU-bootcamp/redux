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
function* loadData(){
    const response = yield call(loadSessions)
    console.log(response)
    if(response){
      yield put({type: 'LOAD_SESSSIONS_SUCCESS', payload: response})
      yield put(push('/sessions'));
    }
    else {
      yield put({type: 'LOAD_SESSIONS_FAILURE'})
    }
}



function* watchLoginSuccess() {
  yield takeEvery(loginAsync.success.TYPE, loadData)
}


export default watchLoginSuccess;
