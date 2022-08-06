import React from "react";
import Chart from "../../components/chart/Chart";
import ListTable from "../../components/listTable/ListTable";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singleItem.scss";

const SingleItem = () => {
  return (
    <div className="singleItem">
      <Sidebar />
      <div className="singleItem__container">
        <Navbar />
        <div className="top__bgcover">
          <img
            src="https://images.unsplash.com/photo-1617957772002-57adde1156fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt=""
          />
        </div>
        <div className="singleItem__top">
          <div className="singleItem__left">
            <div className="left__title">
              <h1>Information</h1>
              <div className="item__editBtn">Edit</div>
            </div>
            <div className="left__item">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt=""
                className="item__img"
              />
              <div className="item__details">
                <div className="item__title">
                  <h2>Nathaniel Poole</h2>
                  <h4>Microsoft Inc.</h4>
                </div>
                <div className="item__info">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">nathaniel.poole@gmail.com</span>
                </div>
                <div className="item__info">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+977 12345 7890</span>
                </div>
                <div className="item__info">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Central Park, Kathmandu</span>
                </div>
                <div className="item__info">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Nepal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="singleItem__right">
            <Chart height="100%" title="User's Transaction (Last 6 month)" />
          </div>
        </div>
        <div className="singleItem__bottom">
          <div className="singleItem__table">
            <h1 className="table__title">Latest Transactions</h1>
            <ListTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
