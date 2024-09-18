import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api"; // Função que realiza o login
import logo from "../../assets/images/shopease_logo.webp"; // Importa a logo
import "./LoginPage.css"; // Arquivo de estilo para a página de login

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { access_token, user, message } = response.data;

      // Verificar se houve mensagem de erro
      if (message === "Invalid email or password") {
        setError("Usuário ou senha inválidos. Tente novamente.");
      } else {
        // Armazena o token e nome do usuário no localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", user);
        setError(""); // Limpa qualquer erro anterior
        navigate("/products"); // Redireciona para a página de produtos após o login bem-sucedido
      }
    } catch (err) {
      setError("Erro ao realizar o login. Verifique suas credenciais.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Shopease" className="logo" />
      <h2>Entrar no Shopease</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Exibe mensagem de erro */}
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      <p className="login-footer">
        Não tem uma conta? <a href="/signup">Cadastre-se</a>
      </p>
    </div>
  );
};

export default LoginPage;
