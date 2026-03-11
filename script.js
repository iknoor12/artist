/* projects array is loaded from data.js */

/* ─── DOM references ─────────────────────────────────── */
const slidesTrack    = document.getElementById("slidesTrack");
const sliderShell    = document.getElementById("sliderShell");
const prevBtn        = document.getElementById("prevBtn");
const nextBtn        = document.getElementById("nextBtn");
const projectIndex   = document.getElementById("projectIndex");
const projectCaption = document.getElementById("projectCaption");
/* detail panel refs removed — artist detail is now a separate page */

/* ─── State ──────────────────────────────────────────── */
let currentIndex  = 0;
let isAnimating   = false;
let isPanelOpen   = false;
let touchStartX   = 0;
let touchStartY   = 0;


const PERSP = 1100; // perspective value used in all GSAP transforms

/* ─── Helpers ────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, "0"); }

function setCounter(index) {
  const p = projects[index];
  projectIndex.textContent = `PR.${pad(index + 1)} / ${pad(projects.length)}`;
  projectCaption.innerHTML = `${p.artist}<br />${p.title}`;
}

/* ─── Build slides ───────────────────────────────────── */
function buildSlides() {
  projects.forEach((project, index) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.dataset.index = String(index);
    slide.innerHTML = `
      <button class="art-trigger" type="button" aria-label="Open details for ${project.title}">
        <figure class="slide-image-wrap">
          <img src="${project.image}" alt="${project.title} by ${project.artist}" />
          <div class="slide-hover-overlay" aria-hidden="true">
            <span>${project.artist} &mdash; ${project.title}</span>
          </div>
        </figure>
        <div class="slide-label">
          <span class="artist">${project.artist}</span>
          <span class="title">${project.title}</span>
        </div>
      </button>
    `;

    if (index === currentIndex) slide.classList.add("is-active");
    slidesTrack.appendChild(slide);
  });
}

function getSlides() {
  return Array.from(document.querySelectorAll(".slide"));
}

/* ─── Rolling 3-D slide transition ──────────────────── */
function goToSlide(targetIndex, direction) {
  if (isAnimating || targetIndex === currentIndex) return;

  const slides = getSlides();
  const outSlide  = slides[currentIndex];
  const inSlide   = slides[targetIndex];
  const dir       = direction || (targetIndex > currentIndex ? 1 : -1);

  isAnimating = true;
  inSlide.classList.add("is-active");

  const clipHide = dir > 0 ? "inset(0 100% 0 0%)" : "inset(0 0% 0 100%)";
  const clipShow = "inset(0 0% 0 0%)";

  /* ── Set incoming slide off-screen ── */
  gsap.set(inSlide, {
    xPercent: dir * 108,
    rotateY: dir * -30,
    scale: 0.88,
    opacity: 0,
    z: -90,
    transformPerspective: PERSP,
    transformOrigin: dir > 0 ? "left center" : "right center",
  });
  gsap.set(inSlide.querySelector(".slide-image-wrap"), { clipPath: clipHide });
  gsap.set(inSlide.querySelector("img"), { scale: 1.2 });
  gsap.set(inSlide.querySelector(".slide-hover-overlay"), { opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "expo.inOut" },
    onComplete() {
      outSlide.classList.remove("is-active");
      gsap.set(outSlide, { clearProps: "all" });
      gsap.set(outSlide.querySelector(".slide-image-wrap"), { clearProps: "all" });
      gsap.set(outSlide.querySelector("img"), { clearProps: "all" });
      gsap.set(outSlide.querySelector(".slide-hover-overlay"), { clearProps: "all" });
      gsap.set(inSlide, { clearProps: "all" });
      gsap.set(inSlide.querySelector(".slide-image-wrap"), { clearProps: "all" });
      gsap.set(inSlide.querySelector("img"), { clearProps: "all" });
      gsap.set(inSlide.querySelector(".slide-hover-overlay"), { clearProps: "all" });
      currentIndex = targetIndex;
      isAnimating  = false;
    },
  });

  /* ── Outgoing: roll away with 3D tilt ── */
  tl.to(outSlide, {
    xPercent: dir * -108,
    rotateY: dir * 30,
    scale: 0.88,
    opacity: 0,
    z: -90,
    duration: 0.88,
    transformPerspective: PERSP,
    transformOrigin: dir > 0 ? "right center" : "left center",
    ease: "power3.inOut",
  }, 0)
  .to(outSlide.querySelector("img"), {
    scale: 0.9,
    filter: "grayscale(100%) brightness(0.72)",
    duration: 0.88,
    ease: "power3.inOut",
  }, 0);

  /* ── Incoming: roll in with clip-path reveal ── */
  tl.to(inSlide, {
    xPercent: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    z: 0,
    duration: 1.05,
    transformOrigin: "center center",
    transformPerspective: PERSP,
    ease: "power3.out",
  }, 0.05)
  .to(inSlide.querySelector(".slide-image-wrap"), {
    clipPath: clipShow,
    duration: 0.92,
    ease: "power3.inOut",
  }, 0.1)
  .to(inSlide.querySelector("img"), {
    scale: 1,
    filter: "grayscale(100%) brightness(0.92)",
    duration: 1.05,
    ease: "power3.out",
  }, 0.05);

  /* ── Counter: slides in from direction travel came ── */
  tl.fromTo(projectIndex,
    { x: dir * 44,  opacity: 0 },
    { x: 0, opacity: 1, duration: 0.62, ease: "power3.out" },
    0.24
  )
  .fromTo(projectCaption,
    { x: dir * 22,  opacity: 0 },
    { x: 0, opacity: 1, duration: 0.56, ease: "power3.out" },
    0.3
  );

  setCounter(targetIndex);
}

