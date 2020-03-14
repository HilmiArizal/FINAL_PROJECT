import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdbreact';



class HisTransaction extends Component {
    state = {
        transaction: [],
        newStatus: 0
    }

    componentDidMount() {
        Axios.get(API_URL_1 + `transaction/getAllTransaction`)
            .then((res) => {
                this.setState({ transaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => [
                // console.log(err)
            ])
    }

    onChangeSelectStatus = (e, index) => {
        let { transaction } = this.state;
        transaction[index].status = e.target[e.target.selectedIndex].text
        this.setState({ newStatus: e.target[e.target.selectedIndex].text })
    }

    onBtnSaveTransaction = async (idtransaction) => {
        try {
            let status = this.state.newStatus
            const res = await Axios.put(API_URL_1 + `transaction/editStatus?id=${idtransaction}`, {status})
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    renderGetProduct = () => {
        return this.state.transaction.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.address}</td>
                    <td>Rp. {item.totaltransaction},-</td>
                    <td>{item.datetransaction}</td>
                    <td>
                        <select defaultValue={item.status} className="form-control" onChange={(e) => this.onChangeSelectStatus(e, index)} style={{ fontSize: 13, width: 120 }}>
                            <option>UNPAID</option>
                            <option>ON PROCESS</option>
                            <option>DELIVERY</option>
                            <option>PAID</option>
                        </select>
                        <MDBBtn color="elegant" size="sm" onClick={() => this.onBtnSaveTransaction(item.idtransaction)}>Save</MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            HISTORY TRANSACTION CUSTOMER
                    </div>
                        <MDBContainer>
                            <MDBTable bordered >
                                <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: '#192b3c', color: 'white' }}>
                                    <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                        <th>No. </th>
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Total Transaction</th>
                                        <th>Date Transaction</th>
                                        <th>Status</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody >
                                    {this.renderGetProduct()}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBContainer>
                    </center>
                </main>
            </div>
        );
    }
}

export default HisTransaction;