import React, { Component } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL'
import { MDBBtn, MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';

class EditDelete extends Component {
    state = {
        product: [],
        category: [],
        size: [],
        price: [],
        stock: [],
        editProduct: 0,
        editCategory: 0,
        editSize: [],
        editPrice: [],
        addImageFile: undefined,
        selectID: 0,
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
        this.getProduct()
        this.getSize()
        this.getPrice()
    }

    getProduct = () => {
        Axios.get(API_URL_1 + `products/getProduct`)
            .then((res) => {
                this.setState({ product: res.data })
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

    btnUploadImageProduct = (e) => {
        console.log(e.target.files[0])
        if (e.target.files) {
            this.setState({ addImageFile: e.target.files[0] })
        } else {
            this.setState({ addImageFile: undefined })
        }
    }

    btnDeleteProduct = async (id, imagePath) => {
        try {
            if (window.confirm('ARE YOU SURE TO DELETE ?')) {
                await Axios.delete(API_URL_1 + `products/DeleteProducts?id=${id}&imagePath=${imagePath}`)
                window.location.reload()
                alert('Delete Successful!')
            }
        }
        catch (err) {
            // console.log(err)
        }
    }

    btnEditProduct = (id) => {
        this.setState({ selectID: id })
    }

    btnConfirmEdit = async () => {
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
        return this.state.product.map((item, index) => {
            return (
                <tr key={index} className="text-center">
                    <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
                    <td>{item.productname}</td>
                    <td><div>
                        <MDBBtn size="sm" color="elegant" onClick={() => this.btnDeleteProduct(item.id, item.imagePath)}>DELETE</MDBBtn>
                        <Link to={`/editproduct?id=${item.id}`}>
                            <MDBBtn size="sm" color="elegant">EDIT</MDBBtn>
                        </Link>
                    </div>
                    </td>
                </tr>
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
                    <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                        EDIT / DELETE PRODUCT SARENONE
                    </div>
                </main>
                <main className="s-layout__content">
                    <center>
                        <MDBContainer>
                            <MDBTable bordered >
                                <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: '#192b3c', color: 'white' }}>
                                    <tr style={{ fontSize: '10px', textAlign: 'center' }}>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody >
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

export default EditDelete;