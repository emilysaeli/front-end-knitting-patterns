import React, { useRef } from "react";
import ReactTooltip from "react-tooltip";
import "./Chart.css";
import { createHeaderArray } from "../services/data_validation";
import { handleDownloadImage } from "../services/download_image";
import { stitchDictionary } from "../services/stitchDictionary";

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
          return (
            <div
              className={`grid ${stitchDictionary[element.stitch].css}`}
              data-tip
              data-for="knit-stitch-tip"
            >
              {element.stitch}
              <ReactTooltip id="knit-stitch-tip" place="top" effect="solid">
                <h2>{props.stitchDictionary[element.stitch].name}</h2>
                <div className="tooltip-description">
                  {props.stitchDictionary[element.stitch].description}
                </div>
                <div className="tooltip-resources"></div>
                Resources:
                <div>
                  <a href={props.stitchDictionary[element.stitch].resources}>
                    {props.stitchDictionary[element.stitch].resources}
                  </a>
                </div>
              </ReactTooltip>
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
