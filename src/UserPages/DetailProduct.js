import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import NavbarUser from '../Component/NavbarUser';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";
import '../CSSAdmin/InputNumber.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../Component/Footer';

class DetailProduct extends Component {
    state = {
        product: [],
        size: [],
        price: [],

        sizeId: 0,
        priceId: 0,

        idSiz: 0,
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
            alert('PILIH SIZE DULU!')
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
            alert('PILIH SIZE DULU!')
        }
    }
    componentDidMount() {
        this.getIdProduct()
        this.getSizeProduct()
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

    getSizeProduct = () => {
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
                let sizeId = this.state.sizeId;
                let priceId = this.state.priceId;
                let qty = this.state.value;
                let totalprice = this.state.value * this.state.newPrice;
                let postCart = {
                    userId: parseInt(userId),
                    productId: parseInt(productId),
                    sizeId: parseInt(sizeId),
                    priceId: parseInt(priceId),
                    qty: parseInt(qty),
                    totalprice
                }
                if (userId && productId && sizeId && priceId && qty && totalprice) {
                    await Axios.post(API_URL_1 + `carts/addToCart`, postCart)
                    this.setState({ RedirectNext: true })
                    alert('Berhasil ditambahkan ke cart')
                } else {
                    alert('Isi dengan benar!')
                }
            } else {
                alert('Please Login')
                this.setState({ RedirectLogin: true })
            }
        } catch (err) {
            console.log(err)
        }
    }

    renderGetSize = () => {
        return this.state.size.map((item, index) => {
            // console.log(this.state.newPrice)
            return (
                <MDBBtn color="elegant" key={index} size='md' onClick={() => this.setState({ idSiz: item.idprice, newPrice: item.price, showPrice: true, sizeId: item.idsize, priceId: item.idprice })} style={{ cursor: 'pointer' }}>
                    {item.size} gr
                </MDBBtn>
            )
        })
    }

    renderGetPrice = () => {
        return this.state.price.map((item, index) => {
            if (this.state.idSiz === parseInt(item.idprice)) {
                return (
                    <div key={index}>
                        <h5>
                            Price: Rp. {item.price},-
                    </h5>
                    </div>
                )
            } else if (this.state.idSiz === 0) {
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
            <MDBContainer className="mt-5 " style={{ fontFamily: 'Segoe UI Symbol', minHeight: '70vh' }}>
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
                                        <MDBCardTitle style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: '30px' }}>{product.productname}</MDBCardTitle>
                                    </center>
                                    Description Product :
                                    <br />
                                    <div style={{ fontSize: '13px' }}>
                                        {product.description}
                                    </div>
                                    <br />
                                    <center>
                                        {this.renderGetSize()}
                                    </center>
                                    <br />
                                    <center>
                                        {
                                            this.state.showPrice
                                                ?
                                                <div>
                                                    {this.renderGetPrice()}
                                                </div>
                                                :
                                                <div style={{ fontSize: '10px' }}>
                                                    *Pilih size untuk melihat harga
                                                </div>
                                        }
                                        <div className="def-number-input number-input">
                                            <button onClick={this.MinClick} className="minus"></button>
                                            <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
                                                type="number" />
                                            <button onClick={this.AddClick} className="plus"></button>
                                        </div>
                                    </center>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <MDBRow>
                        <MDBCol sm="10">
                            <div className='d-flex' style={{ marginBottom: '25px', paddingLeft: '5%', backgroundColor: '#192b3c', height: '10vh', color: 'white', alignItems: 'center', fontSize: '30px', fontFamily: 'Hammersmith One, sans- serif' }}>Total Price Rp. {this.state.value * this.state.newPrice},- </div>
                        </MDBCol>
                        {
                            this.props.status === 'verified'
                                ?
                                <MDBCol sm="2">
                                    <div className='d-flex justify-content-center' style={{ backgroundColor: '#192b3c', height: '10vh', color: 'white', alignItems: 'center', fontSize: '20px', fontFamily: 'Hammersmith One, sans- serif', cursor: 'pointer' }} onClick={this.addToCart}>ADD TO CART </div>
                                </MDBCol>
                                :
                                <MDBCol sm="2">
                                    <Link to='unverified'>
                                        <div className='d-flex justify-content-center' style={{ backgroundColor: '#192b3c', height: '10vh', color: 'white', alignItems: 'center', fontSize: '20px', fontFamily: 'Hammersmith One, sans- serif', cursor: 'pointer' }}>ADD TO CART </div>
                                    </Link>
                                </MDBCol>
                        }
                    </MDBRow>
                </MDBJumbotron>
            </MDBContainer >
        )
    }

    render() {
        return (
            <div>
                <NavbarUser />
                <br />
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