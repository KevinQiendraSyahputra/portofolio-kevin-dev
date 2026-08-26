import { useReveal } from '../hooks/useReveal';

const collageTiles = [
  { bg: 'linear-gradient(150deg,#3a6df0,#1c2f66)', icon: 'fa-solid fa-graduation-cap' },
  { bg: 'linear-gradient(150deg,#f5a623,#8a5a10)', icon: 'fa-solid fa-users' },
  { bg: 'linear-gradient(150deg,#4dbb8f,#155b45)', icon: 'fa-solid fa-trophy' },
  { bg: 'linear-gradient(150deg,#c85fd6,#5a2266)', icon: 'fa-solid fa-medal' },
  { bg: 'linear-gradient(150deg,#e85b5b,#6e1f1f)', icon: 'fa-solid fa-camera' },
  { bg: 'linear-gradient(150deg,#5aa7e8,#1f3d6e)', icon: 'fa-solid fa-flag-checkered' },
];

const awardsList = [
  { title: "Dean's Lister", sub: 'Academic Excellence', icon: 'fa-graduation-cap' },
  { title: 'Best Capstone Paper', sub: 'Research Recognition', icon: 'fa-trophy' },
  { title: 'Best Capstone System', sub: 'Technical Recognition', icon: 'fa-trophy' },
  { title: 'Hackathon Finalist', sub: 'Inter-School Competition', icon: 'fa-medal' },
];

function Awards() {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <section id="awards" className="parallax-section" ref={ref}>
      <div className="container">
        <span className={`section-tag reveal ${isVisible ? 'visible' : ''}`}>Recognition</span>
        <h2 className={`section-title reveal ${isVisible ? 'visible' : ''}`}>
          Awards &amp; <span className="accent">Achievements</span>
        </h2>
        <p className={`section-sub reveal ${isVisible ? 'visible' : ''}`} style={{ marginBottom: '3rem' }}>
          A collection of academic and professional recognitions that reflect dedication to excellence.
        </p>

        <div className="awards-grid">
          <div className={`collage stagger-children ${isVisible ? 'visible' : ''}`}>
            {collageTiles.map((tile, i) => (
              <div key={i} className="collage-tile" style={{ background: tile.bg }}>
                <i className={tile.icon}></i>
              </div>
            ))}
          </div>

          <div className={`awards-list reveal-right ${isVisible ? 'visible' : ''}`}>
            {awardsList.map((a, i) => (
              <div key={i} className="award-item">
                <div className="left">
                  <span className="ic"><i className={`fa-solid ${a.icon}`}></i></span>
                  <div>
                    <h4>{a.title}</h4>
                    <span>{a.sub}</span>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square ext"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;