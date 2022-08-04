import React from "react";
import "./widget.scss";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Users",
        volume: 250,
        isMoney: false,
        icon: <PersonAddAltOutlinedIcon className="icon" />,
        color: "#7451f8",
        bgColor: "#ece8ff",
      };
      break;
    case "earnings":
      data = {
        title: "Earnings",
        volume: 125000,
        isMoney: true,
        icon: <AttachMoneyOutlinedIcon className="icon" />,
        color: "#DE5ADB",
        bgColor: "#FADFF3",
      };
      break;
    case "bookings":
      data = {
        title: "Bookings",
        volume: 360,
        isMoney: false,
        icon: <ShoppingCartOutlinedIcon className="icon" />,
        color: "#E09B01",
        bgColor: "#FDF9ED",
      };
      break;
    case "balance":
      data = {
        title: "Total Balance",
        volume: 1000000,
        isMoney: true,
        icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
        color: "#00B874",
        bgColor: "#EAFFED",
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget" style={{ background: data.bgColor }}>
      <div className="widget__left">
        <div className="widget__icon" style={{ background: data.color }}>
          {data.icon}
        </div>
        <div className="widget__volume">
          {data.isMoney && "$"} {data.volume}
        </div>
        <div className="widget__title">{data.title}</div>
      </div>
      <div className="widget__right">
        <div className="widget__percentage">
          <ArrowUpwardOutlinedIcon
            className="icon"
            style={{ color: data.color }}
          />
          18.87%
        </div>
      </div>
    </div>
  );
};

export default Widget;
