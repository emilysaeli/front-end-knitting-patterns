import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Legend from "./components/Legend";
import data from "./services/mockData.json";

const App = () => {
  // send pattern form input to back-end
  const submitPattern = (patternForm) => {
    console.log("submitPattern called");
    console.log(patternForm);
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
        <Legend></Legend>
      </section>
      <section>
        <Chart data={data}></Chart>
      </section>
    </div>
  );
};

export default App;
