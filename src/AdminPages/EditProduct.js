import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot, MDBContainer } from 'mdbreact';

class EditProduct extends Component {
    state = {
        product: [],
        stock: [],

        category: [],
        size: [],
        price: [],

        productId: 0,
        newSizeId: 0,
        newSize: 0,
        newPriceId: 0,
        newPrice: 0,
        newStock: 0,
        editCategory: 0,
        editDescription: '',
        image: undefined,
        previewImage: undefined,
        editImage: false,

        editInput: null,
    }

    componentDidMount() {
        this.getProductId()
        this.getStockId()
        this.getCategory()
        this.getSize()
        this.getPrice()
    }

    getProductId = () => {
        var takeId = this.props.location.search.split('=')[1];
        Axios.get(API_URL_1 + `products/getProductId?id=${takeId}`)
            .then((res) => {
                this.setState({ product: res.data[0], productId: res.data[0].id, newSize: res.data[0].size, newPrice: res.data[0].price })
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
                // console.table('ini', res.data)
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
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getPrice = () => {
        Axios.get(API_URL_1 + `products/getPrice`)
            .then((res) => {
                this.setState({ price: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    onChangeSelectCategory = (e) => {
        this.setState({ editCategory: e.target.value })
    }

    onChangeSelectSize = (e, index) => {
        let { stock } = this.state;
        stock[index].sizeId = parseInt(e.target.value)
        stock[index].size = e.target[e.target.selectedIndex].text
        // console.log('new', stock[index].sizeId)
        // console.table(e.target.value)
    }

    onChangeSelectPrice = (e, index) => {
        let { stock } = this.state;
        stock[index].priceId = parseInt(e.target.value)
        stock[index].price = e.target[e.target.selectedIndex].text // index dari select optionnya
        // console.log('id', e.target.value)
        // console.log('price', e.target[e.target.selectedIndex].text)
    }

    onChangeStock = (e, index) => {
        let { stock } = this.state;
        stock[index].jumlahstock = parseInt(e.target.value)
    }

    addImage = (e) => {
        if (e.target.value[0]) {
            this.setState({ image: e.target.files[0], previewImage: URL.createObjectURL(e.target.files[0]), editImage: true })
        }
    }

    newStock = () => {
        let productId = this.props.location.search.split('=')[1]
        let { stock } = this.state
        let sizeId = this.state.newSizeId
        let size = this.state.newSize
        let priceId = this.state.newPriceId
        let price = this.state.newPrice
        let jumlahstock = this.state.newStock
        let newId = {
            id: null,
            sizeId: parseInt(sizeId),
            size: parseInt(size),
            priceId: parseInt(priceId),
            price: parseInt(price),
            jumlahstock: parseInt(jumlahstock),
            productId: parseInt(productId)
        }
        stock.push(newId)
        this.setState({ stock: stock })
        // console.table(stock)
    }

    btnDeleteStock = async (id) => {
        try {
            if (window.confirm('ARE YOU SURE TO DELETE ?')) {
                await Axios.delete(API_URL_1 + `products/DeleteStocks?id=${id}`)
                window.location.reload()
                alert('Delete Successful!')
            }
        }
        catch (err) {
            // console.log(err)
        }
    }

    btnConfirmEdit = async () => {
        try {
            const { productId, editCategory, stock, image, editImage } = this.state;

            let formData = new FormData()
            let dataproduct = {
                productname: this.refs.productName.value,
                productcategoryId: parseInt(editCategory),
                description: this.refs.productDescription.value
            }
            let data = {
                dataproduct,
                editImage,
                productId,
                jumlahstock: stock
            }
            formData.append('data', JSON.stringify(data))
            formData.append('image', image)
            console.log(formData)
            if (window.confirm(`Anda yakin ingin mengubah produk?`)) {
                let res = await Axios.patch(API_URL_1 + `products/EditProducts/${productId}`, formData)
                // console.log(res.data)
                alert('Produk sudah diganti silahkan cek')
                window.location.reload()
            }

        } catch (err) {
            // console.log(err)
        }
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
                    {item.size}
                </option>
            )
        })
    }

    renderListPrice = () => {
        return this.state.price.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    {item.price}
                </option>
            )
        })
    }

    renderStock = () => {
        return this.state.stock.map((item, index) => {
            if (this.state.editInput === index) {
                return (
                    <tr key={index}>
                        <td>
                            <select defaultValue={item.sizeId} className="form-control" onChange={(e) => this.onChangeSelectSize(e, index)} >
                                <option value="none" selected disabled hidden>EDIT WEIGHT</option>
                                {this.renderListSize()}
                            </select>
                        </td>
                        <td>
                            <select defaultValue={item.priceId} className="form-control" onChange={(e) => this.onChangeSelectPrice(e, index)} >
                                <option value="none" selected disabled hidden>EDIT PRICE</option>
                                {this.renderListPrice()}
                            </select>
                        </td>
                        <td>
                            <input
                                onChange={(e) => this.onChangeStock(e, index)}
                                defaultValue={item.jumlahstock} type='number'
                                className='form-control'
                            />
                        </td>
                        <td>
                            <center>
                                <button className="form-control" style={{ width: 60, fontSize: 10, backgroundColor: "#404040", color: "white" }} onClick={() => this.setState({ editInput: null })}>OK</button>
                            </center>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index}>
                    <td>
                        <div>{item.size}gr</div>
                    </td>
                    <td>
                        <div>Rp. {item.price},-</div>
                    </td>
                    <td>
                        <div>{item.jumlahstock} pack</div>
                    </td>
                    <td>
                        <center>
                            <div className="row">
                                <div className="col-6">
                                    <button className="form-control" style={{ width: 60, fontSize: 10, backgroundColor: "#404040", color: "white" }} onClick={() => this.setState({ editInput: index })}>UBAH</button>
                                </div>
                                <div className="col-6">
                                    <button className="form-control" style={{ width: 60, fontSize: 10, backgroundColor: "#404040", color: "white" }} onClick={() => this.btnDeleteStock(item.id)}>HAPUS</button>
                                </div>
                            </div>
                        </center>
                    </td>
                </tr>
            )
        })
    }

    renderGetProduct = () => {
        const { product } = this.state
        return (
            <div>
                <div className="row">
                    <div className="col-6">UBAH NAMA PRODUK <input type='text' className='form-control' defaultValue={product.productname} ref="productName" /></div>
                    <div className="col-6">
                        UBAH KATEGORI PRODUK
                        <select className="form-control" onChange={this.onChangeSelectCategory} >
                            <option value="none" selected disabled hidden>PILIH KATEGORI</option>
                            {this.renderListCategory()}
                        </select>
                    </div>
                </div>
                <br />
                <MDBTable bordered className="text-center">
                    <MDBTableHead style={{ backgroundColor: '#192b3c', color: 'white' }}>
                        <tr>
                            <th className='EDP-Table-Head-Txt'>BERAT PRODUK</th>
                            <th className='EDP-Table-Head-Txt'>HARGA PRODUK</th>
                            <th className='EDP-Table-Head-Txt'>STOCK PRODUK</th>
                            <th className='EDP-Table-Head-Txt'>ACTION</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderStock()}
                    </MDBTableBody>
                    <MDBTableFoot>
                        <tr>
                            <td>
                                <select defaultValue={this.state.newSizeId} className="form-control" onChange={(e) => this.setState({ newSizeId: e.target.value, newSize: e.target[e.target.selectedIndex].text })} style={{ fontSize: 12 }}>
                                    <option value="none" selected disabled hidden> BERAT PRODUK BARU</option>
                                    {this.renderListSize()}
                                </select>
                            </td>
                            <td>
                                <select defaultValue={this.state.newPriceId} className="form-control" onChange={(e) => this.setState({ newPriceId: e.target.value, newPrice: e.target[e.target.selectedIndex].text })} style={{ fontSize: 12 }}>
                                    <option value="none" selected disabled hidden>HARGA PRODUK BARU</option>
                                    {this.renderListPrice()}
                                </select>
                            </td>
                            <td>
                                <input onChange={(e) => this.setState({ newStock: e.target.value })} className='form-control' type='number' placeholder='STOCK PRODUK BARU' style={{fontSize:12, height:40}} />
                            </td>
                            <td>
                                <center>
                                    <input className="form-control" style={{ width: 110, fontSize: 10, backgroundColor: "#404040", color: "white" }} type="button" value="TAMBAH STOCK" onClick={this.newStock} />
                                </center>
                            </td>
                        </tr>
                    </MDBTableFoot>
                </MDBTable>
                <div className='EDP-Box-Edit-Img'> EDIT GAMBAR PRODUK
                <br />
                    <label className='EDP-Input-File'>
                        {
                            this.state.previewImage
                                ?
                                <img className='EDP-Box-Edit-Img' src={this.state.previewImage} alt="img" width='30%' />
                                :
                                <img className='EDP-Box-Edit-Img' src={API_URL_1 + product.imagePath} alt="img" width='30%' />
                        }
                        <br />
                        <MDBContainer>
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <center>
                                        <input type="file" onChange={this.addImage} />
                                    </center>
                                </div>
                                <div className="col-4"></div>
                            </div>
                        </MDBContainer>
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <em>UBAH DESKRIPSI PRODUK</em>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        ref="productDescription"
                        defaultValue={product.description}
                        style={{ fontSize: 13 }}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ marginTop: 50 }}>
                <MDBContainer>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10">
                            <center>
                                {this.renderGetProduct()}
                                <MDBBtn color="elegant" size="md" onClick={this.btnConfirmEdit}>SAVE</MDBBtn>
                            </center>
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default EditProduct;