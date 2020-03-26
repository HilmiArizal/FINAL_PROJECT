import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../CSSUser/Login.css';
import form1 from '../Image/FORM-1.png'
import form2 from '../Image/FORM-2.png';
import { Login } from '../Redux/Action';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBIcon, MDBNavLink, MDBBtn } from "mdbreact";


class LoginAdmin extends Component {

    LoginAdmin = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.Login(username, password)
    }

    render() {
        if (this.props.role === 'user') {
            return (
                <Redirect to='/'>

                </Redirect>
            )
        } else if (this.props.role === 'admin') {
            // console.log(this.props.role)
            return (
                <Redirect to='/profileadmin'>

                </Redirect>
            )
        }
        return (
            <section className="login-block">
                <div className="container" style={{minHeight:'70vh', width:500}}>
                    <div className="login-sec">
                        <MDBNavLink to="/" style={{ color: 'black', marginTop:25 }}>
                            <MDBIcon icon="times" />
                        </MDBNavLink>
                        <div style={{ marginTop:20 }}>
                            <h2 className="text-center">HELLO ADMIN!</h2>
                            <form className="login-form">
                                <div className="form-group">
                                    <label className="text-uppercase">Username</label>
                                    <input type="text" className="form-control" ref='username' />
                                </div>
                                <div className="form-group">
                                    <label className="text-uppercase">Password</label>
                                    <input type="password" className="form-control" ref='password' />
                                </div>
                                < div  className="d-flex justify-content-center">
                                    <MDBBtn color="elegant" className="float-right" style={{ padding: '13px 30px 13px 30px', borderRadius: '5px', fontSize: ' 13px' }} onClick={this.LoginAdmin}>SUBMIT</MDBBtn>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section >
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        role: state.user.role,
        status: state.user.status
    }
}
export default connect(mapStatetoProps, { Login })(LoginAdmin)