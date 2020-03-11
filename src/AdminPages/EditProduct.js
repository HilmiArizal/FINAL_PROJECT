import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from 'mdbreact';

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
                console.table('ini', res.data)
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

    onChangeSelectSize = (e, index) => {
        let { stock } = this.state;
        // console.log('old', stock[index].sizeId)
        // stock[index].sizeId = parseInt(e.target.value)
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
        console.table(stock)
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

    btnUploadImageProduct = (e) => {
        if (e.target.files) {
            this.setState({ editImageFile: e.target.files[0] })
        } else {
            this.setState({ editImageFile: undefined })
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
                console.log(res.data)
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
                                <option>EDIT WEIGHT</option>
                                {this.renderListSize()}
                            </select>
                        </td>
                        <td>
                            <select defaultValue={item.priceId} className="form-control" onChange={(e) => this.onChangeSelectPrice(e, index)} >
                                <option>EDIT PRICE</option>
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
                            <button onClick={() => this.setState({ editInput: null })}>OK</button>
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
                            <button onClick={() => this.setState({ editInput: index })}>Edit</button>
                            <button onClick={() => this.btnDeleteStock(item.id)}>Delete</button>
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
                <div><input type='text' className='form-control' defaultValue={product.productname} ref="productName" /></div>
                <br />
                <select className="form-control" onChange={this.onChangeSelectCategory} >
                    <option value={product.productname}>EDIT CATEGORY</option>
                    {this.renderListCategory()}
                </select>
                <br />
                <MDBTable bordered className="text-center">
                    <MDBTableHead style={{ fontFamily: 'Righteous, cursive', backgroundColor: '#192b3c', color: 'white' }}>
                        <tr>
                            <th className='EDP-Table-Head-Txt'>Size</th>
                            <th className='EDP-Table-Head-Txt'>Price</th>
                            <th className='EDP-Table-Head-Txt'>Stock</th>
                            <th className='EDP-Table-Head-Txt'>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderStock()}
                    </MDBTableBody>
                    <MDBTableFoot>
                        <tr>
                            <td>
                                <select defaultValue={this.state.newSizeId} className="form-control" onChange={(e) => this.setState({ newSizeId: e.target.value, newSize: e.target[e.target.selectedIndex].text })}>
                                    <option >NEW SIZE</option>
                                    {this.renderListSize()}
                                </select>
                            </td>
                            <td>
                                <select defaultValue={this.state.newPriceId} className="form-control" onChange={(e) => this.setState({ newPriceId: e.target.value, newPrice: e.target[e.target.selectedIndex].text })}>
                                    <option >NEW PRICE</option>
                                    {this.renderListPrice()}
                                </select>
                            </td>
                            <td>
                                <input onChange={(e) => this.setState({ newStock: e.target.value })} className='form-control' type='number' placeholder='NEW STOCK' />
                            </td>
                            <td>
                                <input type="button" value="Add Stock" onClick={this.newStock} />
                            </td>
                        </tr>
                    </MDBTableFoot>
                </MDBTable>
                <div className='EDP-Box-Edit-Img'> EDIT IMAGE
                <br />
                    <label className='EDP-Input-File'>
                        {
                            this.state.previewImage
                                ?
                                <img className='EDP-Box-Edit-Img' src={this.state.previewImage} alt="img" width='30%' />
                                :
                                <img className='EDP-Box-Edit-Img' src={API_URL_1 + product.imagePath} alt="img" alt="img" width='30%' />
                        }
                        <br />
                        <input type="file" onChange={this.addImage} />
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <em>EDIT DESCRIPTION</em>
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

    render() {
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
                        <MDBBtn color="elegant" size="md" onClick={this.btnConfirmEdit}>SAVE</MDBBtn>
                    </center>
                </main>
            </div>
        );
    }
}

export default EditProduct;