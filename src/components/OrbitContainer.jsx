import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/orbitContainer.css';
import { artistArtworks } from '../data/projects';

const lerp = (start, end, amount) => start + (end - start) * amount;

export function OrbitContainer({ currentIndex, projects, orbitPaused, setOrbitPaused }) {
  const orbitContainerRef = useRef(null);
  const orbitBackLayerRef = useRef(null);
  const [useSplitLayers, setUseSplitLayers] = useState(window.innerWidth > 980);

  useEffect(() => {
    const orbitItems = orbitContainerRef.current?.querySelectorAll(".orbit-item");
    if (!orbitItems || !orbitItems.length) return;

    // Build orbit items for current artist
    const artist = artistArtworks[currentIndex];
    orbitItems.forEach((item, index) => {
      const img = item.querySelector("img");
      if (img && artist && artist.path) {
        const artworkNum = (index % artist.count) + 1;
        const newSrc = `${artist.path}/artwork-${artworkNum}.jpg?t=${Date.now()}`;
        img.src = newSrc;
        img.alt = `${projects[currentIndex].artist} - Artwork ${artworkNum}`;
      } else if (img) {
        img.src = projects[currentIndex].image;
        img.alt = projects[currentIndex].artist;
      }
    });
  }, [currentIndex, projects]);

  useEffect(() => {
    const orbitContainer = orbitContainerRef.current;
    const sliderContainer = document.querySelector(".slider-container");
    const orbitItems = Array.from(orbitContainer?.querySelectorAll(".orbit-item") || []);

    if (!orbitContainer || !orbitItems.length) return;

    const mobileInfoQuery = window.matchMedia("(max-width: 980px)");
    let currentUseSplitLayers = useSplitLayers;

    // Handle split layers for 3D effect
    let orbitBackLayer = orbitBackLayerRef.current;
    if (currentUseSplitLayers && !orbitBackLayer && sliderContainer?.parentNode) {
      orbitBackLayer = document.createElement("div");
      orbitBackLayer.className = "orbit-container orbit-container-back is-3d";
      orbitBackLayer.setAttribute("aria-hidden", "true");
      sliderContainer.parentNode.insertBefore(orbitBackLayer, sliderContainer);
      orbitBackLayerRef.current = orbitBackLayer;
      orbitContainer.classList.add("orbit-container-front", "is-3d");
    }

    const maxRotation = 540;
    const autoSpeed = 6;
    const baseAngles = orbitItems.map((_, index) => (index / orbitItems.length) * 360);
    let currentRotation = 0;
    let scrollRotation = 0;
    let targetScrollRotation = 0;
    let autoRotation = 0;
    let lastTime = performance.now();

    const updateTarget = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clamped = Math.min(Math.max(progress, 0), 1);
      targetScrollRotation = clamped * maxRotation;
    };

    const animate = (timestamp) => {
      const deltaSeconds = Math.min(Math.max((timestamp - lastTime) / 1000, 0), 0.05);
      lastTime = timestamp;
      scrollRotation = lerp(scrollRotation, targetScrollRotation, 0.06);
      const isPaused = orbitPaused;

      if (!isPaused) {
        autoRotation += deltaSeconds * autoSpeed;
        currentRotation = lerp(currentRotation, scrollRotation + autoRotation, 0.08);
      }

      orbitItems.forEach((item, index) => {
        const angle = (baseAngles[index] + currentRotation) % 360;
        const normalized = (angle + 360) % 360;
        const isBack = normalized > 90 && normalized < 270;
        const targetLayer = currentUseSplitLayers && isBack && orbitBackLayer ? orbitBackLayer : orbitContainer;

        if (item.parentElement !== targetLayer) {
          targetLayer.appendChild(item);
        }
        item.style.setProperty("--orbit-angle", `${angle}deg`);
      });

      requestAnimationFrame(animate);
    };

    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });

    const handleMediaChange = (event) => {
      currentUseSplitLayers = !event.matches;
      setUseSplitLayers(currentUseSplitLayers);

      if (!currentUseSplitLayers && orbitBackLayer?.parentNode) {
        orbitBackLayer.parentNode.removeChild(orbitBackLayer);
        orbitItems.forEach((item) => orbitContainer.appendChild(item));
      }

      if (currentUseSplitLayers && sliderContainer?.parentNode && !orbitBackLayer?.parentNode) {
        const newBackLayer = document.createElement("div");
        newBackLayer.className = "orbit-container orbit-container-back is-3d";
        newBackLayer.setAttribute("aria-hidden", "true");
        sliderContainer.parentNode.insertBefore(newBackLayer, sliderContainer);
        orbitBackLayerRef.current = newBackLayer;
      }
    };

    mobileInfoQuery.addEventListener("change", handleMediaChange);

    // Hover pause effect
    orbitItems.forEach((item) => {
      item.addEventListener("mouseenter", () => setOrbitPaused(true));
      item.addEventListener("mouseleave", () => setOrbitPaused(false));
    });

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      mobileInfoQuery.removeEventListener("change", handleMediaChange);
    };
  }, [orbitPaused, setOrbitPaused, useSplitLayers]);

  return (
    <div className="orbit-container" id="orbitContainer" ref={orbitContainerRef}>
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className={`orbit-item orbit-item-${num}`}>
          <img src="" alt={`Artwork ${num}`} />
        </div>
      ))}
    </div>
  );
}
