document.addEventListener("DOMContentLoaded", function () {
  const termData = [];
  const altInput = document.getElementById("altInp");
  const critInput = document.getElementById("critInp");
  const intervalsTableContainer = document.getElementById(
    "intervalsTableContainer"
  );
  const conToIntervalsBtn = document.getElementById("conToIntervals");

  function createTable(critCount, altCount, termData) {
    intervalsTableContainer.innerHTML = "";
    const intervalsTable = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.appendChild(createHeaderCell(""));
    for (let i = 1; i <= critCount; i++) {
      headerRow.appendChild(createHeaderCell(`C${i}`));
    }
    intervalsTable.appendChild(headerRow);

    for (let i = 1; i <= altCount; i++) {
      const row = document.createElement("tr");
      row.appendChild(createHeaderCell(`x${i}`));

      for (let j = 1; j <= critCount; j++) {
        const cellValue = "";

        const combination = "";
        const intervalValue = convertToInterval(combination, termData);

        row.appendChild(createIntervalCell(intervalValue));
      }

      intervalsTable.appendChild(row);
    }

    intervalsTableContainer.appendChild(intervalsTable);
  }

  function createIntervalCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
  }

  function createHeaderCell(text) {
    const headerCell = document.createElement("th");
    headerCell.textContent = text;
    return headerCell;
  }

  conToIntervalsBtn.addEventListener("click", function () {
    const altCount = parseInt(altInput.value);
    const critCount = parseInt(critInput.value);

    createTable(critCount, altCount, termData);
  });

  function convertToInterval() {}
});
