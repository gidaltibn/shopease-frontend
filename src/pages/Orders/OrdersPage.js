import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, addToCart, getProductById } from "../../services/api"; // Funções para obter pedidos e adicionar ao carrinho
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [productsDetails, setProductsDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login"); // Redirecionar se não estiver logado
        return;
      }

      try {
        const response = await getOrders(token); // Obtém os pedidos do backend
        setOrders(response.data.orders);

        // Buscar detalhes dos produtos para cada item no histórico de pedidos
        const productsInfo = {};
        await Promise.all(
          response.data.orders.flatMap((order) =>
            order.items.map(async (item) => {
              if (!productsInfo[item.product_id]) {
                const productDetails = await getProductById(item.product_id);
                productsInfo[item.product_id] = productDetails.data;
              }
            })
          )
        );
        setProductsDetails(productsInfo); // Armazena os detalhes dos produtos
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("access_token");
          navigate("/login"); // Redireciona para o login se o token for inválido
        }
        console.error("Erro ao carregar pedidos:", error);
      }
    };

    loadOrders();
  }, [navigate]);

  // Função para "Comprar novamente" que adiciona o item ao carrinho
  const handleBuyAgain = async (productId, quantity) => {
    const token = localStorage.getItem("access_token");
    try {
      const productDetails = productsDetails[productId]; // Usa os detalhes já buscados
      const cartItem = {
        product_id: productId,
        quantity: quantity,
      };
      await addToCart(cartItem, token);
      alert(`O produto ${productDetails.title} foi adicionado ao carrinho.`);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access_token");
        navigate("/login"); // Redireciona para o login se o token for inválido
      }
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  // Função para ir ao carrinho
  const handleGoToCart = () => {
    navigate("/cart");
  };

  // Função para ir à página inicial
  const handleGoToHome = () => {
    navigate("/products");
  };

  return (
    <div className="orders-container">
      <h2>Histórico de Pedidos</h2>

      {/* Botões para ir ao carrinho e à página inicial */}
      <div className="order-actions-header">
        <button className="go-to-cart-button" onClick={handleGoToCart}>
          Ir para o Carrinho
        </button>
        <button className="go-to-home-button" onClick={handleGoToHome}>
          Ir para a Tela Inicial
        </button>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.order_id} className="order-card">
              <div className="order-status">
                <span>Status: {order.status}</span>
                <button
                  className="add-all-button"
                  onClick={() =>
                    order.items.forEach((item) =>
                      handleBuyAgain(item.product_id, item.quantity)
                    )
                  }
                >
                  Adicionar tudo ao carrinho
                </button>
              </div>

              {order.items.map((item) => {
                const productDetails = productsDetails[item.product_id];
                return productDetails ? (
                  <div key={item.product_id} className="order-item">
                    <img
                      src={productDetails.image} // Usa a URL da imagem correta
                      alt={productDetails.title}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h3>{productDetails.title}</h3>
                      <p>Quantidade: {item.quantity}</p>
                      <p>Preço: R$ {item.price}</p>
                    </div>
                    <div className="order-actions">
                      <button
                        className="buy-again-button"
                        onClick={() =>
                          handleBuyAgain(item.product_id, item.quantity)
                        }
                      >
                        Comprar novamente
                      </button>
                    </div>
                  </div>
                ) : null;
              })}

              <div className="order-total">
                Total: R$ {order.total_price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Você não possui pedidos anteriores.</p>
      )}
    </div>
  );
};

export default OrdersPage;
