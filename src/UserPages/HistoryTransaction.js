import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBCardBody, MDBModalFooter, MDBModalBody } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment'


class HistoryTransactionUser extends Component {

    state = {
        transaction: [],
        detailtransaction: [],
        modal4: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.getTransaction()
        this.getDetailTransaction()
    }

    getTransaction = () => {
        const token = localStorage.getItem('token')
        console.log(token)
        Axios.get(API_URL_1 + `transaction/getTransaction`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ transaction: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getDetailTransaction = () => {
        Axios.get(API_URL_1 + `transaction/getDetailTransaction?username=${this.props.username}`)
            .then((res) => {
                this.setState({ detailtransaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetDetailTransaction = () => {
        return this.state.detailtransaction.map((item, index) => {
            return (
                <tr key={index} style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td><div className="d-flex justify-content-center">{item.qty}</div></td>
                    <td><div className="d-flex justify-content-center">{item.totalprice}</div></td>
                    <td style={{ width: 200 }}><div className="d-flex justify-content-center">{moment(item.datetranscation).format('LL')}</div></td>
                </tr>
            )
        })
    }

    renderGetHistoryTransaction = () => {
        return this.state.transaction.map((item, index) => {
            return (
                <tr key={index} style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <td>{index + 1}</td>
                    <td><div className="d-flex justify-content-center">{item.firstname} {item.lastname}</div></td>
                    <td>{item.address}</td>
                    <td style={{ width: 200 }}><div className="d-flex justify-content-center">Rp. {item.totaltransaction.toLocaleString()},-</div></td>
                    <td style={{ width: 200 }}><div className="d-flex justify-content-center">{moment(item.datetranscation).format('LL')}</div></td>
                    <td><div className="d-flex justify-content-center">{item.status}</div></td>
                    <td>
                        <MDBContainer>
                            <div className="d-flex justify-content-center">
                                <MDBBtn color="primary" onClick={this.toggle(4)} size="sm" color="elegant" style={{ width: 120 }}>DETAIL CART</MDBBtn>
                            </div>
                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                <MDBModalHeader toggle={this.toggle(4)}></MDBModalHeader>
                                <MDBModalBody>
                                    <MDBContainer>
                                        <MDBTable bordered >
                                            <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: '#404040', color: 'white', fontFamily: 'Hammersmith One, sans-serif' }}>
                                                <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                                    <th>No. </th>
                                                    <th>Product Name</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total Price</th>
                                                    <th>Date Cart</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody >
                                                {this.renderGetDetailTransaction()}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBContainer>
                                </MDBModalBody>
                            </MDBModal>
                        </MDBContainer>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <NavbarUser />
                <center>
                    <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                        YOUR TRANSACTION
                    </div>
                </center>
                <MDBContainer>
                    <MDBTable bordered >
                        <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: '#404040', color: 'white' }}>
                            <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                <th>No. </th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Total Transaction</th>
                                <th>Date Transaction</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {this.renderGetHistoryTransaction()}
                        </MDBTableBody>
                    </MDBTable>
                </MDBContainer>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStatetoProps)(HistoryTransactionUser);