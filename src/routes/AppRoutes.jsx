import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../components/NotFound/NotFound";
import Checkout from "../pages/Checkout";
import PrivateRoute from "./PrivateRoute";
import AdminPanel from "../pages/AdminPanel";

// Componentes vacíos para las páginas que faltan
const Cart = () => <div className="text-center p-8 text-2xl">Carrito de compras (en construcción)</div>;
const Sucess = () => <div className="text-center p-8 text-2xl">¡Compra exitosa! (en construcción)</div>;

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/productos" element={<Layout><ProductList /></Layout>} />
    <Route path="/producto/:productId" element={<Layout><ProductDetail /></Layout>} />
    <Route path="/carrito" element={<Layout><Cart /></Layout>} />
    <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
    <Route path="/sucess" element={<Layout><Sucess /></Layout>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Ruta protegida para admin */}
    <Route
      path="/admin"
      element={
        <PrivateRoute requiredRole="admin">
          <Layout>
            <AdminPanel />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route path="*" element={<Layout><NotFound /></Layout>} />
  </Routes>
);

export default AppRoutes;
