import React, { useState } from "react";
import DetailsForm from "../../components/forms/DetailsForm";
import Gallery from "../../components/gallery/Gallery";
import ServicesForm from "../../components/forms/ServicesForm";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newVenue.scss";
import RulesPolicy from "../../components/forms/RulesPolicy";

const NewVenue = () => {
  const [toggleForm, setToggleForm] = useState(1);
  return (
    <div className="newVenue">
      <Sidebar />
      <div className="newVenue__container">
        <Navbar />
        <div className="newVenue__containerInner">
          <div className="newVenue__top">
            <h1>Venue</h1>
          </div>
          <div className="newVenue__bottom">
            <div className="newVenue__tabs">
              <ul>
                <li
                  onClick={() => setToggleForm(1)}
                  className={toggleForm === 1 ? "active__tabs" : ""}
                >
                  Details
                </li>
                <li
                  onClick={() => setToggleForm(2)}
                  className={toggleForm === 2 ? "active__tabs" : ""}
                >
                  Services
                </li>
                <li
                  onClick={() => setToggleForm(3)}
                  className={toggleForm === 3 ? "active__tabs" : ""}
                >
                  Gallery
                </li>
                <li
                  onClick={() => setToggleForm(4)}
                  className={toggleForm === 4 ? "active__tabs" : ""}
                >
                  Menu Package
                </li>
                <li
                  onClick={() => setToggleForm(5)}
                  className={toggleForm === 5 ? "active__tabs" : ""}
                >
                  Rules and Policy
                </li>
                <li
                  onClick={() => setToggleForm(6)}
                  className={toggleForm === 6 ? "active__tabs" : ""}
                >
                  Add new block
                </li>
              </ul>
            </div>
            <div
              className={
                toggleForm === 1
                  ? "newVenue__formHolder active__form"
                  : "newVenue__formHolder"
              }
            >
              <h3>Company Details</h3>
              <DetailsForm />
            </div>
            <div
              className={
                toggleForm === 2
                  ? "newVenue__formHolder active__form"
                  : "newVenue__formHolder"
              }
            >
              <h3>Company Services</h3>
              <ServicesForm />
            </div>
            <div
              className={
                toggleForm === 3
                  ? "newVenue__formHolder active__form"
                  : "newVenue__formHolder"
              }
            >
              <Gallery />
            </div>
            <div
              className={
                toggleForm === 5
                  ? "newVenue__formHolder active__form"
                  : "newVenue__formHolder"
              }
            >
              <h3>Company Rules and Policies</h3>
              <RulesPolicy />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVenue;
