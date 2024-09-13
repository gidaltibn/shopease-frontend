import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionar
import { getProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard"; // Componente de exibição do produto
import CategoryMenu from "../../components/CategoryMenu"; // Componente do menu de categorias
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importando FontAwesomeIcon
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"; // Importando ícone de login
import "./ProductsPage.css"; // Arquivo de estilos da página

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para produtos filtrados
  const [featuredProduct, setFeaturedProduct] = useState(null); // Produto em destaque
  const [user, setUser] = useState(null); // Estado para controlar se o usuário está logado
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data); // Inicialmente, mostra todos os produtos

        // Definir o primeiro produto como o destaque
        if (response.data.length > 0) {
          setFeaturedProduct(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar os produtos", error);
      }
    };
    loadProducts();

    // Verificar se o usuário está logado
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Função para redirecionar para a página de login
  const handleLogin = () => {
    navigate("/login");
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  // Função para filtrar produtos pela categoria selecionada
  const handleCategorySelect = (category) => {
    if (category === "") {
      setFilteredProducts(products); // Exibe todos os produtos se nenhuma categoria for selecionada
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Função para redirecionar para a página de detalhes do produto
  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div className="container">
      {/* Header com botão de login */}
      <div className="header">
        <h1 className="store-title">Shopease</h1>
        <div className="auth-section">
          {user ? (
            <>
              <span>Bem-vindo, {user}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogin} className="login-button">
              <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          )}
        </div>
      </div>

      {/* Seção do produto em destaque */}
      {featuredProduct && (
        <div className="featured-product">
          <img
            src={featuredProduct.image}
            alt={featuredProduct.title}
            className="featured-image"
          />
          <div className="featured-info">
            <h2>{featuredProduct.title}</h2>
            <p>{featuredProduct.description}</p>
            <button
              onClick={() => handleProductClick(featuredProduct)}
              className="featured-button"
            >
              Ver Produto
            </button>
          </div>
        </div>
      )}

      {/* Menu de categorias */}
      <CategoryMenu onCategorySelect={handleCategorySelect} />

      {/* Exibição dos produtos em uma grid */}
      <div className="products-section">
        <h2 className="section-title">Mais Vendidos</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
