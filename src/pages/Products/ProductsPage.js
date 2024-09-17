import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import CategoryMenu from "../../components/CategoryMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons"; // Importando ícones
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
        if (response.data.length > 0) {
          setFeaturedProduct(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar os produtos", error);
      }
    };
    loadProducts();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const handleCategorySelect = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="container">
      {/* Header com nome do usuário, botão de logout e carrinho */}
      <div className="header">
        <h1 className="store-title">Shopease</h1>
        <div className="auth-section">
          {user ? (
            <>
              <span>Bem-vindo, {user}!</span>
              <button onClick={handleLogout} className="logout-button">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
              <button onClick={handleCartClick} className="cart-button">
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
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