function nextSlide() { goToSlide((currentIndex + 1) % projects.length, 1);  }
function prevSlide() { goToSlide((currentIndex - 1 + projects.length) % projects.length, -1); }

/* ─── Navigate to artist detail page ─────────────────── */
function navigateToArtist(index) {
  if (isPanelOpen || isAnimating) return;
  isPanelOpen = true; // lock further clicks

  const p          = projects[index];
  const stageImg   = document.getElementById("imgStage");
  const darkBg     = document.getElementById("clickDarkBg");
  const textCard   = document.getElementById("clickTextCard");
  const ctcLabel   = document.getElementById("ctcLabel");
  const ctcTitle   = document.getElementById("ctcTitle");
  const trigger    = document.querySelector(".slide.is-active .art-trigger");
  const srcWrap    = trigger.querySelector(".slide-image-wrap");
  const rect       = srcWrap.getBoundingClientRect();

  /* Populate text */
  ctcLabel.textContent = p.artist;
  ctcTitle.textContent = p.title;

  /* Place stage image exactly over the artwork card */
  stageImg.src = p.image;
  gsap.set(stageImg, {
    left: rect.left, top: rect.top,
    width: rect.width, height: rect.height,
    opacity: 1, scale: 1, rotateY: 0,
    filter: "grayscale(100%) brightness(0.92)",
  });

  const tl = gsap.timeline({
    onComplete() {
      window.location.href = `artist.html?id=${index}`;
    },
  });

  /* Phase 1 – dark bg fades in, text slams up */
  tl.to(darkBg, { opacity: 1, duration: 0.38, ease: "power2.in" }, 0)
    .fromTo(ctcLabel,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
      0.12
    )
    .fromTo(ctcTitle,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.52, ease: "power3.out" },
      0.18
    )
    /* Phase 2 – text fades out, image expands to fill */
    .to([ctcLabel, ctcTitle], { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.62)
    .to(textCard, { opacity: 0, duration: 0.1 }, 0.92)
    .to(stageImg, {
      left: 0, top: 0,
      width: "100vw", height: "100vh",
      filter: "grayscale(0%) brightness(1.0)",
      rotateY: 0,
      duration: 0.72,
      ease: "expo.inOut",
    }, 0.38);
}

