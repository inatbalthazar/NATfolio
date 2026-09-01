import React, { useEffect } from 'react';

function PortfolioSection() {
  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const gsap = window.gsap;

        ctx = gsap.context(() => {
          const heroSection = document.querySelector('#portfolio-section .story-hero');
          const heroWords = document.querySelectorAll('#portfolio-section .story-hero-word');
          const heroImage = document.querySelector('#portfolio-section .story-hero-image');

          if (heroSection && heroWords.length > 0) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heroSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            });

            tl.to(heroWords, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out"
            });

            if (heroImage) {
              tl.to(heroImage, {
                width: window.innerWidth <= 768 ? '200px' : '280px',
                opacity: 1,
                duration: 1.1,
                ease: "power2.out"
              }, 0.3);
            }
          }
        });
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="portfolio-story" id="portfolio-section">
      {/* Hero Header */}
      <div className="story-hero">
        <div className="story-hero-inner">
          <div className="story-hero-typography">
            <span className="story-hero-word">Web</span>
            <span className="story-hero-word">Projects</span>
            <div
              className="story-hero-image"
              onClick={() => window.open('https://github.com/inatbalthazar', '_blank')}
              data-title="GitHub Repositories"
              data-subtitle="Watcharine Duangsri • Generation Thailand"
              data-description="Full-stack web applications, React.js projects, Node.js APIs, and responsive frontend applications."
              data-width="280"
            >
              <img src="images/mern.png" alt="MERN Stack Full-Stack Developer" />
              <div className="story-play-icon"></div>
            </div>
            <div className="story-hero-break"></div>
            <span className="story-hero-word">Built</span>
            <span className="story-hero-word">with</span>
            <span className="story-hero-word">Precision.</span>
          </div>
        </div>
      </div>

      {/* Panel 1: Full-Stack Development */}
      <div className="story-panel">
        <div className="story-panel-content">
          <div className="story-panel-label">Full-Stack Development</div>
          <h2 className="story-panel-title">
            <span className="word">Code</span>
            <div
              className="title-video"
              onClick={() => window.open('https://w09-react-assessment.vercel.app', '_blank')}
              data-title="W09 React Web Assessment"
              data-subtitle="React.js • Vercel Live Deployment"
              data-description="Modern single-page React web application built with component-driven architecture, state management, and deployed live on Vercel."
              data-width="140"
            >
              <img src="images/newshour1.jpg" alt="React App" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">that</span>
            <span className="word">scales.</span>
          </h2>
          <p className="story-panel-description">
            Junior Software Developer (JSD13) graduate from Generation Thailand. Building full-stack web applications utilizing React.js, Node.js, Express, MongoDB, PostgreSQL, and RESTful APIs with clean component-driven architecture and industrial-grade quality discipline.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-journalism">
            View Full-Stack Projects <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            onClick={() => window.open('https://chromeburger.onrender.com/index.html', '_blank')}
            data-title="ChromaBurger Management System"
            data-subtitle="Full-Stack • Node.js / Express / MongoDB / PostgreSQL"
            data-description="Full-stack food truck management system utilizing Node.js, Express, MongoDB, and PostgreSQL for database queries, API routes, and operational management."
          >
            <img src="images/placeholder-img.jpg" alt="ChromaBurger System" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      {/* Panel 1 Accordion Grid */}
      <div className="panel-portfolio-accordion" id="accordion-journalism">
        <div className="panel-portfolio-grid">
          <div
            className="portfolio-item"
            onClick={() => window.open('https://w09-react-assessment.vercel.app', '_blank')}
            data-category="journalism"
            data-title="W09 React SPA Assessment"
            data-subtitle="React.js / Vercel"
            data-description="Single-page React application showcasing state management, modular components, and live Vercel deployment."
            data-poster="images/minesy.jpg"
          >
            <img className="portfolio-item-poster" src="images/minesy.jpg" alt="React Assessment" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">W09 React SPA</div>
              <div className="portfolio-item-subtitle">React.js / Vercel Live</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            onClick={() => window.open('https://chromeburger.onrender.com/index.html', '_blank')}
            data-category="journalism"
            data-title="ChromaBurger Management System"
            data-subtitle="Node.js / Express / MongoDB"
            data-description="Operational management platform featuring RESTful API routes, MongoDB schemas, and CRUD database integration."
            data-poster="images/guard.jpg"
          >
            <img className="portfolio-item-poster" src="images/guard.jpg" alt="ChromaBurger System" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">ChromaBurger Platform</div>
              <div className="portfolio-item-subtitle">Node.js / Express / MongoDB</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            onClick={() => window.open('https://github.com/inatbalthazar', '_blank')}
            data-category="journalism"
            data-title="RESTful API & Backend Security"
            data-subtitle="Node.js / Express / RBAC"
            data-description="Backend architecture featuring Role-Based Access Controls (RBAC), JWT authentication, and SQL/MongoDB data modeling."
            data-poster="images/goodfire.jpg"
          >
            <img className="portfolio-item-poster" src="images/goodfire.jpg" alt="Backend API" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">REST APIs &amp; Security</div>
              <div className="portfolio-item-subtitle">Node.js / Express / RBAC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Frontend Engineering */}
      <div className="story-panel story-panel-reversed">
        <div className="story-panel-content">
          <div className="story-panel-label">Frontend Engineering</div>
          <h2 className="story-panel-title">
            <div
              className="title-video"
              onClick={() => window.open('https://html-css-assessment-red.vercel.app', '_blank')}
              data-title="Colmar Academy Landing Page"
              data-subtitle="HTML5 / CSS3 • Vercel Deployment"
              data-description="Clean, fully responsive educational landing page assessment designed with semantic HTML5 and modern flexbox layout."
              data-width="130"
            >
              <img src="images/milk.jpg" alt="Colmar Academy" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">Responsive</span>
            <span className="word">User</span>
            <span className="word">Interfaces</span>
          </h2>
          <p className="story-panel-description">
            Crafting intuitive, mobile-first web user interfaces using HTML5, CSS3, JavaScript ES6+, Flexbox, and CSS Grid. Focused on accessibility (WCAG AA), clean UI design, and seamless user experience across desktop and mobile devices.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-nonprofit">
            View Frontend Projects <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            onClick={() => window.open('https://1st-meet-git.vercel.app', '_blank')}
            data-title="JS Restaurant & Git Basics"
            data-subtitle="JavaScript / Vercel"
            data-description="Interactive JavaScript DOM manipulation exercises and Git version control fundamentals."
          >
            <img src="images/placeholder-img.jpg" alt="JS Restaurant" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      {/* Panel 2 Accordion Grid */}
      <div className="panel-portfolio-accordion" id="accordion-nonprofit">
        <div className="panel-portfolio-grid">
          <div
            className="portfolio-item"
            onClick={() => window.open('https://html-css-assessment-red.vercel.app', '_blank')}
            data-category="nonprofit"
            data-title="Colmar Academy Responsive Website"
            data-subtitle="HTML5 / CSS3 • Vercel"
            data-description="Fully responsive educational landing page assessment designed with semantic HTML5 and modern flexbox layout."
            data-poster="images/restore.jpg"
          >
            <img className="portfolio-item-poster" src="images/restore.jpg" alt="Colmar Academy" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">Colmar Academy Website</div>
              <div className="portfolio-item-subtitle">HTML5 / CSS3 / Vercel</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            onClick={() => window.open('https://1st-meet-git.vercel.app', '_blank')}
            data-category="nonprofit"
            data-title="JS Restaurant & Git Basics"
            data-subtitle="JavaScript ES6+ • Vercel"
            data-description="Interactive JavaScript DOM manipulation exercises and Git version control fundamentals."
            data-poster="images/next.jpg"
          >
            <img className="portfolio-item-poster" src="images/next.jpg" alt="JS Restaurant" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">JS Restaurant &amp; Git</div>
              <div className="portfolio-item-subtitle">JavaScript ES6+ / Vercel</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            onClick={() => window.open('https://html-session-omega.vercel.app/', '_blank')}
            data-category="nonprofit"
            data-title="HTML Session & Web Foundations"
            data-subtitle="HTML5 / CSS3 / Vercel"
            data-description="Web development journey: Starting with core HTML/CSS foundations and progressive web apps."
            data-poster="images/sam.jpg"
          >
            <img className="portfolio-item-poster" src="images/sam.jpg" alt="HTML Session" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">HTML Session &amp; Foundations</div>
              <div className="portfolio-item-subtitle">HTML5 / CSS3 / Vercel</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            onClick={() => window.open('https://inatbalthazar.github.io/SABER-OF-LIGHT/', '_blank')}
            data-category="nonprofit"
            data-title="Saber of Light Visual Effect"
            data-subtitle="CSS Animations / GitHub Pages"
            data-description="Creative CSS keyframe animations, glowing visual effects, and GitHub Pages deployment."
            data-poster="images/russian.jpg"
          >
            <img className="portfolio-item-poster" src="images/russian.jpg" alt="Saber of Light" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">Saber of Light</div>
              <div className="portfolio-item-subtitle">CSS Animations / GitHub Pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3: Engineering & Diagnostic Systems */}
      <div className="story-panel">
        <div className="story-panel-content">
          <div className="story-panel-label">Systems &amp; Engineering</div>
          <h2 className="story-panel-title">
            <span className="word">High</span>
            <div
              className="title-video"
              data-title="BYD Auto & Ford Quality Diagnostics"
              data-subtitle="Industrial Assembly & Diagnostics"
              data-description="Diagnostic quality control checks, EV suspension alignment, and heavy machinery maintenance adhering to ISO 9001 quality standards."
              data-width="150"
            >
              <img src="images/folio3.jpeg" alt="Engineering Systems" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">Precision</span>
            <span className="word">Execution.</span>
          </h2>
          <p className="story-panel-description">
            Combining automotive technology diagnostics, heavy assembly line maintenance, EV suspension tuning, and certified Thai Culinary precision to deliver system reliability, structural discipline, and quality execution.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-commercial">
            View Technical Experience <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            data-title="EV Suspension & Steering Calibration"
            data-subtitle="BYD Auto Thailand"
            data-description="High-precision EV chassis geometry calibration, zero-downtime assembly operations, and root-cause fault diagnostics."
          >
            <img src="images/placeholder-img.jpg" alt="EV Assembly" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      {/* Panel 3 Accordion Grid */}
      <div className="panel-portfolio-accordion" id="accordion-commercial">
        <div className="panel-portfolio-grid">
          <div
            className="portfolio-item"
            data-category="commercial"
            data-title="BYD Auto Thailand - EV Line Maintenance"
            data-subtitle="Production Technician"
            data-description="Preventative maintenance on automated assembly machinery, electronic torque systems, and zero-downtime operations."
            data-poster="images/r10.jpg"
          >
            <img className="portfolio-item-poster" src="images/r10.jpg" alt="BYD Line Maintenance" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">BYD Auto Thailand</div>
              <div className="portfolio-item-subtitle">EV Production Maintenance</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            data-category="commercial"
            data-title="Ford Motor Company - Chassis Quality Control"
            data-subtitle="Chassis Assembly Technician"
            data-description="ISO 9001 compliance, end-of-line vehicle quality diagnostics, engine ECU troubleshooting, and chassis calibration."
            data-poster="images/hipcamp.jpg"
          >
            <img className="portfolio-item-poster" src="images/hipcamp.jpg" alt="Ford Chassis QC" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">Ford Motor Company</div>
              <div className="portfolio-item-subtitle">Chassis Quality Control</div>
            </div>
          </div>

          <div
            className="portfolio-item"
            data-category="commercial"
            data-title="Certified Thai Culinary Chef Level 1"
            data-subtitle="National Skill Standard"
            data-description="National Skill Standard Assessment Level 1 certification in Thai Culinary Arts, food safety, and kitchen workflow precision."
            data-poster="images/halo.jpg"
          >
            <img className="portfolio-item-poster" src="images/halo.jpg" alt="Thai Culinary Certification" />
            <div className="portfolio-item-play"></div>
            <div className="portfolio-item-overlay">
              <div className="portfolio-item-title">National Skill Standard</div>
              <div className="portfolio-item-subtitle">Certified Thai Chef Level 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;