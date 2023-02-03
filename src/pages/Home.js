import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import CategoriesList from "../components/CategoriesList";
import ListExpenses from "../components/ListExpenses";

import "../assets/styles/general.css";

import axios from "axios";

const Home = () => {
  const [expenses, setExpenses] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "0",
    name: "Hepsi",
  });
  const [didUpdate,setDidUpdate]=useState(false)

  useEffect(() => {
    console.log("didUpdate");
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
    axios
      .get("http://localhost:3004/expenses")
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data);
      })
      .catch((err) => {});
  }, [didUpdate]);

  if (categories === null || expenses === null) return null;
  return (
    <div>
      <Header whichPage={"home"} />
      <CategoriesList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ListExpenses
        selectedCategory={selectedCategory}
        categories={categories}
        expenses={expenses}
        didUpdate={didUpdate}
        setDidUpdate={setDidUpdate}
      />
    </div>
  );
};

export default Home;
