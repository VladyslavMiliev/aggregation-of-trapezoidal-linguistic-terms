document.addEventListener("DOMContentLoaded", function () {
  const convertToTrapLtBtn = document.getElementById("conToTrapLt");
  const trapLtTableContainer = document.getElementById("trapLtTableContainer");

  convertToTrapLtBtn.addEventListener("click", function () {
    const intervalsTable = document.querySelector(
      "#intervalTableContainer table"
    );
    const rows = intervalsTable.querySelectorAll("tr");

    const conversionMap = {
      "{ A }": [0.25, 0.5, 0.5, 0.75],
      "{ BA }": [0, 0.25, 0.25, 0.5],
      "{ BA, A }": [0, 0.25, 0.5, 0.75],
      "{ AA, H }": [0.5, 0.75, 1, 1],
      "{ A, AA }": [0.25, 0.5, 0.75, 1],
      "{ AA }": [0.5, 0.75, 0.75, 1],
      "{ BA, A, AA }": [0, 0.25, 0.75, 1],
      "{ L, BA, A }": [0, 0, 0.5, 0.75],
      "{ L, BA, A, AA }": [0, 0, 0.75, 0.1],
      "{ BA, A, AA, H }": [0, 0.25, 1, 1],
      "{ L, BA, A, AA, H }": [0, 0, 1, 1],
      "{ A, AA, H }": [0.25, 0.5, 1, 1],
      "{ L, BA }": [0, 0, 0.25, 0.5],
      "{ L }": [0, 0, 0, 0.25],
      "{ H }": [0.75, 1, 1, 1],
    };

    const trapLtTable = document.createElement("table");

    const topLabelRow = document.createElement("tr");
    const topLabelCell = document.createElement("th");
    topLabelCell.textContent = "";
    topLabelRow.appendChild(topLabelCell);

    const headerRow = rows[0];
    const headerCells = headerRow.querySelectorAll("th");
    let columnCount = 0;
    headerCells.forEach((headerCell, i) => {
      if (headerCell.textContent.trim() !== "") {
        const headerLabel = `C${columnCount + 1}`;
        const topLabelCell = document.createElement("th");
        topLabelCell.textContent = headerLabel;
        topLabelRow.appendChild(topLabelCell);
        columnCount++;
      }
    });

    trapLtTable.appendChild(topLabelRow);

    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const newRow = document.createElement("tr");
      const cells = row.querySelectorAll("td");

      const leftLabelCell = document.createElement("th");
      leftLabelCell.textContent = `x${rowIndex}`;
      newRow.appendChild(leftLabelCell);

      cells.forEach((cell, cellIndex) => {
        const interval = cell.textContent.trim();
        const trapLtValue = conversionMap[interval];

        if (trapLtValue) {
          const newCell = document.createElement("td");
          newCell.textContent = `(${trapLtValue[0]}, ${trapLtValue[1]}, ${trapLtValue[2]}, ${trapLtValue[3]})`;
          newRow.appendChild(newCell);
        } else {
          const newCell = document.createElement("td");
          newCell.textContent = "";
          newRow.appendChild(newCell);
        }
      });

      trapLtTable.appendChild(newRow);
    }

    trapLtTableContainer.innerHTML = "";
    trapLtTableContainer.appendChild(trapLtTable);
  });
});
