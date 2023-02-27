import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeFilter } from "../redux/contactSlice";
import style from "./Components.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contact.filter);

  return (
    <label htmlFor="filter" className={style.filterLabel}>
      Kişi Ara
      <input
        className={style.filterInput}
        onChange={(e) => {
          dispatch(changeFilter(e.target.value));
        }}
        type="text"
        name="filter"
        id="filter"
        value={filter}
        pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(([' -][a-zA-ZğüşıöçĞÜŞİÖÇ ])?[a-zA-ZğüşıöçĞÜŞİÖÇ]*)*$"
      ></input>{" "}
    </label>
  );
};

export default Filter;
