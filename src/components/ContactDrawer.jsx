import { useState } from 'react';

function ContactDrawer({ isOpen, onClose, onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast("Thanks! I'll get back to you soon. ✨");
    setFormData({ name: '', email: '', message: '' });
    setTimeout(onClose, 800);
  };

  return (
    <div className={`contact-panel ${isOpen ? 'open' : ''}`} id="contactPanel">
      <div className="contact-panel-head">
        <div>
          <strong>Send Me a Message</strong>
          <span>Usually reply within a day</span>
        </div>
        <button onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          rows="3"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit">
          Send Message <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default ContactDrawer;
