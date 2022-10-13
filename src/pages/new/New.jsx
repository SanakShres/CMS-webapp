import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { bookingInputs, userInputs } from "../../formSource";
import UsersForm from "../../components/forms/UsersForm";
import BookingsForm from "../../components/forms/BookingsForm";
import { useLocation, useParams } from "react-router-dom";

const New = ({ title }) => {
  const location = useLocation();
  const { id } = useParams();
  return (
    <div className="new__item">
      <Sidebar />
      <div className="newItem__container">
        <Navbar />
        <div className="newItem__inner">
          <div className="newItem__top">
            <h1 className="newItem__title">{title}</h1>
          </div>
          {(location.pathname === "/users/new" ||
            location.pathname === `/users/update/${id}`) && (
            <UsersForm inputs={userInputs} />
          )}
          {(location.pathname === "/bookings/new"||
            location.pathname === `/bookings/update/${id}`) && (
            <BookingsForm inputs={bookingInputs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default New;
