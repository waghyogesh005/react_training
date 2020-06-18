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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
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
                url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`
                // url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
            }
            Axios.post(url,payload)
            .then(res=>{
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',res.data.localId);
               dispatch(authSuccess(res.data))
               dispatch(checkAuthTimeOut(res.data.expiresIn))
            }).catch(err=>{
                console.log("======",err.response)
                dispatch(authFail(err.response.data.error));
            })
        }

}

export const setAuthRedirectPath = path => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path
    }
}


export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        if(!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
           if(expirationDate < new Date()){
               dispatch(logout())
           }else {
            dispatch(authSuccess({idToken:token,localId:userId}))
            dispatch(checkAuthTimeOut(expirationDate.getTime()- new Date().getTime()/1000))
           }
        }
    }
}
