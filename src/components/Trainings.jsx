import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

const trainingsData = [
  {
    title: 'Virtual Assistance & AI Workflows',
    date: 'Apr – May 2026',
    dept: 'Dept. of Information & Communications Technology',
    desc: 'Completed a 20-day intensive virtual assistance training covering VA fundamentals, client communication, productivity, and AI-powered workflows for content creation and outreach.',
    cert: 'Certificate of Completion',
    icon: 'fa-video',
    from: '#e0844a',
    to: '#7a3a12',
    reverse: false
  },
  {
    title: 'Tech Talks: Team Collaboration',
    date: 'Mar 2026',
    dept: 'Dept. of Information & Communications Technology',
    desc: 'Participated in a team-based digital solution development activity focused on building a working prototype under time constraints and presenting it to a panel.',
    cert: 'Certificate of Participation',
    icon: 'fa-people-group',
    from: '#4a90e0',
    to: '#12307a',
    reverse: true
  },
  {
    title: 'HackForGood: Civic Tech Challenge',
    date: 'Nov 2025',
    dept: 'Dept. of Information & Communications Technology',
    desc: 'Took part in a 9-hour Capture-the-Flag style challenge, identifying vulnerabilities and practicing logical, time-constrained problem-solving.',
    cert: 'Certificate of Participation',
    icon: 'fa-shield-halved',
    from: '#4ac37e',
    to: '#0f5c37',
    reverse: false
  },
  {
    title: 'Innovate & Pitch Bootcamp',
    date: 'Sep 2025',
    dept: 'Dept. of Information & Communications Technology',
    desc: 'Contributed to designing and pitching a digital platform concept, gaining experience in collaborative problem-solving and product presentation.',
    cert: 'Most Promising Prototype',
    icon: 'fa-lightbulb',
    from: '#c85fd6',
    to: '#4c2166',
    reverse: true
  }
];

function Trainings({ onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    if (isVisible && !typedTitle) {
      const fullText = 'Trainings & Hackathons';
      let i = 0;
      const interval = setInterval(() => {
        setTypedTitle(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 55);
      return () => clearInterval(interval);
    }
  }, [isVisible, typedTitle]);

  const handleCertClick = (e, cert) => {
    e.preventDefault();
    onShowToast?.(`📜 Viewing: ${cert}`);
  };

  return (
    <section id="trainings" className="parallax-section" ref={ref}>
      <div className="container">
        <span className={`section-tag reveal ${isVisible ? 'visible' : ''}`}>Growth &amp; Experience</span>
        <h2 className={`section-title reveal ${isVisible ? 'visible' : ''}`} style={{ minHeight: '1.2em' }}>
          {typedTitle || 'Trainings & Hackathons'}
          <span className="type-cursor"></span>
        </h2>
        <p className={`section-sub reveal ${isVisible ? 'visible' : ''}`} style={{ marginBottom: '3.6rem' }}>
          A collection of trainings, workshops, and hackathons that shaped my technical and collaborative skills.
        </p>

        <div className="trainings-list">
          {trainingsData.map((item, i) => (
            <div key={i} className={`training-row ${item.reverse ? 'reverse' : ''} reveal ${isVisible ? 'visible' : ''}`}>
              <div className="training-media" style={{ '--from': item.from, '--to': item.to }}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div className="training-info">
                <div className="training-top">
                  <h4>{item.title}</h4>
                  <span className="date">{item.date}</span>
                </div>
                <div className="dept">{item.dept}</div>
                <p>{item.desc}</p>
                <a href="#cert" className="cert" onClick={(e) => handleCertClick(e, item.cert)}>
                  {item.cert} <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trainings;