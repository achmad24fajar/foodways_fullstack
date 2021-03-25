import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

import { UserContextProvider } from "./context/userContext"
import { CartContextProvider } from "./context/cartContext";

import Header from './components/Header.js'
import PrivateRoute from './components/PrivateRoute'

import Landing from './pages/user/Landing.js'
import Product from './pages/user/Product.js'
import Cart from './pages/user/Cart'
import DetailOrder from './pages/user/detailOrder'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/editProfile'

// Partner Pages
import Partner from './pages/partner/Partner'
import AddProduct from './pages/partner/addProduct'
import ProfilePartner from './pages/partner/profilePartner'
import EditProfilePartner from './pages/partner/editProfilePartner'

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
      <div className="mb-5">
        <Router>
          <Header />
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/detail-product/:id" component={Product} />
          <PrivateRoute exact path="/carts" component={Cart} />
          <PrivateRoute exact path="/detail-order" component={DetailOrder} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/partner" component={Partner} />
          <PrivateRoute exact path="/partner/add-product" component={AddProduct} />
          <PrivateRoute exact path="/partner/profile-partner" component={ProfilePartner} />
          <PrivateRoute exact path="/partner/edit/profile-partner" component={EditProfilePartner} />
        </Router>
      </div>
      </CartContextProvider>
    </UserContextProvider>

  );
}

export default App;
