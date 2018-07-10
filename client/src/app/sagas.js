import { all } from 'redux-saga/effects'

import registerSaga from '../features/register/registerSaga.js';
import loginFlow from '../features/login/loginSaga.js';
import watchLoginSuccess from './orm/ormSaga.js';
import createSessionSaga from '../features/trainer/createSession/createSessionSaga';

export default function* rootSaga () {
  yield all([registerSaga(),loginFlow(),watchLoginSuccess(),createSessionSaga()])
}
