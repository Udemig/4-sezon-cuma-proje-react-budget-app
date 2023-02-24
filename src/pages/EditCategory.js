import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import "../assets/styles/addExpense.css";

import GeneralModal from "../components/GeneralModal";
import { checkSpecialCharsAndNumbers } from "../utils/functions";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [oldName, setOldName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories`)
      .then((res) => {
        console.log(res.data);
        setAllCategories(res.data);
        /* aşağıdaki find ve for aynı işi yapıyor */
        const myCat = res.data.find((item) => item.id === categoryId);
        /* let myCat=null
        for(let i=0;i < res.data.length; i++){
            if(res.data[i].id === categoryId){
                myCat=res.data[i]
            }
        } */
        setForm(myCat);
        setOldName(myCat.name);
      })
      .catch((err) => {});
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "") {
      alert("Kategori adı boş bırakılamaz");
      return;
    }
    if (form.name.length <= 2) {
      alert("Kategori adı en az 3 harften oluşmalıdır");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === form.name.toLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("Bu kategori zaten mevcut");
      return;
    }
    if(checkSpecialCharsAndNumbers(form.name)){
      alert("Kategori adı özel karakter içeremez")
      return
    }
    axios
      .put(`http://localhost:3004/categories/${categoryId}`, form)
      .then((res) => {
        setOpenModal(true);
      })
      .catch((err) => {});
  };
  if (form === null || allCategories === null) return null;
  return (
    <div>
      <Header navigateTo={"/category-operations"} whichPage="editCategory" />
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="formElement">
            <label htmlFor="name">Kategori Adı</label>
            <input
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              id="name"
              type={"text"}
            />
          </div>

          <div className="submitBtnWrapper">
            <button
              disabled={
                form.name.toLowerCase() === oldName.toLowerCase() ||
                form.name.length <= 2
                  ? true
                  : false
              }
              className="submitBtn"
              type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      {openModal && (
        <GeneralModal
          title="Başarılı"
          content="Kategori başarıyla güncellendi"
          hasConfirm={false}
          closeButtonText="Kategori İşlemlerine Dön"
          closeButtonClick={() => navigate("/category-operations")}
        />
      )}
    </div>
  );
};

export default EditCategory;
