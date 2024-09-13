import React, { useState, useEffect } from "react";
import { getCategories } from "../services/api";
import "./CategoryMenu.css";

const CategoryMenu = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  // Carregar categorias da API
  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    }
  };

  return (
    <div className="category-menu">
      <ul>
        <li onClick={() => onCategorySelect("")}>todos</li>
        {categories.map((category) => (
          <li key={category} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
