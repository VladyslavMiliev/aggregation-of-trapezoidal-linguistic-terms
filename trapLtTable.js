import { intervals, termData } from "./intervalsTable.js";
let trapLtMatrix = [];
export { trapLtMatrix };
document.addEventListener("DOMContentLoaded", function () {
  const convertToTrapLtBtn = document.getElementById("conToTrapLt");
  const trapLtTableContainer = document.getElementById("trapLtTableContainer");

  convertToTrapLtBtn.addEventListener("click", function () {
    // Initialize the trapezoidal LT matrix
    console.log(trapLtMatrix);
    // Iterate through each alternative solution
    for (let rowIndex = 0; rowIndex < intervals.length; rowIndex++) {
      const intervalsRow = intervals[rowIndex];
      const trapLtRow = [];

      // Iterate through each criteria (columns)
      for (let colIndex = 0; colIndex < intervalsRow.length; colIndex++) {
        const interval = intervalsRow[colIndex];

        // Convert the expert evaluation interval to a trapezoidal LT
        const trapLt = convertIntervalToTrapezoidalLT(interval, termData);

        // Add the trapezoidal LT to the row
        trapLtRow.push(trapLt);
      }

      // Add the row to the trapezoidal LT matrix
      trapLtMatrix.push(trapLtRow);
    }

    // Create the trapezoidal LT table
    createTrapezoidalLTTable(trapLtMatrix, trapLtTableContainer);
  });

  // Function to convert an expert evaluation interval to a trapezoidal LT
  function convertIntervalToTrapezoidalLT(interval, termData) {
    const trapLt = [0, 0, 0, 0]; // Initialize the trapezoidal LT as [a, b, c, d]

    // Check if the interval contains more than one term
    if (interval.length > 1) {
      // Find the leftmost and rightmost terms in the interval
      const leftmostTerm = termData.find((t) => t.short === interval[0]);
      const rightmostTerm = termData.find(
        (t) => t.short === interval[interval.length - 1]
      );

      // Update the trapezoidal LT based on the leftmost and rightmost term boundaries
      trapLt[0] = leftmostTerm.l / 100;
      trapLt[1] = leftmostTerm.m / 100;
      trapLt[2] = rightmostTerm.m / 100;
      trapLt[3] = rightmostTerm.r / 100;
    } else {
      // The interval contains only one term, so simply update the trapezoidal LT based on the term boundaries
      const term = termData.find((t) => t.short === interval[0]);
      trapLt[0] = term.l / 100;
      trapLt[1] = term.m / 100;
      trapLt[2] = term.m / 100;
      trapLt[3] = term.r / 100;
    }

    return trapLt;
  }

  // Function to create the trapezoidal LT table
  // Function to create the trapezoidal LT table with labels
  function createTrapezoidalLTTable(trapLtMatrix, container) {
    container.innerHTML = "";
    const trapLtTable = document.createElement("table");

    // Create the header row with column labels (C1, C2, ...)
    const headerRow = document.createElement("tr");
    headerRow.appendChild(createHeaderCell(" "));
    for (let colIndex = 0; colIndex < trapLtMatrix[0].length; colIndex++) {
      headerRow.appendChild(createHeaderCell("C" + (colIndex + 1)));
    }
    trapLtTable.appendChild(headerRow);

    // Iterate through the rows and columns of the trapezoidal LT matrix
    for (let rowIndex = 0; rowIndex < trapLtMatrix.length; rowIndex++) {
      const row = document.createElement("tr");

      // Create the first cell in each row with row labels (x1, x2, ...)
      row.appendChild(createHeaderCell("x" + (rowIndex + 1)));

      for (
        let colIndex = 0;
        colIndex < trapLtMatrix[rowIndex].length;
        colIndex++
      ) {
        const trapLt = trapLtMatrix[rowIndex][colIndex];
        const cell = createCell(trapLt);
        row.appendChild(cell);
      }
      trapLtTable.appendChild(row);
    }

    container.appendChild(trapLtTable);
  }

  // Function to create a table cell with the trapezoidal LT values
  function createCell(trapLt) {
    const cell = document.createElement("td");
    cell.textContent = `{ ${trapLt.join(", ")} }`;
    return cell;
  }

  // Function to create a header cell with labels
  function createHeaderCell(label) {
    const cell = document.createElement("th");
    cell.textContent = label;
    return cell;
  }
});
