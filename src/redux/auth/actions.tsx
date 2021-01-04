// src/store/chat/actions.ts

import {LOGIN, SIGN_IN} from './types'
import {http} from "../../services/agent";
import {Dispatch} from "react";
import {User} from "../../models/user";
import {LoginEntity} from "../../models/login";

export const loginUser = (login: LoginEntity) => async (dispatch: Dispatch<any>) => {
    const user: User = await http.post('https://localhost:5001/account/login', login)
        .catch(err => console.log(err));
    localStorage.setItem('jwt', JSON.stringify(user));
    return  dispatch({type: LOGIN, payload: user});
}


