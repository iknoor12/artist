const projects = [
  {
    artist: "Priyanka Bardhan",
    title: "Eternal Grace",
    year: "2025",
    medium: "Acrylic and Oil",
    description:
      "Delhi-based contemporary painter blending Indian traditional themes with abstract expression to create distinct, symbolic compositions.",
    image: "https://zigguratss.com/assets/upload/artist/zigguratss_6ca65eccfa604a95f3bff20f64e5fbd8.jpg",
  },
  {
    artist: "Madhushree Pawar",
    title: "The River Bank",
    year: "2025",
    medium: "Watercolor",
    description:
      "A self-taught artist from Ahmedabad whose work is rooted in nature, spirituality, and a watercolor-led sense of calm.",
    image: "https://zigguratss.com/assets/upload/artist/zigguratss_7cb4901b38fa7a380ae9dbafc8eb2b42.jpg",
  },
  {
    artist: "Vivek Kisan Vadkar",
    title: "Legacy in Motion",
    year: "2025",
    medium: "Oil on Canvas",
    description:
      "Karjat-based fine artist with 18 years of practice, known for emotionally charged figurative work and a strong exhibition history.",
    image: "https://zigguratss.com/assets/upload/artist/zigguratss_fbcb02ffe4f2ed72538c4e24054f74e3.png",
  },
  {
    artist: "Panchu Gharami",
    title: "Sadhu 2",
    year: "2025",
    medium: "Acrylic on Canvas",
    description:
      "Kolkata artist inspired by rural Bengal, spirituality, and textured semi-realistic painting with dramatic light-and-shadow treatment.",
    image: "https://zigguratss.com/assets/upload/artist/zigguratss_bc6b2b722eb5f6f13e40a325fa017aac.jpg",
  },
  {
    artist: "Sangita Agarwal",
    title: "Buddha",
    year: "2025",
    medium: "Acrylic",
    description:
      "Self-taught painter creating mythic and spiritual narratives through bold palettes, decorative detail, and stylized contemporary forms.",
    image: "https://zigguratss.com/assets/upload/artist/zigguratss_83c3b422adf2f31766d3f171c6af966f.jpg",
  },
  {
    artist: "Sanjana Patel",
    title: "Kathaputli",
    year: "2025",
    medium: "Acrylic on Canvas",
    description:
      "Mumbai-based self-taught artist drawing from travel, culture, mythology, and tradition with fresh, bold painting language.",
    image: "https://zigguratss.com/assets/upload/artist-871.jpg",
  },
  {
    artist: "Richard Anbudurai",
    title: "Held in Time",
    year: "2026",
    medium: "Canvas / Mixed Media",
    description:
      "Chennai artist transforming fragile materials and memory into textured color narratives spanning painting, sculpture, and murals.",
    image: "https://zigguratss.com/assets/upload/artist-866.jpeg",
  },
];

const slidesTrack = document.getElementById("slidesTrack");
const sliderShell = document.getElementById("sliderShell");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const projectIndex = document.getElementById("projectIndex");
const projectCaption = document.getElementById("projectCaption");
const detailPanel = document.getElementById("detailPanel");
const detailOverlay = document.getElementById("detailOverlay");
const detailClose = document.getElementById("detailClose");
const detailArtist = document.getElementById("detailArtist");
const detailTitle = document.getElementById("detailTitle");
const detailYear = document.getElementById("detailYear");
const detailMedium = document.getElementById("detailMedium");
const detailDescription = document.getElementById("detailDescription");

let currentIndex = 0;
let isAnimating = false;
let isPanelOpen = false;
let touchStartY = 0;

function pad(value) {
  return String(value).padStart(2, "0");
}

function setCounter(index) {
  const project = projects[index];
  projectIndex.textContent = `PR.${pad(index + 1)} / ${pad(projects.length)}`;
  projectCaption.innerHTML = `${project.artist}<br />${project.title}`;
}

function buildSlides() {
  projects.forEach((project, index) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.dataset.index = String(index);
    slide.innerHTML = `
      <button class="art-trigger" type="button" aria-label="Open details for ${project.title}">
        <figure class="slide-image-wrap">
          <img src="${project.image}" alt="${project.title} by ${project.artist}" />
        </figure>
        <div class="slide-label">
          <span class="artist">${project.artist}</span>
          <span class="title">${project.title}</span>
        </div>
      </button>
    `;

    if (index === currentIndex) {
      slide.classList.add("is-active");
    }

    slidesTrack.appendChild(slide);
  });
}

function getSlides() {
  return Array.from(document.querySelectorAll(".slide"));
}

function goToSlide(targetIndex, direction) {
  if (isAnimating || targetIndex === currentIndex) {
    return;
  }

  const slides = getSlides();
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[targetIndex];
  const travel = direction || (targetIndex > currentIndex ? 1 : -1);

  isAnimating = true;
  nextSlide.classList.add("is-active");

  gsap.set(nextSlide, { yPercent: travel * 115, rotate: travel * 5, scale: 0.9, opacity: 0.15 });
  gsap.set(nextSlide.querySelector("img"), { scale: 1.12, yPercent: travel * 12 });

  const timeline = gsap.timeline({
    defaults: { ease: "expo.inOut" },
    onComplete: () => {
      currentSlide.classList.remove("is-active");
      gsap.set(currentSlide, { clearProps: "all" });
      gsap.set(currentSlide.querySelector("img"), { clearProps: "all" });
      gsap.set(nextSlide, { clearProps: "all" });
      gsap.set(nextSlide.querySelector("img"), { clearProps: "all" });
      currentIndex = targetIndex;
      isAnimating = false;
    },
  });

  timeline
    .to(currentSlide, { yPercent: -travel * 115, rotate: -travel * 5, scale: 0.9, opacity: 0, duration: 0.95 }, 0)
    .to(currentSlide.querySelector("img"), { scale: 0.95, yPercent: -travel * 10, duration: 0.95 }, 0)
    .to(nextSlide, { yPercent: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.05 }, 0.05)
    .to(nextSlide.querySelector("img"), { scale: 1, yPercent: 0, duration: 1.05 }, 0.05)
    .fromTo(projectIndex, { x: 36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.62, ease: "power3.out" }, 0.2)
    .fromTo(projectCaption, { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.56, ease: "power3.out" }, 0.25);

  setCounter(targetIndex);
}

