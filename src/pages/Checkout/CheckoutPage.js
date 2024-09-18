import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getProductById, checkout } from "../../services/api"; // Funções da API
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  // Função para carregar os itens do carrinho com detalhes do produto
  const loadCartItems = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await getCart(token); // Obtém os itens do carrinho do backend
      const cartItemsWithDetails = await Promise.all(
        response.data.items.map(async (item) => {
          const productDetails = await getProductById(item.product_id); // Obtém detalhes do produto
          return {
            ...item,
            ...productDetails.data, // Adiciona os detalhes do produto ao item do carrinho
          };
        })
      );

      setCartItems(cartItemsWithDetails);
      calculateTotalPrice(cartItemsWithDetails);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
      console.error("Erro ao carregar os itens do carrinho:", error);
    }
  };

  // Função para calcular o preço total do carrinho
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Função para finalizar o pedido e redirecionar para o histórico de compras
  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await checkout(token); // Chama a função de checkout na API
      navigate("/orders"); // Redireciona para a página de histórico de compras após o checkout
    } catch (error) {
      console.error("Erro ao finalizar o checkout:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>

      {cartItems.length > 0 ? (
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.product_id} className="checkout-item">
              <img
                src={item.image}
                alt={item.title}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <h3>{item.title}</h3>
                <p>Preço: R$ {item.price}</p>
                <p>Quantidade: {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="checkout-total">
            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Confirmar Pedido
            </button>
          </div>
        </div>
      ) : (
        <p>Seu carrinho está vazio.</p>
      )}
    </div>
  );
};

export default CheckoutPage;
