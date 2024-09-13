import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";

function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categoriesData = await getCategories();
    setCategories(categoriesData);
  };

  return (
    <nav className="navbar">
      <ul className="menu-categories">
        {categories.map((category) => (
          <li key={category}>
            <a href={`/category/${category}`}>{category}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
