import React, { Component } from "react";
import { connect } from "react-redux";
import '../CSSUser/Navbar.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from '../Image/Logo-SarenOne.png';
import { Logout } from '../Redux/Action';
import Cart from "../UserPages/Cart";

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
                            <MDBNavLink to="#!" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>PROMOTION</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem id='paddingCenterNav'>
                            <MDBNavLink to="#!" style={{ color: 'black', fontSize: '20px', fontFamily: 'Hammersmith One, sans-serif' }}>ABOUT</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right >
                        {
                            this.props.username
                                ?
                                <div id='centerNav'>
                                    <MDBNavItem>
                                            <Cart />
                                    </MDBNavItem>
                                    <div className="dropdown" style={{ cursor: 'pointer' }}>
                                        <div className="dropdown-toggle dropdownCustom" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Hi, {this.props.username.toUpperCase()}
                                        </div>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="/profileuser"><PersonIcon fontSize="small" style={{ margin: '5px' }} />Your Profile</a>
                                            <a className="dropdown-item" href="/profilecart"><ShoppingCartIcon fontSize="small" style={{ margin: '5px' }} />Your Cart</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" onClick={this.onBtnLogout} href="/"><ExitToAppIcon fontSize="small" style={{ margin: '5px' }} />Logout</a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div id='centerNav'>
                                    <MDBNavItem>
                                            <Cart />
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