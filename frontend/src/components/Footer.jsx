import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We provide a wide range of high-quality products to our customers,
             offering both retail and wholesale options. Please feel free to contact us.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@example.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-section">
        <h4>About Us</h4>
        <p>আমরা আমাদের গ্রাহকদের উচ্চ-মানের খুচরা এবং পাইকারি পণ্য সরবরাহ করি।
        </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}  <a href="www.bioscopehandycrafts com">www.bioscopehandycrafts com</a>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;