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
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFoundTitle />} />
        {renderFooter()}
      </Routes>
    </>
  );
}

export default App;
