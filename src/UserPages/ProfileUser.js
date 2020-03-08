import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { connect } from 'react-redux';

class ProfileUser extends Component {
    state = {}


    render() {
        return (
            <div>
                <NavbarUser />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="4">
                            <div style={{ backgroundColor: '#404040', height: '50vh', borderRadius: '20px' }}>
                                <div style={{ backgroundColor: '#404040', color: '#404040', padding: '10%' }}>
                                    TEST
                                </div>
                                <div>
                                    <a className="s-sidebar__nav-link" href="/profileuser">
                                        <div className="text-Center">
                                            <center>
                                                PROFILE
                                            </center>
                                        </div>
                                    </a>
                                    <a className="s-sidebar__nav-link" href="/changepass">
                                        <div className="text-Center">
                                            <center>
                                                CHANGE PASSWORD
                                            </center>
                                        </div>
                                    </a>
                                    <a className="s-sidebar__nav-link" href="/deleteaccount">
                                        <div className="text-Center">
                                            <center>
                                                DELETE ACCOUNT
                                            </center>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol size="8">
                            <center>
                                <div style={{ margin: '3%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '200%' }}> Hi, {this.props.username} </div>
                            </center>
                            <MDBRow>

                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStatetoProps)(ProfileUser);