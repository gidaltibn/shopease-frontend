import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // URL da sua API backend

export const api = axios.create({
  baseURL: API_URL,
});

// Autenticação
export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = (username, email, password) => {
  return api.post("/auth/register", { username, email, password });
};

// Produtos
export const getProducts = () => {
  return api.get("/products");
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

// Carrinho
export const getCart = (token) => {
  return api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCart = async (cartItem, token) => {
  return await axios.post(`${API_URL}/cart/add`, cartItem, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFromCart = (productId, token) => {
  return api.delete(`/cart/remove/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Checkout
export const checkout = (token) => {
  return api.post(
    "/cart/checkout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Histórico de Pedidos
export const getOrders = (token) => {
  return api.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;

    // Extrair as categorias dos produtos e remover duplicatas
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;

    // Filtrar os produtos pela categoria selecionada
    return products.filter((product) => product.category === category);
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return [];
  }
};
