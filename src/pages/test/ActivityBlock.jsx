import React from "react";
import "./activityBlock.scss";

const ActivityBlock = () => {
  return (
    <div className="main-inner-container inner-block">
      <div className="activity-top">
        <h2>Activity feed</h2>
        <div className="activity-nav">
          <span>{"<"}</span>
          <span>{">"}</span>
        </div>
      </div>
      <div className="activity-bottom">
        <div className="activity-item">
          <div className="activity-date">14 Oct 2022</div>
          <div className="activity-details">
            <p>Booking confirmed</p>
            <p>Payment in cash</p>
            <p>Total Bill amount from bookings</p>
          </div>
        </div>
        <div className="activity-item">
          <div className="activity-date">14 Oct 2022</div>
          <div className="activity-details">
            <p>Booking confirmed</p>
            <p>Payment in cash</p>
            <p>Total Bill amount from bookings</p>
          </div>
        </div>
        <div className="activity-item">
          <div className="activity-date">14 Oct 2022</div>
          <div className="activity-details">
            <p>Booking confirmed</p>
            <p>Payment in cash</p>
            <p>Total Bill amount from bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityBlock;
