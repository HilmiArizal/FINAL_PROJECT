import React, { Component } from 'react';
import '../CSSUser/Footer.css';
import { MDBInput } from "mdbreact";
import ovo from '../Image/ovo.png';
import linkaja from '../Image/linkaja.png';
import doku from '../Image/sakuku.png';
import dana from '../Image/dana.png';
import bca from '../Image/bca.png';
import mandiri from '../Image/mandiri.png'
import bni from '../Image/bni.png';
import bri from '../Image/bri.png'

class Footer extends Component {
    state = {}
    render() {
        return (
            <footer class="footer_area" style={{ backgroundColor: '#404040', color: 'white' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-6" style={{ backgroundColor: '#404040' }}>
                            <div class="single_ftr">
                                <h4 class="sf_title d-flex justify-content-center">Contacts</h4>
                                <ul>
                                    <center>
                                        <li style={{ fontSize: '13px' }}>Jl. Caringin Gg. Komplek Pasadena No. 60B <br /> RT02/RW03  Kec/Kel. Babakan Ciparay 40223 <br />Bandung, Jawa Barat, Indonesia</li>
                                        <li>022 - 88886011<br /> 0881 - 7758956</li>
                                        <li>sosissarenone@gmail.com</li>
                                    </center>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 " style={{ backgroundColor: '#404040' }}>
                            <div class="single_ftr">
                                <h4 class="sf_title  d-flex justify-content-center">Newsletter</h4>
                                <div class="newsletter_form">
                                    <center>

                                        <p>Menyediakan makanan beku yang sudah diolah dengan baik sehingga sehat untuk dikonsumsi </p>
                                        <form method="post" class="form-inline">
                                            <MDBInput backgroundColor='white' label="E-mail address" outline icon="envelope" style={{ color: 'white' }} />
                                        </form>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6" style={{ backgroundColor: '#404040' }}>
                            <div class="single_ftr">
                                <h4 class="sf_title  d-flex justify-content-center">Information</h4>
                                <ul>
                                    <center>
                                        <li><a href="#" style={{ color: 'white' }}>About Us</a></li>
                                        <li><a href="#" style={{ color: 'white' }}>Delivery Information</a></li>
                                        <li><a href="#" style={{ color: 'white' }}>Privacy Policy</a></li>
                                        <li><a href="#" style={{ color: 'white' }}>Contact Us</a></li>
                                    </center>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ftr_btm_area" >
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                <div class="ftr_social_icon">
                                    <center>
                                        <ul style={{ marginTop: '15px', backgroundColor: 'white' }}>
                                            <img src={bca} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                            <img src={mandiri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                            <img src={bni} alt="logo ovo" style={{ width: '15%', margin: '3%' }} />
                                            <img src={bri} alt="logo ovo" style={{ width: '20%', margin: '3%' }} />
                                        </ul>
                                    </center>
                                </div>
                            </div>
                            <div class="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                <p class="copyright_text text-center" style={{ marginTop: '25px' }}>© 2019 CV. HEAVEN SENTOSA</p>
                            </div>

                            <div class="col-sm-4" style={{ backgroundColor: '#404040' }}>
                                <div class="payment_mthd_icon text-right">
                                    <center>
                                        <ul style={{ marginTop: '15px', backgroundColor: 'white' }}>
                                            <img src={ovo} alt="logo ovo" style={{ width: '10%', margin: '3%' }} />
                                            <img src={dana} alt="logo ovo" style={{ width: '15%', margin: '3%' }} />
                                            <img src={doku} alt="logo ovo" style={{ width: '5%', margin: '3%' }} />
                                            <img src={linkaja} alt="logo ovo" style={{ width: '5%', margin: '3%' }} />
                                        </ul>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;