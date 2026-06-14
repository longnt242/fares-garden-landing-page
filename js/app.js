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

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");
const mobileMenuIcon = mobileMenuToggle?.querySelector(".mobile-menu-icon");

const setMobileNavigationOpen = (isOpen) => {
  if (!mobileMenuToggle || !mobileNavigation) return;

  mobileNavigation.classList.toggle("hidden", !isOpen);
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute(
    "aria-label",
    isOpen
      ? mobileMenuToggle.dataset.closeLabel || "Close navigation menu"
      : mobileMenuToggle.dataset.openLabel || "Open navigation menu",
  );

  if (mobileMenuIcon) {
    mobileMenuIcon.textContent = isOpen ? "close" : "menu";
  }
};

if (mobileMenuToggle && mobileNavigation) {
  mobileMenuToggle.dataset.openLabel = mobileMenuToggle.getAttribute("aria-label");
  mobileMenuToggle.dataset.closeLabel = document.documentElement.lang === "vi"
    ? "Đóng menu điều hướng"
    : "Close navigation menu";

  mobileMenuToggle.addEventListener("click", () => {
    setMobileNavigationOpen(mobileMenuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileNavigationOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenuToggle.getAttribute("aria-expanded") === "true" &&
      !mobileNavigation.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      setMobileNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileNavigationOpen(false);
      mobileMenuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMobileNavigationOpen(false);
  });
}

const galleryAutoCards = document.querySelectorAll(".gallery-auto-card");

if (galleryAutoCards.length) {
  const galleryObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const cardIndex = Array.from(galleryAutoCards).indexOf(entry.target);
        window.setTimeout(() => entry.target.classList.add("is-in-view"), cardIndex * 320);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );

  galleryAutoCards.forEach((card) => galleryObserver.observe(card));
}

const serviceAutoCards = document.querySelectorAll(".service-auto-card");

if (serviceAutoCards.length) {
  const serviceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const cardIndex = Array.from(serviceAutoCards).indexOf(entry.target);
        window.setTimeout(() => entry.target.classList.add("is-in-view"), cardIndex * 220);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 },
  );

  serviceAutoCards.forEach((card) => serviceObserver.observe(card));
}

const viewAllPlantsTrigger = document.querySelector(".view-all-plants-trigger");
const featuredPlantsGrid = document.querySelector(".featured-plants-grid");
const plantShowcase = document.querySelector("#plant-showcase");
const plantShowcaseImage = document.querySelector(".plant-showcase-image");
const plantShowcaseName = document.querySelector(".plant-showcase-name");
const plantShowcasePrice = document.querySelector(".plant-showcase-price");
const plantShowcaseSize = document.querySelector(".plant-showcase-size");
const plantShowcaseThumbTrack = document.querySelector(".plant-showcase-thumbs");
const plantShowcaseThumbs = document.querySelectorAll(".plant-showcase-thumb");
const plantShowcaseDots = document.querySelector(".plant-showcase-dots");
const plantShowcasePageSize = 4;

