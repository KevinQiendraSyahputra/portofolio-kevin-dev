import { useReveal } from '../hooks/useReveal';

const techIcons = [
  { icon: 'fa-brands fa-html5', color: '#e34f26' },
  { icon: 'fa-brands fa-css3-alt', color: '#264de4' },
  { icon: 'fa-brands fa-js', color: '#f0db4f' },
  { icon: 'fa-brands fa-react', color: '#61dafb' },
  { icon: 'fa-brands fa-php', color: '#8993be' },
  { icon: 'fa-brands fa-python', color: '#4b8bbe' },
  { icon: 'fa-brands fa-git-alt', color: '#f1502f' },
  { icon: 'fa-brands fa-figma', color: '#a259ff' },
  { icon: 'fa-brands fa-google', color: '#4285f4' },
  { icon: 'fa-brands fa-node', color: '#83cd29' },
  { icon: 'fa-solid fa-database', color: '#4479a1' },
  { icon: 'fa-brands fa-bootstrap', color: '#7952b3' },
];

function Services() {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <section id="services" className="parallax-section" ref={ref}>
      <div className="container">
        <div className="services-grid">
          <div className={`reveal-left ${isVisible ? 'visible' : ''}`}>
            <span className="section-tag">My Capabilities</span>
            <h2 className="section-title">What I <span className="accent">Can Do</span></h2>
            <p className="section-sub">
              I combine technical, problem-solving, and digital skills to build reliable systems, test software, manage data, and support efficient workflows.
            </p>
            <div className={`tech-grid stagger-children ${isVisible ? 'visible' : ''}`}>
              {techIcons.map((t, i) => (
                <div key={i} className="tech-icon" style={{ color: t.color }}>
                  <i className={t.icon}></i>
                </div>
              ))}
            </div>
          </div>

          <div className={`cap-cards reveal-right stagger-children ${isVisible ? 'visible' : ''}`}>
            <div className="cap-card">
              <span className="num">01</span>
              <span className="kicker">IT, Web Development &amp; QA</span>
              <h4>Web Development &amp; QA</h4>
              <p>
                Building and testing functional digital systems, from database-driven web apps to automation scripts, with a focus on reliability and usability.
              </p>
              <div className="tag-row">
                <span className="tag-pill">Web Development</span>
                <span className="tag-pill">System Testing</span>
                <span className="tag-pill">Bug Tracking</span>
                <span className="tag-pill">Database Design</span>
                <span className="tag-pill">PHP</span>
                <span className="tag-pill">JavaScript</span>
                <span className="tag-pill">MySQL</span>
              </div>
            </div>

            <div className="cap-card">
              <span className="num">02</span>
              <span className="kicker">VA &amp; Digital Operations</span>
              <h4>Digital &amp; Virtual Ops</h4>
              <p>
                Supporting teams with organized data, documentation, research, and digital workflows, keeping day-to-day operations accurate and efficient.
              </p>
              <div className="tag-row">
                <span className="tag-pill">Data Entry</span>
                <span className="tag-pill">Data Validation</span>
                <span className="tag-pill">Document Mgmt</span>
                <span className="tag-pill">Online Research</span>
                <span className="tag-pill">Google Workspace</span>
                <span className="tag-pill">Content Ops</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;