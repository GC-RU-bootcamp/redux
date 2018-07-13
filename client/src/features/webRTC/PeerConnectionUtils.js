
const handleICECandidateEvent = function(event,socket) {
    if (event.candidate) {
      socket.emit('new-ice-canidate',{
        candidate: event.candidate
      });
    }
  };

const handleAddStreamEvent = function(event) {
    console.log('Remote Stream has been received!');
  };

export const RTCConnectionStart = function(data,socket,servers,constraints,){
    console.log('RTCPeerConnection has started');
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
      var myPeerConnection = new RTCPeerConnection(servers);
      myPeerConnection.onicecandidate = handleICECandidateEvent;
      myPeerConnection.onaddstream = handleAddStreamEvent;
      myPeerConnection.addStream(stream);

      socket.on('new-ice-canidate',function(data){
        var canidate = new RTCIceCandidate(data.candidate);
        myPeerConnection.addIceCandidate(canidate);
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
        socket.on('video-answer',function(data){
          var description = new RTCSessionDescription(data.sdp);
          myPeerConnection.setRemoteDescription(description);
        });
      socket.emit('video-offer',sdpData);
    });
    })
    .catch(function(err){
      console.error('mediaStream error : ',err);
    })
}

export const RTCVideoOffer = function(data,socket,servers,constraints){
  const myPeerConnection = new RTCPeerConnection(servers);

  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.onaddstream = handleAddStreamEvent;

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream){

    var description = new RTCSessionDescription(data.sdp);
    myPeerConnection.setRemoteDescription(description);
    myPeerConnection.addStream(stream);

    socket.on('new-ice-canidate',function(data){
      console.log('I have got a new ice canidate');
      var canidate = new RTCIceCandidate(data.candidate);
      myPeerConnection.addIceCandidate(canidate);
    });

    myPeerConnection.createAnswer()
    .then(function(answer){
      myPeerConnection.setLocalDescription(answer);
    })
    .then(function(){
      socket.emit('video-answer',{
        sdp: myPeerConnection.localDescription,
      });
      console.log('I have sent a video answer!');
    });
  })
  .catch(function(err){
    console.error('mediaStream error : ', err);
  });
}
