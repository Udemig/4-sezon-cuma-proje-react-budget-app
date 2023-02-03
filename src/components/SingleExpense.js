import React, { useState } from "react";

import "../assets/styles/singleExpense.css";
import editIcon from "../assets/imgs/editIcon.gif";
import deleteIcon from "../assets/imgs/deleteIcon.gif";
import axios from "axios";
import GeneralModal from "./GeneralModal";
import { useNavigate } from "react-router-dom";

const SingleExpense = ({
  expense,
  categories = [],
  didUpdate,
  setDidUpdate,
}) => {
    const navigate=useNavigate()
  const [showDeleteModal, setDeleteModal] = useState(false);
  const myCategory = categories.find((item) => item.id === expense.categoryId);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3004/expenses/${expense.id}`)
      .then((res) => {
        console.log("silindi");
        //setDidUpdate(!didUpdate)
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <div className="expenseWrapper">
      <h2 className="expenseTitle">{expense.title}</h2>
      <p className="expenseDescription">{expense.description}</p>
      <h1 className="expensePrice">{expense.price} &#8378;</h1>
      <div className="btnsWrapper">
        <div onClick={()=>setDeleteModal(true)}>
          <img className="expenseIcon" src={deleteIcon} />
        </div>
        <div onClick={()=>navigate(`/edit-expense/${expense.id}`)}>
          <img className="expenseIcon" src={editIcon} />
        </div>
      </div>
      <p className="expenseCategoryName">{myCategory.name}</p>
      {showDeleteModal === true && (
        <GeneralModal
          title="Silme İşlemi"
          content="Silmek istediğinizden emin misiniz?"
          closeButtonText="Vazgeç"
          closeButtonClick={()=>setDeleteModal(false)}
          hasConfirm={true}
          confirmButtonText="Sil"
          confirmButtonClick={handleDelete}
        />
      )}
    </div>
  );
};

export default SingleExpense;
