import React, { useState } from "react";
import "./Form.css";

const Form = (props) => {
  const [patternForm, setPatternForm] = useState("");
  const [prevPatternForm, setPrevPatternForm] = useState("");

  const onFormChange = (event) => {
    const inputValue = event.target.value;
    setPatternForm({ inputPattern: inputValue });
    setPatternForm(inputValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitPattern({ inputPattern: patternForm });
    setPrevPatternForm(patternForm);
    setPatternForm("");
  };

  const generateSubmittedPattern = (pattern) => {
    // This function splits up the submitted input by rows
    // and generates JSX
    const rowsArray = pattern.split(/\r\n|\r|\n/);
    return (
      <div>
        {rowsArray.map((row) => (
          <div>{row}</div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label htmlFor="pattern-form">Knitting Pattern: </label>
          <div>
            <textarea
              type="text"
              name="pattern-form"
              onChange={onFormChange}
              value={patternForm}
              className="pattern-form"
              placeholder="Input your knitting pattern here!"
              rows="10"
              cols="50"
              required
            />
          </div>
          <div>
            <input
              className="create-pattern-btn"
              type="submit"
              value="Submit Pattern!"
            ></input>
          </div>
        </div>
      </form>
      <div className="submitted-pattern">
        <p>Your pattern:</p>
        {generateSubmittedPattern(prevPatternForm)}
      </div>
    </div>
  );
};

export default Form;
