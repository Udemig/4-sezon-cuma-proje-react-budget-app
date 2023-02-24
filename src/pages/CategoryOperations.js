import React, { useEffect, useState } from "react";

import "../assets/styles/categoryOperations.css";

import Header from "../components/Header";

import axios from "axios";

import addIcon from "../assets/imgs/add.png";
import addIconHover from "../assets/imgs/addHover.png";

import { useNavigate, Link } from "react-router-dom";

import GeneralModal from "../components/GeneralModal";

import { upperFirstLetter } from "../utils/functions";

const CategoryOperations = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [addBtnHovered, setAddBtnHovered] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [willDeleteCategory, setWillDeleteCategory] = useState("");
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, [didUpdate]);
  const deleteCategory = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        setOpenDeleteModal(false);
        setDidUpdate(!didUpdate);
      })
      .catch((err) => {});
  };
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
                  <p>{upperFirstLetter(category.name)}</p>
                  <div>
                    <button
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setWillDeleteCategory(category.id);
                      }}
                      className="deleteBtn">
                      Sil
                    </button>
                    <Link to={`/edit-category/${category.id}`} className="editBtn">Güncelle</Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {openDeleteModal && (
        <GeneralModal
          title="Kategori Sil"
          content="Kategori silindiğinde kategoriye ait bütün harcama verileri de silinir. Devam etmek istediğinize emin misiniz?"
          closeButtonText="Vazgeç"
          closeButtonClick={() => setOpenDeleteModal(false)}
          confirmButtonText="Sil"
          confirmButtonClick={() => deleteCategory(willDeleteCategory)}
          hasConfirm={true}
        />
      )}
    </div>
  );
};

export default CategoryOperations;
