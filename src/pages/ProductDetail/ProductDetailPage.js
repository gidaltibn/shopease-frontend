import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail";

const ProductDetailPage = () => {
  const location = useLocation();
  const { product } = location.state; // Recebe o produto da página anterior

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
