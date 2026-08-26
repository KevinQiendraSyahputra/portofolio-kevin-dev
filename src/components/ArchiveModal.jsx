import { useState, useEffect } from 'react';

const techProjects = [
  { title: 'Campus Attendance System', desc: 'RFID-based student monitoring system with automated photo capture, email notifications, and admin reporting.', stack: 'PYTHON / DJANGO', icons: ['fa-brands fa-python', 'fa-solid fa-database'] },
  { title: 'ResQ — Disaster Relief Manager', desc: 'QR-code based relief management system for registering beneficiaries and coordinating emergency response.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-brands fa-html5', 'fa-brands fa-js'] },
  { title: 'Fleet Ops Dashboard', desc: 'Terminal management system for monitoring driver attendance, routes, queues, and real-time operations.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-solid fa-database', 'fa-brands fa-js'] },
  { title: 'DocuFlow — Document Tracker', desc: 'Document tracking system for organizing, archiving, tagging, and approving official records.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-brands fa-html5', 'fa-brands fa-js'] },
  { title: 'StayEasy Rentals', desc: 'Boarding house rental platform for listings, bookings, payments, and reviews with role-based access.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-brands fa-css3-alt', 'fa-brands fa-js'] },
  { title: 'PayTrack Payroll System', desc: 'PHP-based payroll management system for compensation, deductions, and centralized record management.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-solid fa-database', 'fa-brands fa-js'] },
  { title: 'Barangay Resident Manager', desc: 'Web-based system for managing resident records, reservations, payments, and community reporting.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-brands fa-html5', 'fa-solid fa-database'] },
  { title: 'GymFlow Membership System', desc: 'Web-based gym management platform for memberships, attendance, payments, and class schedules.', stack: 'CODEIGNITER 4', icons: ['fa-brands fa-php', 'fa-brands fa-js', 'fa-brands fa-css3-alt'] }
];

const digitalProjects = [
  { title: 'Creative Design Collection', desc: 'A collection of original digital assets, templates, and visual elements created for marketing and branding.' },
  { title: 'Brand Asset Library', desc: 'Organized workspace of design resources and reference material for efficient content production.' },
  { title: 'Content Planning & Scheduling', desc: 'A visual content planning system to organize posts, schedules, and publishing activities.' },
  { title: 'Social Media Content Kit', desc: 'A collection of social templates, graphics, and caption frameworks for consistent brand content.' }
];

function ArchiveModal({ isOpen, onClose, onToggleTheme, isLight }) {
  const [activeTab, setActiveTab] = useState('technical');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`archive-overlay ${isOpen ? 'open' : ''}`}>
      <div className="archive-bar">
        <div className="container">
          <button className="archive-back" onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <div className="archive-tabs">
            <button
              className={activeTab === 'technical' ? 'active' : ''}
              onClick={() => setActiveTab('technical')}
            >
              Technical
            </button>
            <button
              className={activeTab === 'digital' ? 'active' : ''}
              onClick={() => setActiveTab('digital')}
            >
              Digital
            </button>
          </div>
          <button className="icon-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>

      <div className="archive-body">
        <div className="container">
          {activeTab === 'technical' && (
            <div className="archive-tab-panel active">
              <span className="section-tag">Archive</span>
              <h2 className="section-title">Technical</h2>
              <p className="section-sub" style={{ marginBottom: '2.4rem' }}>
                A complete collection of technical work, systems, and digital projects.
              </p>
              <div className="tech-list">
                {techProjects.map((p, i) => (
                  <div key={i} className="tech-row">
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                      <span className="stack-label">{p.stack}</span>
                      <div className="stack-icons">
                        {p.icons.map((ic, icIdx) => (
                          <span key={icIdx}><i className={ic}></i></span>
                        ))}
                      </div>
                    </div>
                    <a href="#view" className="ext-link" onClick={(e) => e.preventDefault()}>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'digital' && (
            <div className="archive-tab-panel active">
              <span className="section-tag">Digital Projects</span>
              <h2 className="section-title">Beyond <span className="accent">Code</span></h2>
              <p className="section-sub" style={{ marginBottom: '2.4rem' }}>
                Creative, visual, and content projects developed alongside my technical work.
              </p>
              <div className="digital-grid">
                {digitalProjects.map((p, i) => {
                  const hue = 20 + i * 45;
                  return (
                    <div key={i} className="digital-card">
                      <div className="mock-grid">
                        {Array.from({ length: 15 }).map((_, s) => (
                          <div
                            key={s}
                            style={{
                              background: `hsl(${hue + s * 7}, 60%, ${30 + ((s % 3) * 10)}%)`
                            }}
                          />
                        ))}
                      </div>
                      <div className="dc-body">
                        <span className="num">{String(i + 1).padStart(2, '0')}</span>
                        <h4>{p.title}</h4>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="archive-cta">
            <h3>Have a project in mind?<br />Let's build something useful.</h3>
            <a
              href="#contact"
              className="btn-primary btn-magnetic"
              onClick={onClose}
            >
              <span>Hire Me</span> <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchiveModal;
