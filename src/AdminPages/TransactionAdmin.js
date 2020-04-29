import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';

class TransactionAdmin extends Component {

    state = {
        dataTotalTransaction: [],
        dataTotalPendingTransaction: [],
        dataJumlahStock: [],
        dataSalesProduct: [],
        dataCart: []
    }

    componentDidMount() {
        this.getTotalTransaction();
        this.getTotalPendingTransaction();
        this.getAllJumlahStock();
        this.getSalesProduct();
        this.getAllCart();
    }

    getTotalTransaction = () => {
        Axios.get(API_URL_1 + `transaction/getAllTotalWithoutDate`)
            .then((res) => {
                this.setState({ dataTotalTransaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getTotalPendingTransaction = () => {
        Axios.get(API_URL_1 + `transaction/getAllTotalProsesWithoutDate`)
            .then((res) => {
                this.setState({ dataTotalPendingTransaction: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getAllJumlahStock = () => {
        Axios.get(API_URL_1 + `products/getAllJumlahStock`)
            .then((res) => {
                this.setState({ dataJumlahStock: res.data })
                console.log('stock', res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getSalesProduct = () => {
        Axios.get(API_URL_1 + `transaction/getSalesProduct`)
            .then((res) => {
                this.setState({ dataSalesProduct: res.data })
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getAllCart = () => {
        Axios.get(API_URL_1 + `carts/getAllCart`)
            .then((res) => {
                this.setState({ dataCart: res.data })
                console.log('cart', res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetTotalTransaction = () => {
        return this.state.dataTotalTransaction.map((item, index) => {
            return (
                <div>
                    {
                        item.alltotaltransaction === null
                            ?
                            <div style={{ fontSize: 20 }} key={index}>0</div>
                            :
                            <div style={{ fontSize: 20 }} key={index}>Rp. {item.alltotaltransaction.toLocaleString()},-</div>
                    }
                </div>
            )
        })
    }

    renderGetTotalPendingTransacttion = () => {
        return this.state.dataTotalPendingTransaction.map((item, index) => {
            return (
                <div>
                    {
                        item.alltotaltransaction === null
                            ?
                            <div style={{ fontSize: 20 }} key={index}>0</div>
                            :
                            <div style={{ fontSize: 20 }} key={index}>Rp. {item.alltotaltransaction.toLocaleString()},-</div>
                    }
                </div>
            )
        })
    }

    renderGetAllJumlahStock = () => {
        return this.state.dataJumlahStock.map((item, index) => {
            return (
                <div style={{ fontSize: 15 }}>{item.totalstock}</div>
            )
        })
    }

    renderGetSalesProduct = () => {
        return this.state.dataSalesProduct.map((item, index) => {
            return (
                <div style={{ fontSize: 15 }}>{item.salesproduct}</div>
            )
        })
    }

    renderGetAllCart = () => {
        return this.state.dataCart.map((item, index) => {
            return (
                <div style={{ fontSize: 15 }}>{item.jumlahcart}</div>
            )
        })
    }

    render() {
        return (
            <div>
                <MDBContainer style={{ marginTop: 30 }}>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10" >
                            <center>
                                <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>TRANSACTION</div>
                            </center>
                            <div className="row" style={{ marginTop: 30 }}>
                                <div className="col-4" style={{ height: 100, backgroundColor: '#778899', paddingTop: 10, textAlign: "center", fontSize: 20 }}>STOCK PRODUK <br /> {this.renderGetAllJumlahStock()}
                                    <center>
                                        <input type="button" className="form-control" value="LIHAT DETAIL" style={{ width: 150, fontSize: 10 }} />
                                    </center>
                                </div>
                                <div className="col-4" style={{ height: 100, backgroundColor: '#B0C4DE', paddingTop: 10, textAlign: "center", fontSize: 20 }}>PENJUALAN PRODUK <br /> {this.renderGetSalesProduct()}
                                    <center>
                                        <input type="button" className="form-control" value="LIHAT DETAIL" style={{ width: 150, fontSize: 10 }} />
                                    </center>
                                </div>
                                <div className="col-4" style={{ height: 100, backgroundColor: '#778899', paddingTop: 10, textAlign: "center", fontSize: 20 }}> KERANJANG KONSUMEN <br /> {this.renderGetAllCart()}
                                    <center>
                                        <input type="button" className="form-control" value="LIHAT DETAIL" style={{ width: 150, fontSize: 10 }} />
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 100 }}>
                        <div className="col-2"></div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-6" style={{ height: 250, backgroundColor: '#778899', paddingTop: 50, textAlign: "center", fontSize: 25 }}>
                                    TOTAL TRANSAKSI <br /> YANG BELUM BAYAR
                                    {this.renderGetTotalPendingTransacttion()}
                                    <center>
                                        <Link to="pendingtransaction" style={{ color: "black" }}>
                                            <input type="button" className="form-control" value="LIHAT DETAIL" style={{ width: 250, marginTop: 10 }} />
                                        </Link>
                                    </center>
                                </div>
                                <div className="col-6" style={{ height: 250, backgroundColor: '#B0C4DE', paddingTop: 50, textAlign: "center", fontSize: 25 }}>
                                    TOTAL TRANSAKSI <br /> YANG SUDAH BAYAR
                                    {this.renderGetTotalTransaction()}
                                    <center>
                                        <Link to="historytransactionadmin" style={{ color: "black" }}>
                                            <input type="button" className="form-control" value="LIHAT DETAIL" style={{ width: 250, marginTop: 10 }} />
                                        </Link>
                                    </center>
                                </div>
                            </div>

                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default TransactionAdmin;