if (viewAllPlantsTrigger && featuredPlantsGrid && plantShowcase) {
  viewAllPlantsTrigger.addEventListener("click", (event) => {
    event.preventDefault();

    const isShowcaseOnly = viewAllPlantsTrigger.dataset.showcaseOnly === "true";
    const isVisible = isShowcaseOnly
      ? true
      : plantShowcase.classList.toggle("is-visible");

    if (isShowcaseOnly) {
      plantShowcase.classList.add("is-visible");
      featuredPlantsGrid.classList.add("is-hidden");
    } else {
      featuredPlantsGrid.classList.toggle("is-hidden", isVisible);
    }

    viewAllPlantsTrigger.setAttribute("aria-expanded", String(isVisible));
    plantShowcase.setAttribute("aria-hidden", String(!isVisible));

    if (isVisible) {
      plantShowcase.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

plantShowcaseThumbs.forEach((thumb) => {
  thumb.addEventListener("click", (event) => {
    if (plantShowcaseThumbTrack?.dataset.suppressClick === "true") {
      event.preventDefault();
      return;
    }

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

if (plantShowcaseThumbTrack && plantShowcaseThumbs.length && plantShowcaseDots) {
  const pageCount = Math.ceil(plantShowcaseThumbs.length / plantShowcasePageSize);
  const dotLabel = plantShowcaseDots.dataset.label || "Show plant group";
  let scrollFrame;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let isDragging = false;
  let activePointerId = null;

  const getPageScrollLeft = (pageIndex) => {
    const targetThumb = plantShowcaseThumbs[pageIndex * plantShowcasePageSize];
    const maxScrollLeft =
      plantShowcaseThumbTrack.scrollWidth - plantShowcaseThumbTrack.clientWidth;

    return Math.min(
      targetThumb.offsetLeft - plantShowcaseThumbs[0].offsetLeft,
      maxScrollLeft,
    );
  };

  const setActivePlantShowcaseDot = () => {
    const pagePositions = Array.from({ length: pageCount }, (_, pageIndex) =>
      getPageScrollLeft(pageIndex),
    );
    const activePage = pagePositions.reduce(
      (closestPage, position, pageIndex) =>
        Math.abs(position - plantShowcaseThumbTrack.scrollLeft) <
        Math.abs(pagePositions[closestPage] - plantShowcaseThumbTrack.scrollLeft)
          ? pageIndex
          : closestPage,
      0,
    );

    plantShowcaseDots.querySelectorAll(".plant-showcase-dot").forEach((dot, index) => {
      const isActive = index === activePage;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  Array.from({ length: pageCount }, (_, pageIndex) => {
    const dot = document.createElement("button");
    dot.className = "plant-showcase-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `${dotLabel} ${pageIndex + 1}`);
    dot.addEventListener("click", () => {
      plantShowcaseThumbTrack.scrollTo({
        left: getPageScrollLeft(pageIndex),
        behavior: "smooth",
      });
    });
    plantShowcaseDots.append(dot);
  });

  plantShowcaseThumbTrack.addEventListener("scroll", () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(setActivePlantShowcaseDot);
  });

  plantShowcaseThumbTrack.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartX = event.clientX;
    dragStartScrollLeft = plantShowcaseThumbTrack.scrollLeft;
    isDragging = false;
    activePointerId = event.pointerId;
    plantShowcaseThumbTrack.dataset.suppressClick = "false";
  });

  plantShowcaseThumbTrack.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;

    const dragDistance = event.clientX - dragStartX;
    if (Math.abs(dragDistance) > 5) {
      if (!isDragging) {
        plantShowcaseThumbTrack.setPointerCapture(event.pointerId);
      }

      isDragging = true;
      plantShowcaseThumbTrack.classList.add("is-dragging");
      plantShowcaseThumbTrack.scrollLeft = dragStartScrollLeft - dragDistance;
    }
  });

  const stopPlantShowcaseDrag = (event) => {
    if (event.pointerId !== activePointerId) return;

    if (plantShowcaseThumbTrack.hasPointerCapture(event.pointerId)) {
      plantShowcaseThumbTrack.releasePointerCapture(event.pointerId);
    }

    plantShowcaseThumbTrack.classList.remove("is-dragging");
    plantShowcaseThumbTrack.dataset.suppressClick = String(isDragging);
    activePointerId = null;
    window.setTimeout(() => {
      plantShowcaseThumbTrack.dataset.suppressClick = "false";
    }, 0);
  };

  plantShowcaseThumbTrack.addEventListener("pointerup", stopPlantShowcaseDrag);
  plantShowcaseThumbTrack.addEventListener("pointercancel", stopPlantShowcaseDrag);
  window.addEventListener("resize", setActivePlantShowcaseDot);
  setActivePlantShowcaseDot();
}

document.querySelectorAll(".consultation-form").forEach((form) => {
  const phoneInput = form.querySelector('input[name="Phone"]');
  const honeypotInput = form.querySelector('input[name="Website"]');
  const minimumSubmitDelay = 3000;
  let formReadyAt = Date.now();

  phoneInput?.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector(".consultation-form-status");
    const originalButtonText = submitButton?.textContent.trim() || "Submit";

    if (honeypotInput?.value) {
      form.reset();
      formReadyAt = Date.now();
      if (status) {
        status.textContent = form.dataset.success || "Your request has been sent.";
        status.className = "consultation-form-status text-sm text-primary";
      }
      return;
    }

    if (Date.now() - formReadyAt < minimumSubmitDelay) {
      if (status) {
        status.textContent =
          form.dataset.tooFast || "Please wait a moment before submitting.";
        status.className = "consultation-form-status text-sm text-red-700";
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("cursor-wait", "opacity-70");
      submitButton.textContent = form.dataset.sending || "Sending...";
    }

    if (status) {
      status.textContent = "";
      status.className = "consultation-form-status text-sm";
    }

    try {
      await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      });

      form.reset();
      formReadyAt = Date.now();
      if (status) {
        status.textContent = form.dataset.success || "Your request has been sent.";
        status.classList.add("text-primary");
      }
    } catch (error) {
      if (status) {
        status.textContent = form.dataset.error || "Could not send your request.";
        status.classList.add("text-red-700");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("cursor-wait", "opacity-70");
        submitButton.textContent = originalButtonText;
      }
    }
  });
});
