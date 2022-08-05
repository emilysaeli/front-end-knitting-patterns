import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Legend from "./components/Legend";
import { stitchDictionary } from "./services/stitchDictionary.js";

const App = () => {
  const URL = "http://pattern-handler-test-api.herokuapp.com";
  const [chartData, setChartData] = useState([]);
  const [uniqueStitches, setUniqueStitches] = useState([]);

  // send pattern form input to back-end
  const submitPattern = (patternForm) => {
    console.log("submitPattern called");
    axios
      .post(`${URL}`, patternForm)
      .then((response) => {
        setChartData(response.data);
        setUniqueStitches(getUniqueStitches(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUniqueStitches = (data) => {
    let uniqueStitches = [];
    for (const row of data) {
      for (const element of row) {
        if (uniqueStitches.includes(element.stitch) === false) {
          uniqueStitches.push(element.stitch);
        }
      }
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
            stitchDictionary={stitchDictionary}
          ></Legend>
        )}
      </section>
      <section>
        {chartData.length > 0 && (
          <Chart data={chartData} stitchDictionary={stitchDictionary} />
        )}
      </section>
    </div>
  );
};

export default App;
