/* projects array is loaded from data.js */

/* DOM references */
const slidesTrack    = document.getElementById("slidesTrack");
const sliderShell    = document.getElementById("sliderShell");
const prevBtn        = document.getElementById("prevBtn");
const nextBtn        = document.getElementById("nextBtn");
const projectIndex   = document.getElementById("projectIndex");
const projectCaption = document.getElementById("projectCaption");
const orbitContainer = document.getElementById("orbitContainer");

/* ─── State ────────────────────────────── */
let currentIndex      = 0;
let isAnimating       = false;
let touchStartX       = 0;
let touchStartY       = 0;

const PERSP = 1100; // perspective value used in all GSAP transforms

/* ─── Helpers ────────────────────────────────────────── */
function pad(n) { return String(n).padStart(2, "0"); }

function setCounter(index) {
  const p = projects[index];
  projectIndex.textContent = `PR.${pad(index + 1)} / ${pad(projects.length)}`;
  projectCaption.innerHTML = `${p.artist}<br />${p.title}`;
}

/* ─── Build slides ───────────────────────── */
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
      </button>
    `;

    if (index === currentIndex) slide.classList.add("is-active");
    slidesTrack.appendChild(slide);
  });
}

function getSlides() {
  return Array.from(slidesTrack.querySelectorAll(".slide"));
}

/* ─── Build Orbit Items with Priyanka Bardhan's Artwork ─── */
function buildOrbitItems() {
  const orbitContainer = document.getElementById("orbitContainer");
  if (!orbitContainer) return;

  // Priyanka Bardhan's artwork images (local)
  const artworkImages = [
    'assets/priyanka-bardhan-artworks/artwork-1.png',
    'assets/priyanka-bardhan-artworks/artwork-2.png',
    'assets/priyanka-bardhan-artworks/artwork-3.png',
    'assets/priyanka-bardhan-artworks/artwork-4.png',
    'assets/priyanka-bardhan-artworks/artwork-5.png'
  ];

  const orbitItems = orbitContainer.querySelectorAll(".orbit-item");
  orbitItems.forEach((item, index) => {
    const img = item.querySelector("img");
    if (img) {
      img.src = artworkImages[index % artworkImages.length];
      img.alt = `Priyanka Bardhan - Artwork ${index + 1}`;
      img.loading = 'lazy';
    }
  });
}

/* ─── Rolling 3-D slide transition ─────────────── */
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

function prevSlide() { goToSlide((currentIndex - 1 + projects.length) % projects.length, -1); }
function nextSlide() { goToSlide((currentIndex + 1) % projects.length, 1); }

/* ─── Hover effects (GSAP-driven) ────────── */
function setupHoverEffects() {
  slidesTrack.querySelectorAll(".slide").forEach((slide) => {
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

/* ─── Pointer parallax with 3D tilt ──────── */
function setupPointerParallax() {
  const depthBg = sliderShell.querySelector(".depth-bg");

  sliderShell.addEventListener("mousemove", (e) => {
    const rect = sliderShell.getBoundingClientRect();
    const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
    const y = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

    gsap.to(depthBg, { x: x * 20, y: y * 14, duration: 0.75, ease: "power3.out" });
    gsap.to(slidesTrack.querySelector(".slide.is-active img"), { x: x * -16, y: y * -10, duration: 0.8, ease: "power3.out" });
    gsap.to(slidesTrack.querySelector(".slide.is-active .slide-image-wrap"), {
      rotateY:           x *  6,
      rotateX:           y * -4,
      transformPerspective: PERSP,
      duration: 0.9,
      ease: "power3.out",
    });
  });

  sliderShell.addEventListener("mouseleave", () => {
    gsap.to(depthBg, { x: 0, y: 0, duration: 0.85, ease: "power3.out" });
    gsap.to(slidesTrack.querySelector(".slide.is-active img"), { x: 0, y: 0, duration: 0.85, ease: "power3.out" });
    gsap.to(slidesTrack.querySelector(".slide.is-active .slide-image-wrap"), {
      rotateY: 0, rotateX: 0, duration: 0.85, ease: "power3.out",
    });
  });
}

/* ─── Touch / swipe (horizontal) ────────── */
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

/* ─── Wheel navigation with inertia feel ─── */
function setupWheelNavigation() {
  let wheelLock = false;

  sliderShell.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock || isAnimating) return;
    if (Math.abs(e.deltaY) < 28) return;

    wheelLock = true;
    if (e.deltaY > 0) nextSlide(); else prevSlide();

    const cooldown = Math.min(1100, Math.max(650, 900 - Math.abs(e.deltaY) * 0.9));
    setTimeout(() => { wheelLock = false; }, cooldown);
  }, { passive: false });
}

/* ─── Scroll-driven scale parallax ────────── */
function setupScrollParallax() {
  window.addEventListener("scroll", () => {
    const scrollFrac = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    const scaleVal   = 1 + scrollFrac * 0.08;
    gsap.to(slidesTrack.querySelector(".slide.is-active img"), {
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

/* ─── Event bindings ────────────────────────────────────── */
function bindEvents() {
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  setupHoverEffects();
  setupPointerParallax();
  setupTouchSwipe();
  setupWheelNavigation();
  setupScrollParallax();
  disableNavLinks();
}

/* ─── Init ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  if (!projects || projects.length === 0) {
    console.error("No projects data found. Ensure data.js is loaded.");
    return;
  }

  buildSlides();
  buildOrbitItems();
  setCounter(currentIndex);
  bindEvents();
});
