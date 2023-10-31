import { intervalEstimates } from "./intervalEstimateTrapLt.js";

function calculatePessimisticEstimates(intervalEstimates) {
  const pesContainer = document.getElementById("pesContainer");
  const probabilities = [];

  let pesHTML = "<strong>Intervals with min estimates:</strong><br>";

  for (let rowIndex = 0; rowIndex < intervalEstimates.length; rowIndex++) {
    const row = intervalEstimates[rowIndex];

    let minLeftInterval = null;
    let minRightInterval = null;

    for (let j = 0; j < row.length; j++) {
      const interval = {
        left: parseFloat(row[j][0]),
        right: parseFloat(row[j][1]),
      };

      if (minLeftInterval === null || interval.left < minLeftInterval.left) {
        minLeftInterval = interval;
      }

      if (
        minRightInterval === null ||
        interval.right < minRightInterval.right
      ) {
        minRightInterval = interval;
      }
    }

    const I_L = minLeftInterval.left;
    const I_R = minRightInterval.right;
    const probability = Math.max(
      1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0),
      0
    ).toFixed(2);

    probabilities.push({ index: rowIndex + 1, probability });

    pesHTML += `Imin(x${rowIndex + 1})=[${I_L.toFixed(2)}, ${I_R.toFixed(2)}]<br>`;
    pesHTML += `p(Imin(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(2)})/(${I_R.toFixed(2)}-${I_L.toFixed(2)}+1),0)) = ${probability}<br>`;
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
  pesContainer.innerHTML =
    pesHTML + "<strong>Ranking:</strong><br>" + rankingHTML;
}


// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const calcPesimisticBtn = document.getElementById("calcPesimistic");

  calcPesimisticBtn.addEventListener("click", function () {
    calculatePessimisticEstimates(intervalEstimates);
  });
});
