(function () {
  const page = document.body.getAttribute("data-page");
  if (!page) {
    return;
  }

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
