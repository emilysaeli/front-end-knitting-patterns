import React, { useState } from "react";

const Form = (props) => {
  const [patternForm, setPatternForm] = useState();

  const onFormChange = (event) => {
    const inputValue = event.target.value;
    setPatternForm(inputValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitPattern(patternForm);

    setPatternForm();
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
