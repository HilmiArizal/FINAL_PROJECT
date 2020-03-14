import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardText, MDBCardTitle } from "mdbreact";
import LogoSarenOne from '../Image/Logo-SarenOne.png'
import Footer from '../Component/Footer';


class About extends Component {
    state = {}
    render() {
        return (
            <div>
                <NavbarUser />
                <div style={{ height: 'auto', marginTop: '110px' }}>
                    <MDBContainer className="mt-1 text-center" >
                        <MDBRow>
                            <MDBCol>
                                <MDBJumbotron className='#ffcc80 orange lighten-3'>
                                    <MDBCardBody>
                                        <center>
                                            <img src={LogoSarenOne} alt='gambarkanzler' width='20%' style={{ marginTop: '-190px' }} />
                                        </center>
                                        <MDBCardTitle className="h2" style={{ fontFamily: 'Hammersmith One, sans-serif', color:'black' }}>
                                            SarenOne Profile
                                </MDBCardTitle>
                                        <br />
                                        <MDBCardText className='h7' style={{ fontFamily: 'Hammersmith One, sans-serif', color:'black', fontSize:14 }}>
                                            Sosis Kanzler merupakan sosis khas Jerman yang diproduksi oleh PT Macroprima Panganutama (Cimory Group). Nama Kanzler berasal dari kata Jerman "kanselir" yang memiliki arti “kepala negara”.
                                            Munculnya ide pembuatan sosis Kanzler berawal dari Bapak Bambang Sutantio dan Mr. Hans Reusch yang berasal dari Jerman. Mereka menemukan banyak sosis di Jerman dengan rasa yang enak dan kualitas tinggi, sesuatu yang tidak ditemukan dalam sosis yang dijual di Indonesia. Atas dasar itu, mereka ingin memproduksi sosis yang halal, tanpa MSG, tanpa pewarna buatan, berkualitas premium sesuai SNI dan menggunakan bumbu sosis Jerman yang khas. Sosis Kanzler menjadi pelopor sosis halal premium di Indonesia sejak tahun 1999. Sertifikasi SNI/Halal mengacu pada SNI Sosis Daging 01-3820-1995. Produk Halal terdaftar di MUI No. 00010026961003.
                                            Sosis Kanzler dikenal sebagai "The Real Sausage" karena kualitasnya yang premium. Dibuat dengan hanya menggunakan daging sapi import, tanpa daging campuran dan komposisi daging yang lebih banyak hingga 4 kali lipat dibandingkan sosis lain yang ada di Indonesia. Perbandingan ini disimpulkan berdasarkan data riset internal.
                                </MDBCardText>
                                    </MDBCardBody>
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
                <div style={{marginTop:90}}>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default About;