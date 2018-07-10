
import { registerAction, registerAsync, } from './regActions';

const initialState = {
  email: "",
  cell: "",
  pass: "",
  confirm:"",
  first: "",
  last:"",
  user:"",
  role: null,
  loading: false
}

const registrationReducer = (state = initialState, action) =>{
  switch (action.type) {
    case registerAction.TYPE:
      return {
        ...state,
        ...action.payload
      };
    case registerAsync.TYPE:
      return {
        ...initialState,
        loading:true
      };
    case registerAsync.success.TYPE:
      return {
        ...state,
        loading:false
      };
    case registerAsync.failure.TYPE:
        return {
          ...state,
          loading:false
      };
    default:
      return state;
  }
}


export default registrationReducer;
