(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLoop(root) {
    var track = root.querySelector(".imgloop__track");
    var slides = root.querySelectorAll(".imgloop__slide");
    var dotsWrap = root.querySelector(".imgloop__dots");
    if (!track || slides.length === 0) return;

    var index = 0;
    var count = slides.length;
    var timer = null;
    var AUTOPLAY_MS = 5000;
    var wheelLock = false;

    var dots = [];
    if (dotsWrap) {
      for (var i = 0; i < count; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "imgloop__dot";
        dot.setAttribute("aria-label", "Slide " + (i + 1));
        (function (n) {
          dot.addEventListener("click", function () {
            goTo(n);
            restart();
          });
        })(i);
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    function render() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("is-active", i === index);
      }
    }

    function goTo(n) {
      index = (n % count + count) % count;
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(next, AUTOPLAY_MS);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function restart() {
      stop();
      start();
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    root.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      if (e.deltaX > 0) { next(); } else { prev(); }
      restart();
      window.setTimeout(function () { wheelLock = false; }, 350);
    }, { passive: false });

    render();
    start();
  }

  function init() {
    var loops = document.querySelectorAll("[data-imgloop]");
    for (var i = 0; i < loops.length; i++) {
      initLoop(loops[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
