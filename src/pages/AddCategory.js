import React, { useState, useEffect } from "react";

import Header from "../components/Header";

import "../assets/styles/addExpense.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { checkSpecialCharsAndNumbers } from "../utils/functions";

const AddCategory = () => {
    const navigate=useNavigate()
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "") {
      alert("Kategori adı boş olamaz");
      return;
    }
    const hasCategory=categories.find(item => item.name.toLowerCase() === form.name.toLowerCase())
    
    if(hasCategory !== undefined){
        alert("Bu kategori zaten mevcut")
        return
    }
    if(checkSpecialCharsAndNumbers(form.name)){
      alert("Kategori adı özel karakter içeremez")
      return
    }
    axios.post("http://localhost:3004/categories",form)
    .then(res=>{
        navigate("/category-operations")
    })
    .catch(err=>{})
  };
  if (categories === null) return null;
  return (
    <div>
      <Header whichPage={"addCAtegory"} navigateTo="/category-operations" />
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
            <button className="submitBtn" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
