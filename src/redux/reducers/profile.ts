import { Types } from "../actions/actionTypes" 


const initialState = {
    profile: {
    },
  }

  const reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case Types.LOGIN:
      console.log('login', action.payload.user)
        return {
          ...state,
          profile: action.payload.user,
        }
        break;
     
      default:
        return state;
    }
  }
  
  export default reducer;