(function () {
  const toc = document.querySelector(".article-toc");
  const mobileButton = document.querySelector(".mobile-toc-button");

  if (!toc) {
    return;
  }

  const toggles = Array.from(toc.querySelectorAll(".toc-toggle"));
  const links = Array.from(toc.querySelectorAll(".toc-link"));
  const headings = Array.from(document.querySelectorAll(".prose h2[id], .prose h3[id], .prose h4[id], .prose h5[id], .prose h6[id]"));
  const linkById = new Map(links.map((link) => [link.dataset.tocTarget, link]));
  const scrollContainer = toc.querySelector("nav") || toc;
  const mobileQuery = window.matchMedia("(max-width: 860px)");
  let ticking = false;
  let activeLink = null;

  function setMobileTocOpen(open) {
    if (!mobileButton) {
      return;
    }

    toc.classList.toggle("is-open", open);
    mobileButton.setAttribute("aria-expanded", String(open));
    mobileButton.setAttribute("aria-label", open ? "Close table of contents" : "Open table of contents");
  }

  function closeMobileToc() {
    if (mobileQuery.matches) {
      setMobileTocOpen(false);
    }
  }

  function setExpanded(toggle, expanded) {
    const controls = toggle.getAttribute("aria-controls");
    const group = controls ? document.getElementById(controls) : null;
    const item = toggle.closest(".toc-item");

    toggle.setAttribute("aria-expanded", String(expanded));

    if (group) {
      group.hidden = !expanded;
    }

    if (item) {
      item.classList.toggle("is-collapsed", !expanded);
    }
  }

  function expandAncestors(link) {
    let node = link.parentElement;

    while (node) {
      if (node.classList && node.classList.contains("toc-children")) {
        const item = node.closest(".toc-item");
        const toggle = item ? item.querySelector(":scope > .toc-row > .toc-toggle") : null;

        if (toggle) {
          setExpanded(toggle, true);
        }
      }

      node = node.parentElement;
    }
  }

  function headingOffset() {
    return window.matchMedia("(max-width: 860px)").matches ? 96 : 120;
  }

  function activeThreshold() {
    return headingOffset() + 24;
  }

  function currentHeading() {
    const offset = activeThreshold();
    let current = headings[0];

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      return headings[headings.length - 1];
    }

    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= offset) {
        current = heading;
      }
    });

    return current;
  }

  function scrollActiveLinkIntoView(link) {
    const linkRect = link.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const top = scrollContainer.scrollTop + linkRect.top - containerRect.top - (containerRect.height - linkRect.height) / 2;

    scrollContainer.scrollTo({ top, left: 0, behavior: "smooth" });
  }

  function updateActiveLink() {
    ticking = false;

    const heading = currentHeading();
    const nextActiveLink = heading ? linkById.get(heading.id) : null;
    const shouldScrollToc = nextActiveLink && nextActiveLink !== activeLink;

    activeLink = nextActiveLink;

    links.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
        expandAncestors(link);
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (shouldScrollToc) {
      scrollActiveLinkIntoView(activeLink);
    }
  }

  function requestActiveUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateActiveLink);
  }

  if (mobileButton) {
    mobileButton.addEventListener("click", () => {
      setMobileTocOpen(!toc.classList.contains("is-open"));
    });

    document.addEventListener("click", (event) => {
      if (!mobileQuery.matches || !toc.classList.contains("is-open")) {
        return;
      }

      if (toc.contains(event.target) || mobileButton.contains(event.target)) {
        return;
      }

      setMobileTocOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileTocOpen(false);
      }
    });
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setExpanded(toggle, toggle.getAttribute("aria-expanded") !== "true");
    });
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.dataset.tocTarget ? document.getElementById(link.dataset.tocTarget) : null;

      if (!target) {
        return;
      }

      const top = target.getBoundingClientRect().top + window.scrollY - headingOffset();

      event.preventDefault();
      window.scrollTo({ top, left: 0, behavior: "instant" });
      history.pushState(null, "", `#${target.id}`);
      window.setTimeout(updateActiveLink, 100);
      closeMobileToc();
    });
  });

  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      setMobileTocOpen(false);
    }
  });

  window.addEventListener("scroll", requestActiveUpdate, { passive: true });
  window.addEventListener("resize", requestActiveUpdate);
  updateActiveLink();
})();
