import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api"; // Importa a função de registro da API
import logo from "../../assets/images/shopease_logo.webp";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [success, setSuccess] = useState(false); // Estado para notificação de sucesso
  const navigate = useNavigate();

  // Função para lidar com a mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se as senhas são iguais
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    try {
      // Chamar a API para registrar o usuário
      await register(formData.username, formData.email, formData.password);

      // Exibir notificação de sucesso
      setSuccess(true);
      setError("");

      // Redirecionar para a tela de login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Erro ao realizar o cadastro. Tente novamente.");
      setSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <img src={logo} alt="Shopease" className={styles.logo} />
        <h2 className={styles.title}>Cadastre-se no Shopease</h2>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Exibe mensagem de erro */}
        {success && (
          <p className={styles.success}>
            Cadastro realizado com sucesso! Redirecionando...
          </p>
        )}{" "}
        {/* Exibe mensagem de sucesso */}
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.signupButton}>
            Cadastrar
          </button>
        </form>
        <p className={styles.signupFooter}>
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
