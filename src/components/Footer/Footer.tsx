import React from "react";
import "./Footer.css";

interface FooterProps {
  language: 'en' | 'ar';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    en: {
      copyright: '© 2025 PixelProof'
    },
    ar: {
      copyright: '© 2025 PixelProof جميع الحقوق محفوظة'
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Copyright */}
        <div className="footer-left">
          <a href="/" className="footer-logo">
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="footer-text">{translations[language].copyright}</span>
        </div>

        {/* Right Section - Social Media Links */}
        <ul className="footer-nav">
          <li className="nav-item">
            <a href="#" className="footer-icon">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="footer-icon">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="footer-icon">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
