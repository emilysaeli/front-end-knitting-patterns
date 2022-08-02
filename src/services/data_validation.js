export const validate_matrix = (data) => {
  const colNum = data[0].length;
  for (const row of data) {
    if (row.length !== colNum) {
      return false;
    }
  }
  return true;
};

export const add_x_y_pos = (data) => {
  if (!validate_matrix) {
    return false;
  }

  const dataWithCoordinates = data.map((row, rowIndex) => {
    for (const [colIndex, element] of row.entries()) {
      element["x_pos"] = colIndex + 1;
      element["y_pos"] = rowIndex + 1;
    }
    return row;
  });

  // const gridData = [];
  // gridData.push.apply(dataWithCoordinates);
  return dataWithCoordinates;
};

export const createHeaderArray = (colNum) => {
  const toLetter = (num) => {
    // 1-based i.e 1 is A, 26 is Z, 27 is AA
    let resultArray = [];
    while (num > 0) {
      const mod = num % 26;
      num = Math.trunc((num - 1) / 26);
      const char = mod ? String.fromCharCode(64 + mod) : "Z";
      resultArray.push(char);
    }
    return resultArray.reverse().join("");
  };

  const headerArray = [" "];
  for (let i = 1; i <= colNum; i++) {
    headerArray.push(toLetter(i));
  }
  return headerArray;
};
