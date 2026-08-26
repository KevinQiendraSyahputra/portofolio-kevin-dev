import { useState, useEffect, useRef, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';

const works = [
  {
    title: 'Campus Attendance System',
    desc: 'RFID-based attendance tracking with automated photo capture and email notifications for staff and administrators.',
    icon: 'fa-id-badge',
    image: '/project1.png', // Ganti dengan path foto Anda di folder public/
    from: '#3a6df0',
    to: '#132059'
  },
  {
    title: 'Community Aid Tracker',
    desc: 'Disaster relief coordination platform for registering beneficiaries and monitoring distribution in real time.',
    icon: 'fa-hand-holding-heart',
    image: '', // Kosongkan atau beri path foto
    from: '#4dbb8f',
    to: '#0f4b39'
  },
  {
    title: 'Fleet Ops Dashboard',
    desc: 'Terminal management system for monitoring driver attendance, routes, queues, and payments.',
    icon: 'fa-truck-fast',
    image: '',
    from: '#f5a623',
    to: '#7a4d0d'
  },
  {
    title: 'DocuFlow',
    desc: 'Document tracking system for organizing, archiving, and approving official records with cloud sync.',
    icon: 'fa-file-shield',
    image: '',
    from: '#c85fd6',
    to: '#4c2166'
  },
  {
    title: 'StayEasy Rentals',
    desc: 'Boarding house rental platform for managing listings, bookings, payments, and tenant reviews.',
    icon: 'fa-house-chimney',
    image: '',
    from: '#5aa7e8',
    to: '#1c3c6e'
  },
  {
    title: 'PayTrack',
    desc: 'Employee payroll management system handling compensation, deductions, and centralized reporting.',
    icon: 'fa-money-check-dollar',
    image: '',
    from: '#e85b5b',
    to: '#6e1f1f'
  }
];

function Work({ onOpenArchive }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [activeWork, setActiveWork] = useState(0);
  const [spacing, setSpacing] = useState(240);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setSpacing(window.innerWidth < 640 ? 155 : 240);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextWork = useCallback(() => {
    setActiveWork((prev) => (prev + 1) % works.length);
  }, []);

  const prevWork = useCallback(() => {
    setActiveWork((prev) => (prev - 1 + works.length) % works.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextWork, 5000);
    return () => clearInterval(timer);
  }, [nextWork]);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].screenX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextWork();
      else prevWork();
    }
  };

  const current = works[activeWork];

  return (
    <section id="work" className="parallax-section" ref={ref}>
      <div className="container">
        <div className={`work-head reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <span className="section-tag">Selected Work</span>
            <h2 className="section-title">
              Work <span className="accent">Gallery</span>
            </h2>
            <p className="section-sub">
              A collection of systems, digital projects, and technical work I've built.
            </p>
          </div>
          <button className="btn-outline btn-magnetic" onClick={onOpenArchive}>
            <span>View More Projects</span> <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>

        <div className={`gallery-wrap reveal-scale ${isVisible ? 'visible' : ''}`}>
          <button className="gallery-arrow" onClick={prevWork} aria-label="Previous project">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div
            className="gallery-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gallery-track">
              {works.map((w, i) => {
                let diff = i - activeWork;
                const n = works.length;
                if (diff > n / 2) diff -= n;
                if (diff < -n / 2) diff += n;
                const abs = Math.abs(diff);

                const transform = `translateX(${diff * spacing}px) scale(${1 - abs * 0.13}) rotateY(${diff * -4}deg)`;
                const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.2 : 0;
                const zIndex = 10 - abs;
                const filter = abs === 0 ? 'none' : `blur(${abs * 1.5}px)`;
                const pointerEvents = abs <= 2 ? 'auto' : 'none';

                return (
                  <div
                    key={i}
                    className="gallery-item"
                    style={{ transform, opacity, zIndex, filter, pointerEvents }}
                    onClick={() => setActiveWork(i)}
                  >
                    <div className="gallery-thumb" style={{ '--from': w.from, '--to': w.to }}>
                      <div className="thumb-bar">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="thumb-body">
                        {w.image ? (
                          <img src={w.image} alt={w.title} className="thumb-img" />
                        ) : (
                          <i className={`fa-solid ${w.icon}`}></i>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="gallery-arrow" onClick={nextWork} aria-label="Next project">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="gallery-info">
          <h3>{current.title}</h3>
          <p>{current.desc}</p>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              onOpenArchive?.();
            }}
          >
            View Project Details →
          </a>
        </div>

        <div className="gallery-dots">
          {works.map((_, i) => (
            <button
              key={i}
              className={i === activeWork ? 'active' : ''}
              onClick={() => setActiveWork(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;