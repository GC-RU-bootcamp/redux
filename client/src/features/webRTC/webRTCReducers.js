
import { initPeerConnection } from './webRTCActions.js';

const initialState = {
  loading: false,
  data: []
}

const webRTCReducer = (state = initialState, action) =>{
  switch (action.type) {
    case initPeerConnection.TYPE:
      return {
        ...initialState,
        loading:true
      };
    case initPeerConnection.success.TYPE:

      return {
        ...state,
        loading:false,
        data: [...state.data, action.payload]
      };
    case initPeerConnection.failure.TYPE:
      return {
        ...state,
        loading:false
      };
    default:
      return state;
  }
}


export default webRTCReducer;
