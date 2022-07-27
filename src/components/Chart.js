import React, { useRef } from "react";
import data from "../services/mockData.json";
import "./Chart.css";
import html2canvas from "html2canvas";
// import * as htmlToImage from "html-to-image";

const Chart = () => {
  // const printRef = useRef();

  // const handleDownloadImage = async () => {
  //   const dataUrl = await htmlToImage.toPng(printRef.current);

  //   // download image
  //   const link = document.createElement("a");
  //   link.download = "html-to-img.png";
  //   link.href = dataUrl;
  //   link.click();
  // };
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div>
      <h2>Chart</h2>
      <div className="chart" ref={printRef}>
        {data.map((row) => {
          const chartRow = row.map((element) => (
            <div className="stitch">{element.stitch_type}</div>
          ));
          return <div className="chart-row">{chartRow}</div>;
        })}
      </div>
      <button onClick={handleDownloadImage}>Save Image</button>
    </div>
  );
};

export default Chart;
