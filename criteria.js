document.addEventListener("DOMContentLoaded", function () {
  const addCritBtn = document.getElementById("addCritBtn");
  const critNamesDiv = document.getElementById("critNames");

  addCritBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const critCount = parseInt(document.getElementById("critInp").value);
    if (!isNaN(critCount)) {
      critNamesDiv.innerHTML = "";
      for (let i = 1; i <= critCount; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `critName${i}inp`;
        input.placeholder = `Name of #${i} Criteria`;
        critNamesDiv.appendChild(input);
      }
    }
  });

  const fillBtn = document.getElementById("fillBtn");

  fillBtn.addEventListener("click", function () {
    const dataset = [
      "Safety Record",
      "Punctuality",
      "Customer Satisfaction",
      "Price and Affordability",
      "Route Network",
      "Baggage Handling",
      "Environmental Impact",
      "Cabin Comfort",
      "Food and Beverage",
      "Check-in and Boarding Process",
      "In-Flight Entertainment",
      "On-Time Connections",
      "Loyalty Programs",
      "Staff Friendliness and Service",
      "Baggage Policies",
      "Seat Selection Options",
      "Onboard Cleanliness",
      "Travel Flexibility",
      "Airport Lounges",
      "In-Flight Magazine and Reading Material",
      "Business Class and First Class Services",
      "Accessibility",
      "Pet Policies",
    ];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Fixed the shuffling here
      }
      return array;
    }

    const shuffledArray = shuffleArray(dataset);
    for (let i = 0; i < shuffledArray.length; i++) {
      const inputField = document.getElementById(`critName${i + 1}inp`);
      if (inputField) {
        inputField.value = shuffledArray[i];
      }
    }
  });
});
