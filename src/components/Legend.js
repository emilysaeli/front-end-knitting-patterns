import React, { useState } from "react";
import "./Legend.css";
const Legend = (props) => {
  // Stitch abbreviations from Lion Brand Yarh - https://www.lionbrand.com/pages/glossary
  // Descriptions from Merriam-Webster - https://www.merriam-webster.com/, Interweave - https://www.interweave.com/interweave-knitting-glossary/
  // Resource videos from Sheep & Stitch - https://www.youtube.com/c/sheepandstitch
  const stitchDictionary = {
    K: {
      name: "Knit Stitch",
      description:
        "a basic knitting stitch usually made with the yarn at the back of the work by inserting the right needle into the front part of a loop on the left needle from the left side, catching the yarn with the point of the right needle, and bringing it through the first loop to form a new loop",
      resources: "https://youtu.be/Egp4NRhlMDg",
    },
    CO: {
      name: "Cast On",
      description:
        "Casting on lays the foundation for your knitting project. It is the method by which stitches are formed that you then knit or purl to form your knitted item",
      resources: "https://youtu.be/1vm6oaYzHyA",
    },
    P: {
      name: "Purl Stitch",
      description:
        "a knitting stitch usually made with the yarn at the front of the work by inserting the right needle into the front of a loop on the left needle from the right, catching the yarn with the right needle, and bringing it through to form a new loop",
      resources: "https://youtu.be/hTZCEBk495k",
    },
    S: {
      name: "Slip Stitch",
      description:
        "Slip stitch knitting is a technique where stitches are moved from the left needle to the right needle without working them. You can slip a stitch knitwise (as if to knit) and purlwise (as if to purl), and also hold the yarn at the front or the back of the work, to create different effects.",
      resources: "https://www.youtube.com/watch?v=fb5xzPS3nfc",
    },
    BO: { name: "Bind Off" },
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
    return uniqueStitches;
  };

  const legendComponents = () => {
    const uniqueStitches = getUniqueStitches(props.data);
    const stitchItems = uniqueStitches.map((stitch) => {
      let item = stitchDictionary[stitch];
      return (
        <li key={item.name}>
          <div className="legend-entry">
            <div className="legend-title">
              <div className="legend-color"></div>
              {stitch}: {item.name}
            </div>
          </div>
          <div>
            <h2 className="legend-label">Description:</h2> {item.description}
          </div>
          <div>
            <h2 className="legend-label">Resources: </h2>
            {item.resources}
          </div>
        </li>
      );
    });
    return stitchItems;
  };
  return (
    <div>
      <h2>Legend</h2>
      <div className="legend-container">
        <ul>{legendComponents()}</ul>
      </div>
    </div>
  );
};

export default Legend;

// - Cast On {stitchDictionary[stitch].name}
