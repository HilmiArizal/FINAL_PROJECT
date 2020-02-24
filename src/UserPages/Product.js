import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBRow, MDBCol, MDBCardBody, MDBContainer, MDBNavLink } from 'mdbreact'
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css'

class Product extends Component {
    state = {
        product: [],
        category: [],
        idCat: 0
    }

    componentDidMount() {
        this.getListProducts()
        this.getListCategory()
    }

    getListProducts = () => {
        Axios.get(API_URL_1 + `products/getProducts`)
            .then((res) => {
                this.setState({ product: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getListCategory = () => {
        Axios.get(API_URL_1 + `categories/getAllCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderCategory = () => {
        return this.state.category.map((item, index) => {
            return (
                <div key={index}>
                    <div className="s-sidebar__nav-link" onClick={() => this.setState({ idCat: item.id })} style={{ cursor: 'pointer' }}>
                        <div className="text-Center">
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
            if (this.state.idCat === item.idcategory) {
                return (
                    <MDBCol md="4" key={index}>
                        <MDBNavLink to={`/productdetail?id=${item.id}`}>
                            <center>
                                <img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' />
                                <MDBCardBody>
                                    <div style={{ fontFamily: 'Hammersmith One, sans-serif', color: 'black' }}>{item.productname.toUpperCase()}</div>
                                </MDBCardBody>
                            </center>
                        </MDBNavLink>
                    </MDBCol>
                )
            } else if (this.state.idCat === 0) {
                return (
                    <MDBCol md="4" key={index}>
                        <MDBNavLink to={`productdetail?id=${item.id}`}>
                            <center>
                                <img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' />
                                <MDBCardBody>
                                    <div style={{ fontFamily: 'Hammersmith One, sans-serif', color: 'black' }}>{item.productname.toUpperCase()}</div>
                                </MDBCardBody>
                            </center>
                        </MDBNavLink>
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
        // console.log(this.state.idCategory)
        return (
            <div>
                <NavbarUser />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="4">
                            <div style={{ backgroundColor: ' #192b3c', height: '80vh', borderRadius: '20px' }}>
                                <div style={{ backgroundColor: ' #192b3c', color: ' #192b3c', padding: '10%' }}>
                                    TEST
                                </div>
                                <center>
                                    <div style={{ padding: '5%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '150%', backgroundColor: 'white', borderRadius: '20px' }}>CHOOSE BY CATEGORY</div>
                                </center>
                                <div>
                                    <a className="s-sidebar__nav-link" href="product">
                                        <div className="text-Center">
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
            </div>
        );
    }
}

export default Product;