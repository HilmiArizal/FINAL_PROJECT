import React, { Component } from 'react';
import '../CSSUser/404.css';
import UnverifiedLogo from '../Image/Unverified.png';
import { connect } from 'react-redux';


class Unverified extends Component {
    render() {
        console.log(this.props.status)
        return (
            <div className="error-content" style={{ marginTop: 100 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="error-text" style={{marginTop:70}}>
                                <img src={UnverifiedLogo} alt='unverified' width='70%' />
                                <br/>
                                <br/>
                                <h3>Oops! Sorry, your account must be verified, Check your email!</h3>
                                <br/>

                                {
                                    this.props.status === 'verified'
                                        ?
                                        <a href="/" className="btn btn-primary btn-round">Go to Homepage</a>
                                        :
                                        <a href="https://mail.google.com" className="btn btn-primary btn-round">Go to Email for verified</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        status: state.user.status
    }
}

export default connect(mapStatetoProps)(Unverified);