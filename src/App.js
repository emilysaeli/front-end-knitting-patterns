import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Legend from "./components/Legend";
import ErrorMessage from "./components/ErrorMessage";
import { stitchDictionary } from "./services/stitchDictionary.js";

const App = () => {
  const URL = "https://pattern-handler-test-api.herokuapp.com";
  const [chartData, setChartData] = useState([]);
  const [uniqueStitches, setUniqueStitches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // send pattern form input to back-end
  const submitPattern = (patternForm) => {
    console.log("submitPattern called");
    axios
      .post(`${URL}`, patternForm)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setChartData(data);
          setUniqueStitches(getUniqueStitches(data));
          setErrorMessage("");
          console.log(data);
        } else {
          setErrorMessage("Invalid pattern.");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 500) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
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
        <h1>Knitting Patterns Made Easy</h1>
      </header>
      <section className="form">
        <Form
          submitPattern={submitPattern}
          setErrorMessage={setErrorMessage}
        ></Form>
      </section>
      {errorMessage === "" ? (
        <div>
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
            {chartData.length > 0 && <Chart data={chartData} />}
          </section>
        </div>
      ) : (
        <div className="error">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
