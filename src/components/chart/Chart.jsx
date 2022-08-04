import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    total: 120,
  },
  {
    name: "February",
    total: 221,
  },
  {
    name: "March",
    total: 80,
  },
  {
    name: "April",
    total: 160,
  },
  {
    name: "May",
    total: 100,
  },
  {
    name: "June",
    total: 170,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="chart__title">Last 6 months (Revenue in '000)</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7451f8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7451f8" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" />
          <CartesianGrid strokeDasharray="3 3" className="chart__grid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#7451f8"
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          {/* <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
