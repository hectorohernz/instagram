import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'), // Saves token
    isAuth: null, // Checking and Showing stuff only login users can see
    loading: true, // Setting true by default changing to false when data has load
    user: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading:false,
                user: payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuth:true,
                loading:false
            }
            
            case REGISTER_FAIL: // Clears state and local storage 
            case AUTH_ERROR:
            case LOGIN_FAIL: 
            case LOGOUT: 
                localStorage.removeItem('token');
                return{
                    ...state,
                token:null,
                isAuth:false,
                loading:false
                }
                
            default:
                return state;
    }
}