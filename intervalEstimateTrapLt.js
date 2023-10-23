document.addEventListener("DOMContentLoaded", function () {
  const conToIntervalLtBtn = document.getElementById("conToIntervalLt");
  const estimateLtTableContainer = document.getElementById(
    "estimateLtTableContainer"
  );

  conToIntervalLtBtn.addEventListener("click", function () {
    const trapLtTableContainer = document.getElementById(
      "trapLtTableContainer"
    );
    const trapLtTable = trapLtTableContainer.querySelector("table");
    const trapLtRows = trapLtTable.querySelectorAll("tr");
    const alpha = parseFloat(document.getElementById("alphaInp").value);

    const intervalLtTable = createIntervalLtTable(trapLtRows, alpha);

    estimateLtTableContainer.innerHTML = "";
    estimateLtTableContainer.appendChild(intervalLtTable);
  });

  function createIntervalLtTable(trapLtRows, alpha) {
    const intervalLtTable = document.createElement("table");
    const customLabels = [];

    const topLabelRow = document.createElement("tr");
    topLabelRow.appendChild(createTopLabelCell(""));

    const trapLtHeaderRow = trapLtRows[0];
    const trapLtHeaderCells = trapLtHeaderRow.querySelectorAll("th");

    trapLtHeaderCells.forEach((trapLtHeaderCell, i) => {
      if (trapLtHeaderCell.textContent.trim() !== "") {
        customLabels.push(`C${customLabels.length + 1}`);
        topLabelRow.appendChild(
          createTopLabelCell(customLabels[customLabels.length - 1])
        );
      }
    });

    intervalLtTable.appendChild(topLabelRow);

    for (let rowIndex = 1; rowIndex < trapLtRows.length; rowIndex++) {
      const trapLtRow = trapLtRows[rowIndex];
      const newRow = document.createElement("tr");
      const cells = trapLtRow.querySelectorAll("td");

      newRow.appendChild(createLeftLabelCell(`x${rowIndex}`));

      cells.forEach((trapLtCell) => {
        const trapLtValues = parseTrapLtCell(trapLtCell);
        const [I_L, I_R] = calculateIntervalValues(alpha, trapLtValues);

        newRow.appendChild(createIntervalLtCell(I_L, I_R));
      });

      intervalLtTable.appendChild(newRow);
    }

    return intervalLtTable;
  }

  function createTopLabelCell(labelText) {
    const topLabelCell = document.createElement("th");
    topLabelCell.textContent = labelText;
    return topLabelCell;
  }

  function createLeftLabelCell(labelText) {
    const leftLabelCell = document.createElement("th");
    leftLabelCell.textContent = labelText;
    return leftLabelCell;
  }

  function parseTrapLtCell(trapLtCell) {
    return trapLtCell.textContent
      .replace(/[()]/g, "")
      .split(",")
      .map((value) => parseFloat(value.trim()));
  }

  function calculateIntervalValues(alpha, trapLtValues) {
    const I_L = alpha * (trapLtValues[1] - trapLtValues[0]) + trapLtValues[0];
    const I_R = trapLtValues[3] - alpha * (trapLtValues[3] - trapLtValues[2]);
    return [I_L.toFixed(2), I_R.toFixed(2)];
  }

  function createIntervalLtCell(I_L, I_R) {
    const newCell = document.createElement("td");
    newCell.textContent = `(${I_L}, ${I_R})`;
    return newCell;
  }
});
