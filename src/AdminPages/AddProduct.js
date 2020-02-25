import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBInput, MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBCol, MDBRow } from 'mdbreact';
import '../CSSAdmin/InputNumber.css';


class AddProduct extends Component {
    state = {
        product: [],
        category: [],
        size: [],
        price: [],
        stock: [],
        addCategory: 0,
        addImageFile: undefined,
        addSize: 0,
        addPrice: 0,
        modal14: false,
        value: 0
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    decrease = () => {
        this.setState({ value: this.state.value - 1 });
    }

    increase = () => {
        this.setState({ value: this.state.value + 1 });
    }

    componentDidMount() {
        this.getProducts()
        this.getSize()
        this.getPrice()
        this.getCategory()
    }

    getProducts = () => {
        Axios.get(API_URL_1 + `products/getProducts`)
            .then((res) => {
                this.setState({ product: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getCategory = () => {
        Axios.get(API_URL_1 + `products/getCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getSize = () => {
        Axios.get(API_URL_1 + `products/getSize`)
            .then((res) => {
                this.setState({ size: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getPrice = () => {
        Axios.get(API_URL_1 + `products/getPrice`)
            .then((res) => {
                this.setState({ price: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    onChangeSelectCategory = (e) => {
        this.setState({ addCategory: e.target.value })
    }

    onChangeSelectSize = (e) => {
        this.setState({ addSize: e.target.value })
    }

    onChangeSelectPrice = (e) => {
        this.setState({ addPrice: e.target.value })
    }

    btnSaveAddStock = () => {
        var size = this.state.addSize
        var price = this.state.addPrice;
        var jumlahstock = this.state.value
        this.state.stock.push([parseInt(size), parseInt(price), jumlahstock])
        console.log(this.state.stock)
    }

    btnUploadImageProduct = (e) => {
        console.log(e.target.files[0])
        if (e.target.files) {
            this.setState({ addImageFile: e.target.files[0] })
        } else {
            this.setState({ addImageFile: undefined })
        }
    }

    uploadProduct = async () => {
        try {
            const { addImageFile } = this.state;
            // console.log(addImageFile)
            if (addImageFile) {
                var formData = new FormData()
                var productname = this.productName.value;
                var productcategoryId = this.state.addCategory;
                var description = this.refs.productDescription.value;
                var jumlahstock = this.state.stock
                var dataproduct = {
                    productname,
                    productcategoryId: parseInt(productcategoryId),
                    description
                }
                var data = {
                    dataproduct,
                    jumlahstock
                }
                if (productname && productcategoryId && description && jumlahstock && addImageFile) {
                    formData.append('data', JSON.stringify(data))
                    formData.append('image', addImageFile)
                    console.log(formData)
                    if (window.confirm(`Anda yakin ingin menambahkan produk?`)) {
                        let res = await Axios.post(API_URL_1 + `products/AddProducts`, formData)
                        console.log(res.data)
                        alert('Produk sudah ditambahkan silahkan cek')
                    }
                } else {
                    alert('Please, isi dengan lengkap!')
                }
            } else {
                alert('Please, isi gambarnya!')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    renderInputProduct = () => {
        return (
            <div style={{ border: '1px solid black', backgroundColor: 'white', borderRadius: '20px', padding: '5%' }}>
                <MDBContainer>
                    <MDBInput label="Product Name" inputRef={(productName) => this.productName = productName} />
                </MDBContainer>
                <select className="form-control" onChange={this.onChangeSelectCategory}>
                    <option value={this.state.addCategory}>Pilih Category</option>
                    {this.renderListCategory()}
                </select>
                <br />
                <MDBContainer>
                    <MDBBtn color="success" onClick={this.toggle(14)}>ADD STOCK</MDBBtn>
                    <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                        <MDBModalHeader toggle={this.toggle(14)}></MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol md="6">
                                    <select className="form-control" onChange={this.onChangeSelectSize}>
                                        <option value={this.state.addSize}>Pilih Size</option>
                                        {this.renderListSize()}
                                    </select>
                                </MDBCol>
                                <MDBCol md="6">
                                    <select className="form-control" onChange={this.onChangeSelectPrice}>
                                        <option value={this.state.addPrice}>Pilih Price</option>
                                        {this.renderListPrice()}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            <br />
                            <h4>JUMLAH STOCK</h4>
                            <div className="def-number-input number-input">
                                <center>
                                    <button onClick={this.decrease} className="minus"></button>
                                    <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
                                        type="number" />
                                    <button onClick={this.increase} className="plus"></button>
                                </center>
                            </div>
                            <button onClick={this.btnSaveAddStock}>Save</button>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        ref="productDescription"
                    />
                </div>
                <div><input accept='image/*' onChange={this.btnUploadImageProduct} type='file' /></div>
                <br />
                <center>
                    <div> <MDBBtn color="primary" onClick={this.uploadProduct}>Save changes</MDBBtn></div>
                </center>
            </div>
        )
    }

    renderListCategory = () => {
        return this.state.category.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    {item.category}
                </option>
            )
        })
    }


    renderListSize = () => {
        return this.state.size.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    {item.size} gr
                </option>
            )
        })
    }

    renderListPrice = () => {
        return this.state.price.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    Rp. {item.price.toLocaleString()}
                </option>
            )
        })
    }

    render() {
        console.table(this.state.size)
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            ADD PRODUCT SARENONE
                        </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        {this.renderInputProduct()}
                    </center>
                </main>
            </div>
        );
    }
}

export default AddProduct