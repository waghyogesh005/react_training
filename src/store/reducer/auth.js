import * as actionType from '../action/actionType';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}

const authReducer = (state=initialState, action) =>{
    switch (action.type) {
        case actionType.AUTH_START: 
            return {
                ...state,
                error:null,
                loading: true
            }
        case actionType.AUTH_FAILED: 
            return {
                ...state,
                error:action.error,
                loading: false
            }    
        case actionType.AUTH_SUCCESS: 
        console.log(action)
            return {
                ...state,
                loading: false,
                token: action.authData.idToken,
                userId: action.authData.localId
            }  
        case actionType.AUTH_LOGOUT: 
            return {
                ...state,
                token:null,
                userId:null
            }
        case actionType.SET_AUTH_REDIRECT_PATH:
                return {
                    ...state,
                    authRedirectPath: action.path
                }
        default:
            return state
    }
}

export default authReducer;