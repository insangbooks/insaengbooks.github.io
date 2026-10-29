/* PLUSZONE Education — site menu (four groups + 3S Practice Room button) and footer sitemap.
   One menu definition per language. Korean pages (lang="ko") get the Korean menu.
   Quarto's own navbar stays in the HTML as a fallback and is hidden once this script runs.
   To change a menu item, edit MENU below. Items with "until" disappear automatically after that date. */
(function () {
  var MENU = {
    en: {
      home: "index.html",
      other: { label: "한국어", lang: "ko" },
      cta: { title: "3S Practice Room", tag: "Free", sub: "About 3 min · no sign-up", href: "https://pluszone-edusolution.app/?lang=en" },
      groups: [
        { key: "method", label: "The Method", href: "approach.html", pages: ["approach.html"], items: [
          { t: "Coordinate Plane of Consciousness", d: "Plus · Zero · Minus Zones", h: "approach.html#plane" },
          { t: "Three Solutions", d: "Higher Growth · Higher Rapport · 3S", h: "approach.html#higher-growth" },
          { t: "3S Questioning Method", d: "The three questions, step by step", h: "approach.html#questioning" } ] },
        { key: "cases", label: "Classroom Cases", href: "stories.html", pages: ["stories.html"], items: [
          { t: "Student Videos", d: "Short real-case videos", h: "stories.html#videos" },
          { t: "How Students Changed", d: "Value-centered character education", h: "stories.html#growth" },
          { t: "Classroom Dialogues", d: "Teacher–student conversations", h: "stories.html#dialogues" },
          { t: "Teacher Voices", d: "After our teacher training", h: "stories.html#voices" } ] },
        { key: "book", label: "Book & Authors", href: "book.html", pages: ["book.html", "about.html", "shop.html"], items: [
          { t: "About the Book", d: "Overview, contents, who it’s for", h: "book.html" },
          { t: "Meet the Authors", d: "Two teachers, 34 + 22 years", h: "about.html" },
          { t: "Where to Buy", d: "Amazon · Korean bookstores", h: "book.html#buy" } ] }
      ],
      expo: { t: "EDUCATION KOREA 2027", d: "Jan. 27–29 · COEX Halls A & B, Seoul", h: "partners.html#expo", until: "2027-01-30T00:00:00+09:00", go: "Visit our booth →", d2: "Jan. 27–29, 2027 · COEX Halls A & B, Seoul" },
      ui: { menu: "Menu", close: "Close menu", nav: "Main menu" }
    },
    ko: {
      home: "korean.html",
      other: { label: "English", lang: "en" },
      cta: { title: "3S 연습실", tag: "무료", sub: "약 3분 · 가입 없이", href: "https://pluszone-edusolution.app/?lang=ko" },
      groups: [
        { key: "method", label: "교육 방법", href: "ko-approach.html", pages: ["ko-approach.html"], items: [
          { t: "의식의 좌표평면", d: "플러스·제로·마이너스 존", h: "ko-approach.html#plane" },
          { t: "세 가지 해법", d: "하이어 그로스 · 하이어 라포 · 3S", h: "ko-approach.html#higher-growth" },
          { t: "3S 질문법", d: "세 가지 질문, 단계별로", h: "ko-approach.html#questioning" } ] },
        { key: "cases", label: "현장 사례", href: "ko-stories.html", pages: ["ko-stories.html"], items: [
          { t: "학생 변화 영상", d: "짧은 실제 사례 영상", h: "ko-stories.html#videos" },
          { t: "학생들의 변화", d: "가치중심 인성교육이 만든 변화", h: "ko-stories.html#growth" },
          { t: "교실 대화", d: "교사와 학생의 생생한 대화", h: "ko-stories.html#dialogues" },
          { t: "교사 후기", d: "교사 연수 참여 후기", h: "ko-stories.html#voices" } ] },
        { key: "book", label: "책·저자", href: "ko-book.html", pages: ["ko-book.html", "ko-about.html"], items: [
          { t: "책 소개", d: "내용 · 목차 · 이런 분께 권합니다", h: "ko-book.html" },
          { t: "저자 소개", d: "현장 교사 두 사람, 34년 + 22년", h: "ko-about.html" },
          { t: "구매처", d: "교보문고 · 예스24 · 알라딘 · 아마존", h: "ko-book.html#buy" } ] }
      ],
      expo: { t: "2027 대한민국 교육박람회", d: "1월 27~29일 · 서울 코엑스 A·B홀", h: "ko-partners.html#expo", until: "2027-01-30T00:00:00+09:00", go: "부스 안내 →", d2: "2027년 1월 27~29일 · 서울 코엑스 A·B홀" },
      ui: { menu: "메뉴", close: "메뉴 닫기", nav: "주 메뉴" }
    }
  };

  var html = document.documentElement;
  if ((html.getAttribute("lang") || "").toLowerCase().indexOf("ar") === 0) return; // Arabic page has its own header
  var L = (html.getAttribute("lang") || "en").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
  var M = MENU[L];
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "") page = "index.html";
  var now = Date.now();
  function live(x) { return !x.until || now < Date.parse(x.until); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function otherLangUrl() {
    var alt = document.querySelector('link[rel="alternate"][hreflang="' + M.other.lang + '"]');
    if (alt) { try { var p = new URL(alt.getAttribute("href"), location.href).pathname.split("/").pop(); return p || "index.html"; } catch (e) {} }
    if (L === "ko") return page === "korean.html" ? "index.html" : page.replace(/^ko-/, "");
    if (page === "index.html") return "korean.html";
    return "ko-" + page;
  }

  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CARET = '<svg class="cr" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function activeKey() {
    for (var i = 0; i < M.groups.length; i++) if (M.groups[i].pages.indexOf(page) >= 0) return M.groups[i].key;
    return null;
  }
  var ACT = activeKey();

  function columns(cls) {
    return M.groups.map(function (g) {
      return '<div class="' + cls + '" data-col="' + g.key + '"><a class="pzm-h" href="' + g.href + '">' + esc(g.label) + "</a><ul>" +
        g.items.filter(live).map(function (it) {
          return '<li><a href="' + it.h + '"><b class="tt">' + esc(it.t) + '</b><span class="ds">' + esc(it.d) + "</span></a></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }

  function build() {
    if (document.getElementById("pz-nav")) return;
    var head = document.createElement("header");
    head.id = "pz-nav";
    head.className = "pzn";
    head.setAttribute("lang", L);
    head.innerHTML =
      '<div class="pzn-bar">' +
        '<a class="pzn-brand" href="' + M.home + '" aria-label="PLUSZONE Education — ' + (L === "ko" ? "홈" : "Home") + '"><i aria-hidden="true">+</i><span><b>PLUSZONE</b> Education</span></a>' +
        '<nav class="pzn-groups" aria-label="' + M.ui.nav + '">' +
          M.groups.map(function (g) {
            return '<button type="button" class="pzn-g' + (g.key === ACT ? " is-cur" : "") + '" data-key="' + g.key + '" aria-expanded="false" aria-controls="pzn-panel">' + esc(g.label) + CARET + "</button>";
          }).join("") +
        "</nav>" +
        '<div class="pzn-right">' +
          '<a class="pzn-lang" href="' + otherLangUrl() + '" lang="' + M.other.lang + '" hreflang="' + M.other.lang + '">' + M.other.label + "</a>" +
          '<a class="pzn-lang pzn-ar" href="ar.html" lang="ar" hreflang="ar" dir="rtl">العربية</a>' +
          '<a class="pzn-cta" href="' + M.cta.href + '">' + esc(M.cta.title) + ' <span>· ' + esc(M.cta.tag) + "</span></a>" +
          '<button type="button" class="pzn-burger" aria-expanded="false" aria-controls="pzn-drawer" aria-label="' + M.ui.menu + '"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div>" +
      '<div class="pzn-panel" id="pzn-panel" hidden><div class="pzn-cols">' + columns("pzn-col") +
        "</div></div>" +
      '<div class="pzn-drawer" id="pzn-drawer" hidden>' +
        '<a class="pzd-cta" href="' + M.cta.href + '"><span><b>' + esc(M.cta.title) + "</b><small>" + esc(M.cta.tag) + " · " + esc(M.cta.sub) + "</small></span>" + ARROW + "</a>" +
        M.groups.map(function (g) {
          return '<div class="pzd-g' + (g.key === ACT ? " open" : "") + '"><button type="button" aria-expanded="' + (g.key === ACT) + '">' + esc(g.label) + '<i aria-hidden="true"></i></button><ul>' +
            '<li><a href="' + g.href + '">' + esc(g.label) + (L === "ko" ? " 전체 보기" : " — overview") + "</a></li>" +
            g.items.filter(live).map(function (it) { return '<li><a href="' + it.h + '">' + esc(it.t) + "</a></li>"; }).join("") + "</ul></div>";
        }).join("") +
        (live(M.expo) ? '<div class="pzd-expo"><b>' + esc(M.expo.t) + "</b><span>" + esc(M.expo.d) + "</span></div>" : "") +
        '<div class="pzd-foot"><a href="' + otherLangUrl() + '" lang="' + M.other.lang + '">' + M.other.label + '</a><a href="ar.html" lang="ar" dir="rtl">العربية</a><a href="mailto:pluszoneedu@gmail.com">pluszoneedu@gmail.com</a></div>' +
      "</div>";
    document.body.insertBefore(head, document.body.firstChild);
    // home pages: the big hero button already invites to the practice room,
    // so the menu button stays hidden until the visitor scrolls past the hero
    var hero = document.querySelector(".pz-intro");
    if (hero && "IntersectionObserver" in window) {
      head.classList.add("cta-wait");
      new IntersectionObserver(function (en) {
        head.classList.toggle("cta-wait", en[0].isIntersecting);
      }, { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
    }
    // exhibition bar on the home pages only (disappears after the expo)
    if ((page === M.home || (L === "en" && page === "index.html")) && live(M.expo)) {
      var top = document.createElement("div");
      top.className = "pz-top";
      top.setAttribute("lang", L);
      top.innerHTML = "<b>" + esc(M.expo.t) + '</b><span class="d">' + esc(M.expo.d2) + "</span>";
      document.body.insertBefore(top, head);
    }
    // the 3S Practice Room web app opens in its own tab
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://pluszone-edusolution.app"]'), function (a) { a.target = "_blank"; a.rel = "noopener"; });
    html.classList.add("pz-nav-ready");

    // mark current item
    head.querySelectorAll("a").forEach(function (a) {
      var h = (a.getAttribute("href") || "").toLowerCase();
      if (h === page) a.setAttribute("aria-current", "page");
    });

    var panel = head.querySelector(".pzn-panel"), groups = head.querySelectorAll(".pzn-g"), timer = null;
    function openPanel(key) {
      clearTimeout(timer);
      panel.hidden = false;
      head.classList.add("panel-open");
      groups.forEach(function (b) { var on = b.getAttribute("data-key") === key; b.setAttribute("aria-expanded", on); b.classList.toggle("is-open", on); });
      panel.querySelectorAll(".pzn-col").forEach(function (c) { c.classList.toggle("on", c.getAttribute("data-col") === key); });
    }
    function closePanel() {
      panel.hidden = true;
      head.classList.remove("panel-open");
      groups.forEach(function (b) { b.setAttribute("aria-expanded", "false"); b.classList.remove("is-open"); });
    }
    function later() { clearTimeout(timer); timer = setTimeout(closePanel, 180); }
    var hoverOK = window.matchMedia("(hover: hover)").matches;
    groups.forEach(function (b) {
      if (hoverOK) b.addEventListener("mouseenter", function () { openPanel(b.getAttribute("data-key")); });
      b.addEventListener("click", function () {
        if (!panel.hidden && b.getAttribute("aria-expanded") === "true" && !hoverOK) closePanel(); else openPanel(b.getAttribute("data-key"));
      });
      b.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); openPanel(b.getAttribute("data-key")); var f = panel.querySelector('.pzn-col[data-col="' + b.getAttribute("data-key") + '"] a'); if (f) f.focus(); }
      });
    });
    if (hoverOK) {
      head.querySelector(".pzn-groups").addEventListener("mouseleave", later);
      panel.addEventListener("mouseenter", function () { clearTimeout(timer); });
      panel.addEventListener("mouseleave", later);
      panel.querySelectorAll(".pzn-col").forEach(function (c) {
        c.addEventListener("mouseenter", function () { openPanel(c.getAttribute("data-col")); });
      });
    }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closePanel(); closeDrawer(); } });
    document.addEventListener("click", function (e) { if (!head.contains(e.target)) closePanel(); });
    panel.addEventListener("focusout", function (e) { if (!head.contains(e.relatedTarget)) closePanel(); });

    // mobile drawer
    var drawer = head.querySelector(".pzn-drawer"), burger = head.querySelector(".pzn-burger");
    function closeDrawer() {
      drawer.hidden = true; burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", M.ui.menu);
      head.classList.remove("drawer-open"); html.classList.remove("pzn-lock");
    }
    burger.addEventListener("click", function () {
      if (drawer.hidden) {
        drawer.hidden = false; burger.setAttribute("aria-expanded", "true"); burger.setAttribute("aria-label", M.ui.close);
        head.classList.add("drawer-open"); html.classList.add("pzn-lock");
      } else closeDrawer();
    });
    drawer.querySelectorAll(".pzd-g > button").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.parentNode, open = !g.classList.contains("open");
        g.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
      });
    });
    drawer.addEventListener("click", function (e) { var a = e.target.closest("a"); if (a && a.getAttribute("href").indexOf("#") >= 0) closeDrawer(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1120) closeDrawer(); });

    // footer sitemap
    var foot = document.querySelector("footer.footer") || document.querySelector(".nav-footer");
    if (foot && !document.getElementById("pz-sitemap")) {
      var sm = document.createElement("nav");
      sm.id = "pz-sitemap";
      sm.className = "pzs";
      sm.setAttribute("aria-label", L === "ko" ? "사이트맵" : "Site map");
      sm.innerHTML = '<div class="pzs-in">' + columns("pzs-col") +
        '<div class="pzs-col pzs-cta"><a class="pzm-h" href="' + M.cta.href + '" target="_blank" rel="noopener">' + esc(M.cta.title) + "</a><ul><li><a href=\"" + M.cta.href + "\" target=\"_blank\" rel=\"noopener\"><b class=\"tt\">" + esc(M.cta.sub) + "</b></a></li></ul>" +
        '<a class="pzs-lang" href="' + otherLangUrl() + '" lang="' + M.other.lang + '">' + M.other.label + '</a><a class="pzs-lang" href="ar.html" lang="ar" dir="rtl">العربية</a></div></div>';
      var root = foot.tagName === "FOOTER" ? foot : foot.parentNode;
      root.parentNode.insertBefore(sm, root);
    }
  }

  // "Share with a colleague": phone share sheet (KakaoTalk, messages…) or copy the link
  function shares() {
    document.querySelectorAll(".pz-share-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var box = btn.closest(".pz-share"), url = location.href.split("#")[0];
        var title = box.getAttribute("data-title") || document.title;
        function copied() {
          var n = box.querySelector(".pz-share-done");
          if (!n) { n = document.createElement("p"); n.className = "pz-share-done"; n.setAttribute("role", "status"); box.appendChild(n); }
          n.textContent = box.getAttribute("data-done");
        }
        if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(copied, function () { window.prompt(title, url); }); return; }
        window.prompt(title, url);
      });
    });
    // anything marked data-until disappears after that date (e.g. the expo notice)
    document.querySelectorAll("[data-until]").forEach(function (el) {
      if (Date.now() >= Date.parse(el.getAttribute("data-until"))) el.remove();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", shares); else shares();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
