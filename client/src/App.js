import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { API, setAuthToken } from "./config/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";

import Header from "./components/Header.js";
import PrivateRoute from "./components/PrivateRoute";

import Landing from "./pages/user/Landing.js";
import Product from "./pages/user/Product.js";
import Cart from "./pages/user/Cart";
import DetailOrder from "./pages/user/detailOrder";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/editProfile";

// Partner Pages
import Partner from "./pages/partner/Partner";
import AddProduct from "./pages/partner/addProduct";
import Products from "./pages/partner/products";
import EditProduct from "./pages/partner/editProduct";
import ProfilePartner from "./pages/partner/profilePartner";
import EditProfilePartner from "./pages/partner/editProfilePartner";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className="mb-5">
        <Router>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/products/:slug" component={Product} />
          <PrivateRoute exact path="/carts" component={Cart} />
          <PrivateRoute exact path="/detail-order" component={DetailOrder} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/partner" component={Partner} />
          <PrivateRoute
            exact
            path="/partner/add-product"
            component={AddProduct}
          />
          <PrivateRoute exact path="/partner/products" component={Products} />
          <PrivateRoute
            exact
            path="/partner/edit/product/:id"
            component={EditProduct}
          />
          <PrivateRoute
            exact
            path="/partner/profile-partner"
            component={ProfilePartner}
          />
          <PrivateRoute
            exact
            path="/partner/edit/profile-partner"
            component={EditProfilePartner}
          />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
