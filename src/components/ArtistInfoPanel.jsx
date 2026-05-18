import { useRef, useEffect } from 'react';
import '../styles/artistInfoPanel.css';
import { renderField, renderListBlock, escapeHtml } from '../utils/helpers';

export function ArtistInfoPanel({ currentProject, isVisible, onClose, orbitPaused, setOrbitPaused }) {
  const artistInfoBodyRef = useRef(null);
  const infoBackdropRef = useRef(null);
  const artistInfoPanelRef = useRef(null);

  useEffect(() => {
    if (!currentProject || !artistInfoBodyRef.current) return;

    const info = currentProject.artistInfo || {};
    const mediums = Array.isArray(info.mediums) ? info.mediums : [];
    const style = Array.isArray(info.style) ? info.style : [];
    const themes = Array.isArray(info.themes) ? info.themes : [];
    const education = Array.isArray(info.education) ? info.education : [];
    const achievements = Array.isArray(info.achievements) ? info.achievements : [];
    const exhibitions = Array.isArray(info.exhibitions) ? info.exhibitions : [];
    const knownWorks = Array.isArray(info.knownWorks) ? info.knownWorks : [];

    artistInfoBodyRef.current.innerHTML = `
      <div class="artist-info-header">
        <div class="artist-info-avatar">
          <img src="${escapeHtml(currentProject.image)}" alt="${escapeHtml(currentProject.artist)} profile image" />
        </div>
        <div>
          <p class="artist-info-kicker">Artist Profile</p>
          <h2 class="artist-info-title">${escapeHtml(currentProject.artist)}</h2>
          <p class="artist-info-subtitle">${escapeHtml(info.location || currentProject.location)}${info.origin ? ` · Origin: ${escapeHtml(info.origin)}` : ""}</p>
        </div>
      </div>

      <div class="artist-info-grid">
        ${renderField("Total Artwork", info.totalArtwork || "—")}
        ${renderField("Born", info.born || "")}
        ${renderField("Type", info.type || "")}
        ${renderField("Experience", info.experience || "")}
        ${renderField("Mentor", info.mentor || "")}
        <div class="artist-info-fact">
          <span class="artist-info-label">View Artist</span>
          <a class="artist-info-link" href="${escapeHtml(currentProject.link)}" target="_blank" rel="noreferrer">Open profile</a>
        </div>
      </div>

      ${renderListBlock("Mediums", mediums)}
      ${renderListBlock("Style", style)}
      ${renderListBlock("Themes", themes)}

      <p class="artist-info-bio">${escapeHtml(info.statement || info.bio || currentProject.description)}</p>

      ${education.length ? `
        <div>
          <span class="artist-info-label">Education</span>
          <ul class="artist-info-list">${education.map(e => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
        </div>
      ` : ""}

      ${achievements.length ? `
        <div>
          <span class="artist-info-label">Awards</span>
          <ul class="artist-info-list">${achievements.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
        </div>
      ` : ""}

      ${exhibitions.length ? `
        <div>
          <span class="artist-info-label">Exhibitions</span>
          <ul class="artist-info-list">${exhibitions.map(e => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
        </div>
      ` : ""}

      ${knownWorks.length ? `
        <div>
          <span class="artist-info-label">Known Works</span>
          <ul class="artist-info-list">${knownWorks.map(w => `<li>${escapeHtml(w)}</li>`).join("")}</ul>
        </div>
      ` : ""}

      ${info.note ? `<p class="artist-info-note">${escapeHtml(info.note)}</p>` : ""}
    `;
  }, [currentProject]);

  useEffect(() => {
    if (infoBackdropRef.current && artistInfoPanelRef.current) {
      if (isVisible) {
        infoBackdropRef.current.classList.add("is-visible");
        artistInfoPanelRef.current.classList.add("is-visible");
      } else {
        infoBackdropRef.current.classList.remove("is-visible");
        artistInfoPanelRef.current.classList.remove("is-visible");
      }
    }
  }, [isVisible]);

  const handleClose = () => {
    setOrbitPaused(false);
    onClose();
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  return (
    <>
      <div 
        className="info-backdrop" 
        id="infoBackdrop" 
        aria-hidden={!isVisible}
        ref={infoBackdropRef}
        onClick={handleBackdropClick}
      ></div>
      <aside 
        className="artist-info-panel" 
        id="artistInfoPanel" 
        aria-live="polite"
        ref={artistInfoPanelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="artist-info-close" 
          id="artistInfoClose" 
          type="button" 
          aria-label="Close artist information"
          onClick={handleClose}
        >
          Close
        </button>
        <div className="artist-info-body" id="artistInfoBody" ref={artistInfoBodyRef}></div>
      </aside>
    </>
  );
}
