import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedChart from "../../components/featuredChart/FeaturedChart";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ListTable from "../../components/listTable/ListTable";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home__container">
        <Navbar />
        <div className="home__containerInner">
          <div className="widgets__container">
            <Widget type="user" />
            <Widget type="earnings" />
            <Widget type="bookings" />
            <Widget type="balance" />
          </div>
          <div className="charts__container">
            <FeaturedChart />
            <Chart />
          </div>
          <div className="list__container">
            <div className="list__table">
              <div className="list__title">Latest Transactions</div>
              <ListTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
