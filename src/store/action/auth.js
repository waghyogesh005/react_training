import * as  actionType from './actionType';
import Axios from 'axios';

const API_KEY = 'AIzaSyACeuOl1812M6RtgP6SZtKiaKewJQea_xk'



const authStart = () =>{
    return {
        type: actionType.AUTH_START
    }
}


const authFail= (error) =>{
    return {
        type: actionType.AUTH_FAILED,
        error
    }
}


const authSuccess = (authData) =>{
    return {
        type: actionType.AUTH_SUCCESS,
        authData
    }
}

export const logout = () =>{
    return {
        type:actionType.AUTH_LOGOUT
    }
}
const checkAuthTimeOut = (timeOut) =>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },100*60*60)
    }
}

export const auth = (email,password,isSignup) => {
        return dispatch => {
            dispatch(authStart());
            const payload = { email, password, returnSecureToken: true };
            let url =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
            if(!isSignup) {
                url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
            }
            Axios.post(url,payload)
            .then(res=>{
               dispatch(authSuccess(res.data))
               dispatch(checkAuthTimeOut(res.data.expiresIn))
            }).catch(err=>{
                console.log(err.response.data.error)
                dispatch(authFail(err.response.data.error));
            })
        }

}
