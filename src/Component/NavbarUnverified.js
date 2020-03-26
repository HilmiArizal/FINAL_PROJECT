import React, { Component } from "react";
import { connect } from "react-redux";
import '../CSSUser/Navbar.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Logo from '../Image/Logo-SarenOne.png';
import { Logout } from '../Redux/Action';
import CartNotif from '../UserPages/CartNotif';
import { Link } from "react-router-dom";

class NavbarUser extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
        return (
            <MDBNavbar dark expand="md" className="Navbar-Main">
                <MDBNavbarToggler onClick={this.toggleCollapse} style={{ backgroundColor: 'black' }} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <div style={{fontFamily: 'Hammersmith One, sans-serif'}}>SORRY, AKUN ANDA BELUM TERVERIFIKASI. SILAHKAN MELAKUKAN VERIFIKASI TERLEBIH DAHULU MELALUI EMAIL ANDA.</div>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        status: state.user.status
    }
}

export default connect(mapStatetoProps, { Logout })(NavbarUser);