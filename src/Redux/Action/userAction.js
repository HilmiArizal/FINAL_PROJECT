import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import Swal from 'sweetalert2';

export const Login = (username, password) => {
    return (dispatch) => {
        Axios.post(API_URL_1 + `users/login`, {
            username,
            password
        })
            .then((res) => {
                if (res.data.length !== 0) {
                    localStorage.setItem('token', res.data.token)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `WELCOME, ${username.toUpperCase()}!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                localStorage.removeItem('token')
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch({
                    type: 'LOGOUT'
                })
            })
    }
}

export const Logout = () => {
    return (dispatch) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `TERIMAKASIH!`,
            showConfirmButton: false,
            timer: 1500
        })
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const keepLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            Axios.post(API_URL_1 + `users/keepLogin`, {}, headers)
                .then((res) => {
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data
                    })
                })
                .catch((err) => {
                    // console.log(err)
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
                // console.log(res.data)
                localStorage.setItem('token', res.data.token)
                
                dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })
            .catch((err) => {
                // console.log(err)
                dispatch({
                    type: 'LOGOUT'
                })
            })
    }
}