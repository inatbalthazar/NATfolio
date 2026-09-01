import React, { useState } from 'react';
import VintageMap from './VintageMap';

function ContactSection() {
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(key);
      setTimeout(() => {
        setCopiedText(null);
      }, 2000);
    });
  };

  return (
    <section id="contact-section">
      <div className="contact-header">
        <h2 className="contact-title">Contact Me</h2>
        <div className="contact-methods">
          <div 
            className={`contact-item ${copiedText === 'email' ? 'copied' : ''}`}
            id="copy-email" 
            onClick={() => copyToClipboard("inatbalthazar@gmail.com", "email")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span>{copiedText === 'email' ? 'Copied!' : 'inatbalthazar@gmail.com'}</span>
          </div>
          <a 
            className="contact-item" 
            href="https://www.linkedin.com/in/inat/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            <span>linkedin.com/in/inat</span>
          </a>
          <a 
            className="contact-item" 
            href="https://html-session-omega.vercel.app/cv.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            <span>View Online CV</span>
          </a>
          <div 
            className={`contact-item ${copiedText === 'phone' ? 'copied' : ''}`}
            id="copy-phone" 
            onClick={() => copyToClipboard("+66971493909", "phone")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            <span>{copiedText === 'phone' ? 'Copied!' : '+66 97149 3909'}</span>
          </div>
        </div>
      </div>
      <div className="map-container">
        <VintageMap />
      </div>
      <div className="contact-footer">
        <h3 className="contact-footer-title">Thanks for visiting my portfolio</h3>
        <div className="social-links">
          <div className="social-text-links">
            <a href="mailto:inatbalthazar@gmail.com" className="social-link" title="Email">EMAIL</a>
            <a href="https://github.com/inatbalthazar" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">GITHUB</a>
            <a href="https://www.linkedin.com/in/inat/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">LINKEDIN</a>
            <a href="https://html-session-omega.vercel.app/cv.html" target="_blank" rel="noopener noreferrer" className="social-link" title="Online CV">CV</a>
          </div>

          <div className="social-badges-row">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="YouTube">
              <img src="/images/oldnet-social/ytbutton.gif" alt="YouTube" className="social-badge-img" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Discord">
              <img src="/images/oldnet-social/discord2.gif" alt="Discord" className="social-badge-img" />
            </a>
            <a href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Steam">
              <img src="/images/oldnet-social/steam.gif" alt="Steam" className="social-badge-img" />
            </a>
            <a href="https://theoldnet.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="The Old Net">
              <img src="/images/oldnet-social/oldnet.gif" alt="The Old Net" className="social-badge-img" />
            </a>
            <a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Learn HTML">
              <img src="/images/oldnet-social/learn_html.gif" alt="Learn HTML" className="social-badge-img" />
            </a>
            <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Internet Explorer">
              <img src="/images/oldnet-social/ie2.gif" alt="Internet Explorer" className="social-badge-img" />
            </a>
            <a href="https://html-session-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Windows Media Player 7">
              <img src="/images/oldnet-social/getwmp7.gif" alt="Get WMP 7" className="social-badge-img" />
            </a>
            <a href="https://github.com/inatbalthazar" target="_blank" rel="noopener noreferrer" className="social-badge-link" title="Web Passion">
              <img src="/images/oldnet-social/webpassion.gif" alt="Web Passion" className="social-badge-img" />
            </a>
          </div>
        </div>
        <p className="copyright">© 2026 Watcharine Duangsri. All rights reserved. • Rayong / Bangkok, Thailand</p>
        <p className="lucasarts-note">Full-Stack Software Developer (JSD13 Alum) • Driven by clean code, human-centered UI/UX, and engineering discipline.</p>
      </div>
    </section>
  );
}

export default ContactSection;
