import React, { Component } from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact'
import { Link } from 'react-router-dom';

class CartNotif extends Component {
    state = {
        valueCart: [],
        cartDropdown: [],
        defaultvalue: 0
    }

    componentDidMount() {
        this.getValueCart()
        this.getCart()
    }

    getCart = () => {
        const token = localStorage.getItem('token')
        console.log('token', token)
        Axios.get(API_URL_1 + `carts/getCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ cartDropdown: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getValueCart = () => {
        const token = localStorage.getItem('token')
        Axios.get(API_URL_1 + `carts/getValueCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ valueCart: res.data })
                // console.log('ini', res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderValueCart = () => {
        return this.state.valueCart.map((item, index) => {
            return (
                <div key={index} style={{ paddingTop: 1 }}>
                    {item.valuecart}
                </div>
            )
        })
    }

    renderDropdownCart = () => {
        return this.state.cartDropdown.map((item, index) => {
            return (
                <div className="row" >

                    <div className="col-4"><div style={{ margin: 10 }}><img src={API_URL_1 + item.imagePath} alt="img" style={{ width: 80, height: 80 }} /> </div></div>
                    <div className="col-8">
                        <div style={{ marginLeft: 18, fontSize: 13 }}>{item.productname.toUpperCase()}</div>
                        <div className="row" style={{ marginLeft: 4, fontSize: 12 }}><div className="col-4">Berat</div><div className="col-8">: {item.size}gr</div></div>
                        <div className="row" style={{ marginLeft: 4, fontSize: 12 }}><div className="col-4">Price</div><div className="col-8">: {item.price.toLocaleString()}</div></div>
                        <div className="row" style={{ marginLeft: 4, fontSize: 12 }}><div className="col-4">Qty</div><div className="col-8">: {item.qty.toLocaleString()}</div></div>
                        <div className="row" style={{ marginLeft: 4, fontSize: 12 }}><div className="col-4">Total</div><div className="col-8">: {item.totalprice.toLocaleString()}</div></div>
                    </div>
                    <div style={{ border: '2px solid black', width: 230, margin: '10px 0px 10px 20px' }}></div>
                </div>
            )
        })
    }

    render() {
        return (
            <div style={{ width: '120%', cursor: 'pointer' }}>
                <div className="dropdown show-on-hover">
                    <div className=" dropdownCustom" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: 100 }}>
                        <div className="row">
                            <ShoppingCartOutlinedIcon fontSize='large' style={{ color: 'black' }} />
                            {
                                this.props.id
                                    ?
                                    <div style={{ backgroundColor: "#404040", color: 'white', borderRadius: 100, fontSize: 20, width: "40%", height: "20%", textAlign: "center", padding: "3%" }}>
                                        {this.renderValueCart()}
                                    </div>
                                    :
                                    <div style={{ backgroundColor: "#404040", color: 'white', borderRadius: 100, fontSize: 20, width: "40%", height: "20%", textAlign: "center", padding: "3%" }}>
                                        {this.state.defaultvalue}
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="dropdown-menu" style={{ width: '200%' }}>
                        {this.renderDropdownCart()}
                        {
                            this.state.cartDropdown.length > 0
                                ?
                                <div className="row">
                                    <div className="col-4">
                                        <Link to="cart">
                                            <MDBBtn color="elegant" size="sm">DETAIL</MDBBtn>
                                        </Link>
                                    </div>
                                    <div className="col-8" >
                                        <Link to="transaction" style={{ marginLeft: 8 }}>
                                            <MDBBtn color="elegant" size="sm">CHECKOUT</MDBBtn>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <center>
                                    <Link to="product">
                                        <div className="col-7"><MDBBtn color="elegant" size="sm">SHOPNOW</MDBBtn></div>
                                    </Link>
                                </center>
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id
    }
}

export default connect(mapStatetoProps)(CartNotif)