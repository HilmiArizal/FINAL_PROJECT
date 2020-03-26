import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import NavbarUser from '../Component/NavbarUser';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";
import '../CSSAdmin/InputNumber.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../Component/Footer';
import Swal from 'sweetalert2';


class DetailProduct extends Component {
    state = {
        product: [],
        size: [],
        price: [],

        stockId: 0,
        sizeId: 0,
        priceId: 0,

        newStock: 0,
        newSize: 0,
        newPrice: 0,

        value: 1,
        showPrice: false,
        order: [],

        RedirectLogin: false,
        RedirectNext: false
    }


    AddClick = () => {
        if (this.state.showPrice) {
            this.setState({ value: this.state.value + 1 });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Please, pilih dulu beratnya!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    MinClick = () => {
        let min = this.state.value;
        if (this.state.showPrice) {
            if (min <= 1) {
                this.setState({ value: this.state.value = 1 });
            } else {
                this.setState({ value: this.state.value - 1 });
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Please, pilih dulu beratnya!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    componentDidMount() {
        this.getIdProduct()
        this.getSizeAndPriceProduct()
    }

    getIdProduct = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getProductId?id=${takeId}`)
            .then((res) => {
                this.setState({ product: res.data[0] })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getSizeAndPriceProduct = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getProductId?id=${takeId}`)
            .then((res) => {
                this.setState({ size: res.data, price: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    addToCart = async () => {
        try {
            if (this.props.id > 0) {
                let userId = this.props.id;
                let productId = this.props.location.search.split('=')[1];
                let stockId = this.state.stockId
                let sizeId = this.state.sizeId;
                let priceId = this.state.priceId;
                let jumlahstock = this.state.newStock;
                let qty = this.state.value;
                let totalprice = this.state.value * this.state.newPrice;
                let postCart = {
                    userId: parseInt(userId),
                    productId: parseInt(productId),
                    stockId: parseInt(stockId),
                    sizeId: parseInt(sizeId),
                    priceId: parseInt(priceId),
                    jumlahstock: parseInt(jumlahstock),
                    qty: parseInt(qty),
                    totalprice,
                }
                if (userId && productId && stockId && sizeId && priceId && jumlahstock && qty && totalprice) {
                    await Axios.post(API_URL_1 + `carts/addToCart`, postCart)
                    this.setState({ RedirectNext: true })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Produk berhasil ditambahkan`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: `Please, ${this.props.username} pilih dulu beratnya!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Please, Login!`,
                    showConfirmButton: false,
                    timer: 1500
                })
                this.setState({ RedirectLogin: true })
            }
        } catch (err) {
            // console.log(err)
        }
    }

    renderGetSize = () => {
        return this.state.size.map((item, index) => {
            return (
                <div className="row">
                    <div className="col-1">
                        <input type="radio" name="size" onClick={() => this.setState({ newStock: item.jumlahstock, newPrice: item.price, newSize: item.size, showPrice: true, sizeId: item.idsize, priceId: item.idprice, stockId: item.idstock })} style={{ cursor: 'pointer', marginTop: 13 }} />
                    </div>
                    <div className="col-5">
                        <div style={{ borderRadius: 50, marginTop: 5, backgroundColor: '#404040', textAlign: 'center', color: 'white', fontFamily: 'Hammersmith One, sans-serif', fontSize: 12, padding: 5 }}>{item.size} gr</div>
                    </div>
                    <div className="col-5">
                        <div style={{ borderRadius: 50, marginTop: 5, backgroundColor: '#404040', textAlign: 'center', color: 'white', fontFamily: 'Hammersmith One, sans-serif', fontSize: 12, padding: 5 }}>Rp.{item.price.toLocaleString()}</div>
                    </div>
                </div>
            )
        })
    }

    renderGetPrice = () => {
        return this.state.price.map((item, index) => {
            if (this.state.priceId === parseInt(item.idprice)) {
                return (
                    <div key={index}>
                        <h5>
                            Price: Rp. {item.price},-
                    </h5>
                    </div>
                )
            } else if (this.state.priceId === 0) {
                return (
                    <div key={index}>
                        <h5>
                            Price: Rp. <h1></h1>
                        </h5>
                    </div>
                )
            }
        })
    }

    renderProducts = () => {
        const { product, RedirectLogin, RedirectNext } = this.state;
        if (RedirectLogin) {
            return (
                <Redirect to="/login" />
            )
        } else if (RedirectNext) {
            return (
                <Redirect to="/cart" />
            )
        }

        return (
            <div>
                <center>
                    <div className="container" style={{ margin: 50 }}>
                        <div className="row">
                            <div className="col-3">
                                <div style={{ border: '2px solid black' }}></div>
                                <MDBBtn color="elegant" style={{ width: 230, borderRadius: 50 }}>PRODUCT CHOOSEN</MDBBtn>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>CART</MDBBtn>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>TRANSACTION</MDBBtn>
                            </div>
                            <div className="col-3">
                                <div style={{ border: '2px solid white' }}></div>
                                <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>STATUS TRANSACTION</MDBBtn>
                            </div>
                        </div>
                    </div>
                </center>
                <MDBContainer className="mt-5 " style={{ fontFamily: 'Hammersmith One, sans-serif', minHeight: '70vh' }}>
                    <MDBJumbotron className="p-0" >
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol sm="6">
                                    <center>
                                        <img
                                            src={API_URL_1 + product.imagePath}
                                            alt='ImgProduct'
                                            style={{ width: '95%', marginTop: '5%' }}
                                        />
                                    </center>
                                    <br />
                                    <br />
                                </MDBCol>
                                <MDBCol sm="6">
                                    <MDBCardBody>
                                        <br />
                                        <center>
                                            <MDBCardTitle style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: 30, color: 'black    ' }}>{product.productname}</MDBCardTitle>
                                        </center>
                                        Description Product :
                                    <br />
                                        <div style={{ fontSize: '13px' }}>
                                            {product.description}
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-6">
                                                {this.renderGetSize()}
                                            </div>
                                            <div className="col-6">
                                                <center>
                                                    <div style={{ fontFamily: 'Hammersmith One, sans-serif' }}>Quantity</div>
                                                    <div style={{ fontSize: 10 }}>(Pilih berat/ukuran terlebih dahulu)</div>
                                                    <div className="def-number-input number-input">
                                                        <button onClick={this.MinClick} className="minus"></button>
                                                        <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
                                                            type="number" />
                                                        <button onClick={this.AddClick} className="plus"></button>
                                                    </div>
                                                </center>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <MDBRow>
                            <MDBCol sm="10">
                                <div className='d-flex' style={{ marginBottom: '25px', paddingLeft: '5%', backgroundColor: '#404040', height: '10vh', color: 'white', alignItems: 'center', fontSize: '30px', fontFamily: 'Hammersmith One, sans- serif' }}>Total Price Rp. {this.state.value * this.state.newPrice},- </div>
                            </MDBCol>
                            {
                                this.props.status === 'unverified'
                                    ?
                                    <MDBCol sm="2">
                                        <Link to='unverified'>
                                            <div className='d-flex justify-content-center' style={{ backgroundColor: '#404040', height: '10vh', color: 'white', alignItems: 'center', fontSize: 20, fontFamily: 'Hammersmith One, sans- serif', cursor: 'pointer' }}>ADD TO CART </div>
                                        </Link>
                                    </MDBCol>
                                    :
                                    <MDBCol sm="2">
                                        <div className='d-flex justify-content-center' style={{ backgroundColor: '#404040', height: '10vh', color: 'white', alignItems: 'center', fontSize: 20, fontFamily: 'Hammersmith One, sans- serif', cursor: 'pointer' }} onClick={this.addToCart}>ADD TO CART </div>
                                    </MDBCol>
                            }
                        </MDBRow>
                    </MDBJumbotron>
                </MDBContainer >
            </div>
        )
    }

    render() {
        return (
            <div>
                <NavbarUser />
                {this.renderProducts()}
                <div style={{ marginTop: 60 }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username,
        status: state.user.status
    }
}

export default connect(mapStatetoProps)(DetailProduct);