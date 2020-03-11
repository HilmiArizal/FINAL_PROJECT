import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';

class ChangePass extends Component {

    state = {
        change: false
    }

    changePassword = async () => {
        try {
            let oldpassword = this.refs.oldeditpass.value;
            let newpassword = this.refs.neweditpass.value;
            let confirmpassword = this.refs.confirmpass.value;
            if (newpassword === confirmpassword) {
                await Axios.patch(API_URL_1 + `users/editPassword/${this.props.id}`, {
                    newpassword,oldpassword
                })
                alert('Success!')
                window.location.reload()
            }else{
                alert('Password tidak sama!')
            }
        } catch (err) {
            alert(err.response.data)
        }
    }

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
                                        <input className="form-control" type="password" ref="oldeditpass" />
                                        <div style={{ marginTop: 20 }}>
                                            New Password
                                        </div>
                                        <input className="form-control" type="password" ref="neweditpass" />
                                        <div style={{ marginTop: 20 }}>
                                            Confirm Password
                                        </div>
                                        <input className="form-control" type="password" ref="confirmpass" />
                                        <br />
                                        <br />
                                        <MDBBtn color="elegant" size="sm" onClick={this.changePassword}>Save</MDBBtn>
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
        id: state.user.id,
        username: state.user.username
    }
}

export default connect(mapStatetoProps)(ChangePass);