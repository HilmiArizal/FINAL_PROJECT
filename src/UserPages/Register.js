import React, { Component } from 'react';
import '../CSSUser/Login.css';
import form1 from '../Image/FORM-1.png';
import form2 from '../Image/FORM-2.png';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBIcon, MDBNavLink, MDBBtn } from "mdbreact";
import { Register, Login } from '../Redux/Action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';

class RegisterPage extends Component {
    state = {
        dataUser: [],
        char: false,
        num: false,
        show: false,
        border: false
    }

    handleChange = (e) => {
        let password = e.target.value
        let num = /[0-9]/
        this.setState({
            num: num.test(password),
            char: password.length > 7,
            border: (num.test(password) && (password.length > 7))
        })
    }

    showReq = () => {
        this.setState({ show: true })
    }

    componentDidMount() {
        Axios.get(API_URL_1 + `users/getAllUsers`)
            .then((res) => {
                this.setState({ dataUser: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    RegisterUser = () => {
        let { dataUser, char, num } = this.state
        var stop = true
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                for (var i = 0; i < dataUser.length; i++) {
                    if (username === dataUser[i].username) {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: `USERNAME TERSEDIA`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        stop = true
                        break;
                    } else {
                        stop = false
                    }
                }
                if (!stop) {
                    if (char & num) {
                        var data = { username, email, password }
                        this.props.Register(data)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `TERIMAKASIH TELAH MENDAFTAR`,
                            showConfirmButton: false,
                            timer: 2500
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: `PASSWORD TIDAK TEPAT`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `PASSWORD TIDAK SAMA`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `PLEASE, ISI DATA DENGAN LENGKAP!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    render() {
        let { char, num, show, border } = this.state
        if (this.props.role !== '') {
            return (
                <Redirect to='/unverified'>

                </Redirect>
            )
        }
        return (
            <section className="login-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <MDBNavLink to="/" style={{ color: 'black' }}>
                                <MDBIcon icon="times" />
                            </MDBNavLink>
                            <h2 className="text-center" style={{ marginBottom: '20px' }}>Join with us!</h2>
                            <form className="login-form">
                                <div className="form-group">
                                    <label className="text-uppercase">Username</label>
                                    <input type="text" className="form-control" ref='username' />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Email</label>
                                    <input type="text" className="form-control" ref='email' defaultValue='hilmi.arizal36@gmail.com' />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Password</label>
                                    <input type="password" className="form-control" ref='password' onChange={this.handleChange} onFocus={this.showReq} />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Confirm Password</label>
                                    <input type="password" className="form-control" ref='confirmPassword' style={{ borderColor: border ? 'green' : 'red' }} />
                                </div>
                                <div>
                                    <MDBBtn color="elegant" className="float-right" style={{ padding: '13px 30px 13px 30px', borderRadius: '5px', fontSize: ' 13px' }} onClick={this.RegisterUser}>SUBMIT</MDBBtn>
                                </div>
                            </form>
                            <div style={{ fontSize: '15px' }}>Are you Member? <MDBNavLink to="/login">Login here!</MDBNavLink></div>
                        </div>

                        <div className="col-md-8 banner-sec" >
                            <MDBCarousel
                                activeItem={1}
                                length={2}
                                showControls={true}
                                showIndicators={true}
                                className="z-depth-1 "
                            >
                                <MDBCarouselInner>
                                    <MDBCarouselItem itemId="1">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={form2}
                                                alt="First slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="2">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={form1}
                                                alt="Second slide"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                </MDBCarouselInner>
                            </MDBCarousel>
                        </div>
                    </div>
                </div>
                {
                    show
                        ?
                        <div>
                            {
                                char
                                    ?
                                    <div style={{ color: 'green' }}>
                                        Password length must be 8 or more Characters
                            </div>
                                    :
                                    <div style={{ color: 'red' }}>
                                        Password length must be 8 or more Characters
                            </div>
                            }
                            {
                                num
                                    ?
                                    <div style={{ color: 'green' }}>
                                        Password must include number
                            </div>
                                    :
                                    <div style={{ color: 'red' }}>
                                        Password must include number
                            </div>
                            }
                        </div>
                        :
                        null
                }
            </section>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStatetoProps, { Register, Login })(RegisterPage);
