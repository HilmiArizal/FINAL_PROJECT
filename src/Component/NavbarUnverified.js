import React, { Component } from "react";
import { connect } from "react-redux";
import '../CSSUser/Navbar.css';
import { MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import { Logout } from '../Redux/Action';

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
                        <div style={{ fontFamily: 'Hammersmith One, sans-serif' }}>SORRY, AKUN ANDA BELUM TERVERIFIKASI. SILAHKAN MELAKUKAN VERIFIKASI TERLEBIH DAHULU MELALUI EMAIL ANDA.</div>
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