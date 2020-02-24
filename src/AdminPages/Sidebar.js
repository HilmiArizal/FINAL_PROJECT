import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import { Logout } from '../Redux/Action';
import { connect } from 'react-redux';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBNavLink } from 'mdbreact';
import '../CSSAdmin/ButtonSidebar.css';

class Sidebar extends Component {
    state = {
        modal8: false,
        modal9: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    onBtnLogout = () => {
        if (window.confirm(`ARE YOU SURE TO LOGOUT ?`)) {
            localStorage.removeItem('token')
            this.props.Logout()
        }
    }

    render() {
        return (
            <div className="s-layout">
                <div className="s-layout__sidebar">
                    <a className="s-sidebar__trigger" href="/">
                        <i className="fa fa-bars"></i>
                    </a>
                    <nav className="s-sidebar__nav"  >
                        <ul >
                            <li >
                                <center>
                                    <i><em><img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '100px', borderRadius: '50px', marginBottom: '20px' }} /></em></i>
                                </center>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="/">
                                    <i className="fa fa-home" style={{ color: 'white' }}></i><em>Home</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="/profile">
                                    <i className="fa fa-user" style={{ color: 'white' }}></i><em>My Profile</em>
                                </a>
                            </li>
                            <li>
                                <center>
                                    {/* <MDBBtn onClick={this.toggle(8)}>MANAGE PRODUCT</MDBBtn> */}
                                    <input type="button" value="Manage Product" onClick={this.toggle(8)} style={{ padding: '20px 65px 20px 65px' }} />
                                    <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="left">
                                        <MDBNavLink to="/">
                                            <MDBModalHeader toggle={this.toggle(8)}></MDBModalHeader>
                                        </MDBNavLink>
                                        <MDBModalBody style={{ color: 'black' }}>
                                            <div className="container d-flex justify-content-center" style={{ marginTop: '20%' }} >
                                                <div className="row">
                                                    <a href="seeproduct" onClick={this.toggle(8)} className="btn btn--border btn--center btn--border-lightgrey" style={{ fontSize: '130%' }}> <span className="btn-text">LIHAT SEMUA PRODUK</span> <span className="btn-arrow"> </span> </a>
                                                </div>
                                            </div>
                                            <div className="container d-flex justify-content-center" style={{ marginTop: '20%' }} >
                                                <div className="row">
                                                    <a href="editdelete" onClick={this.toggle(8)} className="btn btn--border btn--center btn--border-lightgrey" style={{ fontSize: '130%' }}> <span className="btn-text" >UBAH/HAPUS PRODUK</span> <span className="btn-arrow"> </span> </a>
                                                </div>
                                            </div>
                                            <div className="container d-flex justify-content-center" style={{ marginTop: '20%' }}>
                                                <div className="row" >
                                                    <a href="addproduct" onClick={this.toggle(8)} className="btn btn--border btn--center btn--border-lightgrey" style={{ fontSize: '130%' }}> <span className="btn-text" >TAMBAH PRODUK</span> <span className="btn-arrow"> </span> </a>
                                                </div>
                                            </div>
                                        </MDBModalBody>
                                    </MDBModal>
                                </center>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="/histransaction">
                                    <em>History Transaction</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="/" onClick={this.onBtnLogout} >
                                    <em>Logout</em>
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div >
        );
    }
}

export default connect(null, { Logout })(Sidebar);
