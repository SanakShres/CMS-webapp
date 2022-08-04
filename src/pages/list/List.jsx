import React from "react";
import Datatable from "../../components/datatable/Datatable";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="list__container">
        <Navbar />
        <div className="datatable__container">
          <div className="datatable__top">
            <h1>Users</h1>
            <div className="datatable__add">
              <AddCircleOutlineIcon className="icon" />
              <span>Add Users</span>
            </div>
          </div>
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default List;
