import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBTableFoot } from 'mdbreact';


class ListProduct extends Component {

    state = {
        dataCategory: [],
        dataSize: [],
        dataPrice: [],

        selectedIdCategory: null,
        selectedIdPrice: null,
        selectedIdSize: null
    }

    componentDidMount() {
        this.getCategory();
        this.getPrice();
        this.getSize();
    }

    getCategory = () => {
        Axios.get(API_URL_1 + `products/getCategory`)
            .then((res) => {
                this.setState({ dataCategory: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getPrice = () => {
        Axios.get(API_URL_1 + `products/getPrice`)
            .then((res) => {
                this.setState({ dataPrice: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getSize = () => {
        Axios.get(API_URL_1 + `products/getSize`)
            .then((res) => {
                this.setState({ dataSize: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    // ====== KATEGORI ====== //

    addCategory = async () => {
        try {
            let category = this.refs.addCategory.value;
            if (category === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.post(API_URL_1 + `products/AddCategory`, { category })
                alert('Berhasil')
                this.getCategory()
            }
        } catch (err) {
            // console.log(err)
        }
    }

    editCategory = async (id) => {
        try {
            let category = this.refs.editCategory.value;
            if (category === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.patch(API_URL_1 + `products/EditCategory/${id}`, { category })
                this.getCategory()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    deleteCategory = async (id) => {
        try {
            if (window.confirm(`ARE YOU SURE FOR DELETE?`)) {
                await Axios.delete(API_URL_1 + `products/DeleteCategory/${id}`)
                this.getCategory()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    // ====== BERAT ====== //

    addSize = async () => {
        try {
            let size = this.refs.addSize.value;
            if (size === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.post(API_URL_1 + `products/AddSize`, { size })
                alert('Berhasil')
                this.getSize()
            }
        } catch (err) {
            // console.log(err)
        }
    }

    editSize = async (id) => {
        try {
            let size = this.refs.editSize.value;
            if (size === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.patch(API_URL_1 + `products/EditSize/${id}`, { size })
                this.getSize()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    deleteSize = async (id) => {
        try {
            if (window.confirm(`ARE YOU SURE FOR DELETE?`)) {
                await Axios.delete(API_URL_1 + `products/DeleteSize/${id}`)
                this.getSize()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    // ====== HARGA ====== //

    addPrice = async () => {
        try {
            let price = this.refs.addPrice.value;
            if (price === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.post(API_URL_1 + `products/AddPrice`, { price })
                alert('Berhasil')
                this.getPrice()
            }
        } catch (err) {
            // console.log(err)
        }
    }

    editPrice = async (id) => {
        try {
            let price = this.refs.editPrice.value;
            if (price === '') {
                alert('Isi dengan benar')
            } else {
                await Axios.patch(API_URL_1 + `products/EditPrice/${id}`, { price })
                this.getPrice()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }

    deletePrice = async (id) => {
        try {
            if (window.confirm(`ARE YOU SURE FOR DELETE?`)) {
                await Axios.delete(API_URL_1 + `products/DeletePrice/${id}`)
                this.getPrice()
                alert('Berhasil')
            }
        } catch (err) {
            // console.log(err)
        }
    }


    renderGetCategory = () => {
        return this.state.dataCategory.map((item, index) => {
            if (this.state.selectedIdCategory === index) {
                return (
                    <tr key={index} className="text-center">
                        <td><div style={{ fontSize: 10 }}></div></td>
                        <td><div style={{ fontSize: 10 }}><input type="text" placeholder="Ubah Kategori" ref="editCategory" style={{ width: 70 }} /></div></td>
                        <td>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdCategory: null })}><MDBIcon icon="times" /></MDBBtn>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.editCategory(item.id)}><MDBIcon icon="check" /></MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index} className="text-center">
                    <td><div style={{ fontSize: 10 }}>{index + 1}</div></td>
                    <td><div style={{ fontSize: 10 }}>{item.category}</div></td>
                    <td>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdCategory: index })}><MDBIcon icon="cog" /></MDBBtn>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.deleteCategory(item.id)}><MDBIcon icon="trash" /></MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    renderGetPrice = () => {
        return this.state.dataPrice.map((item, index) => {
            if (this.state.selectedIdPrice === index) {
                return (
                    <tr key={index} className="text-center">
                        <td><div style={{ fontSize: 10 }}></div></td>
                        <td><div style={{ fontSize: 10 }}><input type="text" placeholder="Ubah Harga" ref="editPrice" style={{ width: 70 }} /></div></td>
                        <td>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdPrice: null })}><MDBIcon icon="times" /></MDBBtn>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.editPrice(item.id)} ><MDBIcon icon="check" /></MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index} className="text-center">
                    <td><div style={{ fontSize: 10 }}>{index + 1}</div></td>
                    <td><div style={{ fontSize: 10 }}>{item.price}</div></td>
                    <td>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdPrice: index })}><MDBIcon icon="cog" /></MDBBtn>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.deletePrice(item.id)}><MDBIcon icon="trash" /></MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    renderGetSize = () => {
        return this.state.dataSize.map((item, index) => {
            if (this.state.selectedIdSize === index) {
                return (
                    <tr key={index} className="text-center">
                        <td><div style={{ fontSize: 10 }}></div></td>
                        <td><div style={{ fontSize: 10 }}><input type="text" placeholder="Ubah Berat" ref="editSize" style={{ width: 70 }} /></div></td>
                        <td>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdSize: null })}><MDBIcon icon="times" /></MDBBtn>
                            <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.editSize(item.id)}><MDBIcon icon="check" /></MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index} className="text-center">
                    <td><div style={{ fontSize: 10 }}>{index + 1}</div></td>
                    <td><div style={{ fontSize: 10 }}>{item.size}</div></td>
                    <td>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.setState({ selectedIdSize: index })}><MDBIcon icon="cog" /></MDBBtn>
                        <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={() => this.deleteSize(item.id)}><MDBIcon icon="trash" /></MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ marginTop: 50 }}>
                <MDBContainer>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-11">
                            <div className="row">
                                <div className="col-4">
                                    <div className="d-flex justify-content-center" style={{ marginBottom: 20 }}>
                                        LIST KATEGORI
                                    </div>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}> No. </div></th>
                                                <th><div style={{ fontSize: 10 }}> List Kategori </div> </th>
                                                <th><div style={{ fontSize: 10 }}> Action </div></th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.renderGetCategory()}
                                        </MDBTableBody>
                                        <MDBTableFoot>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}></div></th>
                                                <th><div style={{ fontSize: 10 }}> <input type="text" placeholder="Tambah Kategori" ref="addCategory" style={{ width: 80 }} /> </div> </th>
                                                <th>
                                                    <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={this.addCategory}><MDBIcon icon="plus" /></MDBBtn>
                                                </th>
                                            </tr>
                                        </MDBTableFoot>
                                    </MDBTable>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex justify-content-center" style={{ marginBottom: 20 }}>
                                        LIST BERAT
                                    </div>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}> No. </div></th>
                                                <th><div style={{ fontSize: 10 }}> List Berat </div> </th>
                                                <th><div style={{ fontSize: 10 }}> Action </div></th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.renderGetSize()}
                                        </MDBTableBody>
                                        <MDBTableFoot>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}></div></th>
                                                <th><div style={{ fontSize: 10 }}> <input type="text" placeholder="Tambah Berat" ref="addSize" style={{ width: 70 }} /> </div> </th>
                                                <th>
                                                    <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={this.addSize}><MDBIcon icon="plus" /></MDBBtn>
                                                </th>
                                            </tr>
                                        </MDBTableFoot>
                                    </MDBTable>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex justify-content-center" style={{ marginBottom: 20 }}>
                                        LIST HARGA
                                    </div>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}> No. </div></th>
                                                <th><div style={{ fontSize: 10 }}> List Harga </div> </th>
                                                <th><div style={{ fontSize: 10 }}> Action </div></th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {this.renderGetPrice()}
                                        </MDBTableBody>
                                        <MDBTableFoot>
                                            <tr className="text-center">
                                                <th><div style={{ fontSize: 10 }}></div></th>
                                                <th><div style={{ fontSize: 10 }}> <input type="text" placeholder="Tambah Harga" ref="addPrice" style={{ width: 70 }} /> </div> </th>
                                                <th>
                                                    <MDBBtn color="elegant" size="sm" style={{ fontSize: 8 }} onClick={this.addPrice}><MDBIcon icon="plus" /></MDBBtn>
                                                </th>
                                            </tr>
                                        </MDBTableFoot>
                                    </MDBTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default ListProduct;