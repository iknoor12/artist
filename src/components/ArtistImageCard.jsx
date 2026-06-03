import { useState, useRef } from "react";
import styles from "./ArtistImageCard.module.css";

/**
 * ArtistImageCard
 * Interactive image card with 3D parallax, hover effects, and animated overlay.
 * Features mouse tracking, scale/rotate transforms, and grayscale toggle.
 */
export default function ArtistImageCard({
  photo,
  name,
  specialty,
  className = "",
  onClick = null,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [imgTransform, setImgTransform] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    // Normalize values
    const relX = (x / centerX) * 0.5;
    const relY = (y / centerY) * 0.5;

    // 3D rotation based on mouse position
    setTilt({
      rotateX: relY * -4,
      rotateY: relX * 6,
    });

    // Image offset for parallax
    setImgTransform({
      x: relX * -16,
      y: relY * -10,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setImgTransform({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const figure = (
    <figure
      ref={imageRef}
      className={`${styles.slideImageWrap} ${className}`}
      style={{
        perspective: "1100px",
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={photo}
        alt={name}
        className={styles.slideImage}
        style={{
          filter: isHovered
            ? "grayscale(15%) brightness(1.02)"
            : "grayscale(100%) brightness(0.92)",
          transform: isHovered
            ? `scale(1.09) rotate(1.4deg) translate(${imgTransform.x}px, ${imgTransform.y}px)`
            : "scale(1) rotate(0deg) translate(0, 0)",
          transition:
            "filter 0.75s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className={styles.slideHoverOverlay}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        <div className={styles.overlayContent}>
          <h3 className={styles.overlayTitle}>{name}</h3>
          <p className={styles.overlaySubtitle}>{specialty}</p>
        </div>
      </div>

      {/* Enhanced shadow on hover */}
      <div
        className={styles.shadowLayer}
        style={{
          boxShadow: isHovered
            ? "0 40px 90px rgba(29, 26, 22, 0.32)"
            : "0 24px 60px rgba(29, 26, 22, 0.14)",
          transition: "box-shadow 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </figure>
  );

  // Wrap in button if onClick is provided
  if (onClick) {
    return (
      <button
        className={styles.artTrigger}
        onClick={onClick}
        aria-label={`View ${name}`}
      >
        {figure}
      </button>
    );
  }

  return figure;
}
