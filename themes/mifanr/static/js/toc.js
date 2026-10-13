(function () {
  var toc = document.getElementById("toc");
  var top = document.getElementById("to-top");
  var links = toc ? Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']")) : [];
  var headings = links
    .map(function (a) {
      return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
    })
    .filter(Boolean);

  function wide() {
    return window.matchMedia("(min-width: 1200px)").matches;
  }

  function mark() {
    if (!links.length) return;
    var line = 140;
    var current = 0;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (atBottom) {
      current = headings.length - 1;
    } else {
      headings.forEach(function (h, i) {
        if (h.getBoundingClientRect().top <= line) current = i;
      });
    }
    links.forEach(function (a, i) {
      var li = a.parentElement;
      if (li) li.classList.toggle("active", i === current);
    });
  }

  function place() {
    var scrolled = window.scrollY > 320;
    if (top) {
      top.hidden = !scrolled;
      top.classList.toggle("beside-toc", scrolled && wide() && links.length > 0);
    }
    if (toc) toc.classList.toggle("shown", scrolled && links.length > 0);
    if (scrolled) mark();
  }

  if (top) {
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", place, { passive: true });
  window.addEventListener("resize", place);
  place();
})();
