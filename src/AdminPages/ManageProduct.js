import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';


class ManageProduct extends Component {

    render() {
        return (
            <div>
                <MDBContainer style={{ marginTop: 30 }}>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10" style={{ height: 600 }}>
                            <center>
                                <div style={{ fontSize: '250%', fontFamily: 'Hammersmith One, sans-serif' }}>MANAGE PRODUCT</div>
                            </center>
                            <div className="row" style={{ marginTop: 30 }}>
                                <div className="col-6" style={{ height: 300, backgroundColor: '#778899', paddingTop: 100, textAlign: "center", fontSize: 30 }}>
                                    <center>
                                        LIHAT SEMUA PRODUK
                                        <Link to="seeproduct" style={{ color: "black" }}>
                                            <button className="form-control" style={{ width: 150 }}> Click Here</button>
                                        </Link>
                                    </center>
                                </div>
                                <div className="col-6" style={{ height: 300, backgroundColor: '#B0C4DE', paddingTop: 100, textAlign: "center", fontSize: 30 }}>
                                    <center>
                                        TAMBAH PRODUK
                                        <Link to="addproduct" style={{ color: "black" }}>
                                            <button className="form-control" style={{ width: 150 }}> Click Here</button>
                                        </Link>
                                    </center>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6" style={{ height: 300, backgroundColor: '#B0C4DE', paddingTop: 100, textAlign: "center", fontSize: 30 }}>
                                    <center>
                                        EDIT PRODUK
                                        <Link to="editdelete" style={{ color: "black" }}>
                                            <button className="form-control" style={{ width: 150 }}> Click Here</button>
                                        </Link>
                                    </center>
                                </div>
                                <div className="col-6" style={{ height: 300, backgroundColor: '#778899', paddingTop: 100, textAlign: "center", fontSize: 30 }}>
                                    <center>
                                        LIST PRODUK
                                        <Link to="listproduct" style={{ color: "black" }}>
                                            <button className="form-control" style={{ width: 150 }}> Click Here</button>
                                        </Link>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default ManageProduct;