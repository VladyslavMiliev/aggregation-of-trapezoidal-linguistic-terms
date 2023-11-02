import { termData, selections } from "./generalTable.js";
let intervals = [];
export { intervals, termData };
document.addEventListener("DOMContentLoaded", function () {
  const altInput = document.getElementById("altInp");
  const critInput = document.getElementById("critInp");
  const intervalsTableContainer = document.getElementById(
    "intervalsTableContainer"
  );
  const conToIntervalsBtn = document.getElementById("conToIntervals");

  function createTable(critCount, altCount, intervals) {
    intervalsTableContainer.innerHTML = "";
    const intervalsTable = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.appendChild(createHeaderCell(""));
    for (let i = 1; i <= critCount; i++) {
      headerRow.appendChild(createHeaderCell(`C${i}`));
    }
    intervalsTable.appendChild(headerRow);

    for (let i = 0; i < altCount; i++) {
      const row = document.createElement("tr");
      row.appendChild(createHeaderCell(`x${i + 1}`));

      for (let j = 0; j < critCount; j++) {
        const intervalValue = intervals[i][j];

        if (Array.isArray(intervalValue)) {
          row.appendChild(createIntervalCell(intervalValue.join(", ")));
        } else {
          row.appendChild(createIntervalCell(intervalValue));
        }
      }

      intervalsTable.appendChild(row);
    }

    intervalsTableContainer.appendChild(intervalsTable);
  }

  function createIntervalCell(value) {
    const cell = document.createElement("td");
    cell.textContent = `{ ${value} }`;
    return cell;
  }

  function createHeaderCell(text) {
    const headerCell = document.createElement("th");
    headerCell.textContent = text;
    return headerCell;
  }
  function convertSelectionsToIntervals(selections, termData) {
    

    for (let i = 0; i < selections.length; i++) {
      const rowIntervals = selections[i].map((selection) => {
        const terms = selection.split(" ");
        const interval = [];
        if (terms.length === 1) {
          const term = terms[0];
          const currentIndex = termData.findIndex((t) => t.short === term);
          interval.push(termData[currentIndex].short);
        } else if (terms[1] === "and") {
          terms.splice(1, 1);
          interval.push(...processAndTerms(terms, termData));
        } else if (terms[0] === "less") {
          interval.push(...processLessThan(terms[2], termData));
        } else if (terms[0] === "greater") {
          interval.push(...processGreaterThan(terms[2], termData));
        }
        return interval;
      });
      intervals.push(rowIntervals);
    }
    return intervals;
  }

  function processLessThan(term, termData) {
    const currentIndex = termData.findIndex((t) => t.short === term);
    return termData.slice(0, currentIndex + 1).map((t) => t.short);
  }

  function processGreaterThan(term, termData) {
    const currentIndex = termData.findIndex((t) => t.short === term);
    return termData.slice(currentIndex).map((t) => t.short);
  }

  function processAndTerms(terms, termData) {
    const firstTerm = terms[0];
    const lastTerm = terms[1];
    const firstIndex = termData.findIndex((t) => t.short === firstTerm);
    const lastIndex = termData.findIndex((t) => t.short === lastTerm);

    const interval = termData
      .slice(firstIndex, lastIndex + 1)
      .map((t) => t.short);
    return interval;
  }
  conToIntervalsBtn.addEventListener("click", function () {
    const altCount = parseInt(altInput.value);
    const critCount = parseInt(critInput.value);

    const intervals = convertSelectionsToIntervals(selections, termData);
    createTable(critCount, altCount, intervals);
  });
});
