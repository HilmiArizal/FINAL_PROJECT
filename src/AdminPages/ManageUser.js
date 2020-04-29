import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead } from 'mdbreact';


class ManageUser extends Component {

    state = {
        dataUser: []
    }

    componentWillMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        Axios.get(API_URL_1 + `users/getAllUsers`)
            .then((res) => {
                this.setState({ dataUser: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetUsers = () => {
        return this.state.dataUser.map((item, index) => {
            if (item.role === 'user') {
                return (
                    <tr className="text-center">
                        <td><div style={{ fontSize: 12 }}>{index + 1}</div></td>
                        <td><div style={{ fontSize: 12 }}>{item.username}</div></td>
                        <td><div style={{ fontSize: 12 }}>{item.email}</div></td>
                        <td style={{ width: 150 }}><div style={{ fontSize: 12 }}>{item.firstname} {item.lastname}</div></td>
                        <td><div style={{ fontSize: 12 }}>{item.phonenumber}</div></td>
                        <td style={{ width: 50 }}><div style={{ fontSize: 12, width: 150 }}>{item.address}</div></td>
                        <td style={{ width: 50 }}>
                            <div>
                                <button className="form-control" style={{ width: 80, fontSize: 12, marginBottom:5 }}>Non-Aktif</button>
                                <button className="form-control" style={{ width: 80, fontSize: 12, backgroundColor:"#404040", color:"white" }}>Aktif</button>
                            </div>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    render() {
        return (
            <div style={{ marginTop: 30 }}>
                <MDBContainer>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10">
                            <center>
                                <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>MANAGE USER</div>
                            </center>
                            <MDBTable bordered style={{ marginTop: 30 }}>
                                <MDBTableHead>
                                    <tr className="text-center">
                                        <th><div style={{ fontSize: 12 }}>NO. </div></th>
                                        <th><div style={{ fontSize: 12 }}>USERNAME</div></th>
                                        <th><div style={{ fontSize: 12 }}>EMAIL</div></th>
                                        <th><div style={{ fontSize: 12 }}>NAMA LENGKAP</div></th>
                                        <th><div style={{ fontSize: 12 }}>NO. HP</div></th>
                                        <th style={{ width: 100 }}><div style={{ fontSize: 12 }}>ALAMAT</div></th>
                                        <th><div style={{ fontSize: 12 }}>ACTION</div></th>
                                    </tr>
                                </MDBTableHead>
                                {this.renderGetUsers()}
                            </MDBTable>
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default ManageUser;