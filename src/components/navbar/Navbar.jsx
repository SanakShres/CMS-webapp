import React from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__search">
          <SearchIcon className="search__icon" />
          <input type="text" placeholder="Type in to Search..." />
        </div>
        <div className="navbar__items">
          <div className="navbar__item">
            <LanguageIcon className="navbar__icon" />
            English
          </div>
          <div className="navbar__item">
            <DarkModeOutlinedIcon className="navbar__icon" />
          </div>
          <div className="navbar__item">
            <FullscreenExitOutlinedIcon className="navbar__icon" />
          </div>
          <div className="navbar__item">
            <NotificationsNoneOutlinedIcon className="navbar__icon" />
            <div className="counter">1</div>
          </div>
          <div className="navbar__item">
            <ChatBubbleOutlineOutlinedIcon className="navbar__icon" />
            <div className="counter">3</div>
          </div>
          <div className="navbar__item">
            <ListOutlinedIcon className="navbar__icon" />
          </div>
          <div className="navbar__item">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt="profile"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
