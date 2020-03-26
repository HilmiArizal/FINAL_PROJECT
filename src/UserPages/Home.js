import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import CarouselHome from '../Component/CarouselHome';
import NavbarUser from '../Component/NavbarUser';
import Footer from '../Component/Footer';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCard, MDBCardTitle, MDBBtn, MDBCardText, MDBNavLink } from 'mdbreact';
import '../CSSUser/Home.css'


class Home extends Component {
    state = {
        category: [],
        productpopuler: []
    }

    componentDidMount() {
        this.getCategory()
        this.getProductPopuler()
    }

    getCategory = () => {
        Axios.get(API_URL_1 + `products/getCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getProductPopuler = () => {
        Axios.get(API_URL_1 + `transaction/getProductPopuler`)
            .then((res) => {
                this.setState({ productpopuler: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetProductPopuler = () => {
        return this.state.productpopuler.map((item, index) => {
            return (
                <MDBCol key={index}>
                    <MDBCard style={{ width: "15rem" }}>
                        <MDBCardImage className="img-fluid" src={API_URL_1 + item.imagePath} waves style={{ width: 250 }} />
                        <MDBCardBody>
                            <MDBCardTitle className="detailmenu">{item.productname}</MDBCardTitle>
                            <MDBCardText>
                                Produk {item.productname} termasuk salah satu produk terbaik/terlaris dari SarenOne.
                                </MDBCardText>
                            <MDBBtn size="md" color="elegant" href={`productdetail?id=${item.productId}`}>BUY</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    renderGetCategory = () => {
        let { category } = this.state;
        return category.map((item, index) => {
            return (
                <MDBCol key={index}>
                    <MDBCard style={{ width: "12rem" }}>
                        <img className="img-fluid" src={item.imagecategory} waves style={{ width: 130, marginTop: 20 }} />
                        <MDBCardBody>
                            <MDBCardTitle className="detailmenu" style={{ fontSize: 20 }}>{item.category}</MDBCardTitle>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <NavbarUser />
                <CarouselHome />
                <div className='home' style={{margin: 10}}>
                    OUR MENUS
                </div>
                <MDBContainer>
                    <center>
                        <MDBRow>
                            {this.renderGetCategory()}
                        </MDBRow>
                    </center>
                    <div style={{ border: '2px solid black', marginTop: 50 }}></div>
                    <div className='home' style={{ margin: 10 }}>
                        BEST SELLER
                    </div>
                    <center>
                        <MDBRow>
                            {this.renderGetProductPopuler()}
                        </MDBRow>
                    </center>
                    <div style={{ border: '2px solid black', marginTop: 50 }}></div>
                    <div id="howtoorder" className='home' style={{ margin: 10 }}>
                        HOW TO ORDER
                    </div>
                    <div style={{ minHeight: '50vh' }}>
                        <div className="jumbotron" style={{ borderRadius: 20, fontSize: 15 }}>
                            1. Harus memiliki akun. Jika belum memiliki akun, silahkan mendaftar terlebih dahulu <Link to="/register">disini</Link>.
                        <br />
                            2. Setelah form registrasi sudah diisi dengan benar, maka akan diminta untuk melakukan verifikasi melalui email yang telah didaftarkan.
                        <br />
                            3. Jika sudah verifikasi, maka akun tersebut sudah dapat digunakan dan terverifikasi. Perbedaan jika belum verifikasi, akun dapat digunakan namun pemilik akun tidak bisa berbelanja. Tetapi anda akan diminta untuk mengisi data profile terlebih dahulu, yang berguna untuk mempermudah akses informasi ketika memulai belanja.
                        <br />
                            4. Untuk memulai belanja, silahkan pergi ke halaman product yang tercantum di menu atas. Atau bisa dengan mengklik ini <Link to="/product">SarenOne Products</Link>.
                        <br />
                            5. Pada halaman tersebut terdapat berbagai macam varian produk SarenOne. Klik jika sudah pasti dengan produknya.
                        <br />
                            6. Setelah mengklik produk tersebut, maka akan diberikan sedikit penjelasan mengenai deskripsi produknnya. Dan di halaman ini, anda akan diminta untuk memilih beberapa berat/ukuran dari produk yang sudah anda pilih. Anda dapat membeli banyak dengan mengklik (+) pada tombol kuantitas. Dan sebaliknya jika ingin mengurangi kuantitas bisa dengan mengklik (-). Dengan mengklik kuantitas, total harga yang harus dibayar secara otomatis ditampilkan dibagian bawah. Jika sudah pasti, silahkan untuk mengklik ADD TO CART.
                        <br />
                            7. Anda akan dipindahkan ke halaman CART, halaman ini adalah tempat menyimpan keranjang belanjaan yang sudah anda pilih. Anda bisa menambahkan barang lagi/membatalkan keranjang yang sudah anda pilih pada kolom action.
                        <br />
                            8. Jika sudah pasti dengan belanjaan yang sudah anda pilih/kumpulkan, silahkan untuk mengklik CheckOut.
                        <br />
                            9. Jika anda sudah melengkapi data profile pada saat pertama kali mendaftar, maka secara otomatis profile tersebut sudah terisi dan silahkan di periksa kembali. Jika belum melengkapi data/ada kesalahan dari data profile, silahkan isi/ganti terlebih dahulu. Dipastikan data tersebut sudah benar, agar kami dapat memproses pesanannya dengan cepat. Jika sudah pasti, klik payment untuk proses pembayaran.
                        <br />
                            10. Silahkan untuk memilih metode pembayaran, lalu secara otomatis akan diberikan no. Rekening sesuai dengan bank yang anda pilih A/n CV. Heaven Sentosa.
                        <br />
                            11. Jika sudah transfer, dimohon untuk mengupload bukti transfer tersebut agar status UNPAID menjadi PAID/ON PROSES pesanannya.
                        <br />
                            12. Silahkan untuk mengunjungi transaction, untuk melihat riwayat transaksi, detail belanjaan, melihat status.
                        <br />
                            13. Info lebih lanjut, silahkan menghubungi 022-88886011/0881-7758956 Hilmi.
                        </div>
                    </div>
                </MDBContainer>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;