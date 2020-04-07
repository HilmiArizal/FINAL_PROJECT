import React, { Component } from 'react';
import '../CSSUser/Footer.css';
import bca from '../Image/bca.png';
import mandiri from '../Image/mandiri.png'
import bni from '../Image/bni.png';
import bri from '../Image/bri.png'

class Footer extends Component {

    render() {
        return (
            <footer className="footer_area" style={{ backgroundColor: '#404040', color: 'white', fontFamily: 'Hammersmith One, sans-serif' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-6" style={{ backgroundColor: '#404040' }}>
                            <div className="single_ftr">
                                <h4 className="sf_title d-flex justify-content-center" style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: 25 }} >Contacts</h4>
                                <ul>
                                    <center>
                                        <li style={{ fontSize: '13px' }}>Jl. Caringin Gg. Komplek Pasadena No. 60B <br /> RT02/RW03  Kec/Kel. Babakan Ciparay 40223 <br />Bandung, Jawa Barat, Indonesia</li>
                                        <br />
                                        <li style={{ fontSize: 13 }}>022 - 88886011<br /> 0881 - 7758956</li>
                                        <br />
                                        <li>sosissarenone@gmail.com</li>
                                    </center>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 " style={{ backgroundColor: '#404040' }}>
                            <div className="single_ftr">
                                <h4 className="sf_title  d-flex justify-content-center" style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: 25 }}>Newsletter</h4>
                                <div className="newsletter_form" >
                                    <center>
                                        <p style={{ fontFamily: 'Hammersmith One, sans-serif', color: 'white' }}>Menyediakan makanan beku yang sudah <br /> diolah dengan baik sehingga sehat untuk <br /> dikonsumsi </p>
                                        <form method="post" className="form-inline">
                                            {/* <MDBInput backgroundColor='white' label="E-mail address" outline icon="envelope" style={{ color: 'white' }} /> */}
                                        </form>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6" style={{ backgroundColor: '#404040' }}>
                            <div className="single_ftr">
                                <h4 className="sf_title  d-flex justify-content-center" style={{ fontFamily: 'Hammersmith One, sans-serif', fontSize: 25 }}>Information</h4>
                                <ul>
                                    <center>
                                        <li><a href="about" style={{ color: 'white' }}>About Us</a></li>
                                        <li><a href="about" style={{ color: 'white' }}>Delivery Information</a></li>
                                        <li><a href="about" style={{ color: 'white' }}>Privacy Policy</a></li>
                                        <li><a href="about" style={{ color: 'white' }}>Contact Us</a></li>
                                        <center>
                                            <ul style={{ marginTop: '15px', backgroundColor: 'white' }}>
                                                <img src={bca} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                                <img src={mandiri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                                <img src={bni} alt="logo ovo" style={{ width: '15%', margin: '3%' }} />
                                                <img src={bri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                            </ul>
                                        </center>
                                    </center>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ftr_btm_area" >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                {/* <div className="ftr_social_icon">
                                    <center>
                                        <ul style={{ marginTop: '15px', backgroundColor: 'white' }}>
                                            <img src={bca} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                            <img src={mandiri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                            <img src={bni} alt="logo ovo" style={{ width: '15%', margin: '3%' }} />
                                            <img src={bri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                        </ul>
                                    </center>
                                </div> */}
                            </div>
                            <div className="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                <p className="copyright_text text-center" style={{ margin: 20 }}>© 2020 CV. HEAVEN SENTOSA</p>
                            </div>

                            <div className="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                {/* <div className="payment_mthd_icon text-right">
                                    <center>
                                        <ul style={{ marginTop: '15px', backgroundColor: 'white' }}>
                                            <img src={ovo} alt="logo ovo" style={{ width: '10%', margin: '3%' }} />
                                            <img src={dana} alt="logo ovo" style={{ width: '15%', margin: '3%' }} />
                                            <img src={doku} alt="logo ovo" style={{ width: '5%', margin: '3%' }} />
                                            <img src={linkaja} alt="logo ovo" style={{ width: '5%', margin: '3%' }} />
                                        </ul>
                                    </center>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;