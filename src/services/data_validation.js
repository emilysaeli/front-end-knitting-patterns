export const validate_matrix = (data) => {
  const colNum = data[0].length;
  for (const row of data) {
    if (row.length !== colNum) {
      return false;
    }
  }
  return true;
};

export const createHeaderArray = (colNum) => {
  // This function creates an array that indicates column headers for the Chart component
  const toLetter = (num) => {
    // This function converts a number to a letter
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
