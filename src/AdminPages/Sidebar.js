import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import '../CSSAdmin/ButtonSidebar.css';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import { Logout } from '../Redux/Action';
import { connect } from 'react-redux';
import { MDBNavLink, MDBIcon } from 'mdbreact';

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
                            </center>
                            <li>
                                <MDBNavLink to="/">
                                    <div style={{ color: 'white', paddingTop: 30 }}>
                                        <MDBIcon icon="home" /> HOME
                                    </div>
                                </MDBNavLink>
                            </li>
                            <li>
                                <MDBNavLink to="/">
                                    <div style={{ color: 'white', paddingTop: 10 }}>
                                        <MDBIcon icon="user" /> PROFILE
                                    </div>
                                </MDBNavLink>
                            </li>
                            <li>
                                <MDBNavLink to="/transaction">
                                    <div style={{ color: 'white', paddingTop: 10 }}>
                                        <MDBIcon icon="dollar-sign" /> TRANSACTION
                                        </div>
                                </MDBNavLink>
                            </li>
                            <li>
                                <MDBNavLink to="/manageproduct">
                                    <div style={{ color: 'white', paddingTop: 10 }}>
                                        <MDBIcon icon="cog" /> MANAGE PRODUCT
                                        </div>
                                </MDBNavLink>
                            </li>
                            <li>
                                <MDBNavLink to="manageuser">
                                    <div style={{ color: 'white', paddingTop: 10 }}>
                                        <MDBIcon icon="users" /> MANAGE USER
                                    </div>
                                </MDBNavLink>
                            </li>
                            <li>
                                <MDBNavLink to="/">
                                    <div onClick={this.onBtnLogout} style={{ color: 'white', paddingTop: 10 }}>
                                        <MDBIcon icon="sign-out-alt" /> LOGOUT
                                        </div>
                                </MDBNavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >
        );
    }
}

export default connect(null, { Logout })(Sidebar);
