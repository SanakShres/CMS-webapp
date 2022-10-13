import React from "react";
import ActivityBlock from "./ActivityBlock";
import ChartBlock from "./ChartBlock";
import ListBlock from "./ListBlock";

const TestBlock = () => {
  return (
    <div
      className="main-container"
      style={{
        margin: "50px",
        display: "flex",
        gap: "20px",
        minHeight: "285px",
      }}
    >
      <ListBlock />
      <ChartBlock />
      <ActivityBlock />
    </div>
  );
};

export default TestBlock;
