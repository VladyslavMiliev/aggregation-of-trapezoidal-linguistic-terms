import { intervalEstimates } from "./intervalEstimateTrapLt.js";
import { trapLtMatrix } from "./trapLtTable.js";

function calculateNeutralPosition() {
  const neuContainer = document.getElementById("neuContainer");

  const probabilities = intervalEstimates.map((row, rowIndex) => {
    let I_L = Infinity;
    let I_R = -Infinity;

    row.forEach(([leftStr, rightStr]) => {
      const left = parseFloat(leftStr);
      const right = parseFloat(rightStr);

      I_L = Math.min(I_L, left);
      I_R = Math.max(I_R, right);
    });

    const I_neutral = [I_L, I_R];
    const probability = (1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0)).toFixed(
      2
    );

    return { index: rowIndex + 1, probability, I_L, I_R };
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

  const neutralHTML = probabilities
    .map(
      (item) =>
        `I(x${item.index})=[${item.I_L.toFixed(2)}, ${item.I_R.toFixed(
          2
        )}]<br>` +
        `p(I(x${item.index}))=max(1-max((1-${item.I_L.toFixed(
          2
        )})/(${item.I_R.toFixed(2)}-${item.I_L.toFixed(2)}+1),0)) = ${
          item.probability
        }<br>`
    )
    .join("");

  neuContainer.innerHTML = `<strong>The neutral position:</strong><br>${neutralHTML}<strong>Ranking:</strong><br>${rankingHTML}`;
}
function calculateAggressiveEstimates(intervalEstimates) {
  const aggrContainer = document.getElementById("aggrContainer");
  const probabilities = [];

  let aggrHTML = "<strong>Intervals with aggressive estimates:</strong><br>";

  intervalEstimates.forEach((row, rowIndex) => {
    let Imin = [Infinity, Infinity];
    let Imax = [-Infinity, -Infinity];

    row.forEach(([leftStr, rightStr]) => {
      const left = parseFloat(leftStr);
      const right = parseFloat(rightStr);

      Imin[0] = Math.min(Imin[0], left);
      Imin[1] = Math.min(Imin[1], right);

      Imax[0] = Math.max(Imax[0], left);
      Imax[1] = Math.max(Imax[1], right);
    });

    const I_L = (Imin[0] + Imax[0]) / 2;
    const I_R = (Imin[1] + Imax[1]) / 2;

    const probability = calculateProbability(I_L, I_R);

    probabilities.push({ index: rowIndex + 1, probability });

    aggrHTML += `Iag(x${rowIndex + 1})=[(${Imin[0].toFixed(
      2
    )}+${Imax[0].toFixed(2)})/2, (${Imin[1].toFixed(2)}+${Imax[1].toFixed(
      2
    )})/2]=[${I_L.toFixed(2)}, ${I_R.toFixed(2)}]<br>`;
    aggrHTML += `p(Iag(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(
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

  aggrContainer.innerHTML = `${aggrHTML}<strong>Ranking:</strong><br>${rankingHTML}`;
}

function calculateProbability(I_L, I_R) {
  return Math.max(1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0), 0);
}

document.addEventListener("DOMContentLoaded", function () {
  const calcNeutralBtn = document.getElementById("calcNeutral");

  calcNeutralBtn.addEventListener("click", function () {
    calculateNeutralPosition();
    calculateAggressiveEstimates(intervalEstimates);
  });
});
