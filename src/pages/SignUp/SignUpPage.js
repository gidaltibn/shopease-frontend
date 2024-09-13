import React, { useState } from "react";
import logo from "../../assets/images/shopease_logo.webp";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui vai a lógica para envio dos dados de cadastro
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <img src={logo} alt="Shopease" className={styles.logo} />
        <h2 className={styles.title}>Cadastre-se no Shopease</h2>
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
