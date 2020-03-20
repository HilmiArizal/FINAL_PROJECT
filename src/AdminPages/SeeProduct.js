import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


class SeeProduct extends Component {
    state = {
        product: []
    }

    componentDidMount() {
        this.getProducts()
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

    renderGetProduct = () => {
        return this.state.product.map((item, index) => {
            return (
                <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>{item.category}</td>
                    <td>{item.size}gr</td>
                    <td><div style={{width:100}}>Rp. {item.price}</div></td>
                    <td>{item.jumlahstock}</td>
                    <td style={{fontSize:'13px'}}>{item.description}</td>
                    <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
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
                            ALL PRODUCT SARENONE
                        </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        <MDBContainer>
                            <MDBTable bordered >
                                <MDBTableHead style={{ fontFamily: 'Hammersmith One, sans-serif', backgroundColor: '#192b3c', color: 'white' }}>
                                    <tr style={{fontSize:'10px', textAlign:'center'}}>
                                        <th>NO. </th>
                                        <th>PRODUCT</th>
                                        <th>CATEGORY</th>
                                        <th>WEIGHT</th>
                                        <th>PRICE</th>
                                        <th>STOCK</th>
                                        <th>DESCRIPTION</th>
                                        <th>IMAGE</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ fontFamily: 'Hammersmith One, sans-serif'}}>
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