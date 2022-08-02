import React, { useRef } from "react";
import "./Chart.css";
import { createHeaderArray } from "../services/data_validation";
import { handleDownloadImage } from "../services/download_image";

const Chart = (props) => {
  const printRef = useRef();

  const generateChartData = (data) => {
    const colNum = data[0].length;
    const chartData = [];
    const headerArray = createHeaderArray(colNum);
    chartData.push(headerArray);
    for (const [rowIndex, row] of data.entries()) {
      let newRow;
      if (row[0].stitch === "CO") {
        newRow = ["CO"];
      } else if (row[0].stitch === "BO") {
        newRow = ["BO"];
      } else {
        newRow = [rowIndex];
      }

      newRow.push(...row);
      chartData.push(newRow);
    }
    return chartData;
  };

  const chartJSX = (data) =>
    data.map((row) => {
      const chartRow = row.map((element) => {
        if (element.stitch) {
          if (element.stitch === "K") {
            return <div className="grid stitch knit"> {element.stitch}</div>;
          } else if (element.stitch === "P") {
            return <div className="grid stitch purl"> {element.stitch}</div>;
          } else {
            return <div className="grid stitch"> {element.stitch}</div>;
          }
        } else {
          return <div className="grid index">{element}</div>;
        }
      });
      return <div className="chart-row">{chartRow}</div>;
    });

  const chartData = generateChartData(props.data);

  return (
    <div>
      <h2>Chart</h2>
      <div className="chart" ref={printRef}>
        {chartJSX(chartData)}
      </div>
      <button onClick={() => handleDownloadImage(printRef)} id="save-btn">
        Save Image
      </button>
    </div>
  );
};

export default Chart;
