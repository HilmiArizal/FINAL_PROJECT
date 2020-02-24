import React, { Component } from 'react';
import LogoSarenOne from '../Image/LogoSarenOne.png';
import '../CSSAdmin/Homepage.css';

class Homepage extends Component {
    state = {}
    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            WELCOME ADMIN SARENONE!
                    </div>
                        <img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '50%' }} />
                    </center>
                </main>
            </div>
        );
    }
}

export default Homepage;