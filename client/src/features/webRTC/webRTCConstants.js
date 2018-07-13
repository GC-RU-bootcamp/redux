export const constraints = {
  video:true,
  audio:{
    echoCancellation:true,
    noiseSuppression: true,
    volume: 0.2
  }
};

export const servers = {
   "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }]
  };
