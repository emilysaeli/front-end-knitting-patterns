import "./App.css";
import Form from "./components/Form";
import Chart from "./components/Chart";
import Legend from "./components/Legend";

const App = () => {
  return (
    <div className="App">
      <section className="form">
        <Form></Form>
      </section>
      <section className="legend">
        <Legend></Legend>
      </section>
      <section className="chart">
        <Chart></Chart>
      </section>
    </div>
  );
};

export default App;
