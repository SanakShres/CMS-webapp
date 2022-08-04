import React from "react";
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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <span className="logo">
          <img
            className="header__icon"
            src="https://www.hicom.fr/wp-content/uploads/2017/09/Logo_TV_2015.png"
            alt=""
          />
        </span>
      </div>
      <div className="sidebar__center">
        <ul className="sidebar__nav">
          <p className="title">Main</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">List</p>
          <li>
            <PeopleIcon className="icon" />
            <span>Users</span>
          </li>
          <li>
            <AddShoppingCartIcon className="icon" />
            <span>Products</span>
          </li>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
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
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar__bottom">
        <div className="colorTheme"></div>
        <div className="colorTheme"></div>
      </div>
    </div>
  );
};

export default Sidebar;
