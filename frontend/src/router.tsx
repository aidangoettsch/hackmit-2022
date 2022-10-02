import React from "react";
import logo from "./logo.svg";

import { Route, Router, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Shopping from "./pages/Shopping";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Authentication from "./pages/Authentication";
import Register from "./pages/Register";
import NotFoundTitle from "./pages/404";
import Checkout from "./pages/Checkout";
import CategorySearch from "./components/CategorySearch";
import HomeShopping from "./components/HomeShopping";
import ItemSearch from "./components/ItemSearch";
import CartWrapper from "./components/CartWrapper";
import OrderStatus from "./pages/OrderStatus";

function App() {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === "/") {
      return null;
    }

    return <></>;
  };

  const renderFooter = () => {
    if (location.pathname === "/") {
      return null;
    }

    return <></>;
  };
  return (
    <>
      <Routes>
        {renderHeader()}
        <Route path="/" element={<Landing />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<Shopping />}>
          <Route index element={<HomeShopping />} />
          <Route path="category/:category" element={<CategorySearch />} />
          <Route path="item/:item" element={<ItemSearch />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/cart" element={<CartWrapper />}>
          <Route index element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:order" element={<OrderStatus />} />
        <Route path="*" element={<NotFoundTitle />} />
        {renderFooter()}
      </Routes>
    </>
  );
}

export default App;
