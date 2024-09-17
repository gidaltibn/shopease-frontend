import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getProductById,
  updateCartItem,
  removeFromCart,
} from "../../services/api"; // Funções da API para manipular o carrinho e produtos
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  // Função para carregar os itens do carrinho com os detalhes do produto
  const loadCartItems = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await getCart(token); // Obtém os itens do carrinho do backend
      console.log(response);
      const cartItemsWithDetails = await Promise.all(
        response.data.items.map(async (item) => {
          const productDetails = await getProductById(item.product_id); // Busca detalhes do produto pelo product_id
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
        navigate("/login"); // Redireciona para a página de login se o token for inválido
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

  // Função para alterar a quantidade de um item com o token de autorização
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Não permite quantidades menores que 1
    const token = localStorage.getItem("access_token");

    try {
      await updateCartItem(itemId, newQuantity, token); // Atualiza a quantidade no backend com o token
      loadCartItems(); // Recarrega os itens do carrinho
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access_token");
        navigate("/login"); // Redireciona para a página de login se o token for inválido
      }
      console.error("Erro ao atualizar a quantidade:", error);
    }
  };

  // Função para remover um item do carrinho com o token de autorização
  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("access_token");

    try {
      await removeFromCart(itemId, token); // Remove o item do carrinho no backend com o token
      loadCartItems(); // Recarrega os itens do carrinho
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access_token");
        navigate("/login"); // Redireciona para a página de login se o token for inválido
      }
      console.error("Erro ao remover o item:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Seu Carrinho de Compras</h2>

      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Preço: R$ {item.price}</p>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="remove-button"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-button"
            >
              Finalizar Compra
            </button>
            <button
              onClick={() => navigate("/products")}
              className="continue-shopping-button"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      ) : (
        <p>Seu carrinho está vazio.</p>
      )}
    </div>
  );
};

export default CartPage;
