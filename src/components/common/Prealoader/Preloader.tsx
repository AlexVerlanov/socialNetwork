import React from "react";
import prealoader from "../../../assets/img/Prealoader.svg";
import s from "./Preloader.module.css";

export const Preloader = () => {
  return (
    <div className={s.preloader}>
      {" "}
      <img src={prealoader} />
    </div>
  );
};
