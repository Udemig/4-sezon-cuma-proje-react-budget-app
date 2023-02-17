import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralModal from "../components/GeneralModal";
import "../assets/styles/addExpense.css";

const EditExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [form, setForm] = useState({
    price: "",
    place: "",
    title: "",
    description: "",
    date: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState(null);
  const [showSuccessModal,setShowSuccessModal]=useState(false)
  useEffect(() => {
    axios
      .get(`http://localhost:3004/expenses/${params.expenseId}`)
      .then((resExpense) => {
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            setExpense(resExpense.data);
            setCategories(resCat.data);
            setForm(resExpense.data)
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setShowErrorModal(true);
      });
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
      form.description === "" ||
      form.date === "" || 
      form.categoryId === "empty"
    ) {
      alert("Bütün alanlar zorunludur");
      return;
    }
    /* API Call */
    axios.put(`http://localhost:3004/expenses/${params.expenseId}`,form)
    .then(res=>{
      setShowSuccessModal(true)
    })
    .catch(err=>{setShowErrorModal(true)})
  };

  if (expense === null && showErrorModal === false && categories === null)
    return null;
  if (showErrorModal === true) {
    return (
      <GeneralModal
        title="Hata"
        content="Bir hata oluştu. Daha sonra tekrar deneyiniz."
        closeButtonText="Anasayfaya Dön"
        closeButtonClick={() => navigate("/")}
      />
    );
  }
  return (
    <div>
      <Header whichPage={"editExpense"} navigateTo="/" />
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
            <label htmlFor="date">Kategori</label>
            <select
              defaultValue={form.categoryId}
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
          </div>
          <div className="submitBtnWrapper">
            <button className="submitBtn" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      {
        showSuccessModal === true && (
          <GeneralModal
            title="Başarılı"
            content="Güncelleme işlemi başarıyla gerçekleşti"
            closeButtonText="Anasayfaya Dön"
            closeButtonClick={()=>navigate("/")}
          />
        )
      }
    </div>
  );
};

export default EditExpense;
