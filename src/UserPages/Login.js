import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../CSSUser/Login.css';
import form1 from '../Image/FORM-1.png'
import form2 from '../Image/FORM-2.png';
import { Login } from '../Redux/Action';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBIcon, MDBNavLink } from "mdbreact";
import { Button } from 'reactstrap';


class LoginPage extends Component {

    LoginUser = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.Login(username, password)
    }

    render() {
        if (this.props.role !== '') {
            return (
                <Redirect to='/'>

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
                            <div style={{ marginTop: '20px' }}>
                                <h2 className="text-center">Login Now!</h2>
                                <form className="login-form">
                                    <div className="form-group">
                                        <label className="text-uppercase">Username</label>
                                        <input type="text" className="form-control" ref='username' />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-uppercase">Password</label>
                                        <input type="password" className="form-control" ref='password' />
                                    </div>
                                    <div>
                                        <Button color="black" className="float-right" style={{ padding: '13px 30px 13px 30px', borderRadius: '5px', fontSize: ' 13px' }} onClick={this.LoginUser}>SUBMIT</Button>
                                    </div>
                                </form>
                            </div>
                            <div style={{ fontSize: '15px' }}>Are you Not a Member? <MDBNavLink to="/register">Create account!</MDBNavLink></div>
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
export default connect(mapStatetoProps, { Login })(LoginPage)