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
    setPrevPatternForm(patternForm);
    if (validatePatternArray(patternForm)) {
      props.submitPattern({ inputPattern: patternForm });
    }
    setPatternForm("");
  };

  const validatePatternArray = (pattern) => {
    const patternArray = pattern.split(/\r\n|\r|\n/);
    if (patternArray.length > 500) {
      props.setErrorMessage(
        "Invalid pattern. Pattern must not contain more than 500 rows."
      );
      return false;
    }
    for (const row of patternArray) {
      if (row.length > 200) {
        props.setErrorMessage(
          "Invalid pattern. Each row must not contain more than 200 characters."
        );
        return false;
      }
    }
    return true;
  };

  const generateSubmittedPattern = (pattern) => {
    // This function splits up the submitted input by rows
    // and generates JSX
    const patternArray = pattern.split(/\r\n|\r|\n/);
    return (
      <div>
        {patternArray.map((row) => (
          <div>{row}</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label hidden htmlFor="pattern-form">
            Knitting Pattern:{" "}
          </label>
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
      {prevPatternForm && (
        <div className="submitted-pattern">
          <p>Your pattern:</p>
          {generateSubmittedPattern(prevPatternForm)}
        </div>
      )}
    </div>
  );
};

export default Form;
