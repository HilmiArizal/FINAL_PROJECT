import React, { Component } from 'react';
import queryString from 'query-string';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

class Verified extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        let token = params.token;
        // console.log('ini', token)
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        Axios.post(API_URL_1 + `users/emailverification`, {}, options)
            .then((res) => {
                localStorage.setItem('token', token)
                this.setState({ redirect: true })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Thanks, your account has been verified!`,
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/profileuser">

                </Redirect>
            )
        }
        return (
            <div>
                {/* Check Your Email */}
            </div>
        )
    }
}

export default Verified;