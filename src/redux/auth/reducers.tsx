import {AuthActionTypes, LOGIN, LoginStateType, SIGN_IN,} from './types'
import {User} from '../../models/user'



const initialState: LoginStateType = {
    user: JSON.parse(localStorage.getItem('jwt') as string)
}

export function authReducers(
    state = initialState,
    action: AuthActionTypes
) {
    switch (action.type) {
        case LOGIN:
            return {
               ...state, user: action.payload
            }
        case SIGN_IN:
            return {
                ...state
            }
        default:
            return state
    }
}
