(function () {
  const input = document.querySelector("[data-post-search]");
  const count = document.querySelector("[data-post-search-count]");
  const cards = Array.from(document.querySelectorAll("[data-post-list] .entry-card"));

  if (!input || !count || cards.length === 0) {
    return;
  }

  function normalize(value) {
    return value.toLowerCase().trim();
  }

  input.addEventListener("input", () => {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    let visible = 0;

    cards.forEach((card) => {
      const link = card.querySelector("[data-search-text]");
      const haystack = normalize(link ? link.dataset.searchText || "" : card.textContent || "");
      const matched = terms.every((term) => haystack.includes(term));
      card.hidden = !matched;
      if (matched) {
        visible += 1;
      }
    });

    if (terms.length === 0) {
      count.textContent = "Showing the latest posts.";
    } else {
      count.textContent = visible === 1 ? "1 post on this page matches." : `${visible} posts on this page match.`;
    }
  });
})();
