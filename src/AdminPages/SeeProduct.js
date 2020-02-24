import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


class SeeProduct extends Component {
    state = {
        product: [],
        category: []
    }

    componentDidMount() {
        this.getProducts()
        this.getCategory()
    }

    getProducts = () => {
        Axios.get(API_URL_1 + `products/getAllProducts`)
            .then((res) => {
                this.setState({ product: res.data })
                // console.log(res)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getCategory = () => {
        Axios.get(API_URL_1 + `categories/getProductCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                // console.log(res)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetCategory = () => {
        return this.state.category.map((val, index) => {
            return (
                <div>
                    {val.category}
                </div>
            )
        })
    }

    renderGetProduct = () => {
        return this.state.product.map((item, index) => {
            return (
                <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>{item.category}</td>
                    <td>{item.size} gr</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.description}</td>
                    <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
                </tr>
            )
        })
    }

    render() {
        console.table(this.state.category)
        console.table(this.state.product)
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            ALL PRODUCT
                        </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        <MDBContainer>
                            <MDBTable bordered >
                                <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: 'black', color: 'white' }}>
                                    <tr className="text-center font-weight-bold text-uppercase">
                                        <th>No. </th>
                                        <th>Product Name</th>
                                        <th>Product Category</th>
                                        <th>Product Size</th>
                                        <th>Product Price</th>
                                        <th>Product About</th>
                                        <th>Product Image</th>
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

export default SeeProduct;