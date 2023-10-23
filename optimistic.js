document.addEventListener("DOMContentLoaded", function () {
    const intervalLtTableContainer = document.getElementById(
      "estimateLtTableContainer"
    );
    const optContainer = document.getElementById("optContainer");
    const calcOptimisticBtn = document.getElementById("calcOptimistic");
  
    calcOptimisticBtn.addEventListener("click", function () {
      // Retrieve the table rows
      const intervalLtTable = intervalLtTableContainer.querySelector("table");
      const rows = intervalLtTable.querySelectorAll("tr");
  
      let optHTML = "<strong>Intervals with max estimates:</strong><br>";
      const probabilities = [];
  
      for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        const cells = row.querySelectorAll("td");
  
        let maxLeftInterval = null;
        let maxRightInterval = null;
  
        cells.forEach((cell) => {
          const text = cell.textContent;
          const match = text.match(/\((-?\d+\.\d+), (-?\d+\.\d+)\)/);
          if (match) {
            const interval = {
              left: parseFloat(match[1]),
              right: parseFloat(match[2]),
            };
  
            if (
              maxLeftInterval === null ||
              interval.left > maxLeftInterval.left
            ) {
              maxLeftInterval = interval;
            }
  
            if (
              maxRightInterval === null ||
              interval.right > maxRightInterval.right
            ) {
              maxRightInterval = interval;
            }
          }
        });
  
        const I_L = maxLeftInterval.left;
        const I_R = maxRightInterval.right;
        const probability = Math.max(
          1 - Math.max(1 - (I_R - I_L) / (I_R - I_L + 1), 0),
          0
        ).toFixed(2);
  
        probabilities.push({ index: rowIndex, probability });
  
        optHTML += `Imax(x${rowIndex})=[${maxLeftInterval.left.toFixed(
          2
        )}, ${maxRightInterval.right.toFixed(2)}]<br>`;
  
        optHTML += `p(Imax(x${rowIndex}))=max(1-max(1-${I_L.toFixed(
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
      optContainer.innerHTML = optHTML + "<strong>Ranking:</strong><br>" + rankingHTML;
    });
  });
  