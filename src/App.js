import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { keepLogin } from './Redux/Action';
import Sidebar from './AdminPages/Sidebar';
import Profile from './AdminPages/Profile';
import HisTransaction from './AdminPages/HistoryTransaction';
import EditDelete from './AdminPages/EditDelete';
import SeeProduct from './AdminPages/SeeProduct';
import AddProduct from './AdminPages/AddProduct';
import EditProduct from './AdminPages/EditProduct';
import LoginPage from './UserPages/Login';
import RegisterPage from './UserPages/Register';
import Home from './UserPages/Home';
import Product from './UserPages/Product';
import DetailProduct from './UserPages/DetailProduct';
import Verified from './UserPages/Verified';
import Cart from './UserPages/Cart';
import ProfileUser from './UserPages/ProfileUser';
import Promotion from './UserPages/Promotion';
import About from './UserPages/About';
import ChangePass from './UserPages/ChangePass';
import DeleteAccount from './UserPages/DeleteAccount';
import UserTransaction from './UserPages/UserTransaction';
import HistoryTransactionUser from './UserPages/HistoryTransaction';
import Unverified from './UserPages/UnverifiedPage';
import LoginAdmin from './AdminPages/LoginAdmin';
import PendingTransaction from './AdminPages/PendingTransaction';
import ManageProduct from './AdminPages/ManageProduct';
import TransactionAdmin from './AdminPages/TransactionAdmin';
import ListProduct from './AdminPages/ListProduct';
import ManageUser from './AdminPages/ManageUser';

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
          <Route path='/' component={Profile} exact />
          <Route path='/addproduct' component={AddProduct} />
          <Route path='/editdelete' component={EditDelete} />
          <Route path='/editproduct' component={EditProduct} />
          <Route path='/seeproduct' component={SeeProduct} />
          <Route path='/listproduct' component={ListProduct} />
          <Route path='/historytransactionadmin' component={HisTransaction} />
          <Route path='/pendingtransaction' component={PendingTransaction} />
          <Route path='/manageproduct' component={ManageProduct} />
          <Route path='/transaction' component={TransactionAdmin} />
          <Route path='/manageuser' component={ManageUser} />
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
          <Route path='/cart' component={Cart} />
          <Route path='/verified' component={Verified} />
          <Route path='/profileuser' component={ProfileUser} />
          <Route path='/promotion' component={Promotion} />
          <Route path='/about' component={About} />
          <Route path='/changepass' component={ChangePass} />
          <Route path='/deleteaccount' component={DeleteAccount} />
          <Route path='/transaction' component={UserTransaction} />
          <Route path='/historytransaction' component={HistoryTransactionUser} />
          <Route path='/unverified' component={Unverified} />
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
          <Route path='/profileuser' component={ProfileUser} />
          <Route path='/promotion' component={Promotion} />
          <Route path='/about' component={About} />
          <Route path='/unverified' component={Unverified} />
          <Route path='/loginadmin' component={LoginAdmin} />
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