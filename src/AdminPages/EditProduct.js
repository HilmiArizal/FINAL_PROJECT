import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class EditProduct extends Component {
    state = {
        product: [],
        category: [],
        size: [],
        price: [],
        stock: [],
        selectID: 0,
        editCategory: 0,
        editSize: 0,
        editPrice: 0,
        editImageFile: undefined
    }

    componentDidMount() {
        this.getIdProduct()
        this.getStockId()
        this.getSize()
        this.getPrice()
        this.getCategory()
    }

    getIdProduct = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getProductId?id=${takeId}`)
            .then((res) => {
                this.setState({ product: res.data[0] })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getStockId = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getStockId/${takeId}`)
            .then((res) => {
                this.setState({ stock: res.data })
            })
            .catch((err) => {
                console.log(err)
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
        this.setState({ editCategory: e.target.value })
    }

    onChangeSelectSize = (e) => {
        // this.setState({ editSize: e.target.value })
        console.log(e.target.value)
    }

    onChangeSelectPrice = (e) => {
        this.setState({ editPrice: e.target.value })
    }

    btnUploadImageProduct = (e) => {
        // console.log(e.target.files[0])
        if (e.target.files) {
            this.setState({ editImageFile: e.target.files[0] })
        } else {
            this.setState({ editImageFile: undefined })
        }
    }

    btnConfirmEdit = async () => {
        try {
            const { editImageFile } = this.state;
            // console.log(addImageFile)
            if (editImageFile) {
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
                if (productname && productcategoryId && description && jumlahstock && editImageFile) {
                    formData.append('data', JSON.stringify(data))
                    formData.append('image', editImageFile)
                    console.log(formData)
                    if (window.confirm(`Anda yakin ingin menambahkan produk?`)) {
                        let res = await Axios.post(API_URL_1 + `products/EditProducts/${this.state.selectID}`, formData)
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

    renderGetProduct = () => {
        const { product } = this.state
        return (
            <div>
                <div><em style={{ fontSize: '10px' }}>Product before edit: </em>{product.productname}<input type="name" className="form-control" placeholder="Edit Product" /></div>
                <br />
                <div><em style={{ fontSize: '10px' }}>Category before edit: </em>{product.category}</div>
                <select className="form-control" onChange={this.onChangeSelectCategory} >
                    <option value={this.state.editCategory}>Edit Category</option>
                    {this.renderListCategory()}
                </select>
                <br />
                {this.renderStock()}
                <br />
                <div><em>Edit Image </em><br /><img src={API_URL_1 + product.imagePath} alt='ImgProduct' width='150px' />
                    <br />
                    <input accept='image/*' onChange={this.btnUploadImageProduct} type='file' style={{ width: '100px' }} /></div>
                <br />
                <div className="form-group">
                    <em>Edit Description</em>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        ref="productDescription"
                        defaultValue={product.description}
                    />
                </div>
            </div>
        )
    }

    renderStock = () => {
        return this.state.stock.map((item, index) => {
            return (
                <div>
                    <MDBRow>
                        <MDBCol sm="6">
                            <div><em style={{ fontSize: '10px' }}>Weight before edit:</em> {item.size}gr</div>
                            <select className="form-control" onChange={this.onChangeSelectSize} >
                                <option value={this.state.editSize}>Edit Weight</option>
                                {this.renderListSize()}
                            </select>
                        </MDBCol>
                        <MDBCol sm="6">
                            <div><em style={{ fontSize: '10px' }}>Price before edit:</em> {item.price},-</div>
                            <select className="form-control" onChange={this.onChangeSelectPrice} >
                                <option value={this.state.editPrice}>Edit Price</option>
                                {this.renderListPrice()}
                            </select>
                        </MDBCol>
                    </MDBRow>
                </div>
            )
        })
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
                    {item.size}gr
                </option>
            )
        })
    }

    renderListPrice = () => {
        return this.state.price.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    Rp. {item.price},-
                </option>
            )
        })
    }

    render() {
        console.table(this.state.stock)
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            EDIT PRODUCT SARENONE
                    </div>
                    </center>
                </main>
                <main className="s-layout__content">
                    <center>
                        {this.renderGetProduct()}
                        <MDBBtn color="elegant" size="sm" onClick={this.btnConfirmEdit}>SUBMIT</MDBBtn>
                    </center>
                </main>
            </div>
        );
    }
}

export default EditProduct;