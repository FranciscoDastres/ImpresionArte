import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Sucess from "../pages/Sucess";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../components/NotFound/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<ProductList />} />
    <Route path="/producto/:productId" element={<ProductDetail />} />
    <Route path="/carrito" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/sucess" element={<Sucess />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
