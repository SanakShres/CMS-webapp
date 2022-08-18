import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { bookingInputs, userInputs } from "../../formSource";
import UsersForm from "../../components/forms/UsersForm";
import BookingsForm from "../../components/forms/BookingsForm";
import { useLocation } from "react-router-dom";

const New = ({ title }) => {
  const location = useLocation();
  return (
    <div className="new__item">
      <Sidebar />
      <div className="newItem__container">
        <Navbar />
        <div className="newItem__inner">
          <div className="newItem__top">
            <h1 className="newItem__title">{title}</h1>
          </div>
          {location.pathname === "/Users/new" && (
            <UsersForm inputs={userInputs} />
          )}
          {location.pathname === "/Bookings/new" && (
            <BookingsForm inputs={bookingInputs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default New;
