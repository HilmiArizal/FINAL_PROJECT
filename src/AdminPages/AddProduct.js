import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBInput, MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBCol, MDBRow, MDBJumbotron } from 'mdbreact';
import '../CSSAdmin/InputNumber.css';
import noproduct from '../Image/noproduct.png';



class AddProduct extends Component {
    state = {
        product: [],
        category: [],
        size: [],
        price: [],
        stock: [],

        addCategory: 0,
        addSize: 0,
        addSizeName: '',
        addPrice: 0,
        addPriceName: '',
        stockName: [],

        modal14: false,
        value: 0,

        addImageFile: undefined,
        previewImage: undefined,
        changeImage: false
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
                // console.log(res.data)
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
        this.setState({ addSizeName: e.target[e.target.selectedIndex].text })
    }

    onChangeSelectPrice = (e) => {
        this.setState({ addPrice: e.target.value })
        this.setState({ addPriceName: e.target[e.target.selectedIndex].text })
        // console.log(e.target[e.target.selectedIndex].text)
    }

    btnSaveAddStock = () => {
        var size = this.state.addSize
        var price = this.state.addPrice;
        var jumlahstock = this.state.value
        var sizeName = this.state.addSizeName;
        var priceName = this.state.addPriceName;
        if (size && price && jumlahstock) {
            this.state.stock.push([parseInt(size), parseInt(price), jumlahstock])
            this.state.stockName.push([sizeName, priceName, jumlahstock])
            alert('Stock ditambahkan')
        } else {
            alert('Isi dgn benar!')
            this.setState({ modal14: !this.state.modal14 })

        }
        // console.log(this.state.stock)
        // window.location.reload()
    }

    addImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                addImageFile: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                changeImage: true
            })
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
                        window.location.reload()
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
            <MDBContainer>
                <MDBJumbotron>
                    <div className="row">
                        <div className="col-6">
                            <MDBInput label="Product Name" inputRef={(productName) => this.productName = productName} />
                        </div>
                        <div className="col-6" style={{ marginTop: 27 }}>
                            <select className="form-control" onChange={this.onChangeSelectCategory}>
                                <option value={this.state.addCategory}>Pilih Category</option>
                                {this.renderListCategory()}
                            </select>
                        </div>
                    </div>
                    <div style={{ fontFamily: 'arial' }}>
                        {this.state.stockName.join(' || ')}
                    </div>
                    <MDBContainer>
                        <MDBBtn color="elegant" size="sm" onClick={this.toggle(14)}>ADD STOCK</MDBBtn>
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
                                <button onClick={this.btnSaveAddStock}>Keep in stock</button>
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
                    {
                        this.state.previewImage
                            ?
                            <div className='d-flex justify-content-center'>
                                <img className='EDP-Preview-Image' src={this.state.previewImage} alt="profile" style={{ height: 100, width: 150 }} />
                            </div>
                            :
                            <div className='d-flex justify-content-center'>
                                <img className='EDP-Preview-Image' src={noproduct} alt="profile" style={{ height: 100, width: 150 }} />
                            </div>
                    }
                    <div className='d-flex justify-content-center' style={{ margin: 20 }} >
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <input type='file' onChange={this.addImage} />
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                    <center>
                        <div> <MDBBtn size="md" color="elegant" onClick={this.uploadProduct}>Save changes</MDBBtn></div>
                    </center>
                </MDBJumbotron>
            </MDBContainer>
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
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            ADD PRODUCT SARENONE
                        </div>
                    </center>
                </main>
                <main className="s-layout__content" style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <center>
                        {this.renderInputProduct()}
                    </center>
                </main>
            </div>
        );
    }
}

export default AddProduct