function nextSlide() {
  goToSlide((currentIndex + 1) % projects.length, 1);
}

function prevSlide() {
  goToSlide((currentIndex - 1 + projects.length) % projects.length, -1);
}

function openDetail(index) {
  const project = projects[index];
  isPanelOpen = true;
  detailArtist.textContent = project.artist;
  detailTitle.textContent = project.title;
  detailYear.textContent = project.year;
  detailMedium.textContent = project.medium;
  detailDescription.textContent = project.description;

  detailPanel.setAttribute("aria-hidden", "false");
  detailOverlay.setAttribute("aria-hidden", "false");

  const mobileMode = window.matchMedia("(max-width: 640px)").matches;
  const panelFrom = mobileMode ? { yPercent: 105 } : { xPercent: 102 };
  const panelTo = mobileMode ? { yPercent: 0 } : { xPercent: 0 };

  gsap.timeline()
    .to(detailOverlay, { opacity: 1, duration: 0.35, ease: "power2.out", pointerEvents: "auto" })
    .fromTo(detailPanel, panelFrom, { ...panelTo, duration: 0.6, ease: "power3.out" }, 0);
}

function closeDetail() {
  if (!isPanelOpen) {
    return;
  }

  isPanelOpen = false;
  const mobileMode = window.matchMedia("(max-width: 640px)").matches;
  const panelTo = mobileMode ? { yPercent: 105 } : { xPercent: 102 };

  gsap.timeline({
    onComplete: () => {
      detailPanel.setAttribute("aria-hidden", "true");
      detailOverlay.setAttribute("aria-hidden", "true");
    },
  })
    .to(detailOverlay, { opacity: 0, duration: 0.3, ease: "power2.out", pointerEvents: "none" })
    .to(detailPanel, { ...panelTo, duration: 0.48, ease: "power3.in" }, 0);
}

function setupPointerParallax() {
  const depthBg = document.querySelector(".depth-bg");
  sliderShell.addEventListener("mousemove", (event) => {
    const rect = sliderShell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(depthBg, { x: x * 16, y: y * 12, duration: 0.7, ease: "power3.out" });
    gsap.to(".slide.is-active img", { x: x * -18, y: y * -12, duration: 0.8, ease: "power3.out" });
    gsap.to(".project-meta", { x: x * 8, y: y * 5, duration: 0.75, ease: "power3.out" });
  });

  sliderShell.addEventListener("mouseleave", () => {
    gsap.to([".depth-bg", ".slide.is-active img", ".project-meta"], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });
}

function setupTouchSwipe() {
  sliderShell.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0].clientY;
  });

  sliderShell.addEventListener("touchend", (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    const delta = touchEndY - touchStartY;

    if (Math.abs(delta) < 45) {
      return;
    }

    if (delta < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  });
}

function setupWheelNavigation() {
  let wheelLock = false;

  sliderShell.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      if (wheelLock || isAnimating || isPanelOpen) {
        return;
      }

      if (Math.abs(event.deltaY) < 25) {
        return;
      }

      wheelLock = true;
      if (event.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(() => {
        wheelLock = false;
      }, 850);
    },
    { passive: false }
  );
}

function disableNavLinks() {
  document.querySelectorAll(".site-nav a, .brand").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function bindEvents() {
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
  detailClose.addEventListener("click", closeDetail);
  detailOverlay.addEventListener("click", closeDetail);

  slidesTrack.addEventListener("click", (event) => {
    const trigger = event.target.closest(".art-trigger");
    if (!trigger) {
      return;
    }

    openDetail(currentIndex);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      prevSlide();
    }

    if (event.key === "Escape") {
      closeDetail();
    }
  });
}

function playIntro() {
  gsap.set(".hero-divider", { width: 0, transformOrigin: "50% 50%" });
  gsap.set(".slide.is-active", { scale: 0.92, opacity: 0 });
  gsap.set(".project-index", { x: 42, opacity: 0 });
  gsap.set(".project-caption", { x: 20, opacity: 0 });
  gsap.set(".site-header", { y: -16, opacity: 0 });

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(".site-header", { y: 0, opacity: 1, duration: 0.5 })
    .to(".hero-divider", { width: "96vw", duration: 1.15, ease: "power2.inOut" }, "<0.1")
    .to(".slide.is-active", { scale: 1, opacity: 1, duration: 1.05 }, "<0.08")
    .to(".project-index", { x: 0, opacity: 1, duration: 0.7 }, "<0.24")
    .to(".project-caption", { x: 0, opacity: 1, duration: 0.62 }, "<0.08");
}

function initPortfolio() {
  buildSlides();
  setCounter(currentIndex);
  bindEvents();
  setupPointerParallax();
  setupTouchSwipe();
  setupWheelNavigation();
  disableNavLinks();
  playIntro();
}

window.addEventListener("load", initPortfolio);
