import React, { Component } from 'react';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import '../CSSAdmin/Homepage.css';
import { MDBContainer } from 'mdbreact';

class Homepage extends Component {

    render() {
        return (
            <div style={{marginTop:30}}>
                <MDBContainer>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10"></div>
                        <center>
                            <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                                WELCOME ADMIN SARENONE!
                            </div>
                            <img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '55%' }} />
                        </center>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default Homepage;