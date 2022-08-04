import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Legend from "./components/Legend";

const App = () => {
  const URL = "http://pattern-handler-test-api.herokuapp.com";
  const [chartData, setChartData] = useState([]);
  const [uniqueStitches, setUniqueStitches] = useState([]);
  // Stitch abbreviations from Lion Brand Yarh - https://www.lionbrand.com/pages/glossary
  // Descriptions from Merriam-Webster - https://www.merriam-webster.com/, Interweave - https://www.interweave.com/interweave-knitting-glossary/
  // Resource videos from Sheep & Stitch - https://www.youtube.com/c/sheepandstitch
  const stitchDictionary = {
    K: {
      name: "Knit Stitch",
      description:
        "a basic knitting stitch usually made with the yarn at the back of the work by inserting the right needle into the front part of a loop on the left needle from the left side, catching the yarn with the point of the right needle, and bringing it through the first loop to form a new loop",
      resources: "https://youtu.be/Egp4NRhlMDg",
      symbol: "",
      css: "knit-stitch",
    },
    CO: {
      name: "Cast On",
      description:
        "Casting on lays the foundation for your knitting project. It is the method by which stitches are formed that you then knit or purl to form your knitted item",
      resources: "https://youtu.be/1vm6oaYzHyA",
      symbol: "",
      css: "cast-on",
    },
    P: {
      name: "Purl Stitch",
      description:
        "a knitting stitch usually made with the yarn at the front of the work by inserting the right needle into the front of a loop on the left needle from the right, catching the yarn with the right needle, and bringing it through to form a new loop",
      resources: "https://youtu.be/hTZCEBk495k",
      symbol: "⬤",
      css: "purl-stitch",
    },
    S: {
      name: "Slip Stitch",
      description:
        "Slip stitch knitting is a technique where stitches are moved from the left needle to the right needle without working them. You can slip a stitch knitwise (as if to knit) and purlwise (as if to purl), and also hold the yarn at the front or the back of the work, to create different effects.",
      resources: "https://www.youtube.com/watch?v=fb5xzPS3nfc",
      symbol: "",
      css: "slip-stitch",
    },
    BO: {
      name: "Bind Off",
      description: "",
      resources: "",
      symbol: "",
      css: "bind-off",
    },
  };

  // send pattern form input to back-end
  const submitPattern = (patternForm) => {
    console.log("submitPattern called");
    axios
      .post(`${URL}`, patternForm)
      .then((response) => {
        setChartData(response.data);
        setUniqueStitches(getUniqueStitches(response.data));
        // setUniqueStitches(getUniqueStitches(data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUniqueStitches = (data) => {
    let uniqueStitches = [];
    // Loops through only one row for demo purposes
    // for (const row of data) {
    //   for (const element of row) {
    for (const element of data) {
      if (uniqueStitches.includes(element.stitch) === false) {
        uniqueStitches.push(element.stitch);
      }
      // }
    }
    setUniqueStitches(uniqueStitches);
    return uniqueStitches;
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Knitting Patterns</h1>
      </header>
      <section className="form">
        <Form submitPattern={submitPattern}></Form>
      </section>
      <section className="legend">
        {chartData.length > 0 && (
          <Legend
            data={chartData}
            uniqueStitches={uniqueStitches}
            getUniqueStitches={getUniqueStitches}
            stitchDictionary={stitchDictionary}
          ></Legend>
        )}
      </section>
      {
        // button for testing purposes
      }
      {/* <div>
        <button onClick={() => getUniqueStitches(data)}>Generate legend</button>
      </div> */}
      <section>
        {chartData.length > 0 && (
          <Chart data={[chartData]} stitchDictionary={stitchDictionary} />
        )}
      </section>
    </div>
  );
};

export default App;
