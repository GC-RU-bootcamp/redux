import { take, put , call } from 'redux-saga/effects'
import { PUSH } from 'redux-little-router'
import ramda from 'ramda'
import { initPeerConnection } from './webRTCActions.js';
import { eventChannel } from 'redux-saga';
import { servers, constraints } from './webRTCConstants.js';
import store from '../../app/store/index.js'
import io from 'socket.io-client';

function* createEventChannel(socket, cb, payload) {
  return eventChannel(emit => {

    const handleICECandidateEvent = function(event) {
      if (event.candidate){
        socket.emit('new-ice-candidate', {
          candidate: event.candidate
        })
      }
     };

    const handleAddStreamEvent = function(event) {
      console.log("remote stream received");
      const { id } = event.stream;
      const video = document.createElement('video');
      video.setAttribute('class','dn');
      video.setAttribute('id', id );
      video.srcObject = event.stream;
      document.body.appendChild(video);
      emit(id);
     };

    socket.on('host-check',function(){
      cb.then(function(data){
        data.uuid = payload;
        socket.emit('host-answer',data)
      })
    });

    socket.on('signal-ready',function(data){
      console.log('RTCPeerConnection has started');
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream){
        var myPeerConnection = new RTCPeerConnection(servers);

        myPeerConnection.onicecandidate = handleICECandidateEvent
        myPeerConnection.onaddstream = handleAddStreamEvent
        myPeerConnection.addStream(stream);

        socket.on('new-ice-candidate',function(response){
          var candidate = new RTCIceCandidate(response.candidate);
          myPeerConnection.addIceCandidate(candidate);
        });

        myPeerConnection.createOffer()
        .then(function(offer){
          myPeerConnection.setLocalDescription(offer);
        })
        .then(function(){
          const sdpData = {
            sdp: myPeerConnection.localDescription,
            uuid: data.uuid,
            isHost: data.isHost
          };
          socket.on('video-answer',function(res){
            var description = new RTCSessionDescription(res.sdp);
            myPeerConnection.setRemoteDescription(description);
          });
        socket.emit('video-offer',sdpData);
      });
      })
      .catch(function(err){
        console.error('mediaStream error : ',err);
      })
    });

    socket.on('video-offer',function(data){
        console.log('video-offer has started on the client')
        const myPeerConnection = new RTCPeerConnection(servers);

        myPeerConnection.onicecandidate = handleICECandidateEvent
        myPeerConnection.onaddstream = handleAddStreamEvent

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
          var description = new RTCSessionDescription(data.sdp);
          myPeerConnection.setRemoteDescription(description);
          myPeerConnection.addStream(stream);

          socket.on('new-ice-candidate',function(res){
            var candidate = new RTCIceCandidate(res.candidate);
            myPeerConnection.addIceCandidate(candidate);
          });

          myPeerConnection.createAnswer()
          .then(function(answer){
            myPeerConnection.setLocalDescription(answer);
          })
          .then(function(){
            socket.emit('video-answer',{
              sdp: myPeerConnection.localDescription,
            });
          });
        })
        .catch(function(err){
          console.error('mediaStream error : ', err);
        });
    });

    return () => {
      socket.close();
    };
  });
}

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
  const socket = io('http://localhost:8080');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

const hostCheck = (uuid) => {
  return fetch('http://localhost:8080/api/session/' + uuid, {
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
    const cb = hostCheck(payload);
    const channel = yield call(createEventChannel,socket,cb,payload);
    socket.emit('room',payload)
    while(true){
      const payload = yield take(channel)
      yield put({ type: initPeerConnection.success.TYPE, payload });
    }
  }
}
