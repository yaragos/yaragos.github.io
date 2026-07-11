(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".site-nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 860px)");

  const setOpen = (open) => {
    nav.classList.toggle("is-collapsed", !open);
    nav.setAttribute("aria-hidden", open ? "false" : "true");
    nav.toggleAttribute("inert", !open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    header.classList.toggle("is-nav-open", open);
  };

  const syncMode = () => {
    if (mobileQuery.matches) {
      setOpen(false);
      return;
    }

    nav.classList.remove("is-collapsed");
    nav.removeAttribute("aria-hidden");
    nav.removeAttribute("inert");
    toggle.setAttribute("aria-expanded", "false");
    header.classList.remove("is-nav-open");
  };

  toggle.addEventListener("click", () => {
    setOpen(nav.classList.contains("is-collapsed"));
  });

  nav.addEventListener("click", (event) => {
    if (mobileQuery.matches && event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileQuery.matches && !nav.classList.contains("is-collapsed")) {
      setOpen(false);
      toggle.focus();
    }
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncMode);
  } else {
    mobileQuery.addListener(syncMode);
  }

  window.addEventListener("resize", syncMode);

  syncMode();
})();
