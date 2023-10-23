document.addEventListener("DOMContentLoaded", function () {
  const addAltBtn = document.getElementById("addAltBtn");
  const altNamesDiv = document.getElementById("altNames");

  addAltBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const altCount = parseInt(document.getElementById("altInp").value);
    if (!isNaN(altCount)) {
      altNamesDiv.innerHTML = "";
      for (let i = 1; i <= altCount; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `altName${i}inp`;
        input.placeholder = `Name of #${i} Alternative`;
        altNamesDiv.appendChild(input);
      }
    }
  });
  const fillBtn = document.getElementById("fillBtn");

  fillBtn.addEventListener("click", function () {
    const dataset = [
      "Delta Air Lines",
      "British Airways",
      "Emirates",
      "Air France",
      "Qatar Airways",
      "American Airlines",
      "Lufthansa",
      "United Airlines",
      "Singapore Airlines",
      "Cathay Pacific",
      "Southwest Airlines",
      "Virgin Atlantic",
      "ANA (All Nippon Airways)",
      "Turkish Airlines",
      "Etihad Airways",
      "KLM Royal Dutch Airlines",
      "Swiss International Air Lines",
    ];
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
      }
      return array;
    }
    const shuffledArray = shuffleArray(dataset);
    for (let i = 0; i < shuffledArray.length; i++) {
      const inputField = document.getElementById(`altName${i + 1}inp`);
      if (inputField) {
        inputField.value = shuffledArray[i];
      }
    }
  });
});
