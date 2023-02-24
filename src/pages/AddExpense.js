import React, { useState, useEffect } from "react";

import Header from "../components/Header";

import axios from "axios";

import "../assets/styles/addExpense.css";

import { useNavigate, Link } from "react-router-dom";

import { formatDateForDateInput } from "../utils/functions";

const AddExpense = () => {
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    price: "",
    place: "",
    title: "",
    description: "",
    date: formatDateForDateInput(new Date()),
    categoryId: "",
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
    console.log(form);
    /* validation */
    if (
      form.price === "" ||
      form.title === "" ||
      form.categoryId === "" ||
      form.place === "" ||
      form.date === "" ||
      form.categoryId === "empty"
    ) {
      alert("Bütün alanlar zorunludur");
      return;
    }
    axios
      .post("http://localhost:3004/expenses", {
        ...form,
        id: String(new Date().getTime()),
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };
  if (categories === null) return null;
  return (
    <div>
      <Header whichPage={"addExpense"} navigateTo="/" />
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="formElement">
            <label htmlFor="price">Fiyat</label>
            <input
              id="price"
              type={"number"}
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="place">Mekan</label>
            <input
              id="place"
              type={"text"}
              value={form.place}
              onChange={(event) =>
                setForm({ ...form, place: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="title">Başlık</label>
            <input
              id="title"
              type={"text"}
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="description">Açıklama</label>
            <input
              id="description"
              type={"text"}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="date">Tarih</label>
            <input
              id="date"
              type={"date"}
              value={form.date}
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            {categories.length > 0 && (
              <>
                <label htmlFor="date">Kategori</label>
                <select
                  onChange={(event) =>
                    setForm({ ...form, categoryId: event.target.value })
                  }>
                  <option value={"empty"}>Kategori Seçin</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {categories.length <= 0 && (
              <div style={{textAlign:'center'}}>
                <Link to={"/add-category"}>
                  Henüz kayıtlı kategoriniz olmadığı için öncelikle kategori
                  eklemelisiniz.
                </Link>
              </div>
            )}
          </div>
          <div className="submitBtnWrapper">
            <button disabled={categories.length <= 0 ? true : false} className="submitBtn" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
