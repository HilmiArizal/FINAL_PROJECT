import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import NavbarUser from '../Component/NavbarUser';
import { MDBRow, MDBCol, MDBContainer, MDBBtn, MDBCard } from 'mdbreact';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class UserTransaction extends Component {
    state = {
        profile: [],
        cart: [],
        transaction: [],

        RedirectStay: false,
        RedirectNext: false
    }

    componentDidMount() {
        this.getTransaction()
        this.getCart()
        this.getProfileUser()
    }

    getProfileUser() {
        Axios.get(API_URL_1 + `users/getProfileUser/${this.props.id}`)
            .then((res) => {
                this.setState({ profile: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getCart = () => {
        const token = localStorage.getItem('token')
        Axios.get(API_URL_1 + `carts/getCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ cart: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getTransaction = () => {
        const token = localStorage.getItem('token')
        Axios.get(API_URL_1 + `transaction/getTransaction`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ transaction: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    saveEditProfile = () => {
        let firstname = this.refs.editfirstname.value;
        let lastname = this.refs.editlastname.value;
        let phonenumber = this.refs.editphonenumber.value;
        let address = this.refs.editaddress.value;
        let dataprofile = {
            firstname, lastname, phonenumber, address
        }
        if (firstname && lastname && phonenumber && address) {
            Axios.patch(API_URL_1 + `users/editProfileUserTransaction/${this.props.id}`, dataprofile)
                .then((res) => {
                    this.getProfileUser()
                    return res.data
                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        else {
            return 'PROFILE_KOSONG'
        }
    }

    totaltransaction = () => {
        let { cart } = this.state
        let totalprice = 0
        for (var i = 0; i < cart.length; i++) {
            totalprice += cart[i].totalprice
        }
        return totalprice
    }

    onBtnPayment = async () => {
        try {
            // addTransaction
            let userId = this.props.id
            let totaltransaction = this.totaltransaction()
            let date = new Date().getDate()
            let month = new Date().getMonth() + 1
            let year = new Date().getFullYear()
            let datetransaction = `${year}-${month}-${date}`
            let hour = new Date().getHours()
            let minute = new Date().getMinutes()
            let second = new Date().getSeconds()
            let timescart = `${hour}:${minute}:${second}`
            let datatransaction = {
                userId, totaltransaction, datetransaction, timescart
            }
            // addDetailTransaction
            let detailcart = {
                cart: this.state.cart,
                datetransaction,
                timescart
            }
            if (this.saveEditProfile() !== 'PROFILE_KOSONG') {
                await Axios.post(API_URL_1 + `transaction/addTransaction`, datatransaction)
                await Axios.post(API_URL_1 + `transaction/addDetailTransaction`, detailcart)
                await Axios.delete(API_URL_1 + `carts/deleteCartUserId?id=${this.props.id}`)
                alert('Pesanan anda sedang di proses, mohon ditunggu')
                this.setState({ RedirectNext: true })
                window.location.reload()
            } else {
                alert('Mohon isi data dengan benar')
                window.location.reload()
                this.setState({ RedirectStay: true })
            }
        } catch (err) {
            // console.log(err)
        }
    }

    renderTransaction = () => {
        return this.state.profile.map((item, index) => {
            return (
                <div key={index} style={{ fontFamily: 'Hammersmith One, sans-serif', padding: 20 }}>
                    <div className='row'> <div className='col-4'>Name</div><div className='col-8'>: {item.firstname} {item.lastname}</div></div>
                    <div className='row'> <div className='col-4'>Phone Number</div> <div className='col-8'>: {item.phonenumber}</div></div>
                    <div className='row'> <div className='col-4'>Address</div> <div className='col-8'>: {item.address}</div></div>
                    <div className='row'> <div className='col-4'>Total Transaction</div><div className='col-8'>: Rp. {this.totaltransaction().toLocaleString()} ,-</div></div>
                    <div className='row'> <div className='col-4'>Status</div><div className='col-8'>: UNPAID</div></div>
                </div>

            )
        })
    }

    renderProfileTransaction = () => {
        return this.state.profile.map((item, index) => {
            return (
                <div key={index} style={{ fontFamily: 'Hammersmith One, sans-serif', padding: 20 }}>
                    <MDBRow>
                        <MDBCol size="8" >
                            First Name
                            <input type="text" className="form-control" ref="editfirstname" defaultValue={item.firstname} />
                            <br />
                        </MDBCol>
                        <MDBCol size="4" >

                        </MDBCol>
                        <MDBCol size="8" >
                            Last Name
                            <input type="text" className="form-control" ref="editlastname" defaultValue={item.lastname} />
                            <br />
                        </MDBCol>
                        <MDBCol size="4" >

                        </MDBCol>
                        <MDBCol sm="8">
                            Phone Number
                            <input type="text" className="form-control" ref="editphonenumber" defaultValue={item.phonenumber} />
                            <br />
                        </MDBCol>
                        <MDBCol sm="4">

                        </MDBCol>
                        <MDBCol>
                            <div>
                                <center>Address</center>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        ref="editaddress"
                                        defaultValue={item.address}
                                    />
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <center>
                        <MDBBtn color="elegant" size="md" onClick={this.saveEditProfile}>Save</MDBBtn>
                    </center>
                </div>
            )
        })
    }

    render() {
        console.log(this.state.cart)
        const { RedirectStay, RedirectNext } = this.state;
        if (RedirectStay) {
            return (
                <Redirect to='/transaction'>

                </Redirect>
            )
        } else if (RedirectNext) {
            return (
                <Redirect to='/historytransaction'>

                </Redirect>
            )
        }
        return (
            <div>
                <NavbarUser />
                <center>
                    <div style={{ marginTop: 20 }}>
                        <div className="container" style={{ margin: 50 }}>
                            <div className="row">
                                <div className="col-3">
                                    <div style={{ border: '2px solid white' }}></div>
                                    <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>PRODUCT CHOOSEN</MDBBtn>
                                </div>
                                <div className="col-3">
                                    <div style={{ border: '2px solid white' }}></div>
                                    <Link to="cart">
                                        <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>CART</MDBBtn>
                                    </Link>
                                </div>
                                <div className="col-3">
                                    <div style={{ border: '2px solid black' }}></div>
                                    <MDBBtn color="elegant" style={{ width: 230, borderRadius: 50 }}>TRANSACTION</MDBBtn>
                                </div>
                                <div className="col-3">
                                    <div style={{ border: '2px solid white' }}></div>
                                    <MDBBtn color="white" style={{ width: 230, borderRadius: 50 }}>STATUS TRANSACTION</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol sm="6">
                            <MDBCard>
                                <MDBContainer>
                                    <div style={{ fontFamily: 'Hammersmith One, sans-serif', padding: 20, fontSize: 30 }}> Please {this.props.username}, check your form! </div>
                                    {this.renderProfileTransaction()}
                                </MDBContainer>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm="6">
                            <MDBCard>
                                <div className="d-flex justify-content-center" style={{ fontFamily: 'Hammersmith One, sans-serif', padding: 20, backgroundColor: '#404040', color: 'white', fontSize: 30 }}> Your Transaction </div>
                                <MDBContainer>
                                    {this.renderTransaction()}
                                </MDBContainer>
                            </MDBCard>
                            {
                                this.state.cart.length > 0
                                    ?
                                    < div >
                                        < center >
                                            <MDBBtn color="elegant" size="md" onClick={this.onBtnPayment} style={{ marginTop: 20 }}>Payment Now</MDBBtn>
                                        </center>
                                    </div>
                                    :
                                    < center >
                                        <Link to="product">
                                            <MDBBtn color="elegant" size="md" style={{ marginTop: 20 }}>Go To Product</MDBBtn>
                                        </Link>
                                    </center>
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username
    }
}

export default connect(mapStatetoProps)(UserTransaction);