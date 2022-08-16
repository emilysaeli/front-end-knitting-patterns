import React, { useRef } from "react";
import "./Chart.css";
import Tooltip from "./Tooltip";
import { createHeaderArray } from "../services/data_validation";
import { handleDownloadImage } from "../services/download_image";
import { stitchDictionary } from "../services/stitchDictionary";

const Chart = (props) => {
  const printRef = useRef(); // used in handleDownloadImage function

  const generateChartData = (data) => {
    // This function generates a 2D array with row and column headers
    // together with the stitch data received from back-end
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
    // this functon generates the JSX components
    // from a 2D chart data array
    data.map((row) => {
      const chartRow = row.map((element) => {
        if (element.stitch) {
          return (
            <div className={`grid ${stitchDictionary[element.stitch].css}`}>
              <Tooltip
                stitchName={stitchDictionary[element.stitch].name}
                stitchDescription={stitchDictionary[element.stitch].description}
                stitchResources={stitchDictionary[element.stitch].resources}
              >
                {element.stitch}
              </Tooltip>
            </div>
          );
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
