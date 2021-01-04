// src/store/chat/types.ts
import {User} from "../../models/user";

export const LOGIN = 'LOGIN'
export const SIGN_IN = 'SIGN_IN'


export interface LoginStateType {
    user: {};
}
interface LoginAction {
    type: typeof LOGIN
    payload: User
}

interface SignInAction {
    type: typeof SIGN_IN
    payload: any
}

export type AuthActionTypes = LoginAction | SignInAction
