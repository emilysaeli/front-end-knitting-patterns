import React from "react";
import "./Chart.css";

const Chart = (props) => {
  const chartJSX = (data) =>
    data.map((row) => {
      const chartRow = row.map((element) => (
        <div className="stitch">{element.stitch_type}</div>
      ));
      return <div className="chart-row">{chartRow}</div>;
    });

  return (
    <div>
      <h2>Chart</h2>
      <div className="chart">{chartJSX(props.data)}</div>
    </div>
  );
};

export default Chart;
