import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

function WebsiteInquiryDrawer({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [selectedScope, setSelectedScope] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scopeOptions = ['WEB DESIGN', 'DEVELOPMENT', 'BRANDING', 'PRODUCT DESIGN'];
  const budgetOptions = ['< $8K', '$8K - $15K', '$15K - $25K', '$25K - $50K', '$50K+'];

  useEffect(() => {
    const overlay = document.querySelector('.drawer-overlay');
    const content = document.querySelector('.drawer-content');
    const wrapper = document.querySelector('.drawer-overlay-wrapper');

    if (!overlay || !content || !wrapper) return;

    if (isOpen) {
      gsap.killTweensOf([overlay, content]);
      wrapper.style.display = 'block';
      wrapper.style.pointerEvents = 'auto';

      gsap.fromTo(overlay, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      gsap.fromTo(content, 
        { x: '100%' }, 
        { x: '0%', duration: 0.7, ease: 'power3.out' }
      );
    } else {
      gsap.killTweensOf([overlay, content]);
      gsap.to(content, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          if (wrapper) {
            wrapper.style.display = 'none';
            wrapper.style.pointerEvents = 'none';
          }
        }
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  const toggleScope = (option) => {
    setSelectedScope(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setProjectDetails('');
      setSelectedScope([]);
      setSelectedBudget('');
      onClose();
    }, 2500);
  };

  return (
    <div className="drawer-overlay-wrapper" style={{ display: 'none', position: 'relative', zIndex: 999999 }}>
      <style>{`
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          z-index: 999999;
          opacity: 0;
        }

        .drawer-content {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 540px;
          max-width: 90vw;
          background: #ffffff;
          color: #111111;
          z-index: 1000000;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          padding: 36px 32px;
          overflow-y: auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          transform: translateX(100%);
          will-change: transform;
        }

        .drawer-close-btn {
          position: absolute;
          top: 28px;
          right: 28px;
          background: transparent;
          border: none;
          font-size: 24px;
          color: #666;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 4px;
          line-height: 1;
        }

        .drawer-close-btn:hover {
          color: #111;
        }

        .drawer-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin-bottom: 28px;
          padding-right: 32px;
        }

        .drawer-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
          display: block;
        }

        .drawer-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .drawer-input:focus {
          border-color: #10b981;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .drawer-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .drawer-pill {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          letter-spacing: 0.02em;
        }

        .drawer-pill:hover {
          border-color: #10b981;
          color: #10b981;
        }

        .drawer-pill.active {
          background: #059669;
          border-color: #059669;
          color: #ffffff;
        }

        .drawer-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffffbb;
          border: none;
          border-radius: 8px;
          padding: 16px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
          margin-top: 12px;
        }

        .drawer-submit-btn:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color:rgba(5, 54, 13, 1);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
        }

        .drawer-footer-note {
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
          margin-top: 20px;
          line-height: 1.4;
        }

        .drawer-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 480px) {
          .drawer-grid-2 {
            grid-template-columns: 1fr;
          }
          .drawer-content {
            padding: 24px 20px;
          }
        }
      `}</style>

      <div className="drawer-overlay" onClick={onClose} />

      <div className="drawer-content">
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 className="drawer-title">
          Build a web presence that grows your business
        </h2>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#16a34a' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Thank You!</h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Your inquiry has been received. Watcharine will get back to you within 24 hours!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="drawer-grid-2">
              <div>
                <label className="drawer-label">Name</label>
                <input 
                  type="text" 
                  className="drawer-input" 
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="drawer-label">Email</label>
                <input 
                  type="email" 
                  className="drawer-input" 
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="drawer-label">Tell me about your project</label>
              <textarea 
                className="drawer-input" 
                rows={4} 
                placeholder="Tell me about your project..."
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label className="drawer-label">Scope of work</label>
              <div className="drawer-pill-group">
                {scopeOptions.map(option => (
                  <div 
                    key={option}
                    className={`drawer-pill ${selectedScope.includes(option) ? 'active' : ''}`}
                    onClick={() => toggleScope(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="drawer-label">Budget</label>
              <div className="drawer-pill-group">
                {budgetOptions.map(option => (
                  <div 
                    key={option}
                    className={`drawer-pill ${selectedBudget === option ? 'active' : ''}`}
                    onClick={() => setSelectedBudget(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="drawer-submit-btn">
              SEND MESSAGE
            </button>

            <div className="drawer-footer-note">
              By clicking the "Send message", you agree to our Privacy Policy
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default WebsiteInquiryDrawer;
