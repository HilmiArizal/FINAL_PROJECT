import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import NavbarUser from '../Component/NavbarUser';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";
import '../CSSAdmin/InputNumber.css';

class DetailProduct extends Component {
    state = {
        product: [],
        size: [],
        price: [],
        idSize: 0,
        value: 1,
        newPrice: 0,
        showPrice: false
    }

    componentDidMount() {
        this.getIdProduct()
        this.getSizeProduct()
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

    renderGetSize = () => {
        return this.state.size.map((item, index) => {
            // console.log(this.state.newPrice)
            return (
                <MDBBtn color="elegant" key={index} size='sm' onClick={() => this.setState({ idSiz: item.idprice, newPrice: item.price, showPrice: true })} style={{ cursor: 'pointer' }}>
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
        const { product } = this.state;
        return (
            <MDBContainer className="mt-5 " style={{ fontFamily: 'Segoe UI Symbol' }}>
                <MDBJumbotron className="p-0" style={{ height: "66vh" }}>
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
                            <div className='d-flex' style={{ paddingLeft: '5%', backgroundColor: '#192b3c', height: '10vh', color: 'white', alignItems: 'center', fontSize: '30px', fontFamily: 'Hammersmith One, sans- serif' }}>Total Price Rp. {this.state.value * this.state.newPrice},- </div>
                        </MDBCol>
                        <MDBCol sm="2">
                            <div className='d-flex justify-content-center' style={{ backgroundColor: '#192b3c', height: '10vh', color: 'white', alignItems: 'center', fontSize: '20px', fontFamily: 'Hammersmith One, sans- serif', cursor: 'pointer' }}>ADD TO CART </div>
                        </MDBCol>
                    </MDBRow>
                </MDBJumbotron>
            </MDBContainer >
        )
    }

    render() {
        return (
            <div>
                <NavbarUser />
                {this.renderProducts()}
            </div>
        );
    }
}

export default DetailProduct;