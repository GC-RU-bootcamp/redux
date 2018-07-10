
import { take , call ,put} from 'redux-saga/es/effects'
import { loginAsync } from './loginActions.js';


const login = (payload) => {

    const userData = {
      logon_id: payload.user.trim(),
      logon_pwd: payload.password.trim()
    }

    return fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    })
    .then(res => res.json(res))
    .then(res => ({
      status: 200,
      data: res
      }))
    .catch(err => err)

}


function* loginFlow() {
  while (true) {
    const { payload } = yield take(loginAsync.TYPE)
    const  {status, data} = yield call(login, payload)
    if(status === 200){
      yield put({type: loginAsync.success.TYPE, payload: data })
    }
    else {
      yield put({type: loginAsync.failure.TYPE })
    }
  }
}




export default loginFlow;
