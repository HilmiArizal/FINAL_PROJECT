import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';
import Avatar from '@material-ui/core/Avatar';

class ProfileUser extends Component {

    render() {
        return (
            <div>
                <NavbarUser />
                <MDBContainer>
                    <MDBRow >
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
                                <MDBCol size="6" className="d-flex justify-content-center">
                                    <Avatar src="/broken-image.jpg" style={{ height: 150, width: 150 }} />
                                </MDBCol>
                                <MDBCol size="6">
                                    <div> Email: {this.props.email}</div>
                                    <div> Full Name: {this.props.username} </div>
                                    <div> Birthday Date: </div>
                                    <div> Gender: </div>
                                    <div> Job: </div>
                                    <div> Address: </div>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            <div style={{ border: '2px solid black' }}> </div>
                            <br />
                            <br />
                            <MDBRow >
                                <MDBCol size="6" >
                                    <center>First Name</center>
                                    <input type="text" className="form-control" />
                                    <br />
                                    <center>Last Name</center>
                                    <input type="text" className="form-control" />
                                    <br />
                                    <center>Birthday Date</center>
                                    <input type="text" className="form-control" />
                                </MDBCol>
                                <MDBCol size="6">
                                    <MDBRow>
                                        <MDBCol size="6">
                                            <center>Gender</center>
                                            <select className="form-control" >
                                                <option >Pria</option>
                                                <option >Wanita</option>
                                            </select>
                                        </MDBCol>
                                        <MDBCol size="6">
                                            <center>Job</center>
                                            <select className="form-control" >
                                                <option >Pelajar/Mahasiswa</option>
                                                <option >Ibu rumah tangga</option>
                                                <option >Swasta</option>
                                                <option >Wiraswasta</option>
                                            </select>
                                        </MDBCol>
                                    </MDBRow>
                                    <div style={{ marginTop: 30 }}>
                                        <center>Address</center>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="4"
                                            />
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            <MDBRow>
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow className="d-flex justify-content-center">
                                        <MDBBtn color="elegant" size="lg">Save</MDBBtn>
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
        username: state.user.username,
        email: state.user.email
    }
}

export default connect(mapStatetoProps)(ProfileUser);