import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import moment from 'moment'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';


class PendingTransaction extends Component {
    state = {
        transaction: [],
        totaltransaction: [],
        users: [],
        newStatus: 0,
        getUser: 0,

        modal4: false,
        modal: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.getTransaction()
        this.getUsers()
        this.getTotalTransaction()
    }

    getTransaction = () => {
        Axios.get(API_URL_1 + `transaction/getAllTransactionProses`)
            .then((res) => {
                this.setState({ transaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => [
                // console.log(err)
            ])
    }

    getUsers = () => {
        Axios.get(API_URL_1 + `users/getAllUsers`)
            .then((res) => {
                this.setState({ users: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getTotalTransaction = () => {
        Axios.get(API_URL_1 + `transaction/getAllTotalProses`)
            .then((res) => {
                this.setState({ totaltransaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    onChangeSelectStatus = (e, index) => {
        let { transaction } = this.state;
        transaction[index].status = e.target[e.target.selectedIndex].text
        this.setState({ newStatus: e.target[e.target.selectedIndex].text })
    }

    onBtnSaveTransaction = async (idtransaction) => {
        try {
            let status = this.state.newStatus
            await Axios.put(API_URL_1 + `transaction/editStatus?id=${idtransaction}`, { status })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Status berhasil di ubah, dan pindahkan ke history transaction`,
                showConfirmButton: false,
                timer: 1500
            })
            window.location.reload()
            // console.log(res.data)
        } catch (err) {
            // console.log(err)
        }
    }

    renderGetTotalTransaction = () => {
        return this.state.totaltransaction.map((item, index) => {
            return (
                <tr key={index} className="text-center">
                    <td><div className="d-flex justify-content-center">{moment(item.datetransaction).format('LL')}</div></td>
                    <td>Rp. {item.alltotaltransaction.toLocaleString()},-</td>
                </tr>

            )
        })
    }

    renderGetAllUsername = () => {
        return this.state.users.map((item, index) => {
            return (
                <option onChange={() => this.setState({ getUser: item.id })}>
                    {item.username}
                </option>
            )
        })
    }

    renderGetTransaction = () => {
        return this.state.transaction.map((item, index) => {
            if (this.state.getUser === item.username) {
                return (
                    <tr key={index} className="text-center">
                        <td>{item.username}</td>
                        <td style={{ width: 200 }}>{item.address}</td>
                        <td>Rp. {item.totaltransaction.toLocaleString()},-</td>
                        <td><div className="d-flex justify-content-center">{moment(item.datetransaction).format('LL')}</div></td>
                        <td><div style={{ cursor: 'pointer' }}>
                            <img src={API_URL_1 + item.buktitransaksi} alt="BuktiPembayaran" style={{ width: 100 }} />
                        </div>
                        </td>
                        <td>
                            <select defaultValue={item.status} className="form-control" onChange={(e) => this.onChangeSelectStatus(e, index)} style={{ fontSize: 13, width: 150 }}>
                                <option>UNPAID</option>
                                <option>ON PROCESS</option>
                                <option>DELIVERY</option>
                                <option>PAID</option>
                            </select>
                            <MDBBtn color="elegant" size="sm" onClick={() => this.onBtnSaveTransaction(item.idtransaction)}>Save</MDBBtn>
                        </td>
                    </tr>
                )
            } else if (this.state.getUser === "admin") {
                return (
                    <tr key={index} className="text-center">
                        <td>{item.username}</td>
                        <td style={{ width: 200 }}>{item.address}</td>
                        <td>Rp. {item.totaltransaction.toLocaleString()},-</td>
                        <td><div className="d-flex justify-content-center">{moment(item.datetransaction).format('LL')}</div></td>
                        <td><div style={{ cursor: 'pointer' }}>
                            <img src={API_URL_1 + item.buktitransaksi} alt="BuktiPembayaran" style={{ width: 100 }} />
                        </div>
                        </td>
                        <td>
                            <select defaultValue={item.status} className="form-control" onChange={(e) => this.onChangeSelectStatus(e, index)} style={{ fontSize: 13, width: 150 }}>
                                <option>UNPAID</option>
                                <option>ON PROCESS</option>
                                <option>DELIVERY</option>
                                <option>PAID</option>
                            </select>
                            <MDBBtn color="elegant" size="sm" onClick={() => this.onBtnSaveTransaction(item.idtransaction)}>Save</MDBBtn>
                        </td>
                    </tr>
                )
            } else if (this.state.getUser === 0) {
                return (
                    <tr key={index} className="text-center">
                        <td>{item.username}</td>
                        <td style={{ width: 200 }}>{item.address}</td>
                        <td>Rp. {item.totaltransaction.toLocaleString()},-</td>
                        <td><div className="d-flex justify-content-center">{moment(item.datetransaction).format('LL')}</div></td>
                        <td><div style={{ cursor: 'pointer' }}>
                            <img src={API_URL_1 + item.buktitransaksi} alt="BuktiPembayaran" style={{ width: 100 }} />
                        </div></td>
                        <td>
                            <select defaultValue={item.status} className="form-control" onChange={(e) => this.onChangeSelectStatus(e, index)} style={{ fontSize: 13, width: 150 }}>
                                <option>UNPAID</option>
                                <option>ON PROCESS</option>
                                <option>DELIVERY</option>
                                <option>PAID</option>
                            </select>
                            <MDBBtn color="elegant" size="sm" onClick={() => this.onBtnSaveTransaction(item.idtransaction)}>Save</MDBBtn>
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
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            PENDING TRANSACTION CUSTOMER
                        </div>
                        <MDBContainer style={{ marginTop: 50 }}>
                            <div>LIHAT BERDASARKAN NAMA</div>
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <select className="form-control" onChange={(e) => this.setState({ getUser: e.target.value })} style={{ fontSize: 15 }}>
                                        {this.renderGetAllUsername()}
                                    </select>
                                </div>
                                <div className="col-4"></div>
                            </div>
                            <div style={{ fontSize: 10 }}>*ADMIN DAPAT MELIHAT SEMUA KONSUMEN</div>
                            {
                                this.state.transaction.length > 0
                                    ?
                                    <MDBTable bordered style={{ marginTop: 50 }} >
                                        <MDBTableHead style={{ fontFamily: 'Hammersmith One, sans-serif', backgroundColor: '#192b3c', color: 'white' }}>
                                            <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                                <th>USERNAME</th>
                                                <th>ADDRESS</th>
                                                <th>TOTAL TRANSACTION</th>
                                                <th>DATE TRANSACTION</th>
                                                <th>TRANSACTION UPLOAD</th>
                                                <th>STATUS</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody style={{ fontFamily: 'Hammersmith One, sans-serif' }} >
                                            {this.renderGetTransaction()}
                                        </MDBTableBody>
                                    </MDBTable>
                                    :
                                    ''
                            }
                            <MDBBtn onClick={this.toggle(4)} color="elegant" size="sm">TOTAL PENDING TRANSAKSI KESELURUHAN</MDBBtn>
                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                <MDBModalHeader toggle={this.toggle(4)}></MDBModalHeader>
                                <MDBModalBody>
                                    <div style={{ fontSize: 20, margin: 20 }}>TOTAL HARIAN PENDING TRANSAKSI SEMUA KONSUMEN</div>
                                    <MDBContainer>
                                        <MDBTable bordered >
                                            <MDBTableHead style={{ backgroundColor: '#404040', color: 'white', fontFamily: 'Hammersmith One, sans-serif' }}>
                                                <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                                    <th>TANGGAL</th>
                                                    <th>TOTAL TRANSAKSI</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody >
                                                {this.renderGetTotalTransaction()}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBContainer>
                                </MDBModalBody>
                            </MDBModal>
                        </MDBContainer>
                    </center>
                </main>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        role: state.user.role
    }
}


export default connect(mapStatetoProps)(PendingTransaction);