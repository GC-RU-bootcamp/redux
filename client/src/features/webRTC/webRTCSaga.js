import { take, put , call , fork} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { initPeerConnection } from './webRTCActions.js';


function connect() {
  var socket = io();
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

export function* webRTCFlow() {
  yield take(initPeerConnection.TYPE)
  const socket = yield call(connect)
  yield fork(read, socket)
}
