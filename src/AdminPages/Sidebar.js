import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import '../CSSAdmin/ButtonSidebar.css';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import { Logout } from '../Redux/Action';
import { connect } from 'react-redux';
import { MDBNavLink, MDBIcon } from 'mdbreact';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
// import HomeIcon from '@material-ui/icons/Home';

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
                            <center>
                                <li >
                                    <i><em><img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '100px', borderRadius: '50px', marginBottom: '20px' }} /></em></i>
                                </li>
                                <li>
                                    <MDBNavLink to="/">
                                        <div style={{ color: 'white' }}>
                                            <MDBIcon icon="home" /> HOME
                                    </div>
                                    </MDBNavLink>
                                </li>
                                <li>
                                    <MDBNavLink to="/">
                                        <div style={{ color: 'white' }}>
                                            <MDBIcon icon="user" /> PROFILE
                                    </div>
                                    </MDBNavLink>
                                </li>
                                <li>
                                    <MDBNavLink to="/historytransact">
                                        <div style={{ color: 'white' }}>
                                            <MDBIcon icon="dollar-sign" /> HISTORY TRANSACTION
                                        </div>
                                    </MDBNavLink>
                                </li>
                                <li>
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="white">
                                            <MDBIcon icon="bars" /> Manage product
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            <MDBNavLink to="seeproduct">
                                                <MDBDropdownItem>See product</MDBDropdownItem>
                                            </MDBNavLink>
                                            <MDBNavLink to="addproduct">
                                                <MDBDropdownItem>Add product</MDBDropdownItem>
                                            </MDBNavLink>
                                            <MDBNavLink to="editdelete">
                                                <MDBDropdownItem>Edit &amp; Delete</MDBDropdownItem>
                                            </MDBNavLink>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    {/* <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="left">
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
                                    </MDBModal> */}
                                </li>
                                <li>
                                    <MDBNavLink to="/">
                                        <div onClick={this.onBtnLogout} style={{ color: 'white' }}>
                                            <MDBIcon icon="sign-out-alt" /> LOGOUT
                                        </div>
                                    </MDBNavLink>
                                </li>
                            </center>
                        </ul>
                    </nav>
                </div>
            </div >
        );
    }
}

export default connect(null, { Logout })(Sidebar);
