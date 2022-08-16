import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({
  children,
  stitchName,
  stitchDescription,
  stitchResources,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = (event) => {
    setShow(true);
  };

  const handleMouseLeave = (event) => {
    setShow(false);
  };

  return (
    <div className="tooltip-container">
      <div className={show ? "tooltip-box visible" : "tooltip-box"}>
        <p className="tooltip-name">{stitchName}</p>
        <p className="tooltip-description"> {stitchDescription}</p>
        <p className="tooltip-resources">
          Resources: <a href={stitchResources}>{stitchResources}</a>
        </p>
        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
