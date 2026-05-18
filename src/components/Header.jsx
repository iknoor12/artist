import '../styles/header.css';

export function Header() {
  const handleNavClick = (e) => {
    e.preventDefault();
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="hdr-grid">
        {/* Logo */}
        <div className="hdr-logo">
          <a className="hdr-logo-link" href="#" aria-label="Home" onClick={handleNavClick}>
            <span className="hdr-logo-line1">DE2<sup>®</sup></span>
            <span className="hdr-logo-line2">K24</span>
          </a>
        </div>

        {/* Contact */}
        <div className="hdr-contact">
          <p className="hdr-label">Available for Freelance</p>
          <a href="mailto:designembraced@gmail.com">designembraced@gmail.com</a>
          <a href="tel:+4407749737297">+44 07749 737297</a>
        </div>

        {/* Services */}
        <div className="hdr-services">
          <p>Web Design &nbsp;&middot;&nbsp; UI / UX</p>
          <p>Branding &nbsp;|&nbsp; Typeface Design</p>
          <p>Motion Design</p>
        </div>

        {/* Social */}
        <div className="hdr-social">
          <span className="hdr-label">Social:</span>
          <div className="hdr-social-links">
            <a href="#" aria-label="Twitter" onClick={handleNavClick}>TW</a>
            <a href="#" aria-label="Dribbble" onClick={handleNavClick}>DR</a>
            <a href="#" aria-label="LinkedIn" onClick={handleNavClick}>LI</a>
          </div>
        </div>

        {/* Nav */}
        <nav className="hdr-nav" aria-label="Main navigation">
          <a className="hdr-nav-link is-active" href="#" onClick={handleNavClick}>WRK</a>
          <a className="hdr-nav-link" href="#" onClick={handleNavClick}>ABT</a>
        </nav>
      </div>
    </header>
  );
}
