import React from "react";
import Datatable from "../../components/datatable/Datatable";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

const List = ({ title }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="list__container">
        <Navbar />
        <div className="datatable__container">
          <div className="datatable__top">
            <h1>{title}</h1>
            <Link to={`/${title}/new`} style={{ textDecoration: "none" }}>
              <div className="datatable__add">
                <AddCircleOutlineIcon className="icon" />
                <span>Add {title}</span>
              </div>
            </Link>
          </div>
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default List;
