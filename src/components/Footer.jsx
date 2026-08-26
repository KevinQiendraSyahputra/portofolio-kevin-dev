import { useReveal } from '../hooks/useReveal';

function Footer({ onOpenContact, onShowToast }) {
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  const handleDownloadResume = (e) => {
    e.preventDefault();
    onShowToast?.('📄 Add your resume file link here.');
  };

  return (
    <footer id="contact" className="footer-cta parallax-section" ref={ref}>
      <div className="container">
        <span className={`section-tag reveal ${isVisible ? 'visible' : ''}`}>Get In Touch</span>
        <div className="contact-grid" style={{ marginTop: '1.4rem' }}>
          <div className={`reveal-left ${isVisible ? 'visible' : ''}`}>
            <h2 className="contact-big">
              Let's Work<br /><span className="accent">Together</span>
            </h2>
            <p className="contact-lead">Looking for the next problem worth solving.</p>
            <p className="contact-sub">
              I'm open to opportunities where I can contribute to software testing, web development, and digital operations.
            </p>
            <a href="#resume" className="btn-dark btn-magnetic" onClick={handleDownloadResume}>
              <span>Download Resume</span> <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div className={`reveal-right ${isVisible ? 'visible' : ''}`}>
            <div className="contact-cards">
              <div className="contact-card">
                <span className="num">01</span>
                <div className="left">
                  <span className="ic"><i className="fa-solid fa-envelope"></i></span>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">kevin123qiendra@gmail.com</div>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <span className="num">02</span>
                <div className="left">
                  <span className="ic"><i className="fa-brands fa-github"></i></span>
                  <div>
                    <div className="label">GitHub</div>
                    <div className="value">github.com/alexrivera-dev</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square ext"></i>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <span className="num">03</span>
                <div className="left">
                  <span className="ic"><i className="fa-brands fa-linkedin-in"></i></span>
                  <div>
                    <div className="label">LinkedIn</div>
                    <div className="value">linkedin.com/in/alexrivera-dev</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square ext"></i>
              </a>

              <button className="send-msg-btn" onClick={onOpenContact}>
                Send Me a Message →
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copy">
            &copy; {new Date().getFullYear()} Alex Rivera. All rights reserved.
          </span>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;