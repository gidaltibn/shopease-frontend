// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from "./pages/SignUp/SignUpPage";
import CartPage from "./pages/Cart/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
