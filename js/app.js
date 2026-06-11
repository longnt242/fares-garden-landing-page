// Simple scroll behavior for navbar
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add("py-2");
    nav.classList.remove("py-0");
  } else {
    nav.classList.add("py-0");
    nav.classList.remove("py-2");
  }
});
