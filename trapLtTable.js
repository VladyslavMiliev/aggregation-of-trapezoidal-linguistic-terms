import { intervals, termData } from "./intervalsTable.js";
let trapLtMatrix = [];
export { trapLtMatrix };

document.addEventListener("DOMContentLoaded", function () {
  const convertToTrapLtBtn = document.getElementById("conToTrapLt");
  const trapLtTableContainer = document.getElementById("trapLtTableContainer");

  convertToTrapLtBtn.addEventListener("click", function () {
    trapLtMatrix = [];

    for (let rowIndex = 0; rowIndex < intervals.length; rowIndex++) {
      const intervalsRow = intervals[rowIndex];
      const trapLtRow = [];

      for (let colIndex = 0; colIndex < intervalsRow.length; colIndex++) {
        const interval = intervalsRow[colIndex];

        const trapLt = convertIntervalToTrapezoidalLT(interval, termData);

        trapLtRow.push(trapLt);
      }

      trapLtMatrix.push(trapLtRow);
    }

    createTrapezoidalLTTable(trapLtMatrix, trapLtTableContainer);
  });

  function convertIntervalToTrapezoidalLT(interval, termData) {
    const trapezoidalLT = [0, 0, 0, 0];
  
    // Find the maximum value in termData
    const maxTermValue = termData.reduce((max, term) => {
      const termMax = Math.max(term.l, term.m, term.r);
      return termMax > max ? termMax : max;
    }, 0);
  
    if (interval.length > 1) {
      const leftmostTerm = termData.find((term) => term.short === interval[0]);
      const rightmostTerm = termData.find((term) => term.short === interval[interval.length - 1]);
  
      trapezoidalLT[0] = leftmostTerm.l / maxTermValue;
      trapezoidalLT[1] = leftmostTerm.m / maxTermValue;
      trapezoidalLT[2] = rightmostTerm.m / maxTermValue;
      trapezoidalLT[3] = rightmostTerm.r / maxTermValue;
    } else {
      const term = termData.find((t) => t.short === interval[0]);
      trapezoidalLT[0] = term.l / maxTermValue;
      trapezoidalLT[1] = term.m / maxTermValue;
      trapezoidalLT[2] = term.m / maxTermValue;
      trapezoidalLT[3] = term.r / maxTermValue;
    }
  
    return trapezoidalLT;
  }
  


  function createTrapezoidalLTTable(trapLtMatrix, container) {
    container.innerHTML = "";
    const trapLtTable = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.appendChild(createHeaderCell(" "));
    for (let colIndex = 0; colIndex < trapLtMatrix[0].length; colIndex++) {
      headerRow.appendChild(createHeaderCell("C" + (colIndex + 1)));
    }
    trapLtTable.appendChild(headerRow);

    for (let rowIndex = 0; rowIndex < trapLtMatrix.length; rowIndex++) {
      const row = document.createElement("tr");

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

  function createCell(trapLt) {
    const cell = document.createElement("td");
    cell.textContent = `{ ${trapLt.join(", ")} }`;
    return cell;
  }

  function createHeaderCell(label) {
    const cell = document.createElement("th");
    cell.textContent = label;
    return cell;
  }
});
