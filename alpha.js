let alphaInp = [];
export { alphaInp };
document.addEventListener("DOMContentLoaded", function () {
  const alphaInp = document.getElementById("alphaInp");
  const fillBtn = document.getElementById("fillBtn");

  fillBtn.addEventListener("click", function () {
    const dataset = [0.5];
    for (let i = 0; i < dataset.length; i++) {
      alphaInp.value = dataset[i];
    }
  });
});
