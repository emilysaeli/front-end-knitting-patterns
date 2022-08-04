import React, { useState, useRef, useEffect } from "react";
import "./Form.css";

const Form = (props) => {
  // const [patternForm, setPatternForm] = useState({ inputPattern: "" });
  const [patternForm, setPatternForm] = useState("");
  const [prevPatternForm, setPrevPatternForm] = useState("");

  const onFormChange = (event) => {
    const inputValue = event.target.value;
    // setPatternForm({ inputPattern: inputValue });
    setPatternForm(inputValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitPattern({ inputPattern: patternForm });
    setPrevPatternForm(patternForm);
    setPatternForm("");
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
      <p>Your pattern:</p>
      <p>{prevPatternForm}</p>
    </div>
  );
};

export default Form;