/* ─── Hover effects (GSAP-driven) ────────────────────── */
function setupHoverEffects() {
  document.querySelectorAll(".slide").forEach((slide) => {
    const img       = slide.querySelector("img");
    const overlay   = slide.querySelector(".slide-hover-overlay");
    const imageWrap = slide.querySelector(".slide-image-wrap");

    slide.addEventListener("mouseenter", () => {
      if (!slide.classList.contains("is-active") || isAnimating) return;
      gsap.to(img, {
        scale: 1.09,
        rotate: 1.4,
        filter: "grayscale(15%) brightness(1.02)",
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.to(overlay, { opacity: 1, duration: 0.42, ease: "power2.out" });
      gsap.to(imageWrap, {
        boxShadow: "0 40px 90px rgba(29, 26, 22, 0.32)",
        duration: 0.55,
        ease: "power2.out",
      });
    });

    slide.addEventListener("mouseleave", () => {
      if (!slide.classList.contains("is-active")) return;
      gsap.to(img, {
        scale: 1,
        rotate: 0,
        filter: "grayscale(100%) brightness(0.92)",
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.to(overlay, { opacity: 0, duration: 0.38, ease: "power2.out" });
      gsap.to(imageWrap, {
        boxShadow: "0 24px 60px rgba(29, 26, 22, 0.14)",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}

/* ─── Pointer parallax with 3D tilt ─────────────────── */
function setupPointerParallax() {
  const depthBg = document.querySelector(".depth-bg");

  sliderShell.addEventListener("mousemove", (e) => {
    const rect = sliderShell.getBoundingClientRect();
    const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
    const y = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

    gsap.to(depthBg, { x: x * 20, y: y * 14, duration: 0.75, ease: "power3.out" });
    gsap.to(".slide.is-active img", { x: x * -16, y: y * -10, duration: 0.8, ease: "power3.out" });
    gsap.to(".slide.is-active .slide-image-wrap", {
      rotateY:           x *  6,
      rotateX:           y * -4,
      transformPerspective: PERSP,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.to(".project-meta", { x: x * 10, y: y * 6, duration: 0.75, ease: "power3.out" });
  });

  sliderShell.addEventListener("mouseleave", () => {
    gsap.to([depthBg, ".project-meta"], { x: 0, y: 0, duration: 0.85, ease: "power3.out" });
    gsap.to(".slide.is-active img",           { x: 0, y: 0, duration: 0.85, ease: "power3.out" });
    gsap.to(".slide.is-active .slide-image-wrap", {
      rotateY: 0, rotateX: 0, duration: 0.85, ease: "power3.out",
    });
  });
}

/* ─── Touch / swipe (horizontal) ─────────────────────── */
function setupTouchSwipe() {
  sliderShell.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  sliderShell.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 42) return;
    if (dx < 0) nextSlide(); else prevSlide();
  }, { passive: true });
}

/* ─── Wheel navigation with inertia feel ─────────────── */
function setupWheelNavigation() {
  let wheelLock = false;

  sliderShell.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock || isAnimating || isPanelOpen) return;
    if (Math.abs(e.deltaY) < 28) return;

    wheelLock = true;
    if (e.deltaY > 0) nextSlide(); else prevSlide();

    // Faster flick = shorter cooldown for momentum feel
    const cooldown = Math.min(1100, Math.max(650, 900 - Math.abs(e.deltaY) * 0.9));
    setTimeout(() => { wheelLock = false; }, cooldown);
  }, { passive: false });
}

/* ─── Scroll-driven scale parallax ─────────────────────
     The slider sits at 100vh. If the page CAN scroll (e.g.
     on very tall viewports), artwork images slowly scale up. */
function setupScrollParallax() {
  window.addEventListener("scroll", () => {
    if (isPanelOpen) return;
    const scrollFrac = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    const scaleVal   = 1 + scrollFrac * 0.08;
    gsap.to(".slide.is-active img", {
      scale: scaleVal,
      duration: 0.4,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, { passive: true });
}

/* ─── Nav links: display-only labels ─────────────────── */
function disableNavLinks() {
  document.querySelectorAll(".hdr-nav-link, .hdr-logo-link, .hdr-social-links a").forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });
}

/* ─── Event bindings ─────────────────────────────────── */
function bindEvents() {
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  slidesTrack.addEventListener("click", (e) => {
    const trigger = e.target.closest(".art-trigger");
    if (!trigger || isAnimating || isPanelOpen) return;

    const slide = trigger.closest(".slide");
    const index = Number(slide.dataset.index);

    navigateToArtist(index);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft")  prevSlide();
  });
}

/* ─── Cinematic intro animation ─────────────────────── */
function playIntro() {
  const firstSlide = document.querySelector(".slide.is-active");

  gsap.set(".hero-divider", { width: 0 });
  gsap.set(firstSlide, {
    scale: 0.86,
    opacity: 0,
    rotateY: -20,
    z: -80,
    transformPerspective: PERSP,
    transformOrigin: "center center",
  });
  gsap.set(firstSlide.querySelector(".slide-image-wrap"), {
    clipPath: "inset(0 100% 0 0%)",
  });
  gsap.set(firstSlide.querySelector("img"), { scale: 1.18 });
  gsap.set(".project-index",   { x: 46,  opacity: 0 });
  gsap.set(".project-caption", { x: 22,  opacity: 0 });
  gsap.set(".site-header",     { y: -16, opacity: 0 });
  gsap.set(".hdr-grid > *",    { opacity: 0, y: 10 });

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(".site-header", { y: 0, opacity: 1, duration: 0.52 })
    .to(".hdr-grid > *", {
      opacity: 1, y: 0,
      stagger: 0.07,
      duration: 0.4,
      ease: "power2.out",
    }, "<0.04")
    .to(".hero-divider",   { width: "96vw", duration: 1.2, ease: "power2.inOut" }, "<0.15")
    .to(firstSlide, {
      scale: 1, opacity: 1, rotateY: 0, z: 0,
      duration: 1.15, ease: "expo.out",
    }, "<0.08")
    .to(firstSlide.querySelector(".slide-image-wrap"), {
      clipPath: "inset(0 0% 0 0%)",
      duration: 1.05, ease: "power3.inOut",
    }, "<0.12")
    .to(firstSlide.querySelector("img"), {
      scale: 1, duration: 1.05, ease: "power3.out",
    }, "<")
    .to(".project-index",   { x: 0, opacity: 1, duration: 0.72 }, "<0.26")
    .to(".project-caption", { x: 0, opacity: 1, duration: 0.64 }, "<0.08");
}

/* ─── Init ───────────────────────────────────────────── */
function initPortfolio() {
  buildSlides();
  setCounter(currentIndex);
  bindEvents();
  setupHoverEffects();
  setupPointerParallax();
  setupTouchSwipe();
  setupWheelNavigation();
  setupScrollParallax();
  disableNavLinks();
  playIntro();
}

window.addEventListener("load", initPortfolio);
