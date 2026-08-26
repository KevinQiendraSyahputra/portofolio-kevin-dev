import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Services from './components/Services';
import About from './components/About';
import Awards from './components/Awards';
import Trainings from './components/Trainings';
import Footer from './components/Footer';
import ArchiveModal from './components/ArchiveModal';
import ContactDrawer from './components/ContactDrawer';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTopVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsLight((prev) => !prev);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* PRELOADER */}
      <div className={`preloader ${!loading ? 'done' : ''}`} id="preloader">
        <div className="preloader-logo">AR</div>
        <div className="preloader-bar">
          <div className="preloader-bar-inner"></div>
        </div>
      </div>

      {/* NOISE & GRID & PARALLAX BACKGROUND */}
      <div className="noise-overlay"></div>
      <ParticleCanvas />
      <div className="parallax-bg" id="parallaxBg">
        <div className="parallax-orb parallax-orb--1" data-speed="0.02"></div>
        <div className="parallax-orb parallax-orb--2" data-speed="0.03"></div>
        <div className="parallax-orb parallax-orb--3" data-speed="0.015"></div>
      </div>
      <div className="grid-bg"></div>

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* NAVBAR */}
      <Navbar onToggleTheme={toggleTheme} isLight={isLight} />

      <main>
        <Hero onShowToast={showToast} />
        <div className="section-divider"></div>
        <Marquee />
        <Work onOpenArchive={() => setArchiveOpen(true)} />
        <div className="section-divider"></div>
        <Services />
        <div className="section-divider"></div>
        <About onShowToast={showToast} />
        <div className="section-divider"></div>
        <Awards />
        <div className="section-divider"></div>
        <Trainings onShowToast={showToast} />
        <div className="section-divider"></div>
        <Footer
          onOpenContact={() => setContactOpen(true)}
          onShowToast={showToast}
        />
      </main>

      {/* ARCHIVE MODAL */}
      <ArchiveModal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        onToggleTheme={toggleTheme}
        isLight={isLight}
      />

      {/* CONTACT DRAWER */}
      <button
        className="fab-launcher"
        onClick={() => setContactOpen((prev) => !prev)}
        aria-label="Send a message"
      >
        <i className="fa-solid fa-comment-dots"></i>
      </button>

      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onShowToast={showToast}
      />

      {/* SCROLL TO TOP */}
      <button
        className={`scroll-top ${scrollTopVisible ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* TOAST NOTIFICATION */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </>
  );
}

export default App;