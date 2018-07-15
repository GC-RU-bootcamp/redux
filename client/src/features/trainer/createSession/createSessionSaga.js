
import axios from "axios";
import { take , call ,put} from 'redux-saga/es/effects'
import { createSessionAsync } from './createSessionActions.js';

axios.defaults.withCredentials = true;

const createSession = ({name, description, item_date, cost, min_attendees, max_attendees }) => {

  const body = {
    name: name.trim(),
    description: description.trim(),
    item_date: item_date.trim(),
    cost: cost.trim(),
    min_attendees: min_attendees.trim(),
    max_attendees: max_attendees.trim(),
    confirmed: 1
  }

  console.log(body);

  return axios.post('http://localhost:8080/api/host/create-session', body)
  .then(function(response){
    return response
  })
  .catch(function(error){
    return error
  })
}

function* createSessionFlow() {
  while (true) {
    const { payload } = yield take(createSessionAsync.TYPE)
    const { status } = yield call(createSession, payload)

    if(status === 201){
      yield put({ type: createSessionAsync.success.TYPE})
    }
    else {
      yield put({ type: createSessionAsync.failure.TYPE})
    }
  }
}


export default createSessionFlow;
