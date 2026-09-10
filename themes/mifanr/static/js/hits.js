(function () {
  var KEY = "chaoshen-hits";
  var MAX = 5;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function record(el) {
    var id = el.getAttribute("data-hit-id");
    if (!id) return;
    var data = load();
    var item = data[id] || { count: 0 };
    item.count += 1;
    item.name = el.getAttribute("data-hit-name") || item.name || id;
    item.url = el.getAttribute("data-hit-url") || item.url || id;
    item.logo = el.getAttribute("data-hit-logo") || item.logo || "";
    data[id] = item;
    save(data);
    render();
  }

  function topItems() {
    var data = load();
    return Object.keys(data)
      .map(function (id) {
        var item = data[id];
        item.id = id;
        return item;
      })
      .sort(function (a, b) {
        return (b.count || 0) - (a.count || 0);
      })
      .slice(0, MAX);
  }

  function card(item) {
    var a = document.createElement("a");
    a.className = "site-card js-hit";
    a.href = item.url;
    if (!item.url || item.url.charAt(0) !== "/") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.setAttribute("data-hit-id", item.id);
    a.setAttribute("data-hit-name", item.name);
    a.setAttribute("data-hit-url", item.url);
    if (item.logo) a.setAttribute("data-hit-logo", item.logo);

    var icon = document.createElement("span");
    icon.className = "site-icon";
    icon.setAttribute("aria-hidden", "true");
    if (item.logo) {
      var img = document.createElement("img");
      img.src = item.logo;
      img.alt = "";
      icon.appendChild(img);
    } else {
      icon.textContent = (item.name || "?").charAt(0);
    }

    var name = document.createElement("span");
    name.className = "site-name";
    name.textContent = item.name;

    a.appendChild(icon);
    a.appendChild(name);
    return a;
  }

  function render() {
    var root = document.getElementById("top-hits");
    if (!root) return;
    var items = topItems();
    if (!items.length) return;
    root.textContent = "";
    items.forEach(function (item) {
      root.appendChild(card(item));
    });
  }

  document.addEventListener("click", function (event) {
    var el = event.target.closest(".js-hit");
    if (!el) return;
    record(el);
  });

  render();
})();
