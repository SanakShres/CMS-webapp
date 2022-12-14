import React, { useContext } from "react";
import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        authDispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img
              className="header__icon"
              src="https://www.hicom.fr/wp-content/uploads/2017/09/Logo_TV_2015.png"
              alt=""
            />
          </span>
        </Link>
      </div>
      <div className="sidebar__center">
        <ul className="sidebar__nav">
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">List</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/venues" style={{ textDecoration: "none" }}>
            <li>
              <AddShoppingCartIcon className="icon" />
              <span>Venues</span>
            </li>
          </Link>
          <Link to="/bookings" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Bookings</span>
            </li>
          </Link>
          <p className="title">Useful</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">Service</p>
          <li>
            <SettingsSystemDaydreamIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">User</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar__bottom">
        <div
          className="colorTheme"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorTheme"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
