import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


class SeeProduct extends Component {
    state = {
        product: [],
        groupByCategory: [],
        getCategory: 0
    }

    componentDidMount() {
        this.getProducts()
        this.getGroupByCategory()
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

    getGroupByCategory = () => {
        Axios.get(API_URL_1 + `products/getGroupByCategory`)
            .then((res) => {
                this.setState({ groupByCategory: res.data })
                // console.log(res)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetProduct = () => {
        return this.state.product.map((item, index) => {
            if (this.state.getCategory === item.category) {
                return (
                    <tr key={index} className="text-center">
                        <td>{item.productname}</td>
                        <td>{item.category}</td>
                        <td>{item.size}gr</td>
                        <td><div style={{ width: 100 }}>Rp. {item.price}</div></td>
                        <td>{item.jumlahstock}</td>
                        <td><div style={{width:400, fontSize: 12}}>{item.description}</div></td>
                        <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
                    </tr>
                )
            }else if (this.state.getCategory === 0) {
                return (
                    <tr key={index} className="text-center">
                        <td>{item.productname}</td>
                        <td>{item.category}</td>
                        <td>{item.size}gr</td>
                        <td><div style={{ width: 100 }}>Rp. {item.price}</div></td>
                        <td>{item.jumlahstock}</td>
                        <td><div style={{width:400, fontSize:12}}>{item.description}</div></td>
                        <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
                    </tr>
                )
            }else{
                return(
                    <div></div>
                )
            }
        })
    }

    renderSelectCategory = () => {
        return this.state.groupByCategory.map((item, index) => {
            return (
                <option>
                    {item.category}
                </option>
            )
        })
    }

    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            ALL PRODUCT SARENONE
                        </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        <MDBContainer>
                            <div>LIHAT BERDASARKAN CATEGORY</div>
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <select className="form-control" onChange={(e) => this.setState({ getCategory: e.target.value })} style={{ fontSize: 15 }}>
                                        {this.renderSelectCategory()}
                                    </select>
                                </div>
                                <div className="col-4"></div>
                            </div>
                            <MDBTable bordered style={{ marginTop: 50 }}>
                                <MDBTableHead style={{ fontFamily: 'Hammersmith One, sans-serif', backgroundColor: '#192b3c', color: 'white' }}>
                                    <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                        <th>PRODUCT</th>
                                        <th>CATEGORY</th>
                                        <th>WEIGHT</th>
                                        <th>PRICE</th>
                                        <th>STOCK</th>
                                        <th>DESCRIPTION</th>
                                        <th>IMAGE</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
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