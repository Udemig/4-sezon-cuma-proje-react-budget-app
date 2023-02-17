import React, { useEffect, useState } from "react";

import "../assets/styles/categoryOperations.css";

import Header from "../components/Header";

import axios from "axios";

import addIcon from "../assets/imgs/add.png";
import addIconHover from "../assets/imgs/addHover.png";

import { useNavigate } from "react-router-dom";

const CategoryOperations = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [addBtnHovered, setAddBtnHovered] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, []);
  if (categories === null) return null;
  return (
    <div>
      <Header whichPage={"categoryOperations"} navigateTo="/" />
      <div className="categoryOperationsContainer">
        <button
          onClick={() => navigate("/add-category")}
          className="addBtnCategoryOperations"
          onMouseLeave={() => setAddBtnHovered(false)}
          onMouseEnter={() => setAddBtnHovered(true)}>
          {addBtnHovered === false ? (
            <img src={addIcon} />
          ) : (
            <img src={addIconHover} />
          )}
        </button>
        <div className="categoryOperationsContentWrapper">
          {categories.length === 0 && <p>Henüz kayıtlı bir kategori yok</p>}
          {categories.length > 0 && (
            <>
              {categories.map((category) => (
                <div
                  className="categoryOperationsCategoryWrapper"
                  key={category.id}>
                  <p>{category.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryOperations;
