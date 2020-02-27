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
    // try {
    //     const { addImageFile } = this.state
    //     // console.log(addImageFile)
    //     if (addImageFile) {
    //         var formData = new FormData()
    //         var productname = this.refs.productName.value
    //         var category = this.refs.productCategory.value
    //         var size = this.refs.productSize.value
    //         var price = this.refs.productPrice.value
    //         var description = this.refs.productDescription.value
    //         var obj = {
    //             productname,
    //             category,
    //             size,
    //             price,
    //             description
    //         }
    //         if (productname && category && size && price && description && addImageFile) {
    //             formData.append('data', JSON.stringify(obj))
    //             formData.append('image', addImageFile)
    //             // console.log(formData)
    //             if (window.confirm(`Anda yakin mengubah produknya?`)) {
    //                 await Axios.patch(API_URL_1 + `products/EditProducts/${this.state.selectID}`, formData)
    //                 alert('Produk yang anda pilih sudah terganti')
    //                 window.location.reload()
    //             }
    //         } else {
    //             alert('Please, isi dengan lengkap!')
    //         }
    //     } else {
    //         alert('Please, isi gambarnya!')
    //     }
    // }
    // catch (err) {
    //     // console.log(err)
    // }


    renderGetProduct = () => {
        return this.state.product.map((item, index) => {
            // if (item.id === this.state.selectID) {
            //     return (
            //         <tr key={index} className="text-center">
            //             <td><input accept='image/*' onChange={this.btnUploadImageProduct} type='file' style={{ width: '100px' }} /></td>
            //             <td><input type='text' defaultValue={item.productname} ref="productName" style={{ width: '100px' }} /></td>
            //             <td>
            //                 <select className="form-control" onChange={this.onChangeSelectCategory} >
            //                     <option value={this.state.editCategory}>Pilih</option>
            //                     {this.renderListCategory()}
            //                 </select>
            //             </td>
            //             <td>
            //                 <div className="form-group">
            //                     <textarea
            //                         className="form-control"
            //                         id="exampleFormControlTextarea1"
            //                         rows="5"
            //                         ref="productDescription"
            //                         defaultValue={item.description}
            //                     />
            //                 </div>
            //             </td>
            //             <td>
            //                 <MDBContainer>
            //                     <MDBBtn color="success" onClick={this.toggle(14)}>EDIT STOCK</MDBBtn>
            //                     <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
            //                         <MDBModalHeader toggle={this.toggle(14)}></MDBModalHeader>
            //                         <MDBModalBody>
            //                             <MDBRow>
            //                                 <MDBCol md="6">
            //                                     <select className="form-control" onChange={this.onChangeSelectCategory}>
            //                                         <option value={this.state.editSize}>Pilih Size</option>
            //                                         {this.renderListSize()}
            //                                     </select>
            //                                 </MDBCol>
            //                                 <MDBCol md="6">
            //                                     <select className="form-control" onChange={this.onChangeSelectCategory}>
            //                                         <option value={this.state.editPrice}>Pilih Price</option>
            //                                         {this.renderListPrice()}
            //                                     </select>
            //                                 </MDBCol>
            //                             </MDBRow>
            //                             <br />
            //                             <br />
            //                             <h4>JUMLAH STOCK</h4>
            //                             <center>
            //                                 <div className="def-number-input number-input">
            //                                     <button onClick={this.decrease} className="minus"></button>
            //                                     <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
            //                                         type="number" />
            //                                     <button onClick={this.increase} className="plus"></button>
            //                                 </div>
            //                             </center>
            //                             <button>Save</button>
            //                         </MDBModalBody>
            //                     </MDBModal>
            //                 </MDBContainer>
            //             </td>
            //             <td>
            //                 <div>
            //                     <button style={{ borderRadius: '10px' }} onClick={this.btnConfirmEdit}>Confirm</button>
            //                 </div>
            //                 <div style={{ marginTop: '10%' }}>
            //                     <button style={{ borderRadius: '10px', padding: '10px' }} onClick={() => this.setState({ selectID: 0 })}>Cancel</button>
            //                 </div>
            //             </td>
            //         </tr>
            //     )
            // }
            return (
                <tr key={index} className="text-center">
                    <td><img src={API_URL_1 + item.imagePath} alt='ImgProduct' width='100px' /></td>
                    <td>{item.productname}</td>

                    <td><div>
                        <MDBBtn size="sm" color="elegant" onClick={() => this.btnDeleteProduct(item.id, item.imagePath)}>DELETE</MDBBtn>
                        {/* <div style={{ marginTop: '10%' }}> */}
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
        console.table(this.state.product)
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