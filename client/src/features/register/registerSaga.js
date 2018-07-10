import axios from 'axios'
import { take , call ,put} from 'redux-saga/es/effects'
import { registerAsync } from './regActions.js';

axios.defaults.withCredentials = true;

const register = (payload) => {

  const config = { headers: {
      'Content-Type': 'multipart/form-data'
    } };

  var formData = new FormData()

  formData.append("email", payload.email.trim());
    formData.append("logonId", payload.user.trim());
    formData.append("password", payload.pass.trim());
    formData.append("cell", payload.cell.trim());
    formData.append("role", payload.role ? 'client' : 'host')
    formData.append("fstNam",payload.first.trim());
    formData.append("lstNam", payload.last.trim());
    formData.append("createdBy",payload.user.trim());

  return axios.post('/api/signup', formData,config)
  .then(function(response){
    return response
  })
  .catch(function(error){
    return error
  })
}

function* registerFlow() {
  while (true) {
    const { payload } = yield take(registerAsync.TYPE)
    const { status } = yield call(register, payload)

    if(status === 200){
      yield put({ type: registerAsync.success.TYPE})
    }
    else {
      yield put({ type: registerAsync.failure.TYPE})
    }
  }
}


export default registerFlow;
