(function () {
  const blocks = document.querySelectorAll(".prose pre");

  blocks.forEach((pre) => {
    const code = pre.querySelector("code");

    if (!code) {
      return;
    }

    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code block");

    button.addEventListener("click", async () => {
      const text = code.textContent || "";
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    });

    pre.appendChild(button);
  });
})();
