import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';

// LOAD user

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('http://localhost:5000/api/auth'); // Sending Request to endpoint

        dispatch({
            type: USER_LOADED,
            payload:res.data
        })

    } catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}



// Register User 

export const register = ({name, phone, username, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    // Stringify preparing the data to send to db
    const body = JSON.stringify({name, phone, username, email, password});

    // Try and catch to log any errors 
    try{
        // Response 
        // Endpoint /api/users
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
};



// Login User 

export const login = ( username,  password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    // Stringify preparing the data to send to db
    const body = JSON.stringify({username, password});

    // Try and catch to log any errors 
    try{
        // Response 
        // Endpoint /api/users
        const res = await axios.post('http://localhost:5000/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
};
 
// Logout / Clear Profile 

export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}