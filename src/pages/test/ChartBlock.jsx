import React from "react";
import "./chartBlock.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartBlock = () => {
  const data = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ["#198754", "#ffc40c", "#b71c1c"],
      },
    ],
    hoverOffset: 4,
  };
  return (
    <div className="main-inner-container inner-block">
      <div className="chart-top">
        <h2>Bookings Status</h2>
      </div>
      <div className="chart-bottom">
        <Doughnut data={data}  />
        <div className="chart-details">
            <div><span>35%</span><span>Growth</span></div>
            <div><span>45%</span><span>Refund</span></div>
            <div><span>10%</span><span>Increase</span></div>
        </div>
      </div>
    </div>
  );
};

export default ChartBlock;
