import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import NavbarUser from '../Component/NavbarUser';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

class DetailProduct extends Component {
    state = {
        product: [],
        size: [],
        price: [],
        idSiz: 0
    }

    componentDidMount() {
        this.getIdProduct()
        this.getSizeProduct()
    }

    getIdProduct = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getProduct?id=${takeId}`)
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
        Axios.get(API_URL_1 + `products/getProduct?id=${takeId}`)
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
            return (
                <MDBBtn key={index} color='primary' onClick={() => this.setState({ idSiz: item.idprice })} style={{ cursor: 'pointer' }}>
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
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    renderProducts = () => {
        const { product } = this.state;
        return (
            <MDBContainer className="mt-5 text-center" style={{ fontFamily: 'Segoe UI Symbol' }}>
                <MDBRow>
                    <MDBCol>
                        <MDBJumbotron className="p-0">
                            <center>
                                <MDBCardImage
                                    className="img-fluid"
                                    src={API_URL_1 + product.imagePath}
                                    alt='ImgProduct'
                                    width='20%'
                                    style={{ marginTop: '20px' }}
                                />
                            </center>
                            <MDBCardBody>
                                <MDBCardTitle className="h3">{product.productname}</MDBCardTitle>
                                {this.renderGetPrice()}
                                <br />
                                <MDBCardText>
                                    <h6>
                                        Product Description:
                                    <br />
                                        <br />
                                        {product.description}
                                    </h6>
                                </MDBCardText>
                                <div style={{ fontSize: '10px' }}>*Pilih size untuk melihat harga</div>
                                <br />
                                {this.renderGetSize()}
                            </MDBCardBody>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    render() {
        console.log(this.state.product)
        return (
            <div>
                <NavbarUser />
                {this.renderProducts()}
            </div>
        );
    }
}

export default DetailProduct;