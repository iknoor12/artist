/* artist-page.js — vertical drag-to-navigate viewer */

document.addEventListener("DOMContentLoaded", () => {

  const WORKS_PER = 3;

  /* ── Build flat slides array ─────────────────────── */
  const slides = [];
  projects.forEach((p, ai) => {
    slides.push({ type: "bio", artistIdx: ai, p });
    p.works.slice(0, WORKS_PER).forEach((w, wi) => {
      slides.push({ type: "work", artistIdx: ai, p, work: w, workNum: wi + 1 });
    });
  });

  const SLIDES_PER_ARTIST = WORKS_PER + 1;

  /* ── Starting slide from ?id= ────────────────────── */
  const params      = new URLSearchParams(window.location.search);
  const startArtist = Math.max(0, Math.min(parseInt(params.get("id") ?? "0", 10), projects.length - 1));
  let   current     = startArtist * SLIDES_PER_ARTIST;

  /* ── Build slide DOM ─────────────────────────────── */
  const viewer   = document.getElementById("apViewer");
  const slideEls = [];

  slides.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = `ap-slide ap-slide--${s.type}`;
    el.dataset.index = i;

    if (s.type === "bio") {
      el.innerHTML = `
        <div class="ap-slide__portrait">
          <img src="${s.p.image}" alt="${s.p.artist}" draggable="false" />
        </div>
        <div class="ap-slide__bio">
          <p class="ap-slide__eyebrow eyebrow">
            Featured Artist &ensp;
            <span class="ap-slide__artist-num">${String(s.artistIdx + 1).padStart(2,"0")} / ${String(projects.length).padStart(2,"0")}</span>
          </p>
          <h2 class="ap-slide__name">${s.p.artist}</h2>
          <p class="ap-slide__meta">${s.p.year}&ensp;&middot;&ensp;${s.p.location || ""}</p>
          <p class="ap-slide__medium">${s.p.medium}</p>
          <p class="ap-slide__desc">${s.p.description}</p>
          <p class="ap-slide__hint eyebrow">Scroll to see works &darr;</p>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="ap-slide__work-card">
          <img class="ap-slide__artwork" src="${s.work.image}" alt="${s.work.title}" draggable="false" />
          <div class="ap-slide__caption">
            <p class="ap-slide__caption-artist eyebrow">${s.p.artist}</p>
            <h2 class="ap-slide__caption-title">${s.work.title}</h2>
            <p class="ap-slide__caption-meta">${s.p.medium}&ensp;&middot;&ensp;${s.p.year}</p>
          </div>
        </div>
      `;
    }

    viewer.appendChild(el);
    slideEls.push(el);
  });

  /* ── Position all slides (pixel y, vertical) ─────── */
  function positionAll() {
    const h = viewer.offsetHeight;
    slideEls.forEach((el, i) => {
      gsap.set(el, {
        y:        i === current ? 0 : i < current ? -h : h,
        yPercent: 0,
        zIndex:   i === current ? 2 : 1,
      });
    });
  }

  positionAll();

  /* ── Nav update ──────────────────────────────────── */
  function getLabel(s) {
    if (s.type === "bio") return "Intro";
    const roman = ["I","II","III","IV","V"][s.workNum - 1] || s.workNum;
    return `Work\u00a0${roman}`;
  }

  function updateNav() {
    const s = slides[current];
    document.getElementById("apNavArtist").textContent = s.p.artist;
    document.getElementById("apNavLabel").textContent  = getLabel(s);
    document.getElementById("apNavCount").textContent  = `${current + 1}\u00a0/\u00a0${slides.length}`;
  }

  updateNav();

  /* ── Transition (vertical) ───────────────────────── */
  let isAnimating = false;

  function goTo(nextIdx, dir) {
    if (isAnimating || nextIdx < 0 || nextIdx >= slides.length) return;
    isAnimating = true;

    const h      = viewer.offsetHeight;
    const fromEl = slideEls[current];
    const toEl   = slideEls[nextIdx];

    // Incoming starts below/above at full height, slightly scaled up
    gsap.set(toEl,   { y: dir * h, scale: 1.04, opacity: 0.6, zIndex: 3 });
    // Outgoing sits at rest
    gsap.set(fromEl, { y: 0,       scale: 1,    opacity: 1,   zIndex: 2 });

    if (slides[nextIdx].type === "work") {
      const img = toEl.querySelector(".ap-slide__artwork");
      if (img) gsap.set(img, { scale: 1.12 });
    }

    const DUR = 0.82;
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete() {
        const h2 = viewer.offsetHeight;
        current = nextIdx;
        slideEls.forEach((el, idx) => {
          gsap.set(el, {
            y: idx === current ? 0 : idx < current ? -h2 : h2,
            scale: 1, opacity: 1,
            zIndex: idx === current ? 2 : 1,
          });
        });
        isAnimating = false;
        updateNav();
      },
    });

    // Outgoing: slides out + shrinks + dims
    tl.to(fromEl, { y: -dir * h, scale: 0.94, opacity: 0.4, duration: DUR }, 0)
    // Incoming: slides in + settles to natural scale + brightens
      .to(toEl,   { y: 0,        scale: 1,    opacity: 1,   duration: DUR }, 0);

    // Artwork Ken-Burns settle
    if (slides[nextIdx].type === "work") {
      const img = toEl.querySelector(".ap-slide__artwork");
      if (img) tl.to(img, { scale: 1, duration: 1.4, ease: "power3.out" }, 0);
    }
    if (slides[nextIdx].type === "bio") {
      const els = toEl.querySelectorAll(
        ".ap-slide__eyebrow, .ap-slide__name, .ap-slide__meta, .ap-slide__medium, .ap-slide__desc, .ap-slide__hint"
      );
      gsap.set(els, { y: 28, opacity: 0 });
      tl.to(els, { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out" }, 0.3);
    }
  }

  /* ── Mouse wheel scroll (throttled per gesture) ───── */
  let lastWheelTime = 0;
  const WHEEL_COOLDOWN = 900; // ms — must be >= animation duration

  viewer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheelTime < WHEEL_COOLDOWN) return;
    lastWheelTime = now;
    if (e.deltaY > 0) goTo(current + 1,  1);
    else              goTo(current - 1, -1);
  }, { passive: false });

  /* ── Touch swipe (mobile) ────────────────────────── */
  let touchStartY = 0;
  viewer.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 48) goTo(dy > 0 ? current + 1 : current - 1, dy > 0 ? 1 : -1);
  }, { passive: true });

  /* ── Keyboard ────────────────────────────────────── */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") goTo(current + 1,  1);
    if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goTo(current - 1, -1);
    if (e.key === "Escape") goBack();
  });

  /* ── Close / back ────────────────────────────────── */
  function goBack() {
    gsap.to("body", {
      opacity: 0, duration: 0.35, ease: "power2.in",
      onComplete: () => { window.location.href = "index.html"; },
    });
  }

  document.getElementById("apClose").addEventListener("click", goBack);

  /* ── Page entrance ───────────────────────────────── */
  gsap.set("body", { opacity: 0 });
  gsap.to("body", { opacity: 1, duration: 0.5, ease: "power2.out" });

  if (slides[current].type === "bio") {
    const els = slideEls[current].querySelectorAll(
      ".ap-slide__eyebrow, .ap-slide__name, .ap-slide__meta, .ap-slide__medium, .ap-slide__desc, .ap-slide__hint"
    );
    gsap.from(els, { y: 30, opacity: 0, stagger: 0.09, duration: 0.65, ease: "power3.out", delay: 0.35 });
  }

  gsap.from(".site-header", { y: -18, opacity: 0, duration: 0.55, ease: "power3.out", delay: 0.1 });
  gsap.from(".ap-nav-bar",  { y: 24,  opacity: 0, duration: 0.55, ease: "power3.out", delay: 0.25 });

});
