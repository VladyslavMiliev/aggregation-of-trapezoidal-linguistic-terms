import { intervalEstimates } from "./intervalEstimateTrapLt.js";

function calculatePessimisticEstimates(intervalEstimates) {
  const pesContainer = document.getElementById("pesContainer");
  const probabilities = [];

  let pesHTML = "<strong>Intervals with min estimates:</strong><br>";

  intervalEstimates.forEach((row, rowIndex) => {
    let minLeftInterval = null;
    let minRightInterval = null;

    row.forEach(([leftStr, rightStr]) => {
      const left = parseFloat(leftStr);
      const right = parseFloat(rightStr);

      if (minLeftInterval === null || left < minLeftInterval.left) {
        minLeftInterval = { left, right };
      }

      if (minRightInterval === null || right < minRightInterval.right) {
        minRightInterval = { left, right };
      }
    });

    const I_L = minLeftInterval.left;
    const I_R = minRightInterval.right;

    const probability = calculateProbability(I_L, I_R);

    probabilities.push({ index: rowIndex + 1, probability });

    pesHTML += `Imin(x${rowIndex + 1})=[${I_L.toFixed(2)}, ${I_R.toFixed(
      2
    )}]<br>`;
    pesHTML += `p(Imin(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(
      2
    )})/(${I_R.toFixed(2)}-${I_L.toFixed(2)}+1),0)) = ${probability.toFixed(
      2
    )}<br>`;
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

  pesContainer.innerHTML = `${pesHTML}<strong>Ranking:</strong><br>${rankingHTML}`;
}

function calculateProbability(I_L, I_R) {
  return Math.max(1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0), 0);
}

document.addEventListener("DOMContentLoaded", function () {
  const calcPessimisticBtn = document.getElementById("calcPessimistic");

  calcPessimisticBtn.addEventListener("click", function () {
    calculatePessimisticEstimates(intervalEstimates);
  });
});
