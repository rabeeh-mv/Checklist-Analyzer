import React, { useState } from 'react';

import './Contact.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can integrate API calls to send the form data
    setFormStatus('Message Sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <Navbar/>
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We'd love to hear from you! Please fill out the form below.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
          />
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      {formStatus && <p className="form-status">{formStatus}</p>}
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;
