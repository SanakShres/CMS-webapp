import React from "react";
import "./listBlock.scss";

const ListBlock = () => {
  const infos = [
    { details: "Member Profit", data: 58533 },
    { details: "Overdue Cases", data: 2533 },
    { details: "Excess Funds", data: 12008 },
    { details: "Bookings Capital", data: 128533 },
  ];
  return (
    <div className="main-inner-container inner-block">
      <div className="list-top">
        <h2>Overview</h2>
        <div className="list-filter">
          <select className="list-input">
            <option value="month">Month</option>
          </select>
          <select className="list-input">
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <div className="list-items">
        {infos.length > 0 &&
          infos.map((info, i) => (
            <div className="list-item-holder" key={i}>
              <div className="list-details">
                <p>{info.details}</p>
                {/* dynamic by filter */}
                <span>Since last month</span> 
              </div>
              <div className="list-data">{info.data}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListBlock;
