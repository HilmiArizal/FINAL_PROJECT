import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBInput, MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBCol, MDBRow, MDBJumbotron } from 'mdbreact';
import '../CSSAdmin/InputNumber.css';
import noproduct from '../Image/noproduct.png';
import { Redirect } from 'react-router-dom';



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
        redirectProduct: false,

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
                // console.log(res.data)
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
        var jumlahstock = this.refs.quantity.value;
        var sizeName = this.state.addSizeName;
        var priceName = this.state.addPriceName;
        if (size && price && jumlahstock) {
            this.state.stock.push([parseInt(size), parseInt(price), parseInt(jumlahstock)])
            this.state.stockName.push([`size: ${sizeName}, price: ${priceName}, stock: ${jumlahstock}`])
            alert('Stock ditambahkan')
        } else {
            alert('Isi dgn benar!')
        }
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
                        await Axios.post(API_URL_1 + `products/AddProducts`, formData)
                        // console.log(res.data)
                        alert('Produk sudah ditambahkan silahkan cek')
                        this.setState({ redirectProduct: true })
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
            <MDBJumbotron>
                <div className="row">
                    <div className="col-6">
                        <MDBInput label="Nama Produk" inputRef={(productName) => this.productName = productName} />
                    </div>
                    <div className="col-6" style={{ marginTop: 27 }}>
                        <select className="form-control" onChange={this.onChangeSelectCategory}>
                            <option value={this.state.addCategory} value="none" selected disabled hidden>Pilih Kategori</option>
                            {this.renderListCategory()}
                        </select>
                    </div>
                </div>
                <div style={{ fontFamily: 'arial', textAlign: "center" }}>
                    {this.state.stockName.join(' || ')}
                </div>
                <MDBContainer>
                    <center>
                        <MDBBtn color="elegant" size="sm" onClick={this.toggle(14)}>TAMBAH STOCK</MDBBtn>
                    </center>
                    <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                        <MDBModalHeader toggle={this.toggle(14)}></MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol md="6">
                                    <select className="form-control" onChange={this.onChangeSelectSize}>
                                        <option value={this.state.addSize} value="none" selected disabled hidden>Pilih Berat</option>
                                        {this.renderListSize()}
                                    </select>
                                </MDBCol>
                                <MDBCol md="6">
                                    <select className="form-control" onChange={this.onChangeSelectPrice}>
                                        <option value={this.state.addPrice} value="none" selected disabled hidden>Pilih Harga</option>
                                        {this.renderListPrice()}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <br />
                            <center>
                                <h4>JUMLAH STOCK</h4>
                                <center>
                                    <input className="form-control" ref="quantity" type="number" style={{ width: 100 }} />
                                </center>
                                <br />
                                <button className="form-control" onClick={this.btnSaveAddStock} style={{ width: 200, backgroundColor: '#404040', color: "white" }}>Simpan Stock</button>
                            </center>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
                <br />
                {
                    this.state.previewImage
                        ?
                        <div className='d-flex justify-content-center'>
                            <img className='EDP-Preview-Image' src={this.state.previewImage} alt="profile" width='30%' />
                        </div>
                        :
                        <div className='d-flex justify-content-center'>
                            <img className='EDP-Preview-Image' src={noproduct} alt="profile" width='30%' />
                        </div>
                }
                <MDBContainer>
                    <div className='d-flex justify-content-center' style={{ margin: 20 }} >
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <center>
                                    <input type='file' onChange={this.addImage} />
                                </center>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </MDBContainer>
                <div className="form-group">
                    <center>
                        <label htmlFor="exampleFormControlTextarea1">
                            Deskripsi Produk
                        </label>
                    </center>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        ref="productDescription"
                        style={{ fontSize: 13 }}
                    />
                </div>
                <center>
                    <div> <MDBBtn size="md" color="elegant" onClick={this.uploadProduct}>save</MDBBtn></div>
                </center>
            </MDBJumbotron>
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
        if (this.state.redirectProduct) {
            return (
                <Redirect to="/seeproduct">

                </Redirect>
            )
        }
        return (
            <div style={{ marginTop: 50 }}>
                <MDBContainer>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10">
                            {this.renderInputProduct()}
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default AddProduct