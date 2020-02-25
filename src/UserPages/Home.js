import React, { Component } from 'react';
import '../CSSUser/Home.css'
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import CarouselHome from '../Component/CarouselHome';
import NavbarUser from '../Component/NavbarUser';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


class Home extends Component {
    state = {
        category: []
    }

    componentDidMount() {
        Axios.get(API_URL_1 + `products/getCategory`)
            .then((res) => {
                this.setState({ category: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    renderGetCategory = () => {
        let { category } = this.state;
        return category.map((item, index) => {
            return (
                <MDBCol md='4' key={index}>
                    <center>
                        <div className='menu'>
                            <div className='gambarmenu'>
                                <img src={item.imagecategory} alt='categoryproduct' className='isigambar' />
                            </div>
                            <div className='detailmenu'>
                                {item.category}
                            </div>
                        </div>
                    </center>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <NavbarUser />
                <CarouselHome />
                <div className='home'>
                    OUR MENUS
                </div>
                <div className='d-flex justify-content-center'>
                    <MDBContainer>
                        <MDBRow>
                            {this.renderGetCategory()}
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default Home;