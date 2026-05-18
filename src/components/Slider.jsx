import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/slider.css';

export function Slider({ 
  slidesTrackRef, 
  sliderShellRef, 
  currentIndex, 
  projects, 
  onProjectIndexChange,
  isAnimating,
  onTriggerClick 
}) {
  const projectIndexRef = useRef(null);
  const projectCaptionRef = useRef(null);

  useEffect(() => {
    if (projectIndexRef.current && projectCaptionRef.current) {
      const p = projects[currentIndex];
      projectIndexRef.current.textContent = `PR.${String(currentIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
      projectCaptionRef.current.innerHTML = `${p.artist}<br />${p.title}`;
    }
  }, [currentIndex, projects]);

  // Handle slide hover effects
  useEffect(() => {
    if (!slidesTrackRef.current) return;

    const slides = slidesTrackRef.current.querySelectorAll(".slide");
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      const overlay = slide.querySelector(".slide-hover-overlay");
      const imageWrap = slide.querySelector(".slide-image-wrap");
      const trigger = slide.querySelector(".art-trigger");

      if (trigger) {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          if (slide.classList.contains("is-active") && onTriggerClick) {
            onTriggerClick();
          }
        });
      }

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
  }, [currentIndex, isAnimating, onTriggerClick]);

  // Pointer parallax
  useEffect(() => {
    if (!sliderShellRef.current) return;

    const handleMouseMove = (e) => {
      const rect = sliderShellRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const depthBg = sliderShellRef.current.querySelector(".depth-bg");
      gsap.to(depthBg, { x: x * 20, y: y * 14, duration: 0.75, ease: "power3.out" });
      gsap.to(slidesTrackRef.current.querySelector(".slide.is-active img"), { 
        x: x * -16, 
        y: y * -10, 
        duration: 0.8, 
        ease: "power3.out" 
      });
      gsap.to(slidesTrackRef.current.querySelector(".slide.is-active .slide-image-wrap"), {
        rotateY: x * 6,
        rotateX: y * -4,
        transformPerspective: 1100,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      const depthBg = sliderShellRef.current.querySelector(".depth-bg");
      gsap.to(depthBg, { x: 0, y: 0, duration: 0.85, ease: "power3.out" });
      gsap.to(slidesTrackRef.current.querySelector(".slide.is-active img"), { 
        x: 0, 
        y: 0, 
        duration: 0.85, 
        ease: "power3.out" 
      });
      gsap.to(slidesTrackRef.current.querySelector(".slide.is-active .slide-image-wrap"), {
        rotateY: 0, 
        rotateX: 0, 
        duration: 0.85, 
        ease: "power3.out",
      });
    };

    sliderShellRef.current.addEventListener("mousemove", handleMouseMove);
    sliderShellRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sliderShellRef.current?.removeEventListener("mousemove", handleMouseMove);
      sliderShellRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="slider-shell" ref={sliderShellRef}>
      <div className="depth-bg" aria-hidden="true"></div>
      <div className="slides-track" ref={slidesTrackRef} aria-live="polite">
        {projects.map((project, index) => (
          <article key={index} className={`slide ${index === currentIndex ? 'is-active' : ''}`} data-index={String(index)}>
            <button className="art-trigger" type="button" aria-label={`Show artist info for ${project.artist}`}>
              <figure className="slide-image-wrap">
                <img src={project.image} alt={`${project.title} by ${project.artist}`} />
                <div className="slide-hover-overlay" aria-hidden="true">
                  <span>{project.artist} &mdash; {project.title}</span>
                </div>
              </figure>
            </button>
          </article>
        ))}
      </div>
      <div className="project-meta">
        <p className="project-index" ref={projectIndexRef}>PR.01 / 07</p>
        <p className="project-caption" ref={projectCaptionRef}>Artist Name<br />Artwork Title</p>
      </div>
    </div>
  );
}
