// Collapsible toggle logic
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);
// tiny util: keep copyright year current
document.getElementById("year").textContent = new Date().getFullYear();
