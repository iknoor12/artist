import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const PERSP = 1100; // perspective value used in all GSAP transforms

export function useSlider(projects) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesTrackRef = useRef(null);
  const sliderShellRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const getSlides = useCallback(() => {
    if (!slidesTrackRef.current) return [];
    return Array.from(slidesTrackRef.current.querySelectorAll(".slide"));
  }, []);

  const goToSlide = useCallback((targetIndex, direction, callback) => {
    if (isAnimating || targetIndex === currentIndex || !slidesTrackRef.current || !sliderShellRef.current) {
      return;
    }

    const slides = getSlides();
    if (!slides[targetIndex]) return;

    const outSlide = slides[currentIndex];
    const inSlide = slides[targetIndex];
    const dir = direction || (targetIndex > currentIndex ? 1 : -1);

    if (callback) {
      callback(targetIndex);
    }

    setIsAnimating(true);
    inSlide.classList.add("is-active");

    const clipHide = dir > 0 ? "inset(0 100% 0 0%)" : "inset(0 0% 0 100%)";
    const clipShow = "inset(0 0% 0 0%)";

    gsap.set(inSlide, {
      xPercent: dir * 120,
      rotateY: dir * -35,
      scale: 0.82,
      opacity: 0,
      z: -120,
      transformPerspective: PERSP,
      transformOrigin: dir > 0 ? "left center" : "right center",
      skewY: dir * 2,
    });
    gsap.set(inSlide.querySelector(".slide-image-wrap"), { 
      clipPath: clipHide,
      filter: "blur(4px)"
    });
    gsap.set(inSlide.querySelector("img"), { 
      scale: 1.3,
      filter: "brightness(0.7)"
    });
    gsap.set(inSlide.querySelector(".slide-hover-overlay"), { opacity: 0 });

    const tl = gsap.timeline({
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
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
      },
    });

    // Outgoing slide
    tl.to(outSlide, {
      xPercent: dir * -130,
      rotateY: dir * 35,
      scale: 0.78,
      opacity: 0,
      z: -130,
      duration: 0.9,
      transformPerspective: PERSP,
      transformOrigin: dir > 0 ? "right center" : "left center",
      ease: "power2.inOut",
      skewY: dir * -2,
    }, 0);
    
    tl.to(outSlide.querySelector("img"), {
      scale: 0.85,
      filter: "grayscale(100%) brightness(0.6) blur(2px)",
      duration: 0.9,
      ease: "power2.inOut",
    }, 0);
    
    tl.to(outSlide.querySelector(".slide-image-wrap"), {
      filter: "blur(6px)",
      duration: 0.7,
      ease: "power2.inOut",
    }, 0);

    // Incoming slide
    tl.to(inSlide, {
      xPercent: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      z: 0,
      skewY: 0,
      duration: 1.1,
      transformOrigin: "center center",
      transformPerspective: PERSP,
      ease: "power3.out",
    }, 0.05);
    
    tl.to(inSlide.querySelector(".slide-image-wrap"), {
      clipPath: clipShow,
      filter: "blur(0px)",
      duration: 0.95,
      ease: "power2.inOut",
    }, 0.15);
    
    tl.to(inSlide.querySelector("img"), {
      scale: 1,
      filter: "brightness(1)",
      duration: 1.1,
      ease: "power3.out",
    }, 0.05);

    // Parallax background
    const depthBg = sliderShellRef.current.querySelector(".depth-bg");
    if (depthBg) {
      tl.to(depthBg, {
        x: dir * -30,
        duration: 0.9,
        ease: "power2.inOut",
      }, 0);
    }
  }, [currentIndex, isAnimating, getSlides]);

  const nextSlide = useCallback((callback) => {
    goToSlide((currentIndex + 1) % projects.length, 1, callback);
  }, [currentIndex, projects.length, goToSlide]);

  const prevSlide = useCallback((callback) => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length, -1, callback);
  }, [currentIndex, projects.length, goToSlide]);

  return {
    currentIndex,
    isAnimating,
    slidesTrackRef,
    sliderShellRef,
    touchStartX,
    touchStartY,
    nextSlide,
    prevSlide,
    goToSlide,
    getSlides,
  };
}
