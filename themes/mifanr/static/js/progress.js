(function () {
  var KEY = "top-progress";
  var root = document.querySelector(".top-progress");
  var bar = document.querySelector(".top-progress-bar");
  if (!root || !bar) return;

  var value = 0;
  var trickle = null;

  function set(n) {
    value = Math.max(0, Math.min(n, 1));
    bar.style.transform = "scaleX(" + value + ")";
  }

  function start() {
    root.classList.remove("is-done");
    root.classList.add("is-on");
    if (value === 0) set(0.08);
    if (trickle) return;
    trickle = setInterval(function () {
      if (value >= 0.92) return;
      var step = 0.015 + Math.random() * 0.04;
      set(value + step * (1 - value));
    }, 180);
  }

  function done() {
    if (trickle) {
      clearInterval(trickle);
      trickle = null;
    }
    set(1);
    root.classList.add("is-on");
    requestAnimationFrame(function () {
      root.classList.add("is-done");
    });
    setTimeout(function () {
      root.classList.remove("is-on", "is-done");
      set(0);
    }, 500);
  }

  function internal(a) {
    if (!a || !a.getAttribute("href")) return false;
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    var rel = (a.getAttribute("rel") || "").toLowerCase();
    if (/\bexternal\b/.test(rel)) return false;
    var url;
    try {
      url = new URL(a.href, location.href);
    } catch (e) {
      return false;
    }
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname && url.search === location.search) return false;
    return url.protocol === "http:" || url.protocol === "https:";
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var a = event.target.closest("a[href]");
    if (!internal(a)) return;
    event.preventDefault();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}
    start();
    requestAnimationFrame(function () {
      location.href = a.href;
    });
  });

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      done();
      return;
    }
    try {
      if (sessionStorage.getItem(KEY) === "1") {
        sessionStorage.removeItem(KEY);
        set(0.72);
        start();
        setTimeout(done, 80);
      }
    } catch (e) {}
  });
})();
