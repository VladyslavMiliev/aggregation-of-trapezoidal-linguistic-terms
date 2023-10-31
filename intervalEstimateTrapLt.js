let intervalEstimates = [];
import { trapLtMatrix } from "./trapLtTable.js";
export { intervalEstimates };
// Function to calculate the interval estimates based on the given formula
function calculateIntervalEstimates(alpha, trapLtMatrix) {
  for (let i = 0; i < trapLtMatrix.length; i++) {
    const row = [];
    for (let j = 0; j < trapLtMatrix[i].length; j++) {
      const [a1, a2, a3, a4] = trapLtMatrix[i][j];
      const I_L = alpha * (a2 - a1) + a1;
      const I_R = a4 - alpha * (a4 - a3);
      row.push([I_L.toFixed(2), I_R.toFixed(2)]);
    }
    intervalEstimates.push(row);
  }

  return intervalEstimates;
}

// Function to create and display the interval estimates table
function createIntervalEstimatesTable(intervalEstimates, container) {
  container.innerHTML = "";
  const table = document.createElement("table");

  // Create header row with column labels (C1, C2, ...)
  const headerRow = document.createElement("tr");
  headerRow.appendChild(createHeaderCell(" "));
  for (let j = 0; j < intervalEstimates[0].length; j++) {
    headerRow.appendChild(createHeaderCell("C" + (j + 1)));
  }
  table.appendChild(headerRow);

  // Iterate through rows and columns of interval estimates
  for (let i = 0; i < intervalEstimates.length; i++) {
    const row = document.createElement("tr");
    row.appendChild(createHeaderCell("x" + (i + 1)));
    for (let j = 0; j < intervalEstimates[i].length; j++) {
      const interval = intervalEstimates[i][j];
      const cell = createCell(interval);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

// Function to create a table cell with interval estimate values
function createCell(interval) {
  const cell = document.createElement("td");
  cell.textContent = `[${interval.join(", ")}]`;
  return cell;
}

// Function to create a header cell with labels
function createHeaderCell(label) {
  const cell = document.createElement("th");
  cell.textContent = label;
  return cell;
}

document.addEventListener("DOMContentLoaded", function () {
  const conToIntervalLtBtn = document.getElementById("conToIntervalLt");
  const estimateLtTableContainer = document.getElementById(
    "estimateLtTableContainer"
  );

  conToIntervalLtBtn.addEventListener("click", function () {
    const alpha = parseFloat(document.getElementById("alphaInp").value);
    const intervalEstimates = calculateIntervalEstimates(alpha, trapLtMatrix);
    createIntervalEstimatesTable(intervalEstimates, estimateLtTableContainer);
    console.log(intervalEstimates);
  });
});
