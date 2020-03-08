import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';

class ChangePass extends Component {
    state = {}
    render() {
        return (
            <div>
                <NavbarUser />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="4">
                            <SidebarUser />
                        </MDBCol>
                        <MDBCol size="8">
                            <center>
                                <div style={{ margin: '3%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '200%' }}> Hi, {this.props.username} </div>
                            </center>
                            <div style={{ border: '2px solid black' }}> </div>
                            <br />
                            <MDBRow>
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow className="d-flex justify-content-center">
                                        <div >
                                            Old Password
                                        </div>
                                        <input className="form-control" type="password" />
                                        <div style={{ marginTop: 20 }}>
                                            New Password
                                        </div>
                                        <input className="form-control" type="password" />
                                        <div style={{ marginTop: 20 }}>
                                            Confirm Password
                                        </div>
                                        <input className="form-control" type="password" />
                                        <br />
                                        <br />
                                        <MDBBtn color="elegant" size="sm">Save</MDBBtn>
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

export default connect(mapStatetoProps)(ChangePass);