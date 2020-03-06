import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';

export const Login = (username, password) => {
    return (dispatch) => {
        Axios.post(API_URL_1 + `users/login`, {
            username,
            password
        })
            .then((res) => {
                if (res.data.length !== 0) {
                    localStorage.setItem('token', res.data.token)
                    console.log('id adalahhhh',res.data)
                    alert('LOGIN SUCCESS!')
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                localStorage.removeItem('token')
                alert(err.response.data)
                // console.log(err)
                dispatch({
                    type: 'LOGOUT'
                })
            })
    }
}

export const Logout = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const keepLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL_1 + `users/keepLogin`, {}, headers)
                .then((res) => {
                    console.log(res.data)
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({
                        type: 'LOGOUT'
                    })
                })
        }
    }
}

export const Register = (data) => {
    return (dispatch) => {
        Axios.post(API_URL_1 + `users/register`, data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: 'LOGOUT'
                })
            })
    }
}