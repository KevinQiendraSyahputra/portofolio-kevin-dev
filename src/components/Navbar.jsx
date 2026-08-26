import { useState, useEffect } from 'react';

function Navbar({ onToggleTheme, isLight }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'work', 'services', 'about', 'awards', 'trainings', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom > 140) {
            current = id;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-mark">A</span>
          Alex<span style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#work" className={activeSection === 'work' ? 'active' : ''} onClick={closeMenu}>Work</a></li>
          <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={closeMenu}>What I Can Do</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={closeMenu}>About</a></li>
          <li><a href="#awards" className={activeSection === 'awards' ? 'active' : ''} onClick={closeMenu}>Awards</a></li>
          <li><a href="#trainings" className={activeSection === 'trainings' ? 'active' : ''} onClick={closeMenu}>Trainings</a></li>
          <li>
            <a href="#contact" className="btn-primary mobile-hire" onClick={closeMenu}>
              <span>Hire Me</span>
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="icon-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          <a href="#contact" className="btn-primary btn-hire">
            <span>Hire Me</span>
          </a>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;