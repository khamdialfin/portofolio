// components/sections/Contact.jsx
import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would connect to a backend here
    alert('Message sent! (This is a demo - no actual message was sent)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Mari kita bangun sesuatu yang luar biasa bersama-sama"
        />
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p>khalfinpml@gmail.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">💼</div>
              <div>
                <h4>GitHub</h4>
                <a 
                  href="https://github.com/khamdialfin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://github.com/khamdialfin
                </a>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">💬</div>
              <div>
                <h4>WhatsApp</h4>
                <p>+62 857 4329 4332</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <Button type="submit" variant="primary">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;