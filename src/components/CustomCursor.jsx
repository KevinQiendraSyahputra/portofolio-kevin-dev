import { useEffect, useRef } from 'react';

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ mouseX: 0, mouseY: 0, ringX: 0, ringY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current.mouseX = e.clientX;
      posRef.current.mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }

      // Parallax effect on orbs
      const orbs = document.querySelectorAll('.parallax-orb');
      orbs.forEach((orb) => {
        const speed = parseFloat(orb.getAttribute('data-speed')) || 0.02;
        const ox = (e.clientX - window.innerWidth / 2) * speed;
        const oy = (e.clientY - window.innerHeight / 2) * speed;
        orb.style.transform = `translate(${ox}px, ${oy}px)`;
      });
    };

    let animationId;
    const animate = () => {
      const pos = posRef.current;
      pos.ringX += (pos.mouseX - pos.ringX) * 0.12;
      pos.ringY += (pos.mouseY - pos.ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.ringX - 20}px`;
        ringRef.current.style.top = `${pos.ringY - 20}px`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const hoverTargets = 'a, button, .gallery-item, .tech-icon, .cap-card, .contact-card, .award-item, .collage-tile, .training-media, input, textarea';

    const handleMouseOver = (e) => {
      if (e.target.closest(hoverTargets) && ringRef.current) {
        ringRef.current.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(hoverTargets) && ringRef.current) {
        ringRef.current.classList.remove('hover');
      }
    };

    const handleMouseDown = () => ringRef.current?.classList.add('click');
    const handleMouseUp = () => ringRef.current?.classList.remove('click');

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

export default CustomCursor;
