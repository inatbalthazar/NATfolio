import React, { useState, useEffect, useRef } from 'react';

function Navbar({ onOpenInquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("inatbalthazar@gmail.com").then(() => {
      setCopied(true);
      const notification = document.getElementById('copied-notification');
      if (notification) {
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2000);
      }
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div id="nav-links">
        <a href="#" className="nav-link">Home</a>
        <a href="#story-section" className="nav-link">About</a>
        <a href="#portfolio-section" className="nav-link">Projects</a>
        <div className={`nav-contact-wrapper ${isOpen ? 'is-open' : ''}`} ref={dropdownRef}>
          <button 
            type="button"
            className={`nav-link contact-dropdown-btn ${isOpen ? 'active' : ''}`}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
          >
            Contact {isOpen ? '▴' : '▾'}
          </button>
          <div className={`social-dropdown ${isOpen ? 'is-open' : ''}`}>
            <div 
              className={`social-link email-link ${copied ? 'glitch' : ''}`} 
              data-email="inatbalthazar@gmail.com"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
            >
              <span>{copied ? 'COPIED!' : 'Email (Copy)'}</span>
            </div>
            <a href="https://github.com/inatbalthazar" target="_blank" rel="noreferrer" className="social-link" onClick={closeDropdown}>GitHub Profile</a>
            <a href="https://www.linkedin.com/in/inat/" target="_blank" rel="noreferrer" className="social-link" onClick={closeDropdown}>LinkedIn Profile</a>
            <a href="https://html-session-omega.vercel.app/cv.html" target="_blank" rel="noreferrer" className="social-link" onClick={closeDropdown}>Online CV</a>
            <a href="mailto:inatbalthazar@gmail.com" className="social-link" onClick={closeDropdown}>Send Email</a>
            <a href="tel:+66971493909" className="social-link" onClick={closeDropdown}>+66 97 149 3909</a>
          </div>
        </div>

        {/* Orange Notification Badge / Need a Website? Button */}
        <div 
          className="nav-noti-container"
          onClick={() => {
            if (onOpenInquiry) onOpenInquiry();
            window.dispatchEvent(new CustomEvent('open-website-inquiry'));
          }}
        >
          <div className="nav-noti-dot-wrapper" title="Need a Website?">
            <span className="nav-noti-dot"></span>
            <span className="nav-noti-ping"></span>
          </div>
          <button 
            type="button" 
            className="nav-noti-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenInquiry) onOpenInquiry();
              window.dispatchEvent(new CustomEvent('open-website-inquiry'));
            }}
          >
            Need a Website?
          </button>
        </div>
      </div>

      <div id="burger-menu">
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>

      <div id="mobile-menu">
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">Navigate</div>
          <a href="#" className="mobile-nav-link">Home</a>
          <a href="#story-section" className="mobile-nav-link">About</a>
          <a href="#portfolio-section" className="mobile-nav-link">Projects</a>
          <a href="#contact-section" className="mobile-nav-link">Contact</a>
        </div>
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">Connect</div>
          <a href="https://github.com/inatbalthazar" target="_blank" rel="noreferrer" className="mobile-social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/inat/" target="_blank" rel="noreferrer" className="mobile-social-link">LinkedIn</a>
          <a href="https://html-session-omega.vercel.app/cv.html" target="_blank" rel="noreferrer" className="mobile-social-link">Online CV</a>
        </div>
        <div className="mobile-email" data-email="inatbalthazar@gmail.com">inatbalthazar@gmail.com</div>
      </div>

      <nav className="scroll-nav">
        <span className="scroll-nav-item" data-target="text-1">—</span>
        <span className="scroll-nav-item" data-target="reel-scroll-section">—</span>
        <span className="scroll-nav-item" data-target="story-section">—</span>
        <span className="scroll-nav-item" data-target="story-panels-wrapper">—</span>
        <span className="scroll-nav-item" data-target="portfolio-section">—</span>
        <span className="scroll-nav-item" data-target="contact">—</span>
        <div className="scroll-progress-indicator"></div>
      </nav>

      <div className="scroll-arrows">
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
      </div>
    </>
  );
}

export default Navbar;
