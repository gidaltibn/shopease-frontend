import axios from "axios";

// Definindo a URL base da API backend
const API_URL = "http://127.0.0.1:5000"; // URL da sua API backend

// Criando uma instância do axios com a URL base da API
export const api = axios.create({
  baseURL: API_URL,
});

// Funções relacionadas à autenticação

// Função para login: Envia uma requisição POST para "/auth/login" com o email e senha do usuário
export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

// Função para registro: Envia uma requisição POST para "/auth/register" com nome de usuário, email e senha
export const register = (username, email, password) => {
  return api.post("/auth/register", { username, email, password });
};

// Funções relacionadas aos produtos

// Função para buscar todos os produtos: Envia uma requisição GET para "/products"
export const getProducts = () => {
  return api.get("/products");
};

// Função para buscar um produto específico pelo ID: Envia uma requisição GET para "/products/{productId}"
export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

// Funções relacionadas ao carrinho

// Função para obter os itens do carrinho do usuário: Envia uma requisição GET para "/cart" com o token de autorização
export const getCart = (token) => {
  return api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` }, // Token JWT necessário para autenticação
  });
};

// Função para adicionar um item ao carrinho: Envia uma requisição POST para "/cart/add" com os dados do item e o token
export const addToCart = async (cartItem, token) => {
  return await axios.post(`${API_URL}/cart/add`, cartItem, {
    headers: {
      Authorization: `Bearer ${token}`, // Token JWT necessário para autenticação
    },
  });
};

// Função para atualizar a quantidade de um item no carrinho: Envia uma requisição POST para "/cart/update" com o ID do item e a nova quantidade
export const updateCartItem = (itemId, quantity, token) => {
  return api.post(
    `/cart/update`,
    { product_id: itemId, quantity }, // Envia o ID do produto e a nova quantidade
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT necessário para autenticação
    }
  );
};

// Função para remover um item do carrinho: Envia uma requisição POST para "/cart/remove" com o ID do produto e o token
export const removeFromCart = (productId, token) => {
  return api.post(
    `/cart/remove`,
    { product_id: productId }, // Envia o ID do produto a ser removido
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT necessário para autenticação
    }
  );
};

// Função relacionada ao checkout

// Função para finalizar a compra (checkout): Envia uma requisição POST para "/checkout" com o token de autenticação
export const checkout = (token) => {
  return api.post(
    "/checkout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` }, // Token JWT necessário para autenticação
    }
  );
};

// Função relacionada ao histórico de pedidos

// Função para obter o histórico de pedidos do usuário: Envia uma requisição GET para "/orders" com o token de autenticação
export const getOrders = (token) => {
  return api.get("/orders", {
    headers: { Authorization: `Bearer ${token}` }, // Token JWT necessário para autenticação
  });
};

// Função para obter as categorias dos produtos

// Função para buscar as categorias disponíveis na lista de produtos
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`); // Faz a requisição para obter todos os produtos
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
