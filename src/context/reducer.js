
import {
  SET_CONTACT,
  SET_LOADING,
  CONTACT_TO_UPDATE,
  SET_SINGLE_CONTACT,
  SET_USER,
  REMOVE_USER,
  SET_PP
} from "./action.types";

// use switch case
export default (state, action) =>{
  switch (action.type) {
    case SET_CONTACT:
       return (action.payload == null )? {...state, contacts: []}:
        {...state, contacts: action.payload};
      
    case SET_LOADING:
      return {...state, isLoading: action.payload};
    
    case CONTACT_TO_UPDATE:
      return {...state, contactToUpdate: action.payload, contactToUpdateKey: action.key};
    
    case SET_SINGLE_CONTACT:
      return {...state,
      contact: action.payload};

    case SET_USER:
      return {...state, user: action.payload}

    case SET_PP:
      return {...state, userPhoto: action.payload}

    case REMOVE_USER:
      return{...state, user: null}
  
    default:
      return state;
  }
}
