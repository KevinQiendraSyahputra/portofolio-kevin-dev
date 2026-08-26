function Marquee() {
  const items = [
    'Web Development',
    'System Testing',
    'UI/UX Design',
    'Database Design',
    'Digital Operations',
    'Full Stack'
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((text, idx) => (
          <span key={idx}>
            {text} <i className="fa-solid fa-circle" style={{ fontSize: '0.3em' }}></i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
