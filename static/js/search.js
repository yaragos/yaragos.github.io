(function () {
  const input = document.querySelector("#site-search");
  const results = document.querySelector("[data-search-results]");
  const count = document.querySelector("[data-search-count]");
  const dataNode = document.querySelector("#search-data");
  const label = document.querySelector(".search-label");
  const toggles = Array.from(document.querySelectorAll("[data-search-kind]"));

  if (!input || !results || !count || !dataNode) {
    return;
  }

  const STORAGE_KEY_QUERY = "search-query";
  const STORAGE_KEY_KIND = "search-kind";

  var entries = JSON.parse(dataNode.textContent || "[]");
  var activeKind = "Post";

  function normalize(value) {
    return value.toLowerCase().trim();
  }

  function activeLabel() {
    return activeKind === "Post" ? "posts" : "moments";
  }

  function render(matches, query) {
    results.innerHTML = "";

    if (!query) {
      count.textContent = "Start typing to search " + activeLabel() + ".";
      return;
    }

    count.textContent = matches.length === 1 ? "1 " + activeKind.toLowerCase() + " found." : matches.length + " " + activeLabel() + " found.";

    if (matches.length === 0) {
      results.innerHTML = '<p class="search-empty">No matching ' + activeLabel() + ' yet.</p>';
      return;
    }

    var fragment = document.createDocumentFragment();

    matches.slice(0, 12).forEach(function (entry) {
      var link = document.createElement("a");
      link.className = "search-result";
      link.href = entry.url;

      var meta = document.createElement("small");
      meta.textContent = entry.kind + " · Published " + entry.date + " · Updated " + entry.updated;

      var title = document.createElement("strong");
      title.textContent = entry.title;

      var description = document.createElement("span");
      description.textContent = entry.description || "Open this entry to read more.";

      link.append(meta, title, description);
      fragment.appendChild(link);
    });

    results.appendChild(fragment);
  }

  function persist() {
    try {
      sessionStorage.setItem(STORAGE_KEY_QUERY, normalize(input.value));
      sessionStorage.setItem(STORAGE_KEY_KIND, activeKind);
    } catch (_) {}
  }

  function search() {
    var query = normalize(input.value);
    var terms = query.split(/\s+/).filter(Boolean);

    persist();

    var matches = entries.filter(function (entry) {
      if (entry.kind !== activeKind) {
        return false;
      }

      var haystack = normalize([
        entry.title,
        entry.description,
        entry.tags,
        entry.content,
      ].join(" "));

      return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
    });

    render(matches, query);
  }

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      activeKind = toggle.dataset.searchKind || "Post";

      toggles.forEach(function (item) {
        var isActive = item === toggle;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-checked", String(isActive));
      });

      if (label) {
        label.textContent = "Search " + activeLabel();
      }

      search();
      input.focus();
    });
  });

  input.addEventListener("input", search);

  // Restore saved query and kind on load
  var savedQuery = "";
  var savedKind = "Post";
  try {
    savedQuery = sessionStorage.getItem(STORAGE_KEY_QUERY) || "";
    savedKind = sessionStorage.getItem(STORAGE_KEY_KIND) || "Post";
  } catch (_) {}

  if (savedQuery) {
    input.value = savedQuery;
  }

  if (savedKind !== activeKind) {
    activeKind = savedKind;
    toggles.forEach(function (item) {
      var isActive = item.dataset.searchKind === savedKind;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-checked", String(isActive));
    });
    if (label) {
      label.textContent = "Search " + activeLabel();
    }
  }

  search();
})();
