import React from "react";
import "./ProductCard.css"; // Estilos do cartão de produto

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>R$ {product.price}</p>
    </div>
  );
};

export default ProductCard;
