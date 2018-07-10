import { createSessionAction, createSessionAsync, } from './createSessionActions';

const initialState = {
  name: "",
  item_date: "",
  description: "",
  cost: "",
  min_attendees: "",
  max_attendees: "",
  loading: false
}

const createSessionReducer = (state = initialState, action) =>{
  switch (action.type) {
    case createSessionAction.TYPE:
      return {
        ...state,
        ...action.payload
      };
    case createSessionAsync.TYPE:
      return {
        ...initialState,
        loading:true
      };
    case createSessionAsync.success.TYPE:
      return {
        ...state,
        loading:false
      };
    case createSessionAsync.failure.TYPE:
        return {
          ...state,
          loading:false
      };
    default:
      return state;
  }
}


export default createSessionReducer;
