// Collapsible toggle logic
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// Toggle badge wrapper only within .domain-block__prices lists
const priceLists = document.querySelectorAll(".domain-block__prices");

priceLists.forEach((list) => {
  const listItems = list.querySelectorAll("li");

  listItems.forEach((li) => {
    li.addEventListener("click", function (e) {
      e.stopPropagation();

      const alreadyWrapped =
        li.firstElementChild &&
        li.firstElementChild.classList.contains("badge") &&
        li.firstElementChild.classList.contains("badge--secondary");

      // Remove badge from all <li>s in this list only
      listItems.forEach((otherLi) => {
        const child = otherLi.firstElementChild;
        if (
          child &&
          child.classList.contains("badge") &&
          child.classList.contains("badge--secondary")
        ) {
          otherLi.textContent = child.textContent;
        }
      });

      // If not already wrapped, wrap this one
      if (!alreadyWrapped) {
        const text = li.textContent.trim();
        li.textContent = "";
        const span = document.createElement("span");
        span.className = "badge badge--secondary";
        span.textContent = text;
        li.appendChild(span);
      }
    });
  });
});
