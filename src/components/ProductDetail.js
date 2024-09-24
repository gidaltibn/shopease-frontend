import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../services/api"; // Função para adicionar ao carrinho
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Ícone de voltar
import "./ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product; // Recebe o produto via parâmetro
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Estado para controlar a quantidade

  // Função para adicionar o produto ao carrinho
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); // Redireciona para a página de login se o usuário não estiver logado
    } else {
      try {
        // Lógica para adicionar o produto ao carrinho com o token de autorização
        const cartItem = {
          product_id: product.id,
          quantity: quantity,
        };
        await addToCart(cartItem, token); // Função que envia a requisição ao backend

        // Exibe o alerta e redireciona para a página de produtos
        alert(`${product.title} adicionado ao carrinho com sucesso!`);
        navigate("/products"); // Volta para a página de produtos
      } catch (error) {
        // Tratamento de erros 401 e 405
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 405)
        ) {
          console.error(
            "Erro de autorização ou método não permitido, solicitando novo login."
          );
          localStorage.removeItem("token"); // Limpa o token armazenado
          navigate("/login"); // Redireciona para a página de login
        } else {
          console.error("Erro ao adicionar ao carrinho:", error);
        }
      }
    }
  };

  // Função para incrementar ou decrementar a quantidade
  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === "increment") return prevQuantity + 1;
      if (type === "decrement" && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="product-detail-container">
      {/* Ícone de voltar no canto esquerdo superior */}
      <div className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Preço:</strong> R$ {product.price}
        </p>
        <p>
          <strong>Categoria:</strong> {product.category}
        </p>
        <p>
          <strong>Avaliação:</strong> {product.rating.rate} / 5 (
          {product.rating.count} avaliações)
        </p>

        {/* Controle de quantidade */}
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange("decrement")}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange("increment")}>+</button>
        </div>

        {/* Botão para adicionar ao carrinho */}
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
