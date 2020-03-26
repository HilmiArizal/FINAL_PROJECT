import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import '../CSSAdmin/ButtonSidebar.css';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import { Logout } from '../Redux/Action';
import { connect } from 'react-redux';
import { MDBNavLink, MDBIcon } from 'mdbreact';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

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
                                    <MDBNavLink to="/profileadmin">
                                        <div style={{ color: 'white' }}>
                                            <MDBIcon icon="user" /> HOME
                                    </div>
                                    </MDBNavLink>
                                </li>
                                <li>
                                    <MDBNavLink to="/pendingtransaction">
                                        <div style={{ color: 'white' }}>
                                            <MDBIcon icon="dollar-sign" /> PENDING TRANSACTION
                                        </div>
                                    </MDBNavLink>
                                </li>
                                <li>
                                    <MDBNavLink to="/historytransactionadmin">
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
