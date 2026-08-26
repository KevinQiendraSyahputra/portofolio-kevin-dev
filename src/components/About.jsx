import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const phrases = [
  'Problem Solver. Digital Generalist.',
  'Detail-Oriented. Always Curious.',
  'Builder Of Practical Tools.'
];

const traitData = [
  { name: 'Problem Solver', label: 'TRAIT', icon: 'fa-lightbulb' },
  { name: 'Organized', label: 'TRAIT', icon: 'fa-folder-tree' },
  { name: 'Curious', label: 'TRAIT', icon: 'fa-compass' },
  { name: 'Adaptable', label: 'TRAIT', icon: 'fa-arrows-rotate' }
];

const traitPositions = [
  { x: 0, y: 0, rotate: -6, z: 4 },
  { x: 16, y: 12, rotate: 5, z: 3 },
  { x: 32, y: 24, rotate: -11, z: 2 },
  { x: 48, y: 36, rotate: 9, z: 1 }
];

function About({ onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });
  const [typewriterText, setTypewriterText] = useState('');
  const [traitOrder, setTraitOrder] = useState([0, 1, 2, 3]);
  const [flingingIndex, setFlingingIndex] = useState(null);
  const [flingDirection, setFlingDirection] = useState('right');
  const timerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let pIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const current = phrases[pIndex];
      if (!isDeleting) {
        charIndex++;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
      } else {
        charIndex--;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          charIndex = 0;
        }
      }
      timeoutId = setTimeout(tick, isDeleting ? 25 : 45);
    };

    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  // Fling card handler (efek terpental)
  const flingTopCard = () => {
    if (flingingIndex !== null) return; // Prevent spamming during active animation

    const topCardIdx = traitOrder[0];
    // Alternate trajectory (right/left)
    const nextDir = Math.random() > 0.5 ? 'right' : 'left';
    setFlingDirection(nextDir);
    setFlingingIndex(topCardIdx);

    // After fling completes, move card to bottom of the stack
    setTimeout(() => {
      setTraitOrder((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
      setFlingingIndex(null);
    }, 380);

    // Reset auto-rotate timer
    resetAutoRotate();
  };

  // Auto-rotate timer
  const resetAutoRotate = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTraitOrder((prev) => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
    }, 3500);
  };

  useEffect(() => {
    resetAutoRotate();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleDownloadResume = (e) => {
    e.preventDefault();
    onShowToast?.('📄 Add your resume file link here.');
  };

  return (
    <section id="about" className="parallax-section" ref={ref}>
      <div className="container">
        <span className={`section-tag reveal ${isVisible ? 'visible' : ''}`}>About Me</span>
        <h2 className={`section-title reveal ${isVisible ? 'visible' : ''}`} style={{ minHeight: '1.2em' }}>
          {typewriterText}
          <span className="type-cursor"></span>
        </h2>

        <div className="about-grid" style={{ marginTop: '2.8rem' }}>
          <div className={`about-photo reveal-left ${isVisible ? 'visible' : ''}`}>AR</div>

          <div className={`reveal ${isVisible ? 'visible' : ''}`}>
            <div className="about-name">
              Alex Rivera <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h4>20+</h4>
                <span>Projects</span>
              </div>
              <div className="stat">
                <h4>9</h4>
                <span>Certificates</span>
              </div>
              <div className="stat">
                <h4>2026</h4>
                <span>BSIT Graduate</span>
              </div>
            </div>
            <div className="about-bio">
              <p>
                I'm a BSIT graduate focused on software testing, web development, and digital systems. I enjoy turning ideas and real-world problems into practical digital solutions, particularly through web applications, databases, and system testing.
              </p>
              <p>
                Throughout my studies, I gained hands-on experience building database-driven systems and working with automation-based solutions. I've also completed training in virtual assistance and AI-powered workflows, giving me experience across both technical and digital operations.
              </p>
              <p>
                Want to know more about my experience?{' '}
                <a href="#resume" onClick={handleDownloadResume}>Download my resume</a>.
              </p>
            </div>
            <div className="currently">
              <div className="item">
                <span className="ic"><i className="fa-solid fa-hammer"></i></span>
                <div>
                  <strong>Building</strong>
                  <span>Web &amp; digital projects</span>
                </div>
              </div>
              <div className="item">
                <span className="ic"><i className="fa-solid fa-flask"></i></span>
                <div>
                  <strong>Exploring</strong>
                  <span>Software testing &amp; QA</span>
                </div>
              </div>
              <div className="item">
                <span className="ic"><i className="fa-solid fa-book"></i></span>
                <div>
                  <strong>Learning</strong>
                  <span>Full-stack development</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`trait-wrapper reveal-right ${isVisible ? 'visible' : ''}`}>
            <div
              className="trait-stack"
              onClick={flingTopCard}
              title="Klik untuk melempar kartu"
            >
              {traitOrder.map((dataIdx, posIdx) => {
                const item = traitData[dataIdx];
                const pos = traitPositions[posIdx];
                const isFlinging = flingingIndex === dataIdx;

                return (
                  <div
                    key={dataIdx}
                    className={`trait-card ${isFlinging ? `flinging flinging-${flingDirection}` : ''} ${posIdx === 0 ? 'top-card' : ''}`}
                    style={
                      !isFlinging
                        ? {
                            transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg)`,
                            zIndex: pos.z,
                            opacity: posIdx < 3 ? 1 : 0
                          }
                        : {}
                    }
                  >
                    <div className="trait-card-top">
                      <span className="tlabel">{item.label}</span>
                      <span className="trait-dot"></span>
                    </div>
                    <div className="trait-card-bottom">
                      <i className={`fa-solid ${item.icon} trait-icon`}></i>
                      <span className="tname">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;