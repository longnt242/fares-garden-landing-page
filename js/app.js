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

const topNavMenus = document.querySelectorAll(".top-nav-menu");

const moveTopNavIndicator = (menu) => {
  const activeLink = menu.querySelector(".top-nav-link.is-active");
  const indicator = menu.querySelector(".top-nav-indicator");

  if (!activeLink || !indicator) return;

  indicator.style.left = `${activeLink.offsetLeft}px`;
  indicator.style.width = `${activeLink.offsetWidth}px`;
  indicator.style.opacity = "1";
};

const setActiveTopNavLink = (menu, targetHash) => {
  const links = menu.querySelectorAll(".top-nav-link");
  const nextActiveLink = menu.querySelector(`.top-nav-link[href="${targetHash}"]`);

  if (!nextActiveLink) return;

  links.forEach((item) => item.classList.remove("is-active"));
  nextActiveLink.classList.add("is-active");
  moveTopNavIndicator(menu);
};

topNavMenus.forEach((menu) => {
  const links = menu.querySelectorAll(".top-nav-link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
      }

      setActiveTopNavLink(menu, link.getAttribute("href"));
    });
  });

  if (window.location.hash) {
    setActiveTopNavLink(menu, window.location.hash);
  }

  requestAnimationFrame(() => moveTopNavIndicator(menu));
});

window.addEventListener("resize", () => {
  topNavMenus.forEach(moveTopNavIndicator);
});

window.addEventListener("hashchange", () => {
  topNavMenus.forEach((menu) => setActiveTopNavLink(menu, window.location.hash));
});

const viewAllPlantsTrigger = document.querySelector(".view-all-plants-trigger");
const featuredPlantsGrid = document.querySelector(".featured-plants-grid");
const plantShowcase = document.querySelector("#plant-showcase");
const plantShowcaseImage = document.querySelector(".plant-showcase-image");
const plantShowcaseName = document.querySelector(".plant-showcase-name");
const plantShowcasePrice = document.querySelector(".plant-showcase-price");
const plantShowcaseSize = document.querySelector(".plant-showcase-size");
const plantShowcaseThumbs = document.querySelectorAll(".plant-showcase-thumb");
const plantShowcasePrev = document.querySelector(".plant-showcase-prev");
const plantShowcaseNext = document.querySelector(".plant-showcase-next");
const plantShowcasePageSize = 4;
let plantShowcaseStart = 0;

if (viewAllPlantsTrigger && featuredPlantsGrid && plantShowcase) {
  viewAllPlantsTrigger.addEventListener("click", (event) => {
    event.preventDefault();

    const isVisible = plantShowcase.classList.toggle("is-visible");

    featuredPlantsGrid.classList.toggle("is-hidden", isVisible);
    viewAllPlantsTrigger.setAttribute("aria-expanded", String(isVisible));
    plantShowcase.setAttribute("aria-hidden", String(!isVisible));

    if (isVisible) {
      plantShowcase.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

plantShowcaseThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    if (
      !plantShowcaseImage ||
      !plantShowcaseName ||
      !plantShowcasePrice ||
      !plantShowcaseSize
    ) {
      return;
    }

    plantShowcaseThumbs.forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");

    plantShowcaseImage.style.opacity = "0";
    plantShowcaseImage.style.transform = "scale(1.04)";

    window.setTimeout(() => {
      plantShowcaseImage.src = thumb.dataset.img;
      plantShowcaseImage.alt = thumb.dataset.name;
      plantShowcaseName.textContent = thumb.dataset.name;
      plantShowcasePrice.textContent = thumb.dataset.price;
      plantShowcaseSize.textContent = thumb.dataset.size;
      plantShowcaseImage.style.opacity = "1";
      plantShowcaseImage.style.transform = "scale(1)";
    }, 180);
  });
});

const updatePlantShowcasePage = () => {
  plantShowcaseThumbs.forEach((thumb, index) => {
    const visibleIndexes = Array.from(
      { length: plantShowcasePageSize },
      (_, offset) => (plantShowcaseStart + offset) % plantShowcaseThumbs.length,
    );
    const isVisible = visibleIndexes.includes(index);

    thumb.classList.toggle("is-hidden", !isVisible);
  });
};

if (plantShowcaseThumbs.length) {
  updatePlantShowcasePage();
}

if (plantShowcasePrev) {
  plantShowcasePrev.addEventListener("click", () => {
    plantShowcaseStart =
      (plantShowcaseStart - plantShowcasePageSize + plantShowcaseThumbs.length) %
      plantShowcaseThumbs.length;

    updatePlantShowcasePage();
  });
}

if (plantShowcaseNext) {
  plantShowcaseNext.addEventListener("click", () => {
    plantShowcaseStart =
      (plantShowcaseStart + plantShowcasePageSize) % plantShowcaseThumbs.length;

    updatePlantShowcasePage();
  });
}
