import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux'

class DeleteAccount extends Component {
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
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow>
                                        <div className="d-flex justify-content-center">
                                            Enter your password
                                        </div>
                                        <input className="form-control" type="password" />
                                        <br/>
                                        <br/>
                                        <MDBBtn color="elegant" size="sm">Delete Account</MDBBtn>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>

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

export default connect(mapStatetoProps)(DeleteAccount);