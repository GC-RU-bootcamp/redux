import { take, put , call } from 'redux-saga/effects'
import { PUSH } from 'redux-little-router'
import { initPeerConnection } from './webRTCActions.js';
import { RTCConnectionStart , RTCVideoOffer } from './PeerConnectionUtils.js';
import { servers, constraints } from './webRTCConstants.js';
import io from 'socket.io-client';

export function* watchJoinSession() {
  while(true){
    const { payload } = yield take(PUSH);
    const urlArray = payload.pathname.split('/');
    if(urlArray.includes('join-session')){
      const uuid = urlArray[urlArray.length-1]
      yield put({ type: initPeerConnection.TYPE, payload: uuid })
    }
  }
}

function connect() {
  const socket = io();
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

const hostCheck = (uuid) => {
  return fetch('/api/session/' + uuid, {
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


export function* webRTCFlow() {
  while(true){
    const { payload } = yield take(initPeerConnection.TYPE);
    const socket = yield call(connect);
    console.log(socket)
    const data = yield call(hostCheck, payload);
    console.log(data)
    socket.on('host-check', () => socket.emit('host-answer', data));
    socket.on('signal-ready', (data,socket) => RTCConnectionStart(data,socket,servers,constraints));
    socket.on('video-offer', (data,socket) => RTCVideoOffer(data,socket,servers,constraints));
    socket.emit('room',payload)
  }
}
