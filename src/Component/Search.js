import React, { Component } from 'react';
import '../CSSUser/Search.css';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBNavLink } from 'mdbreact';

class Search extends Component {
    state = {
        modal14: true
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBNavLink to='/'>
                        <MDBModalHeader toggle={this.toggle(14)}></MDBModalHeader>
                    </MDBNavLink>
                    <MDBModalBody>
                        <div class="container h-100" >
                            <div class="d-flex justify-content-center h-100">
                                <div class="searchbar">
                                    <input class="search_input" type="text" name="" placeholder="Search..." />
                                    <a href="/" class="search_icon"><i class="fas fa-search"></i></a>
                                </div>
                            </div>
                        </div>
                    </MDBModalBody>
                    <footer>
                        <center>

                            <div style={{margin:'20px', fontSize:'25px', fontFamily:'Hammersmith One, sans-serif'}}> FREE SEARCH AND FIND AGAIN!</div>
                        </center>
                    </footer>
                </MDBModal>
            </MDBContainer>


        );
    }
}

export default Search;