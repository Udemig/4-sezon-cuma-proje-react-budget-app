import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralModal from "../components/GeneralModal";

const EditExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/expenses/${params.expenseId}`)
      .then((res) => {
        setExpense(res.data);
      })
      .catch((err) => {
        setShowErrorModal(true);
      });
  }, []);

  if (expense === null && showErrorModal === false) return null;
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
      <h1>{params.expenseId}</h1>
      <p>{expense.price}</p>
    </div>
  );
};

export default EditExpense;
