import React, { useState } from "react";

const Form = (props) => {
  // formatted patternForm as a JSON object
  const [patternForm, setPatternForm] = useState({ inputPattern: "" });
  // const [patternForm, setPatternForm] = useState("");

  const onFormChange = (event) => {
    const inputValue = event.target.value;
    setPatternForm({ inputPattern: inputValue });
    setPatternForm(inputValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitPattern({ inputPattern: patternForm });
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
              className="pattern-form"
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
    </div>
  );
};

export default Form;
