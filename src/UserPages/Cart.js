import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import NavbarUser from '../Component/NavbarUser';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';


class Cart extends Component {
    state = {
        cart: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        Axios.get(API_URL_1 + `carts/getCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ cart: res.data })
                console.table('ini', res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtnDelete = async (id) => {
        try {
            if(window.confirm(`ARE YOU SURE FOR DELETE?`)){
                await Axios.delete(API_URL_1 + `carts/deleteCart?id=${id}`)
                alert('Delete Successful')
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    renderGetCart = () => {
        return this.state.cart.map((item, index) => {
            return (
                <tr key={index}>
                    <td><div className="d-flex justify-content-center" >{index + 1}</div></td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <img
                                src={API_URL_1 + item.imagePath}
                                alt='ImgProduct'
                                width="50"
                                height="30"
                            />
                        </div>
                    </td>
                    <td><div className="d-flex justify-content-center">{item.size}gr</div></td>
                    <td><div className="d-flex justify-content-center">Rp. {item.price},-</div></td>
                    <td><div className="d-flex justify-content-center">{item.qty}</div></td>
                    <td><div className="d-flex justify-content-center">{item.totalprice}</div></td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <Link to="product">
                                <div style={{ margin: "0 20px 0 10px" }}><AddShoppingCartIcon /></div>
                            </Link>
                            <div style={{ margin: "0 10px 0 10px", cursor: 'pointer' }} onClick={() => this.onBtnDelete(item.id)}><DeleteIcon /></div>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <NavbarUser />
                <div style={{ marginTop: 20 }}>
                    <MDBRow>
                        <MDBCol sm="6">
                            <div className="d-flex justify-content-center" style={{ fontSize: 30 }}> Your Cart </div>
                            <MDBContainer>
                                <MDBTable bordered>
                                    <MDBTableHead style={{ backgroundColor: "#404040", color: 'white' }}>
                                        <tr>
                                            <th><div className="d-flex justify-content-center">No</div></th>
                                            <th><div className="d-flex justify-content-center">Product</div></th>
                                            <th><div className="d-flex justify-content-center">Weight</div></th>
                                            <th><div className="d-flex justify-content-center">Price</div></th>
                                            <th><div className="d-flex justify-content-center">Quantity</div></th>
                                            <th><div className="d-flex justify-content-center">Total Price</div></th>
                                            <th><div className="d-flex justify-content-center"></div></th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.renderGetCart()}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBContainer>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}

export default Cart;