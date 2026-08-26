import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Hero({ onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(true);
  const heroRef = useRef(null);

  // 60fps Parallax scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Mouse tilt on hero
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    onShowToast?.('📄 Add your resume file link here.');
  };

  // Parallax translation rates
  const textTranslateX = -scrollY * 0.45;
  const characterTranslateY = -scrollY * 0.15;
  const characterScale = 1 + scrollY * 0.0003;
  const badgeTopTranslateY = -scrollY * 0.35;
  const badgeBottomTranslateY = -scrollY * 0.18;
  const badgeLeftTranslateY = -scrollY * 0.28;
  const auraScale = Math.max(0.7, 1 - scrollY * 0.001);

  return (
    <section
      className="hero hero-large-character parallax-section"
      id="home"
      ref={(node) => {
        ref.current = node;
        heroRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* HUGE OUTLINE TEXT BEHIND CHARACTER (Layer 1) */}
      <div
        className="hero-bg-text hero-bg-text-large"
        style={{
          transform: `translate(calc(-50% + ${textTranslateX}px), -50%)`,
          opacity: Math.max(0, 1 - scrollY / 650)
        }}
      >
        <span>ALEX RIVERA &nbsp; PORTFOLIO &nbsp; ALEX RIVERA &nbsp; PORTFOLIO &nbsp;</span>
        <span>ALEX RIVERA &nbsp; PORTFOLIO &nbsp; ALEX RIVERA &nbsp; PORTFOLIO &nbsp;</span>
      </div>

      <div className="container hero-container hero-container-large">
        {/* LEFT COLUMN: INTRO CONTENT */}
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <div className="badge">
            <span className="dot"></span> Available for Work
          </div>
          <h1>
            Hi, I'm Alex — I build <span className="highlight">digital solutions</span> that actually work.
          </h1>
          <p>
            Software developer focused on web development, systems testing, and practical digital tools. I turn real-world problems into clean, reliable code.
          </p>
          <div className="hero-buttons">
            <a href="#work" className="btn-primary btn-magnetic">
              <span>View My Work</span> <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#cv" className="btn-glow btn-magnetic" onClick={handleDownloadCV}>
              <span>Download CV</span> <i className="fa-solid fa-arrow-down"></i>
            </a>
          </div>
          <div className="hero-social">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="mailto:alex.rivera.dev@example.com" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
          </div>
        </div>

        {/* RIGHT/CENTER: LARGE CHARACTER DISPLAY (Layer 2 & 3) */}
        <div className="hero-visual hero-visual-large">
          {/* Ambient Glowing Aura */}
          <div
            className="hero-aura hero-aura-large"
            style={{
              transform: `scale(${auraScale}) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
              opacity: Math.max(0.2, 1 - scrollY / 600)
            }}
          />

          {/* Orbit Rings */}
          <div
            className="hero-orbits-wrap hero-orbits-large"
            style={{
              transform: `translate(${mousePos.x * 10}px, ${characterTranslateY * 0.5}px)`
            }}
          >
            <div className="orbit orbit--1"><div className="orbit-dot"></div></div>
            <div className="orbit orbit--2"><div className="orbit-dot"></div></div>
            <div className="orbit orbit--3"><div className="orbit-dot"></div></div>
          </div>

          {/* Large Standalone Character Container */}
          <div
            className="hero-character-large-wrapper"
            style={{
              transform: `perspective(1200px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateY(${characterTranslateY}px) scale(${characterScale})`,
              transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)'
            }}
          >
            {imgLoaded ? (
              <div className="character-img-crop">
                <img
                  src="/profile.png"
                  alt="Alex Rivera Character"
                  className="character-img-full"
                  onError={() => setImgLoaded(false)}
                />
                <div className="character-bottom-gradient"></div>
              </div>
            ) : (
              <div className="hero-avatar hero-avatar-large">
                <span className="initials">AR</span>
              </div>
            )}
          </div>

          {/* Floating Badges */}
          <div
            className="floating-badge floating-badge--top"
            style={{
              transform: `translate(${mousePos.x * 18}px, ${badgeTopTranslateY}px)`
            }}
          >
            <i className="fa-solid fa-briefcase"></i> 20+ Projects
          </div>

          <div
            className="floating-badge floating-badge--bottom"
            style={{
              transform: `translate(${mousePos.x * -12}px, ${badgeBottomTranslateY}px)`
            }}
          >
            <i className="fa-solid fa-graduation-cap"></i> BSIT Graduate
          </div>

          <div
            className="floating-badge floating-badge--left"
            style={{
              transform: `translate(${mousePos.x * 14}px, ${badgeLeftTranslateY}px)`
            }}
          >
            <i className="fa-solid fa-code"></i> Full Stack
          </div>
        </div>
      </div>

      <div className="scroll-down">
        <div className="mouse"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}

export default Hero;