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

    onBtnLogout = () => {
        if (window.confirm(`ARE YOU SURE TO LOGOUT ?`)) {
            localStorage.removeItem('token')
            this.props.Logout()
        }
    }

    render() {
        return (
            <MDBNavbar dark expand="md" className="Navbar-Main">
                <MDBNavbarBrand>
                    <img src={Logo} alt='Logo-SarenOne' className='brandLogo' />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} style={{ backgroundColor: 'black' }} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active id='paddingCenterNav'>
                            <MDBNavLink to="/" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>HOME</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem id='paddingCenterNav'>
                            <MDBNavLink to="/product" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>PRODUCT</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem id='paddingCenterNav'>
                            <MDBNavLink to="/about" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>ABOUT</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem id='paddingCenterNav' style={{ marginTop: 7 }}>
                            <a href="#howtoorder" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>HOW TO ORDER?</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right >
                        {
                            this.props.username
                                ?
                                <div id='centerNav'>
                                    <MDBNavItem>
                                        <Link to="/cart">
                                            <CartNotif />
                                        </Link>
                                    </MDBNavItem>
                                    <div className="dropdown" style={{ cursor: 'pointer' }}>
                                        <div className="dropdown-toggle dropdownCustom" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <AccountCircleIcon />{this.props.username.toUpperCase()}
                                        </div>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="/profileuser"><PersonIcon fontSize="small" style={{ margin: '5px' }} />Your Profile</a>
                                            <a className="dropdown-item" href="/historytransaction"><MonetizationOnIcon fontSize="small" style={{ margin: '5px' }} />Your Transaction</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" onClick={this.onBtnLogout} href="/"><ExitToAppIcon fontSize="small" style={{ margin: '5px' }} />Logout</a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div id='centerNav'>
                                    <MDBNavItem>
                                        <CartNotif />
                                    </MDBNavItem>
                                    <MDBNavItem id='centerNav'>
                                        <MDBNavLink to="/login" style={{ color: 'black', fontSize: '18px', fontFamily: 'Hammersmith One, sans-serif' }}>
                                            SIGN IN
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem id='centerNav'>
                                        <MDBNavLink to="/register" style={{ backgroundColor: '#424242', color: 'white', fontSize: '15px', fontFamily: 'Hammersmith One, sans-serif', borderRadius: '50px', padding: '10px 25px 10px 25px' }}>
                                            SIGN UP
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </div>
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStatetoProps, { Logout })(NavbarUser);