import { Types } from "../actions/actionTypes" 


export const ActionCreators = {
    // TODO come up with a better type for user
    login:(user:any) => ({ type: Types.LOGIN, payload: { user } })
} 