import { intervalEstimates } from "./intervalEstimateTrapLt.js";

function calculateOptimisticEstimates(intervalEstimates) {
  const optContainer = document.getElementById("optContainer");
  const probabilities = [];

  let optHTML = "<strong>Intervals with maximal estimates:</strong><br>";

  for (let rowIndex = 0; rowIndex < intervalEstimates.length; rowIndex++) {
    const row = intervalEstimates[rowIndex];

    let maxLeftInterval = null;
    let maxRightInterval = null;

    for (let j = 0; j < row.length; j++) {
      const interval = {
        left: parseFloat(row[j][0]),
        right: parseFloat(row[j][1]),
      };

      if (maxLeftInterval === null || interval.left > maxLeftInterval.left) {
        maxLeftInterval = interval;
      }

      if (
        maxRightInterval === null ||
        interval.right > maxRightInterval.right
      ) {
        maxRightInterval = interval;
      }
    }

    const I_L = maxLeftInterval.left;
    const I_R = maxRightInterval.right;
    
    // Correct the probability calculation
    const probability = Math.max(
      1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0),
      0
    ).toFixed(2);

    probabilities.push({ index: rowIndex + 1, probability });

    optHTML += `Imax(x${rowIndex + 1})=[${I_L.toFixed(2)}, ${I_R.toFixed(2)}]<br>`;
    optHTML += `p(Imax(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(2)})/(${I_R.toFixed(2)}-${I_L.toFixed(2)}+1),0)) = ${probability}<br>`;
  }

  probabilities.sort((a, b) => b.probability - a.probability);

  const rankingHTML = probabilities
    .map((item, index, arr) => {
      if (index === 0) {
        return `x${item.index}`;
      } else if (item.probability === arr[index - 1].probability) {
        return ` = x${item.index}`;
      } else {
        return ` > x${item.index}`;
      }
    })
    .join("");
  optContainer.innerHTML =
    optHTML + "<strong>Ranking:</strong><br>" + rankingHTML;
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const calcOptimisticBtn = document.getElementById("calcOptimistic");

  calcOptimisticBtn.addEventListener("click", function () {
    calculateOptimisticEstimates(intervalEstimates);
  });
});
