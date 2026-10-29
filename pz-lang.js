/* PLUSZONE Education — guidance for visitors reading the English site in Korean
   1) If the browser's automatic translation is turned on, suggest the official Korean page
   2) If the browser language is Korean, gently suggest the Korean page (once, dismissible)
   3) Keep brand names and key terms from being machine-translated */
(function () {
  var html = document.documentElement;
  if ((html.getAttribute("lang") || "").toLowerCase().indexOf("ko") === 0) return; // Korean pages: nothing to do
  if ((html.getAttribute("lang") || "").toLowerCase().indexOf("ar") === 0) return; // Arabic page: nothing to do

  var TERMS = [
    "PLUSZONE EDUSOLUTION", "PLUSZONE Education", "PLUSZONE",
    "Plus \\(\\+\\) Zone", "Minus \\(−\\) Zone", "Zero \\(0\\) Zone",
    "Plus \\(\\+\\)", "Minus \\(−\\)", "Zero \\(0\\)",
    "Plus Zone", "Minus Zone", "Zero Zone",
    "Higher Growth", "Higher Rapport",
    "3S \\(3-Step\\) Questioning Method", "3S Questioning Method", "3S Practice Room", "3S Practice", "3S",
    "Self-Reflection", "Setting Plus \\(\\+\\) Standards", "Standards into Action",
    "Insaeng Books", "INSAENG BOOKS", "Kim Kyeong-Hyi", "Kim Hye-Jin",
    "Plus", "Minus"
  ];
  var RE = new RegExp("(?<![\\w-])(" + TERMS.join("|") + ")(?![\\w-])", "g");
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, CODE: 1, PRE: 1, svg: 1, SVG: 1, TITLE: 1 };

  function protectTerms(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !RE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        RE.lastIndex = 0;
        for (var p = n.parentNode; p && p !== root.parentNode; p = p.parentNode) {
          if (p.nodeType !== 1) continue;
          if (SKIP[p.nodeName] || p.namespaceURI === "http://www.w3.org/2000/svg") return NodeFilter.FILTER_REJECT;
          if (p.getAttribute("translate") === "no" || p.classList.contains("notranslate")) return NodeFilter.FILTER_REJECT;
          if (p === n.parentNode && /flex|grid/.test(getComputedStyle(p).display)) return NodeFilter.FILTER_REJECT; // wrapping would change spacing
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var text = node.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      RE.lastIndex = 0;
      while ((m = RE.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var s = document.createElement("span");
        s.setAttribute("translate", "no");
        s.className = "notranslate";
        s.textContent = m[0];
        frag.appendChild(s);
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function koreanUrl() {
    var alt = document.querySelector('link[rel="alternate"][hreflang="ko"]');
    if (alt) {
      try { return new URL(alt.getAttribute("href"), location.href).pathname.split("/").pop() || "korean.html"; } catch (e) {}
    }
    return "korean.html";
  }

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var bar = null, mode = null;
  function showBar(kind) {
    if (mode === "translated") return;           // already showing the stronger message
    if (bar) bar.remove();
    mode = kind;
    bar = document.createElement("div");
    bar.className = "pz-ko-bar notranslate";
    bar.setAttribute("translate", "no");
    bar.setAttribute("lang", "ko");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "한국어 페이지 안내");
    var msg = kind === "translated"
      ? "자동 번역은 실제 내용과 다를 수 있습니다."
      : "이 사이트는 공식 한국어 페이지를 제공합니다.";
    var btn = kind === "translated" ? "공식 한국어 페이지로 보기 →" : "한국어로 보기 →";
    bar.innerHTML =
      '<span class="pz-ko-flag" aria-hidden="true">🇰🇷</span>' +
      '<span class="pz-ko-msg">' + msg + "</span>" +
      '<a class="pz-ko-go" href="' + koreanUrl() + '">' + btn + "</a>" +
      '<button class="pz-ko-x" type="button" aria-label="닫기">×</button>';
    bar.querySelector(".pz-ko-x").addEventListener("click", function () {
      if (mode === "suggest") store("pz-ko-hint", "closed");
      bar.remove(); bar = null;
    });
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar && bar.classList.add("on"); });
  }


  // Arabic-language browser → one-time suggestion of the Arabic home page
  function showArBar() {
    var b = document.createElement("div");
    b.className = "pz-ko-bar pz-ar-bar notranslate";
    b.setAttribute("translate", "no"); b.setAttribute("lang", "ar"); b.setAttribute("dir", "rtl");
    b.setAttribute("role", "region"); b.setAttribute("aria-label", "الصفحة العربية");
    b.innerHTML =
      '<span class="pz-ko-msg">يتوفّر هذا الموقع بصفحة عربية.</span>' +
      '<a class="pz-ko-go" href="ar.html" hreflang="ar">العربية ←</a>' +
      '<button class="pz-ko-x" type="button" aria-label="إغلاق">×</button>';
    b.querySelector(".pz-ko-x").addEventListener("click", function () { b.remove(); });
    document.body.appendChild(b);
    store("pz-ar-hint", "shown");
    requestAnimationFrame(function () { b.classList.add("on"); });
  }

  function isTranslated() {
    var c = html.className || "", l = (html.getAttribute("lang") || "").toLowerCase();
    return /\btranslated-(ltr|rtl)\b/.test(c) || l.indexOf("ko") === 0 ||
      !!document.querySelector("html[_msthash], [_msttexthash], font[style*='vertical-align: inherit']");
  }

  var css =
    ".pz-ko-bar{position:fixed;left:50%;bottom:20px;z-index:2000;display:flex;align-items:center;gap:12px;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;" +
    "padding:12px 14px 12px 18px;border-radius:14px;background:#14284A;color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.28);" +
    "font:500 15px/1.45 'Noto Sans KR',system-ui,sans-serif;word-break:keep-all;transform:translate(-50%,140%);opacity:0;transition:transform .35s ease,opacity .35s ease}" +
    ".pz-ko-bar.on{transform:translate(-50%,0);opacity:1}" +
    ".pz-ko-flag{font-size:18px;line-height:1}" +
    ".pz-ko-go{flex:none;padding:8px 14px;border-radius:10px;background:#E9C77E;color:#14284A!important;font-weight:800;text-decoration:none!important;white-space:nowrap}" +
    ".pz-ko-go:hover{background:#F3D79A}" +
    ".pz-ko-x{flex:none;width:32px;height:32px;border:0;border-radius:8px;background:transparent;color:#fff;font-size:22px;line-height:1;cursor:pointer;opacity:.75}" +
    ".pz-ko-x:hover{opacity:1;background:rgba(255,255,255,.12)}" +
    ".pz-ar-bar{font-family:'Noto Sans Arabic','Noto Kufi Arabic',Tahoma,sans-serif;padding:12px 18px 12px 14px}" +
    "@media (max-width:640px){.pz-ko-bar{left:12px;right:12px;width:auto;max-width:none;transform:translateY(140%);flex-wrap:wrap;bottom:12px;gap:8px 10px;font-size:14px;padding:12px 12px 12px 14px}.pz-ko-bar.on{transform:translateY(0)}" +
    ".pz-ko-msg{flex:1 1 calc(100% - 70px)}.pz-ko-go{order:3;flex:1;text-align:center}.pz-ko-x{order:2}}" +
    "@media (prefers-reduced-motion:reduce){.pz-ko-bar{transition:none}}";

  function init() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

    // 3) keep key terms and the hero motto intact
    document.querySelectorAll(".pz-intro h1, .pz-intro .imath").forEach(function (el) {
      el.setAttribute("translate", "no"); el.classList.add("notranslate");
    });
    protectTerms(document.body);

    // 1) watch for automatic translation
    if (isTranslated()) showBar("translated");
    new MutationObserver(function () { if (isTranslated()) showBar("translated"); })
      .observe(html, { attributes: true, attributeFilter: ["class", "lang", "_msthash"] });
    var titleEl = document.querySelector("title"), t0 = document.title;
    if (titleEl) new MutationObserver(function () {
      if (document.title !== t0 && /[가-힣]/.test(document.title)) showBar("translated");
    }).observe(titleEl, { childList: true, characterData: true, subtree: true });

    // 2) Korean-language browser → gentle suggestion (once, dismissible)
    var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]);
    var prefersKo = String(langs[0] || "").toLowerCase().indexOf("ko") === 0;
    if (prefersKo && store("pz-ko-hint") !== "closed") {
      setTimeout(function () { if (!mode) showBar("suggest"); }, 1200);
    }
    var prefersAr = String(langs[0] || "").toLowerCase().indexOf("ar") === 0;
    if (prefersAr && !store("pz-ar-hint")) {
      setTimeout(function () { if (!mode) showArBar(); }, 1200);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
