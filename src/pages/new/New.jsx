import React, { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const New = ({ inputs, title }) => {
  const [inputImage, setInputImage] = useState("");
  return (
    <div className="new__item">
      <Sidebar />
      <div className="newItem__container">
        <Navbar />
        <div className="newItem__inner">
          <div className="newItem__top">
            <h1 className="newItem__title">{title}</h1>
          </div>
          <div className="newItem__bottom">
            <div className="newItem__left">
              <img
                src={
                  inputImage
                    ? URL.createObjectURL(inputImage)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              <div className="formInput__img">
                <label htmlFor="inputFile">
                  Choose image <DriveFolderUploadIcon />
                </label>
                <input
                  type="file"
                  id="inputFile"
                  onChange={(e) => setInputImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="newItem__right">
              <form className="newItem__form">
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder && input.placeholder}
                    />
                  </div>
                ))}
                {/* <div className="formInput">
                  <label htmlFor="">First Name</label>
                  <input type="text" placeholder="John" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Last Name</label>
                  <input type="text" placeholder="Doe" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Contact Number</label>
                  <input type="text" placeholder="+977 99345 2837654" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Address</label>
                  <input type="text" placeholder="Kathmandu" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Username</label>
                  <input type="text" placeholder="john_doe" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="john_doe@gmail.com" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Password</label>
                  <input type="password" />
                </div>
                <div className="formInput">
                  <label htmlFor="">Confirm Password</label>
                  <input type="password" />
                </div> */}
                <div className="formBtn">
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
