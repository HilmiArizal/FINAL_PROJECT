import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';


class HistoryTransactionUser extends Component {

    state = {
        transaction: [],
        detailtransaction: [],
        productpopuler: [],

        modal4: false,
        detailcart: null
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
        this.getProductPopuler()
    }

    getTransaction = () => {
        const token = localStorage.getItem('token')
        Axios.get(API_URL_1 + `transaction/getTransaction`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ transaction: res.data })
                // console.log(res.data)
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

    getProductPopuler = () => {
        Axios.get(API_URL_1 + `transaction/getProductPopuler`)
            .then((res) => {
                this.setState({ productpopuler: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetProductPopuler = () => {
        return this.state.productpopuler.map((item, index) => {
            return (
                <MDBCol key={index} style={{ marginTop: 20 }}>
                    <MDBCard style={{ width: "8rem" }}>
                        <MDBCardImage className="img-fluid" src={API_URL_1 + item.imagePath} waves />
                        <MDBCardBody>
                            <MDBCardTitle style={{ fontFamily: "Hammersmith One, sans-serif", fontSize: 12 }}>{item.productname.toUpperCase()}</MDBCardTitle>
                            <Link to={`productdetail?id=${item.productId}`}>
                                <MDBBtn color="elegant" size="sm" href="#">BUY</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    renderGetDetailTransaction = () => {
        return this.state.detailtransaction.map((item, index) => {
            if (this.state.detailcart === item.timescart) {
                return (
                    <tr key={index} style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                        <td><div>{item.productname}</div></td>
                        <td><div className="d-flex justify-content-center">{item.size}gr</div></td>
                        <td><div className="d-flex justify-content-center">Rp. {item.price.toLocaleString()},-</div></td>
                        <td><div className="d-flex justify-content-center">{item.qty}</div></td>
                        <td><div className="d-flex justify-content-center">Rp. {item.totalprice.toLocaleString()},-</div></td>
                    </tr >
                )
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    renderGetHistoryTransaction = () => {
        return this.state.transaction.map((item, index) => {
            return (
                <tr key={index} className="text-center" style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <td><div className="d-flex justify-content-center">{index + 1}</div></td>
                    <td style={{ width: 150 }}><div className="d-flex justify-content-center">{moment(item.datetransaction).format('LL')}</div></td>
                    <td style={{ width: 100 }}><div className="d-flex justify-content-center">{item.firstname} {item.lastname}</div></td>
                    <td>{item.address}</td>
                    <td style={{ width: 150 }}><div className="d-flex justify-content-center">Rp. {item.totaltransaction.toLocaleString()},-</div></td>
                    <td ><div className="d-flex justify-content-center">{item.status}</div></td>
                    <td>
                        <MDBContainer>
                            <div className="d-flex justify-content-center" onClick={() => this.setState({ detailcart: item.timescart })}>
                                <MDBBtn color="primary" onClick={this.toggle(4)} size="sm" style={{ width: 120 }}>DETAIL CART</MDBBtn>
                            </div>
                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                <MDBModalHeader toggle={this.toggle(4)}></MDBModalHeader>
                                <MDBModalBody>
                                    <div className="d-flex justify-content-center">
                                        <div style={{ marginBottom: 50 }}>
                                            <div style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: 30 }}>CV. HEAVEN SENTOSA</div>
                                            <div>SarenOne</div>
                                        </div>
                                    </div>
                                    <MDBContainer>
                                        <MDBTable bordered >
                                            <MDBTableHead style={{ backgroundColor: '#404040', color: 'white', fontFamily: 'Hammersmith One, sans-serif' }}>
                                                <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                                    <th>Product Name</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total Price</th>
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
                    <div className="container" style={{ margin: 50 }}>
                        <div className="row">
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>PRODUCT CHOOSEN</MDBBtn>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <Link to="cart">
                                    <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>CART</MDBBtn>
                                </Link>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>TRANSACTION</MDBBtn>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid black' }}></div>
                                <MDBBtn color="elegant" style={{ width: 230, borderRadius: 50 }}>STATUS TRANSACTION</MDBBtn>
                            </div>
                        </div>
                    </div>
                    <MDBContainer>
                        <div className="row">
                            <div className="col-10">
                                <center>
                                    <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                                        YOUR TRANSACTION
                                    </div>
                                </center>
                                <MDBTable bordered>
                                    <MDBTableHead style={{ fontFamily: 'Hammersmith One, sans-serif', backgroundColor: '#404040', color: 'white' }}>
                                        <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                            <th>No. </th>
                                            <th>Date Transaction</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Total Transaction</th>
                                            <th style={{ width: 120 }}>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody >
                                        {this.renderGetHistoryTransaction()}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                            <div className="col-2">
                                <center>
                                    <div style={{ fontSize: '100%', fontFamily: 'Hammersmith One, sans-serif', marginTop: 18 }}>
                                        3 PRODUK TERLARIS
                                    </div>
                                </center>
                                <div>
                                    {this.renderGetProductPopuler()}
                                </div>
                            </div>
                        </div>
                    </MDBContainer>
                </center>
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