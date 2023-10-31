import { intervalEstimates } from "./intervalEstimateTrapLt.js";
import { trapLtMatrix } from "./trapLtTable.js";

function calculateNeutralPosition(intervalEstimates, trapLtMatrix) {
  const neuContainer = document.getElementById("neuContainer");
  const probabilities = [];

  let neutralHTML = "<strong>The neutral position:</strong><br>";

  const averageTrapezoidalTerms = calculateAverageTrapezoidalTerms(trapLtMatrix);
  neutralHTML += "<strong>Average trapezoidal terms</strong><br>";
  for (let i = 0; i < averageTrapezoidalTerms.length; i++) {
    neutralHTML += `(${averageTrapezoidalTerms[i].join(", ")})<br>`;
  }

  for (let rowIndex = 0; rowIndex < intervalEstimates.length; rowIndex++) {
    const row = intervalEstimates[rowIndex];

    let I_L = null;
    let I_R = null;

    for (let j = 0; j < row.length; j++) {
      const interval = {
        left: parseFloat(row[j][0]),
        right: parseFloat(row[j][1]),
      };

      if (I_L === null || interval.left < I_L) {
        I_L = interval.left;
      }

      if (I_R === null || interval.right > I_R) {
        I_R = interval.right;
      }
    }

    const I_neutral = [I_L, I_R];
    const probability = Math.max(
      1 - Math.max((1 - I_L) / (I_R - I_L + 1), 0),
      0
    ).toFixed(2);

    probabilities.push({ index: rowIndex + 1, probability });

    neutralHTML += `I(x${rowIndex + 1})=[${I_L.toFixed(2)}, ${I_R.toFixed(2)}]<br>`;
    neutralHTML += `p(I(x${rowIndex + 1}))=max(1-max((1-${I_L.toFixed(2)})/(${I_R.toFixed(2)}-${I_L.toFixed(2)}+1),0)) = ${probability}<br>`;
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
  neuContainer.innerHTML =
    neutralHTML + "<strong>Ranking:</strong><br>" + rankingHTML;
}

function calculateAverageTrapezoidalTerms(trapLtMatrix) {
  const avgTrapezoidalTerms = [];

  for (let colIndex = 0; colIndex < trapLtMatrix[0].length; colIndex++) {
    let sum_a = 0;
    let sum_b = 0;
    let sum_c = 0;
    let sum_d = 0;

    for (let rowIndex = 0; rowIndex < trapLtMatrix.length; rowIndex++) {
      const trapLt = trapLtMatrix[rowIndex][colIndex];
      sum_a += trapLt[0];
      sum_b += trapLt[1];
      sum_c += trapLt[2];
      sum_d += trapLt[3];
    }

    const avg_a = (sum_a / trapLtMatrix.length).toFixed(2);
    const avg_b = (sum_b / trapLtMatrix.length).toFixed(2);
    const avg_c = (sum_c / trapLtMatrix.length).toFixed(2);
    const avg_d = (sum_d / trapLtMatrix.length).toFixed(2);

    avgTrapezoidalTerms.push([avg_a, avg_b, avg_c, avg_d]);
  }

  return avgTrapezoidalTerms;
}


// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const calcNeutralBtn = document.getElementById("calcNeutral");

  calcNeutralBtn.addEventListener("click", function () {
    calculateNeutralPosition(intervalEstimates, trapLtMatrix);
  });
});
