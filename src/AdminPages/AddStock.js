import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';

class AddStock extends Component {
    state = {
        tableStock: [],
        size: [],
        price: []
    }

    componentDidMount() {
        this.getTableStock()
        this.getSize()
        this.getPrice()
    }

    getTableStock = () => {
        Axios.get(API_URL_1 + `products/getTableStock`)
            .then((res) => {
                this.setState({ tableStock: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getSize = () => {
        Axios.get(API_URL_1 + `products/getAllSize`)
            .then((res) => {
                this.setState({ size: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getPrice = () => {
        Axios.get(API_URL_1 + `products/getAllPrice`)
            .then((res) => {
                this.setState({ price: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderTableStock = () => {
        return this.state.tableStock.map((item, index) => {
            return (
                <div key={index}>
                    {item.productname}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            ADD STOCK SARENONE
                    </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        {this.renderTableStock()}
                    </center>
                </main>
            </div>
        );
    }
}

export default AddStock;