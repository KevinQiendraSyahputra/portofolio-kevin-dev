import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Hero({ onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(true);
  const heroRef = useRef(null);

  // 60fps Scroll listener
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

  // Parallax & Disappear calculations
  const textTranslateX = -scrollY * 0.45;
  const characterTranslateY = -scrollY * 0.95; // Gerakan meluncur ke atas saat di-scroll
  const characterScale = Math.max(0.8, 1 - scrollY * 0.0006); // Mengecil perlahan
  const characterOpacity = Math.max(0, 1 - scrollY / 420); // Menghilang memudar elegan
  const auraScale = Math.max(0.5, 1 - scrollY * 0.001);

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
      {/* 1. RUNNING TEXT LAYER (Di belakang karakter, z-index: 2) */}
      <div
        className="hero-bg-text hero-bg-text-top"
        style={{
          transform: `translate(calc(-50% + ${textTranslateX}px), 0)`,
          opacity: Math.max(0, 0.85 - scrollY / 500)
        }}
      >
        <span>ALEX RIVERA &nbsp; PORTFOLIO &nbsp; ALEX RIVERA &nbsp; PORTFOLIO &nbsp;</span>
        <span>ALEX RIVERA &nbsp; PORTFOLIO &nbsp; ALEX RIVERA &nbsp; PORTFOLIO &nbsp;</span>
      </div>

      <div className="container hero-container hero-container-layout">
        {/* 2. CHARACTER VISUAL LAYER (z-index: 10, di depan teks berjalan & tanpa card) */}
        <div className="hero-visual hero-visual-standalone">
          {/* Glowing Aura */}
          <div
            className="hero-aura"
            style={{
              transform: `scale(${auraScale}) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              opacity: Math.max(0, 1 - scrollY / 450)
            }}
          />

          {/* Character Container */}
          <div
            className="hero-character-standalone"
            style={{
              transform: `perspective(1200px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateY(${characterTranslateY}px) scale(${characterScale})`,
              opacity: characterOpacity,
              transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 0.15s ease-out'
            }}
          >
            {imgLoaded ? (
              <img
                src="/profile.png"
                alt="Alex Rivera Character"
                className="character-img-clean"
                onError={() => setImgLoaded(false)}
              />
            ) : (
              <div className="hero-avatar-fallback">
                <span className="initials">AR</span>
              </div>
            )}
          </div>

          {/* Floating Badges */}
          <div
            className="floating-badge floating-badge--top"
            style={{
              transform: `translate(${mousePos.x * 16}px, ${-scrollY * 0.4}px)`,
              opacity: characterOpacity
            }}
          >
            <i className="fa-solid fa-briefcase"></i> 20+ Projects
          </div>

          <div
            className="floating-badge floating-badge--bottom"
            style={{
              transform: `translate(${mousePos.x * -12}px, ${-scrollY * 0.25}px)`,
              opacity: characterOpacity
            }}
          >
            <i className="fa-solid fa-graduation-cap"></i> BSIT Graduate
          </div>
        </div>

        {/* 3. CONTENT INTRO LAYER (Di bawah teks berjalan) */}
        <div className={`hero-content hero-content-bottom ${isVisible ? 'visible' : ''}`}>
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
      </div>

      <div className="scroll-down">
        <div className="mouse"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}

export default Hero;