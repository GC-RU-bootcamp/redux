
import { loginAction, loginAsync, } from './loginActions';

const initialState = {
  user: "",
  password: "",
  loading: false,
  data: {}

}

const loginReducer = (state = initialState, action) =>{
  switch (action.type) {
    case loginAction.TYPE:
      return {
        ...state,
        ...action.payload
      };
    case loginAsync.TYPE:
      return {
        ...initialState,
        loading:true
      };
    case loginAsync.success.TYPE:
      return {
        ...state,
        loading:false,
        data: action.payload
      };
    case loginAsync.failure.TYPE:
      return {
        ...state,
        loading:false
      };
    default:
      return state;
  }
}


export default loginReducer;
