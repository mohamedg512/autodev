(function () {
  try {
    var raw = localStorage.getItem("autodev_site_content");
    if (!raw) return;
    var c = JSON.parse(raw);
    var lang = localStorage.getItem("autodev-lang") || localStorage.getItem("autodev_dash_lang") || document.documentElement.lang || "ar";
    if (lang !== "ar" && lang !== "fr" && lang !== "en") lang = "ar";
    var h = c.hero || {}, a = c.about || {}, l = c.legal || {};

    function setText(sel, text) {
      var el = document.querySelector(sel);
      if (el && text) el.textContent = text;
    }
    function setHtml(sel, html) {
      var el = document.querySelector(sel);
      if (el && html) el.innerHTML = html;
    }

    var titleKey = "title_" + lang;
    var subKey = "subtitle_" + lang;
    if (h[titleKey]) {
      var heroTitle = document.querySelector("[data-i18n='hero_title']") || document.querySelector(".hero-title");
      if (heroTitle) heroTitle.innerHTML = h[titleKey];
    }
    if (h[subKey]) {
      var heroSub = document.querySelector("[data-i18n='hero_subtitle']") || document.querySelector(".hero-subtitle");
      if (heroSub) heroSub.textContent = h[subKey];
    }
    if (a["title_" + lang]) setText("[data-i18n='about_title']", a["title_" + lang]);
    if (a["desc_" + lang]) setText("[data-i18n='about_desc']", a["desc_" + lang]);

    // Legal bodies on main site
    var terms = l["terms_" + lang];
    var privacy = l["privacy_" + lang];
    var cookies = l["cookies_" + lang];
    if (terms) {
      document.querySelectorAll("[data-legal-body='terms'], #legalTermsBody, .legal-body-terms").forEach(function(el){
        el.textContent = terms;
      });
    }
    if (privacy) {
      document.querySelectorAll("[data-legal-body='privacy'], #legalPrivacyBody, .legal-body-privacy").forEach(function(el){
        el.textContent = privacy;
      });
    }
    if (cookies) {
      document.querySelectorAll("[data-legal-body='cookies'], #legalCookiesBody, .legal-body-cookies").forEach(function(el){
        el.textContent = cookies;
      });
    }
  } catch (e) {}
})();


(function () {
  try {
    var raw = localStorage.getItem("autodev_home_projects");
    if (!raw) return;
    var projects = JSON.parse(raw);
    if (!Array.isArray(projects) || !projects.length) return;
    var grid = document.getElementById("projectsGrid");
    if (!grid) return;
    var lang = localStorage.getItem("autodev-lang") || document.documentElement.lang || "ar";
    if (lang !== "ar" && lang !== "fr" && lang !== "en") lang = "ar";
    var empty = document.getElementById("portfolioEmpty");
    var emptyHtml = empty ? empty.outerHTML : "";
    var cards = projects
      .filter(function (p) { return p.is_visible !== false; })
      .sort(function (a, b) { return (a.sort_order || 0) - (b.sort_order || 0); })
      .map(function (p) {
        var title = (p.title && (p.title[lang] || p.title.ar || p.title.en)) || "";
        var desc = (p.description && (p.description[lang] || p.description.ar || p.description.en)) || "";
        var tech = (p.tech || []).map(function (t) { return "<span>" + t + "</span>"; }).join("");
        var img = p.image || "";
        // fix relative path when on main site
        if (img && img.indexOf("data:") !== 0 && img.indexOf("http") !== 0 && img.indexOf("assets/") === 0) {
          /* ok */
        }
        return (
          '<div class="project-card" data-category="' + (p.category || "") + '" data-title="' + title.replace(/"/g, "&quot;") + '" data-img="' + img + '" data-portfolio="portfolio/index.html" role="button" tabindex="0">' +
          '<div class="project-img"><span class="project-tag">' + (p.tag || "") + '</span>' +
          (img ? '<img src="' + img + '" alt="' + title.replace(/"/g, "&quot;") + '" loading="lazy" />' : "") +
          "</div><div class=\"project-body\"><h3>" + title + "</h3><p>" + desc + "</p>" +
          (tech ? '<div class="project-tech">' + tech + "</div>" : "") +
          "</div></div>"
        );
      })
      .join("");
    grid.innerHTML = cards + emptyHtml;
    // re-bind preview modal
    if (typeof initProjectPreview === "function") initProjectPreview();
    else {
      document.querySelectorAll(".project-card").forEach(function (card) {
        card.addEventListener("click", function () {
          var overlay = document.getElementById("projectPreviewModal");
          if (!overlay) return;
          document.getElementById("ppTitle").textContent = card.querySelector("h3")?.textContent || "";
          var i = card.querySelector("img");
          document.getElementById("ppImage").src = i ? i.src : "";
          document.getElementById("ppMoreBtn").href = "portfolio/index.html";
          overlay.classList.add("open");
        });
      });
    }
  } catch (e) {}
})();
