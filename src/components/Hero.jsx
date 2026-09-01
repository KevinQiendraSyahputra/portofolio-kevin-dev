import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Hero({ onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(true);
  const heroRef = useRef(null);

  // Smooth Lerp Scroll Animation Loop (Menghilangkan sentakan mouse wheel)
  useEffect(() => {
    let rafId;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const updateSmoothScroll = () => {
      const diff = targetScroll - currentScroll;
      // Damping interpolation factor (0.08 = lembut & responsif)
      if (Math.abs(diff) > 0.05) {
        currentScroll += diff * 0.085;
        setScrollY(currentScroll);
      }
      rafId = requestAnimationFrame(updateSmoothScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateSmoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 3D Mouse Tilt
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

  // Kurva Halus S-Curve Fade Out & Fade In (Cosine Ease)
  const fadeProgress = Math.min(1, Math.max(0, scrollY / 420));
  const smoothFade = (1 + Math.cos(fadeProgress * Math.PI)) / 2; // 1 -> 0 secara mulus

  // Transformasi Parallax
  const marqueeTranslateX = -scrollY * 0.35;
  const characterTranslateY = -scrollY * 0.92;
  const characterScale = Math.max(0.72, 1 - scrollY * 0.00065);
  const auraScale = Math.max(0.4, 1 - scrollY * 0.001);

  const marqueeItems = [
    'System Testing',
    'UI/UX Design',
    'Database Design',
    'Web Development',
    'API Integration',
    'Digital Operations',
    'Problem Solving'
  ];

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
      {/* 1. RUNNING TEXT SKILLS DI ATAS (Layer di belakang karakter, Z-Index: 2) */}
      <div
        className="hero-top-marquee"
        style={{
          transform: `translateX(${marqueeTranslateX}px)`,
          opacity: Math.max(0, smoothFade * 0.85)
        }}
      >
        <div className="hero-marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="marquee-item">
              <i className="fa-solid fa-circle dot-sep"></i> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container hero-container hero-container-stacked">
        {/* 2. KARAKTER BESAR BEBAS TANPA CARD (Layer Terdepan, Z-Index: 10) */}
        <div className="hero-visual-standalone">
          {/* Ambient Glow Aura */}
          <div
            className="hero-aura-large"
            style={{
              transform: `scale(${auraScale}) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              opacity: Math.max(0, smoothFade)
            }}
          />

          {/* Standalone Character */}
          <div
            className="hero-character-standalone"
            style={{
              transform: `perspective(1200px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateY(${characterTranslateY}px) scale(${characterScale})`,
              opacity: smoothFade
            }}
          >
            {imgLoaded ? (
              <img
                src="/profile.jpg"
                alt="Alex Rivera Character"
                className="character-img-huge"
                onError={() => setImgLoaded(false)}
              />
            ) : (
              <div className="hero-avatar-standalone">
                <span className="initials">AR</span>
              </div>
            )}
          </div>

          {/* Floating Badges */}
          <div
            className="floating-badge floating-badge--top"
            style={{
              transform: `translate(${mousePos.x * 16}px, ${-scrollY * 0.38}px)`,
              opacity: smoothFade
            }}
          >
            <i className="fa-solid fa-briefcase"></i> 20+ Projects
          </div>

          <div
            className="floating-badge floating-badge--bottom"
            style={{
              transform: `translate(${mousePos.x * -12}px, ${-scrollY * 0.22}px)`,
              opacity: smoothFade
            }}
          >
            <i className="fa-solid fa-graduation-cap"></i> BSIT Graduate
          </div>
        </div>

        {/* 3. KATA-KATA INTRO DI BAGIAN BAWAH */}
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