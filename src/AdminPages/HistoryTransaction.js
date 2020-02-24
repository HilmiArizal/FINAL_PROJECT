import React, { Component } from 'react';
import '../CSSAdmin/Homepage.css';


class HisTransaction extends Component {
    state = {}
    render() {
        return (
            <div>
                <main className="s-layout__content">
                    <center>
                        <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>
                            HISTORY TRANSACTION
                    </div>
                        {/* <img src={LogoSarenOne} alt='LogoSarenOne' style={{ width: '30%' }} /> */}
                    </center>
                </main>
            </div>
        );
    }
}

export default HisTransaction;