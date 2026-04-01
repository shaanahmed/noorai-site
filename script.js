(function () {
  const THEME_KEY = "noorai_theme";

  function applyTheme(theme) {
    const isLuxury = theme === "luxury";
    document.body.classList.toggle("theme-luxury", isLuxury);
    return isLuxury;
  }

  function addThemeToggle() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";

    const setLabel = (isLuxury) => {
      button.textContent = isLuxury ? "Theme: Luxury" : "Theme: Aurora";
      button.setAttribute("aria-pressed", String(isLuxury));
    };

    const savedTheme = localStorage.getItem(THEME_KEY) || "aurora";
    setLabel(applyTheme(savedTheme));

    button.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("theme-luxury")
        ? "aurora"
        : "luxury";
      localStorage.setItem(THEME_KEY, nextTheme);
      setLabel(applyTheme(nextTheme));
    });

    topbar.appendChild(button);
  }

  const page = document.body.getAttribute("data-page");
  if (!page) {
    return;
  }

  addThemeToggle();

  const active = document.querySelector(`[data-nav='${page}']`);
  if (active) {
    active.classList.add("active");
  }

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) {
        return;
      }
      const target = document.querySelector(id);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
