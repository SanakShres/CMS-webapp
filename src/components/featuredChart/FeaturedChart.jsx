import React from "react";
import "./featuredChart.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const FeaturedChart = () => {
  const percentage = 66;
  return (
    <div className="featuredChart">
      <div className="featuredChart__top">
        <h1 className="featuredChart__title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="featuredChart__bottom">
        <div className="featuredChart__chart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: "#7451f8",
              textColor: "#7451f8",
              trailColor: "#eeeaff",
            })}
          />
        </div>
        <p className="chart__title">Total sales made today</p>
        <p className="chart__amount">$420</p>
        <p className="chart__description">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="featuredChart__summary">
          <div className="summary__item">
            <div className="item__title">Target</div>
            <div className="item__result positive">
              <ArrowUpwardIcon fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
          <div className="summary__item">
            <div className="item__title">Last Week</div>
            <div className="item__result negative">
              <ArrowDownwardIcon fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
          <div className="summary__item">
            <div className="item__title">Last Month</div>
            <div className="item__result positive">
              <ArrowUpwardIcon fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
