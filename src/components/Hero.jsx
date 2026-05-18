import { useEffect } from 'react';
import '../styles/hero.css';
import { Slider } from './Slider';
import { OrbitContainer } from './OrbitContainer';
import { ArtistInfoPanel } from './ArtistInfoPanel';

export function Hero({ 
  projects, 
  currentIndex, 
  isAnimating,
  slidesTrackRef, 
  sliderShellRef,
  nextSlide, 
  prevSlide,
  isInfoVisible,
  setIsInfoVisible,
  orbitPaused,
  setOrbitPaused,
  onBuildOrbitItems
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 42) return;
      if (dx < 0) nextSlide(); else prevSlide();
    };

    if (sliderShellRef.current) {
      sliderShellRef.current.addEventListener("touchstart", handleTouchStart, { passive: true });
      sliderShellRef.current.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        sliderShellRef.current?.removeEventListener("touchstart", handleTouchStart);
        sliderShellRef.current?.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [nextSlide, prevSlide, sliderShellRef]);

  // Wheel navigation
  useEffect(() => {
    let wheelLock = false;
    let lastWheelTime = 0;

    const handleWheel = (e) => {
      e.preventDefault();

      if (Math.abs(e.deltaY) < 10) return;

      const now = Date.now();
      if (now - lastWheelTime < 300) return;
      lastWheelTime = now;

      if (wheelLock || isAnimating) return;

      wheelLock = true;
      if (e.deltaY > 0) nextSlide(); else prevSlide();

      setTimeout(() => { wheelLock = false; }, 400);
    };

    if (sliderShellRef.current) {
      sliderShellRef.current.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        sliderShellRef.current?.removeEventListener("wheel", handleWheel);
      };
    }
  }, [nextSlide, prevSlide, isAnimating, sliderShellRef]);

  return (
    <main id="main-content">
      <section className="hero section">
        <div className="hero-divider" aria-hidden="true"></div>
        <div className="hero-grid">
          <div className="slider-container">
            <button 
              className="nav-arrow" 
              id="prevBtn" 
              aria-label="Previous project"
              onClick={() => prevSlide()}
            >
              <span className="nav-arrow-label">Back</span>
            </button>
            <Slider 
              slidesTrackRef={slidesTrackRef}
              sliderShellRef={sliderShellRef}
              currentIndex={currentIndex}
              projects={projects}
              isAnimating={isAnimating}
              onProjectIndexChange={onBuildOrbitItems}
              onTriggerClick={() => {
                setIsInfoVisible(true);
                setOrbitPaused(true);
              }}
            />
            <button 
              className="nav-arrow" 
              id="nextBtn" 
              aria-label="Next project"
              onClick={() => nextSlide()}
            >
              <span className="nav-arrow-label">Next</span>
            </button>
          </div>

          <OrbitContainer 
            currentIndex={currentIndex}
            projects={projects}
            orbitPaused={orbitPaused}
            setOrbitPaused={setOrbitPaused}
          />
        </div>

        <ArtistInfoPanel 
          currentProject={projects[currentIndex]}
          isVisible={isInfoVisible}
          onClose={() => setIsInfoVisible(false)}
          orbitPaused={orbitPaused}
          setOrbitPaused={setOrbitPaused}
        />
      </section>
    </main>
  );
}
