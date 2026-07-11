(function () {
  var storageKey = "theme";
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var icon = toggle && toggle.querySelector(".theme-toggle__icon");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      var theme = localStorage.getItem(storageKey);
      return theme === "light" || theme === "dark" ? theme : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function getEffectiveTheme() {
    return getStoredTheme() || (media.matches ? "dark" : "light");
  }

  function applyTheme(theme, isStored) {
    if (isStored) {
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
      return;
    }

    delete root.dataset.theme;
    root.style.colorScheme = "";
  }

  function updateButton(theme) {
    if (!toggle) {
      return;
    }

    var isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

    if (icon) {
      icon.textContent = isDark ? "☾" : "☀";
    }
  }

  function syncTheme() {
    var storedTheme = getStoredTheme();
    var theme = storedTheme || (media.matches ? "dark" : "light");
    applyTheme(theme, Boolean(storedTheme));
    updateButton(theme);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
      setStoredTheme(nextTheme);
      syncTheme();
    });
  }

  media.addEventListener("change", function () {
    if (!getStoredTheme()) {
      syncTheme();
    }
  });

  syncTheme();
})();
