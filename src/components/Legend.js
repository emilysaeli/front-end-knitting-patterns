import "./Legend.css";

const Legend = (props) => {
  const generateLegend = () => {
    let stitchList = props.uniqueStitches;
    const legendComponents = stitchList.map((stitch) => {
      let item = props.stitchDictionary[stitch];
      if (props.stitchDictionary[stitch] !== undefined) {
        return (
          <div key={item.name} className="legend-entry">
            <div className="key-container">
              <div className={item.css}>{stitch}</div>
            </div>
            <div className="legend-title">{item.name}</div>
          </div>
        );
      } else if (props.stitchDictionary[stitch] === undefined) {
        return (
          <div key={stitch} className="legend-entry">
            <div className="key-container">
              <div className="default-stitch">{stitch}</div>
            </div>
            <div className="legend-title">{stitch} - TBD</div>
          </div>
        );
      }
    });
    return legendComponents;
  };

  return (
    <div>
      <h2>Legend</h2>
      <div className="legend-container">
        <ul>{generateLegend()}</ul>
      </div>
    </div>
  );
};

export default Legend;
