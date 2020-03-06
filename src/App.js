import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './UserPages/Home';
import LoginPage from './UserPages/Login';
import RegisterPage from './UserPages/Register';
import { connect } from 'react-redux';
import { keepLogin } from './Redux/Action';
import Homepage from './AdminPages/Home';
import Sidebar from './AdminPages/Sidebar';
import Profile from './AdminPages/Profile';
import HisTransaction from './AdminPages/HistoryTransaction';
import Product from './UserPages/Product';
import EditDelete from './AdminPages/EditDelete';
import SeeProduct from './AdminPages/SeeProduct';
import AddProduct from './AdminPages/AddProduct';
import DetailProduct from './UserPages/DetailProduct';
import EditProduct from './AdminPages/EditProduct';
import ProfileCart from './UserPages/ProfileCartUser';
import Verified from './UserPages/Verified';

class App extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.keepLogin()
    }
  }

  render() {
    if (this.props.role === 'admin') {
      return (
        <div>
          <Sidebar />
          <Route path='/' component={Homepage} exact />
          <Route path='/profile' component={Profile} />
          <Route path='/addproduct' component={AddProduct} />
          <Route path='/editdelete' component={EditDelete} />
          <Route path='/editproduct' component={EditProduct} />
          <Route path='/seeproduct' component={SeeProduct} />
          <Route path='/histransaction' component={HisTransaction} />
        </div>
      )
    } else if (this.props.role === 'user') {
      return (
        <div>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/product' component={Product} />
          <Route path='/productdetail' component={DetailProduct} />
          <Route path='/profilecart' component={ProfileCart} />
          <Route path='/verified' component={Verified} />
        </div>
      )
    } else {
      return (
        <div>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/product' component={Product} />
          <Route path='/productdetail' component={DetailProduct} />
          <Route path='/profilecart' component={ProfileCart} />
          <Route path='/verified' component={Verified} />
        </div>
      )
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    role: state.user.role
  }
}
export default connect(mapStatetoProps, { keepLogin })(App);