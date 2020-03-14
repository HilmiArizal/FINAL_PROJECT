import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBBtn } from 'mdbreact';
import NavbarUser from '../Component/NavbarUser';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Cart extends Component {
    state = {
        cart: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        // console.log(token)
        Axios.get(API_URL_1 + `carts/getCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ cart: res.data })
                // console.table('ini', res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    onBtnDelete = async (id) => {
        try {
            if (window.confirm(`ARE YOU SURE FOR DELETE?`)) {
                await Axios.delete(API_URL_1 + `carts/deleteCart?id=${id}`)
                alert('Delete Successful')
                window.location.reload()
            }
        } catch (err) {
            // console.log(err)
        }
    }

    renderGetCart = () => {
        return this.state.cart.map((item, index) => {
            return (
                <tr key={index} style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <td><div className="d-flex justify-content-center" >{index + 1}</div></td>
                    <td>
                        <div className="d-flex justify-content-center">
                            {item.productname}
                        </div>
                    </td>
                    <td><div className="d-flex justify-content-center">{item.size}gr</div></td>
                    <td><div className="d-flex justify-content-center">Rp. {item.price},-</div></td>
                    <td><div className="d-flex justify-content-center">{item.qty}</div></td>
                    <td><div className="d-flex justify-content-center">{item.totalprice}</div></td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <div className="row">
                                <div className="col-6">
                                    <Link to="product">
                                        <div style={{ margin: "0 30px 0 10px" }}><AddShoppingCartIcon /></div>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <div style={{ margin: "0 10px 0 10px", cursor: 'pointer' }} onClick={() => this.onBtnDelete(item.id)}><DeleteIcon /></div>
                                </div>
                            </div>
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
                <center>
                    <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                        YOUR CART
                    </div>
                </center>
                <MDBContainer>
                    <MDBTable bordered>
                        <MDBTableHead style={{ backgroundColor: "#404040", color: 'white', fontFamily: 'Hammersmith One, sans-serif' }}>
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
                    <div className="d-flex justify-content-end">
                        {
                            this.state.cart.length > 0
                                ?
                                <Link to="transaction">
                                    <MDBBtn color="elegant">CHECK OUT</MDBBtn>
                                </Link>
                                :
                                <Link to="product">
                                    <MDBBtn color="elegant">SHOP NOW</MDBBtn>
                                </Link>
                        }
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id
    }
}

export default connect(mapStatetoProps)(Cart);