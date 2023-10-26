document.addEventListener("DOMContentLoaded", function () {
  const tableContainer = document.getElementById("tableContainer");
  const submitBtn = document.getElementById("submitBtn");
  const altInput = document.getElementById("altInp");
  const critInput = document.getElementById("critInp");
  const fillTableBtn = document.getElementById("fillTable");
  const canvas1 = document.getElementById("chart-container1");
  const canvas2 = document.getElementById("chart-container2");
  const ctx = canvas1.getContext("2d");
  const ctx1 = canvas2.getContext("2d");
  let termData = [];
  let selections = [];
  let roundedMaxValue;
  function createTableCell(terms, randomFill) {
    const cell = document.createElement("td");
    const dropdown = createDropdownWithIntervals(terms, randomFill);
    dropdown.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      selections.push(selectedValue);
      console.log("Selected value: ", selectedValue);
      console.log(selections, termData);
    });
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
          combinations.push(
            `less than ${term2}`,
            `greater than ${term1}`,
            `${term1} and ${term2}`
          );
        }
      }
    }
    return dropdown;
  }
  function drawAxesAndLabels(ctx, chartWidth, chartHeight, termData) {
    const xAxisY = chartHeight - 50;
    const yAxisX = 50;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    if (Array.isArray(termData)) {
      ctx.beginPath();
      ctx.moveTo(yAxisX, xAxisY);
      ctx.lineTo(chartWidth - 50, xAxisY);
      ctx.stroke();
      ctx.font = "14px JetBrains Mono";
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(yAxisX, 50);
      ctx.lineTo(yAxisX, chartHeight - 50);
      ctx.stroke();

      const rValues = termData.map((term) => term.r);
      const maxR = Math.max(...rValues);

      for (let i = 0; i <= maxR; i += maxR / 4) {
        const x = yAxisX + (i / maxR) * (chartWidth - 100);
        ctx.moveTo(x, xAxisY);
        ctx.lineTo(x, xAxisY - 5);
        ctx.stroke();
        ctx.fillText(i, x - 10, xAxisY + 15);
      }

      for (let i = 0; i <= 1; i += 0.5) {
        const y = chartHeight - 50 - i * (chartHeight - 100);
        ctx.moveTo(yAxisX - 5, y);
        ctx.lineTo(yAxisX, y);
        ctx.stroke();
        ctx.fillText(i.toFixed(1), yAxisX - 40, y + 5);
      }
    }
    ctx.font = "14px JetBrains Mono";
    ctx.fillStyle = "white";
    if (roundedMaxValue > 0) {
      ctx1.beginPath();
      ctx1.moveTo(yAxisX, xAxisY);
      ctx1.lineTo(chartWidth - 50, xAxisY);
      ctx1.stroke();

      ctx1.beginPath();
      ctx1.moveTo(yAxisX, 50);
      ctx1.lineTo(yAxisX, chartHeight - 50);
      ctx1.stroke();

      for (let i = 0; i <= roundedMaxValue; i += roundedMaxValue / 4) {
        const x = yAxisX + (i / roundedMaxValue) * (chartWidth - 100);
        ctx1.moveTo(x, xAxisY);
        ctx1.lineTo(x, xAxisY - 5);
        ctx1.stroke();
        const label = (i / roundedMaxValue).toFixed(2);
        ctx1.fillText(label, x - 10, xAxisY + 15);
      }

      for (let i = 0; i <= 1; i += 0.5) {
        const y = chartHeight - 50 - i * (chartHeight - 100);
        ctx1.moveTo(yAxisX - 5, y);
        ctx1.lineTo(yAxisX, y);
        ctx1.stroke();
        ctx1.fillText(i.toFixed(1), yAxisX - 40, y + 5);
      }
    }
  }
  function drawLines(ctx, chartWidth, chartHeight, termData) {
    const xAxisY = chartHeight - 50;
    const yAxisX = 50;
  
    ctx.strokeStyle = "white"; // Set the line color to blue, you can change this as needed
    ctx.lineWidth = 2;
  
    termData.forEach((term) => {
      const x1 = yAxisX + (term.l / roundedMaxValue) * (chartWidth - 100);
      const x2 = yAxisX + (term.m / roundedMaxValue) * (chartWidth - 100);
      const x3 = yAxisX + (term.r / roundedMaxValue) * (chartWidth - 100);
  
      // Draw lines
      ctx.beginPath();
      ctx.moveTo(x1, xAxisY);
      ctx.lineTo(x2, 50); // Middle boundary
      ctx.lineTo(x3, xAxisY);
      ctx.stroke();
    });
    
  }
  
  function lineGraph(ctx, ctx1, termData) {
    const chartWidth = 500;
    const chartHeight = 300;
  
    canvas1.width = chartWidth;
    canvas1.height = chartHeight;
    canvas2.width = chartWidth;
    canvas2.height = chartHeight;
  
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.clearRect(0, 0, canvas2.width, canvas2.height);
  
    drawAxesAndLabels(ctx, chartWidth, chartHeight, termData);
    drawAxesAndLabels(ctx1, chartWidth, chartHeight);
  
    drawLines(ctx, chartWidth, chartHeight, termData);
    drawLines(ctx1, chartWidth, chartHeight, termData);
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
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].value === value) {
        return true;
      }
    }
    return false;
  }

  function collectTermData() {
    const termInputs = document.querySelectorAll(".term input");
    let termData = [];

    for (let i = 0; i < termInputs.length; i += 5) {
      const rValue = parseInt(termInputs[i + 4].value);
      if (!isNaN(rValue)) {
        // Check if rValue is a valid integer
        termData.push({
          full: termInputs[i].value,
          short: termInputs[i + 1].value,
          l: parseInt(termInputs[i + 2].value) || 0,
          m: parseInt(termInputs[i + 3].value) || 0,
          r: rValue,
        });
      }
    }

    return termData;
  }

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!validateTermData()) {
      return;
    }
    termData = collectTermData();
    console.log(termData);

    let maxValue = Math.max(...termData.map((term) => term.r));
    roundedMaxValue = Math.ceil(maxValue);
    console.log(roundedMaxValue);

    lineGraph(ctx, ctx1, termData);

    createTable(altInput.value, critInput.value);
  });

  fillTableBtn.addEventListener("click", function () {
    fillTableRandomly();
  });

  function fillTableRandomly() {
    const table = document.querySelector("table");
    if (!table) {
      alert("Table not found!");
      return;
    }

    const dropdowns = document.querySelectorAll("select");

    if (dropdowns.length === 0) {
      alert("No drop-down menus found!");
      return;
    }

    const rows = table.querySelectorAll("tr");

    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        return;
      }

      const cells = row.querySelectorAll("td");

      cells.forEach((cell, cellIndex) => {
        if (cellIndex === 0) {
          return;
        }

        const dropdown = dropdowns[cellIndex - 1];

        if (dropdown && dropdown.options.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * dropdown.options.length
          );
          const selectedValue = dropdown.options[randomIndex].value;
          dropdown.value = selectedValue;
        }
      });
    });
  }

  function validateTermData() {
    const termInputs = document.querySelectorAll(".term input");
    for (let i = 0; i < termInputs.length; i += 5) {
      const left = parseInt(termInputs[i + 2].value);
      const middle = parseInt(termInputs[i + 3].value);
      const right = parseInt(termInputs[i + 4].value);

      if (isNaN(left) || isNaN(middle) || isNaN(right)) {
        alert("Please enter valid numeric values for boundaries.");
        return false;
      }
      if (left > middle || middle > right) {
        alert("Invalid boundary values: Left > Middle or Middle > Right");
        return false;
      }
    }
    return true;
  }
});
