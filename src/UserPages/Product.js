import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBRow, MDBCol, MDBCardBody, MDBContainer, MDBCard } from 'mdbreact'
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css'
import Footer from '../Component/Footer';

class Product extends Component {
    state = {
        product: [],
        category: [],
        idCategory: 0
    }

    componentDidMount() {
        this.getListProducts()
        this.getListCategory()
    }

    getListProducts = () => {
        Axios.get(API_URL_1 + `products/getProduct`)
            .then((res) => {
                this.setState({ product: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getListCategory = () => {
        Axios.get(API_URL_1 + `products/getCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderCategory = () => {
        return this.state.category.map((item, index) => {
            return (
                <div key={index}>
                    <div className="s-sidebar__nav-link" onClick={() => this.setState({ idCategory: item.id })} style={{ cursor: 'pointer' }}>
                        <div className="text-Center" style={{ fontSize: 20, margin: 15 }}>
                            <center>
                                {item.category}
                            </center>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderProduct = () => {
        return this.state.product.map((item, index) => {
            if (this.state.idCategory === item.productcategoryId) {
                return (
                    <MDBCol md="4">
                        <MDBCard style={{ width: "12rem", margin: 10 }}>
                            <a href={`/productdetail?id=${item.id}`}>
                                <center>
                                    <img src={API_URL_1 + item.imagePath} alt='ImgProduct' style={{ width: 180, marginTop: 5 }} />
                                    <MDBCardBody>
                                        <div style={{ fontFamily: 'Hammersmith One, sans-serif', color: 'black' }}>{item.productname.toUpperCase()}</div>
                                    </MDBCardBody>
                                </center>
                            </a>
                        </MDBCard>
                    </MDBCol>
                )
            } else if (this.state.idCategory === 0) {
                return (
                    <MDBCol md="4" key={index}>
                        <MDBCard style={{ width: "12rem", margin: 10 }}>
                            <a href={`productdetail?id=${item.id}`}>
                                <center>
                                    <img src={API_URL_1 + item.imagePath} alt='ImgProduct' style={{ width: 180, marginTop: 5 }} />
                                    <MDBCardBody>
                                        <div style={{ fontFamily: 'Hammersmith One, sans-serif', color: 'black' }}>{item.productname.toUpperCase()}</div>
                                    </MDBCardBody>
                                </center>
                            </a>
                        </MDBCard>
                    </MDBCol>
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
                <NavbarUser />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="4">
                            <div style={{ backgroundColor: '#404040', minHeight: '80vh', borderRadius: '20px' }}>
                                <div style={{ backgroundColor: '#404040', color: '#404040', padding: '10%' }}>
                                    TEST
                                </div>
                                <center>
                                    <div style={{ padding: '5%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '150%', backgroundColor: 'white', borderRadius: '20px' }}>CHOOSE BY CATEGORY</div>
                                </center>
                                <div>
                                    <a className="s-sidebar__nav-link" href="product">
                                        <div className="text-Center" style={{ fontSize: 20, margin: 15 }}>
                                            <center>
                                                ALL PRODUCT
                                            </center>
                                        </div>
                                    </a>
                                </div>
                                {this.renderCategory()}
                            </div>
                        </MDBCol>
                        <MDBCol size="8">
                            <center>
                                <div style={{ margin: '3%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '200%' }}> --SARENONE PRODUCT-- </div>
                            </center>
                            <MDBRow>
                                {this.renderProduct()}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div style={{ marginTop: 50 }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Product;