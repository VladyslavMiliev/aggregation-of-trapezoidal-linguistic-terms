document.addEventListener("DOMContentLoaded", function () {
  const addTermsBtn = document.getElementById("addTermsBtn");
  const fillBtn = document.getElementById("fillBtn");
  const termsNamesDiv = document.getElementById("termNames");
  let termData = [];

  addTermsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const termsCount = parseFloat(document.getElementById("termsInp").value);
    if (!isNaN(termsCount)) {
      termsNamesDiv.innerHTML = "";

      for (let i = 1; i <= termsCount; i++) {
        const termDiv = createTermDiv(i);
        termsNamesDiv.appendChild(termDiv);
      }
    }
  });

  fillBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (termsNamesDiv.children.length === 3) {
      termData.push(
        { full: "Low", short: "L", l: 0, m: 0, r: 25 },
        { full: "Medium", short: "M", l: 25, m: 50, r: 75 },
        { full: "High", short: "H", l: 75, m: 100, r: 100 }
      );
    }
    if (termsNamesDiv.children.length === 5) {
      termData.push(
        { full: "Low", short: "L", l: 0, m: 0, r: 25 },
        { full: "Below Average", short: "BA", l: 0, m: 25, r: 50 },
        { full: "Average", short: "A", l: 25, m: 50, r: 75 },
        { full: "Above Average", short: "AA", l: 50, m: 75, r: 100 },
        { full: "High", short: "H", l: 75, m: 100, r: 100 }
      );
    }
    populateTermInputs(termData);
    localStorage.setItem("termData", JSON.stringify(termData));
  });

  function createTermDiv(index) {
    const termDiv = document.createElement("div");
    termDiv.classList.add("term");

    const fnameInput = createInput(
      `fname${index}Inp`,
      `Full name of #${index} LT`,
      "text"
    );
    const snameInput = createInput(
      `sname${index}Inp`,
      `Short name of #${index} LT`,
      "text"
    );
    const lInput = createInput(`b${index}lInp`, "Left", "number", 0, 10000);
    const mInput = createInput(`b${index}mInp`, "Middle", "number", 0, 10000);
    const rInput = createInput(`b${index}rInp`, "Right", "number", 0, 10000);

    termDiv.appendChild(fnameInput);
    termDiv.appendChild(snameInput);
    termDiv.appendChild(lInput);
    termDiv.appendChild(mInput);
    termDiv.appendChild(rInput);

    return termDiv;
  }

  function createInput(id, placeholder, type, min, max) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;

    if (type === "number") {
      input.min = min;
      input.max = max;
    }

    return input;
  }

  function populateTermInputs(data) {
    const termInputs = document.querySelectorAll(".term input");

    data.forEach((term, index) => {
      const inputIndex = index * 5;
      if (termInputs[inputIndex]) {
        termInputs[inputIndex].value = term.full;
      }
      if (termInputs[inputIndex + 1]) {
        termInputs[inputIndex + 1].value = term.short;
      }
      if (termInputs[inputIndex + 2]) {
        termInputs[inputIndex + 2].value = term.l;
      }
      if (termInputs[inputIndex + 3]) {
        termInputs[inputIndex + 3].value = term.m;
      }
      if (termInputs[inputIndex + 4]) {
        termInputs[inputIndex + 4].value = term.r;
      }
    });
  }
});
