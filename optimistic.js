import { intervalEstimates } from "./intervalEstimateTrapLt.js";

function calculateOptimisticEstimates(intervalEstimates) {
  const optContainer = document.getElementById("optContainer");
  const probabilities = [];

  let optHTML = "<strong>Intervals with maximal estimates:</strong><br>";

  intervalEstimates.forEach((row, rowIndex) => {
    let maxLeftInterval = null;
    let maxRightInterval = null;

    row.forEach(([leftStr, rightStr]) => {
      const left = parseFloat(leftStr);
      const right = parseFloat(rightStr);

      if (maxLeftInterval === null || left > maxLeftInterval.left) {
        maxLeftInterval = { left, right };
      }

      if (maxRightInterval === null || right > maxRightInterval.right) {
        maxRightInterval = { left, right };
      }
    });

    const I_L = maxLeftInterval.left;
    const I_R = maxRightInterval.right;

    const probability = calculateProbability(I_L, I_R);

    probabilities.push({ index: rowIndex + 1, probability });

    optHTML += `Imax(x${rowIndex + 1})=[${I_L.toFixed(2)}, ${I_R.toFixed(
      2
    )}]<br>`;
    optHTML += `p(Imax(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(
      2
    )})/(${I_R.toFixed(2)}-${I_L.toFixed(2)}+1),0)) = ${probability.toFixed(2)}<br>`;
  });

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

  optContainer.innerHTML = `${optHTML}<strong>Ranking:</strong><br>${rankingHTML}`;
}

function calculateProbability(I_L, I_R) {
  return Math.max(1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0), 0);
}

document.addEventListener("DOMContentLoaded", function () {
  const calcOptimisticBtn = document.getElementById("calcOptimistic");

  calcOptimisticBtn.addEventListener("click", function () {
    calculateOptimisticEstimates(intervalEstimates);
  });
});
