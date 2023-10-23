document.addEventListener("DOMContentLoaded", function () {
  const intervalLtTableContainer = document.getElementById(
    "estimateLtTableContainer"
  );
  const pesContainer = document.getElementById("pesContainer");
  const calcPesimisticBtn = document.getElementById("calcPesimistic");

  calcPesimisticBtn.addEventListener("click", function () {
    const intervalLtTable = intervalLtTableContainer.querySelector("table");
    const rows = intervalLtTable.querySelectorAll("tr");

    let pesHTML = "<strong>Intervals with min estimates:</strong><br>";
    const probabilities = [];

    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const cells = row.querySelectorAll("td");

      let minLeftInterval = null;
      let minRightInterval = null;

      cells.forEach((cell) => {
        const text = cell.textContent;
        const match = text.match(/\((-?\d+\.\d+), (-?\d+\.\d+)\)/);
        if (match) {
          const interval = {
            left: parseFloat(match[1]),
            right: parseFloat(match[2]),
          };

          if (
            minLeftInterval === null ||
            interval.left < minLeftInterval.left
          ) {
            minLeftInterval = interval;
          }

          if (
            minRightInterval === null ||
            interval.right < minRightInterval.right
          ) {
            minRightInterval = interval;
          }
        }
      });

      const I_L = minLeftInterval.left;
      const I_R = minRightInterval.right;
      const probability = Math.max(
        1 - Math.max(1 - (I_R - I_L) / (I_R - I_L + 1), 0),
        0
      ).toFixed(2);

      probabilities.push({ index: rowIndex, probability });

      pesHTML += `Imin(x${rowIndex})=[${minLeftInterval.left.toFixed(
        2
      )}, ${minRightInterval.right.toFixed(2)}]<br>`;

      pesHTML += `p(Imin(x${rowIndex}))=max(1-max(1-${I_L.toFixed(
        2
      )}/${I_R.toFixed(2)}-${I_L.toFixed(2)}+1.0),0) = ${probability}<br>`;
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
    pesContainer.innerHTML = pesHTML + "<strong>Ranking:</strong><br>" + rankingHTML;
  });
});
