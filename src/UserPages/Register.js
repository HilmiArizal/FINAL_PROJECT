import React, { Component } from 'react';
import '../CSSUser/Login.css';
import form1 from '../Image/FORM-1.png';
import form2 from '../Image/FORM-2.png';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBIcon, MDBNavLink, MDBBtn } from "mdbreact";
import { Register } from '../Redux/Action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class RegisterPage extends Component {
    // state = {
    //     char: false,
    //     num: false,
    //     show: false
    // }

    // handleChange = (e) => {
    //     var pass = e.target.value
    //     var num = /[0-9]/
    //     this.setState({
    //         num: num.test(pass),
    //         char : (num.test(pass) && (pass.length > 7))
    //     })
    // }

    // showReq = () => {
    //     this.setState({ show: true})
    // }

    RegisterUser = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var confirmPassword = this.refs.confirmPassword.value;
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                var data = { username, email, password }
                this.props.Register(data)
                alert('Register Success')
            } else {
                alert('Your password not same!')
            }
        } else {
            alert('Please, input full your data!')
        }
    }

    render() {
        if (this.props.role !== '') {
            return(
                <Redirect to = '/login'>

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
                                    <input type="text" className="form-control" ref='email' />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Password</label>
                                    <input type="password" className="form-control" ref='password' />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Confirm Password</label>
                                    <input type="password" className="form-control" ref='confirmPassword' />
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
            </section>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStatetoProps, { Register })(RegisterPage);