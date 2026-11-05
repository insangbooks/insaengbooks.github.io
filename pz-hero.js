/* PLUSZONE home — first-screen card slider (3 cards)
   Auto-advances; card 1 waits for its motion video to finish. Prev / pause / next.
   Respects "reduce motion": starts paused and shows the video's last frame. */
(function () {
  var root = document.querySelector(".hx2");
  if (!root) return;
  var slides = root.querySelectorAll(".hx2-s"), cards = root.querySelectorAll(".hx2-card");
  var n = slides.length, i = 0, timer = null, t0 = 0, dur = 0, left = 0;
  var bar = root.querySelector(".hx2-bar i"), cur = root.querySelector(".hx2-cur");
  var bPause = root.querySelector(".hx2-pause"), nextName = root.querySelector(".hx2-next b");
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var playing = !RM;
  var vid = root.querySelector(".hx2-card video");
  var DEF = 6500;

  function durOf(k) { return parseInt(slides[k].getAttribute("data-ms"), 10) || DEF; }
  function pad(x) { return (x < 9 ? "0" : "") + (x + 1); }
  function paintBar(p) { if (bar) bar.style.transform = "scaleX(" + Math.max(0, Math.min(1, p)) + ")"; }

  function show(k) {
    i = (k + n) % n;
    slides.forEach(function (s, j) { var on = j === i; s.classList.toggle("on", on); s.setAttribute("aria-hidden", on ? "false" : "true"); s.inert = !on; });
    cards.forEach(function (c, j) {
      var pos = (j - i + n) % n;           // 0 front, 1 behind, 2 furthest
      c.setAttribute("data-pos", pos);
      c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
      c.inert = pos !== 0;
    });
    if (cur) cur.textContent = pad(i);
    if (nextName) nextName.textContent = slides[(i + 1) % n].getAttribute("data-name");
    if (vid) {
      if (i === 0 && playing) { try { vid.currentTime = 0; var p = vid.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
      else vid.pause();
    }
    start(durOf(i));
  }
  function tick() {
    var p = (Date.now() - t0) / dur;
    paintBar(p);
    if (p >= 1) { show(i + 1); return; }
    timer = requestAnimationFrame(tick);
  }
  function start(ms) {
    cancelAnimationFrame(timer); dur = ms; t0 = Date.now(); left = 0; paintBar(0);
    if (playing) timer = requestAnimationFrame(tick);
  }
  function setPlaying(on) {
    playing = on;
    bPause.setAttribute("aria-pressed", on ? "false" : "true");
    bPause.setAttribute("aria-label", on ? bPause.dataset.pause : bPause.dataset.play);
    bPause.classList.toggle("is-paused", !on);
    if (on) {
      t0 = Date.now() - left * dur;
      if (vid && i === 0) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      timer = requestAnimationFrame(tick);
    } else {
      left = Math.min(1, (Date.now() - t0) / dur);
      cancelAnimationFrame(timer);
      if (vid) vid.pause();
    }
  }
  root.querySelector(".hx2-prev").addEventListener("click", function () { show(i - 1); });
  root.querySelector(".hx2-nextb").addEventListener("click", function () { show(i + 1); });
  root.querySelector(".hx2-next").addEventListener("click", function () { show(i + 1); });
  bPause.addEventListener("click", function () { setPlaying(!playing); });
  // stop when the slider is off screen or the tab is hidden; resume where it left off
  var vis = true;
  function hold(h) {
    if (!playing) return;
    if (h) { left = Math.min(1, (Date.now() - t0) / dur); cancelAnimationFrame(timer); if (vid) vid.pause(); }
    else { t0 = Date.now() - left * dur; timer = requestAnimationFrame(tick); if (vid && i === 0) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } }
  }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { var v = e[0].isIntersecting; if (v !== vis) { vis = v; hold(!v); } }).observe(root);
  document.addEventListener("visibilitychange", function () { if (vis) hold(document.hidden); });
  // swipe on touch screens
  var sx = null;
  root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); sx = null; });
  if (vid) {
    if (RM) { vid.removeAttribute("autoplay"); vid.preload = "none"; }
    vid.addEventListener("loadedmetadata", function () { if (vid.duration && i === 0) { var ms = Math.round(vid.duration * 1000) + 600; slides[0].setAttribute("data-ms", ms); if (i === 0) { var el = (Date.now() - t0); dur = ms; t0 = Date.now() - el; } } });
  }
  if (!playing) { bPause.setAttribute("aria-pressed", "true"); bPause.setAttribute("aria-label", bPause.dataset.play); bPause.classList.add("is-paused"); }
  root.classList.add("ready");
  show(0);
})();
