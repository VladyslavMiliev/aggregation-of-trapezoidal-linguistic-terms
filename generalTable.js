document.addEventListener("DOMContentLoaded", function () {
  const tableContainer = document.getElementById("tableContainer");
  const submitBtn = document.getElementById("submitBtn");
  const altInput = document.getElementById("altInp");
  const critInput = document.getElementById("critInp");
  let termData = JSON.parse(localStorage.getItem("termData")) || [];
  function createTableCell(terms, randomFill) {
    const cell = document.createElement("td");
    const dropdown = createDropdownWithIntervals(terms, randomFill);
    cell.appendChild(dropdown);
    return cell;
  }
  function createHeaderCell(text) {
    const headerCell = document.createElement("th");
    headerCell.textContent = text;
    return headerCell;
  }

  function createTable(altCount, critCount, randomFill = false) {
    tableContainer.innerHTML = "";
    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.appendChild(createHeaderCell(""));
    for (let i = 1; i <= critCount; i++) {
      headerRow.appendChild(createHeaderCell(`C${i}`));
    }
    table.appendChild(headerRow);

    for (let i = 1; i <= altCount; i++) {
      const row = document.createElement("tr");
      row.appendChild(createHeaderCell(`x${i}`));

      for (let j = 1; j <= critCount; j++) {
        row.appendChild(createTableCell(termData, randomFill));
      }

      table.appendChild(row);
    }

    tableContainer.appendChild(table);
  }

  function createDropdownWithIntervals(terms, randomFill) {
    const dropdown = document.createElement("select");
    const termShorts = terms.map((term) => term.short);
    const combinations = [];
    if (randomFill) {
      const numTermsToSelect =
        Math.floor(Math.random() * termShorts.length) + 1;

      for (let i = termShorts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [termShorts[i], termShorts[j]] = [termShorts[j], termShorts[i]];
      }

      const selectedTerms = termShorts.slice(0, numTermsToSelect);

      selectedTerms.forEach((term) => {
        addIntervalOption(dropdown, term);

      });
      combinations.push(...selectedTerms);
    } else {
      const addedIntervals = new Set();

      termShorts.forEach((term) => {
        addIntervalOption(dropdown, term);
      });

      for (let i = 0; i < termShorts.length; i++) {
        for (let j = i + 1; j < termShorts.length; j++) {
          const term1 = termShorts[i];
          const term2 = termShorts[j];

          addUniqueInterval(dropdown, `less than ${term2}`, addedIntervals);
          addUniqueInterval(dropdown, `greater than ${term1}`, addedIntervals);
          addUniqueInterval(dropdown, `${term1} and ${term2}`, addedIntervals);
          combinations.push(`less than ${term2}`, `greater than ${term1}`, `${term1} and ${term2}`);
        }
      }
    }
    return dropdown;
  }
 
  function addUniqueInterval(dropdown, value, addedIntervals) {
    if (!addedIntervals.has(value)) {
      addedIntervals.add(value);
      addIntervalOption(dropdown, value);
    }
  }

  function addIntervalOption(dropdown, value) {
    if (!dropdownContainsOption(dropdown, value)) {
      let option = document.createElement("option");
      option.value = value;
      option.text = value;
      dropdown.appendChild(option);
    }
  }

  function dropdownContainsOption(dropdown, value) {
    const options = dropdown.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return true;
      }
    }
    return false;
  }

  function collectTermData() {
    const termInputs = document.querySelectorAll(".term input");
    let termData = [];

    for (let i = 0; i < termInputs.length; i += 5) {
      termData.push({
        full: termInputs[i].value,
        short: termInputs[i + 1].value,
        l: parseInt(termInputs[i + 2].value) || 0,
        m: parseInt(termInputs[i + 3].value) || 0,
        r: parseInt(termInputs[i + 4].value) || 0,
      });
    }
    
    return termData;
  }

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    termData = collectTermData();
    localStorage.setItem("termData", JSON.stringify(termData));
    createTable(altInput.value, critInput.value);
    console.log("Term Data stored:", termData);
  });
  
});
