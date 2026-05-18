import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { useSlider } from './hooks/useSlider';
import { projects } from './data/projects';
import './styles/globals.css';

function App() {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [orbitPaused, setOrbitPaused] = useState(false);
  
  const {
    currentIndex,
    isAnimating,
    slidesTrackRef,
    sliderShellRef,
    nextSlide,
    prevSlide,
  } = useSlider(projects);

  const handleBuildOrbitItems = useCallback((index) => {
    // This callback is called when slides are updated
  }, []);

  const handleNextSlide = useCallback(() => {
    nextSlide((index) => {
      handleBuildOrbitItems(index);
    });
  }, [nextSlide, handleBuildOrbitItems]);

  const handlePrevSlide = useCallback(() => {
    prevSlide((index) => {
      handleBuildOrbitItems(index);
    });
  }, [prevSlide, handleBuildOrbitItems]);

  // Load initial slide
  useEffect(() => {
    if (slidesTrackRef.current) {
      const slides = slidesTrackRef.current.querySelectorAll(".slide");
      if (slides.length > 0) {
        slides[0].classList.add("is-active");
      }
    }
  }, []);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="noise-layer" aria-hidden="true"></div>
      
      <Header />
      <Hero 
        projects={projects}
        currentIndex={currentIndex}
        isAnimating={isAnimating}
        slidesTrackRef={slidesTrackRef}
        sliderShellRef={sliderShellRef}
        nextSlide={handleNextSlide}
        prevSlide={handlePrevSlide}
        isInfoVisible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
        orbitPaused={orbitPaused}
        setOrbitPaused={setOrbitPaused}
        onBuildOrbitItems={handleBuildOrbitItems}
      />
    </div>
  );
}

export default App;
