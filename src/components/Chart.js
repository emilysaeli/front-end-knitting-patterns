import React from "react";
import data from "../services/mockData.json";
import "./Chart.css";

const Chart = () => {
  return (
    <div>
      <h2>Chart</h2>
      <div className="chart">
        {data.map((row) => {
          const chartRow = row.map((element) => (
            <div className="stitch">{element.stitch_type}</div>
          ));
          return <div className="chart-row">{chartRow}</div>;
        })}
      </div>
    </div>
  );
};

export default Chart;
