import React from "react";
import "./Chart.css";

const Chart = (props) => {
  const createHeaderArray = (colNum) => {
    const toLetter = (num) => {
      // 1-based i.e 1 is A, 26 is Z, 27 is AA
      let resultArray = [];
      while (num > 0) {
        const mod = num % 26;
        num = Math.trunc((num - 1) / 26);
        const char = mod ? String.fromCharCode(64 + mod) : "Z";
        resultArray.push(char);
      }
      return resultArray.reverse().join("");
    };

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
        newRow = [rowIndex];
      }

      newRow.push(...row);
      chartData.push(newRow);
    }
    return chartData;
  };

  const chartJSX = (data) =>
    data.map((row, rowIndex) => {
      const chartRow = row.map((element) =>
        element.stitch_type ? (
          <div className="grid stitch"> {element.stitch_type}</div>
        ) : (
          <div className="grid index">{element}</div>
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
