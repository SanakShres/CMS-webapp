import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singleItem.scss";

const SingleItem = () => {
  return (
    <div className="singleItem">
      <Sidebar />
      <div className="singleItem__container">
        <Navbar />
        <div className="singleItem__top">
          <div className="top__bgcover">
            <img
              src="https://images.unsplash.com/photo-1617957772002-57adde1156fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              alt=""
            />
          </div>
          <div className="singleItem__left">left</div>
          <div className="singleItem__right">right</div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
