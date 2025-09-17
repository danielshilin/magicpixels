const cards = document.querySelectorAll(".card");
const lightbox = document.getElementById("lightbox");
const img = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".close-btn");
const prevBtn = lightbox.querySelector(".prev-btn");
const nextBtn = lightbox.querySelector(".next-btn");

let currentIndex = 0;

function showImage(index) {
  const full = cards[index].getAttribute("data-full");
  const alt = cards[index].querySelector("img").alt;
  img.src = full;
  img.alt = alt;
  currentIndex = index;
  lightbox.classList.add("active");
}

cards.forEach((card, i) => {
  card.addEventListener("click", () => showImage(i));
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

prevBtn.addEventListener("click", () => {
  showImage((currentIndex - 1 + cards.length) % cards.length);
});

nextBtn.addEventListener("click", () => {
  showImage((currentIndex + 1) % cards.length);
});

// close on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// keyboard controls
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});
