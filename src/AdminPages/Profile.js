import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';
import LogoSarenOne from '../Image/LogoSarenOne.png';



class Profile extends Component {
    state = {}
    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            WELCOME ADMIN SARENONE!
                    </div>
                        <img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '55%' }} />
                    </center>
                </main>
            </div>
        );
    }
}

export default Profile;