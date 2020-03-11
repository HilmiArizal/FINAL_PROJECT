import React, { Component } from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { connect } from 'react-redux';

class CartNotif extends Component {
    state = {
        valueCart: [],
        defaultvalue: 0
    }

    componentDidMount() {
        this.getValueCart()
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
                <div key={index}>
                    {item.valuecart}
                </div>
            )
        })
    }

    render() {
        return (
            <div style={{ width: '120%', marginRight: 50, cursor:'pointer' }}>
                <div className="row">
                    <ShoppingCartOutlinedIcon fontSize='large' style={{ color: 'black' }} />
                    {
                        this.props.id
                            ?
                            <div style={{ backgroundColor: "#404040", color: 'white', borderRadius: '100px', fontSize: '20px', width: "35%", height: "35px", textAlign: "center", padding: "2%" }}>
                                {this.renderValueCart()}
                            </div>
                            :
                            <div style={{ backgroundColor: "#404040", color: 'white', borderRadius: '100px', fontSize: '20px', width: "35%", height: "35px", textAlign: "center", padding: "2%" }}>
                            {this.state.defaultvalue}
                        </div>
                    }
                </div>
            </div>

        );
    }
}

const mapStatetoProps = (state) => {
    return{
        id: state.user.id
    }
}

export default connect(mapStatetoProps)(CartNotif)