import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import Swal from 'sweetalert2';
import { Logout } from '../Redux/Action';
import { Redirect } from 'react-router-dom';

class ChangePass extends Component {

    state = {
        change: false,
        char: false,
        num: false,
        show: false,
        border: false,
        RedirectLogin: false
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

    changePassword = async () => {
        try {
            let { char, num } = this.state;
            let oldpassword = this.refs.oldeditpass.value;
            let newpassword = this.refs.neweditpass.value;
            let confirmpassword = this.refs.confirmpass.value;
            if (newpassword === confirmpassword) {
                if (char, num) {
                    await Axios.patch(API_URL_1 + `users/editPassword/${this.props.id}`, {
                        newpassword, oldpassword
                    })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `PASSWORD TERGANTI`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({ RedirectLogin: true })
                    localStorage.removeItem('token')
                    this.props.Logout()
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: `PASSWORD TIDAK TEPAT`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `PASSWORD TIDAK SAMA`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: err.response.data,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    render() {
        let { char, num, show, border } = this.state;
        if (this.state.RedirectLogin) {
            return (
                <Redirect to='login'>

                </Redirect>
            )
        }
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
                                        <input className="form-control" type="password" ref="neweditpass" onChange={this.handleChange} onFocus={this.showReq} />
                                        <div style={{ marginTop: 20 }}>
                                            Confirm Password
                                        </div>
                                        <input className="form-control" type="password" ref="confirmpass" style={{ borderColor: border ? 'green' : 'red' }} />
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
                            <div className="text-center">
                                {
                                    show
                                        ?
                                        <div>
                                            {
                                                char
                                                    ?
                                                    <div style={{ color: 'green' }}>
                                                        Password harus 8 karakter
                                                </div>
                                                    :
                                                    <div style={{ color: 'red' }}>
                                                        Password harus 8 karakter

                                                </div>
                                            }
                                            {
                                                num
                                                    ?
                                                    <div style={{ color: 'green' }}>
                                                        Password harus ada number
                                                </div>
                                                    :
                                                    <div style={{ color: 'red' }}>
                                                        Password harus ada number

                                                </div>
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>
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

export default connect(mapStatetoProps, { Logout })(ChangePass);