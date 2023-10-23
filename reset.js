document.addEventListener("DOMContentLoaded", function () {
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", function () {
    const form = document.getElementById("inputForm");
    const inputs = form.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  });
});
