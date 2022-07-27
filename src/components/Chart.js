import React from "react";
import "./Chart.css";

const Chart = (props) => {
  const toLetter = (num) => {
    // 1-based i.e 1 is A, 27 is AA
    let mod = num % 26;
    let div = (num / 26) | 0;
    let out = mod ? String.fromCharCode(64 + mod) : (div--, "Z");
    return div ? toLetter(div) + out : out;
  };

  const createHeaderArray = (colNum) => {
    const headerArray = [" "];
    for (let i = 1; i <= colNum; i++) {
      headerArray.push(toLetter(i));
    }
    return headerArray;
  };

  const generateChartData = (data) => {
    const colNum = data[0].length;
    const chartData = [];
    const headerArray = createHeaderArray(colNum);
    chartData.push(headerArray);
    for (const [rowIndex, row] of data.entries()) {
      let newRow;
      if (row[0].stitch_type === "CO") {
        newRow = ["CO"];
      } else if (row[0].stitch_type === "BO") {
        newRow = ["BO"];
      } else {
        newRow = [rowIndex + 1];
      }

      newRow.push(...row);
      chartData.push(newRow);
    }

    console.log(chartData);
    return chartData;
  };

  const chartJSX = (data) =>
    data.map((row) => {
      const chartRow = row.map((element) =>
        element.stitch_type ? (
          <div className="grid stitch">{element.stitch_type}</div>
        ) : (
          <div className="grid table-header">{element}</div>
        )
      );
      return <div className="chart-row">{chartRow}</div>;
    });

  const chartData = generateChartData(props.data);

  return (
    <div>
      <h2>Chart</h2>
      <div className="chart">{chartJSX(chartData)}</div>
    </div>
  );
};

export default Chart;
