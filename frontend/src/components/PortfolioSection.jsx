import React, { useState } from 'react';
import LiveDemoModal from './LiveDemoModal';

const GITHUB = 'https://github.com/inatbalthazar';

const FULLSTACK_PROJECTS = [
  {
    title: 'Choicer Voicer Studio',
    subtitle: 'Node.js / Express / Vite • Multiplayer',
    description: 'Online voice-acting party game. Players create or join a room, take turns dubbing scenes from selectable Scene Packs, with in-browser recording, voice effects, and audio export.',
    liveUrl: 'https://dogdub.vercel.app',
    repoUrl: `${GITHUB}/dogdub`,
    poster: 'images/projects/dogdub.jpg'
  },
  {
    title: 'VICTO — Print-on-Demand Platform',
    subtitle: 'MERN Stack • E-Commerce',
    description: 'Premium print-on-demand apparel platform with an interactive design customizer, independent artwork canvases for four garment sides, and a dashboard for saving reusable product templates.',
    repoUrl: `${GITHUB}/Victo`,
    poster: 'images/select.jpg'
  },
  {
    title: 'SongGuessr',
    subtitle: 'FastAPI / Python • Audio ML',
    description: 'Bandle-style song guessing game that automatically separates tracks into four stems using Demucs, served through a FastAPI backend.',
    repoUrl: `${GITHUB}/PlengGuessr`,
    poster: 'images/gaba2.jpeg'
  },
  {
    title: 'JSD Backend Assessment',
    subtitle: 'Node.js / Express • Client + Server',
    description: 'Full-stack backend assessment pairing an Express server with a client application, covering API design, data modelling, and request handling.',
    repoUrl: `${GITHUB}/jsd-backend-assessment`,
    poster: 'images/goodfire.jpg'
  },
  {
    title: 'W10 Express REST API',
    subtitle: 'Node.js / Express • REST',
    description: 'Express-based REST API service covering routing, middleware, and structured backend architecture.',
    repoUrl: `${GITHUB}/w10-express-api`,
    poster: 'images/jwt2.jpg'
  },
  {
    title: 'ChromaBurger Management System',
    subtitle: 'MongoDB / PostgreSQL • Database Assessment',
    description: 'Food truck restaurant management system built to practise MongoDB and PostgreSQL queries, schema design, and CRUD operations.',
    repoUrl: `${GITHUB}/DBS-assessment`,
    poster: 'images/guard.jpg'
  }
];

const FRONTEND_PROJECTS = [
  {
    title: 'Colmar Academy',
    subtitle: 'HTML5 / CSS3 • Responsive Assessment',
    description: 'Fully responsive educational landing page built with semantic HTML5 and a flexbox layout system across desktop, tablet, and mobile breakpoints.',
    liveUrl: 'https://html-css-assessment-red.vercel.app',
    repoUrl: `${GITHUB}/46-Watcharine-colmar`,
    poster: 'images/projects/colmar.jpg'
  },
  {
    title: 'CSS Flex-Flow Interactive Guide',
    subtitle: 'HTML5 / CSS3 • Learning Playground',
    description: 'Interactive visual guide and playground for learning the CSS flex-flow shorthand, letting you toggle properties and watch the layout respond live.',
    liveUrl: 'https://css-ex-black.vercel.app',
    repoUrl: `${GITHUB}/CSS-EX`,
    poster: 'images/projects/cssflex.jpg'
  },
  {
    title: 'HTML Session',
    subtitle: 'HTML5 • Web Foundations',
    description: 'The starting point of the web development journey — a retro-styled personal bio page built with core HTML structure and semantic markup.',
    liveUrl: 'https://html-session-omega.vercel.app/',
    repoUrl: `${GITHUB}/HTML_session`,
    poster: 'images/projects/htmlsession.jpg'
  },
  {
    title: 'Saber of Light',
    subtitle: 'HTML5 / CSS3 • GitHub Pages',
    description: 'Modular lightsaber e-commerce storefront concept with a hero banner, product categories, and cart UI, deployed on GitHub Pages.',
    liveUrl: 'https://inatbalthazar.github.io/SABER-OF-LIGHT/',
    repoUrl: `${GITHUB}/SABER-OF-LIGHT`,
    poster: 'images/projects/saberoflight.jpg'
  },
  {
    title: 'React Router Application',
    subtitle: 'React 19 / Tailwind v4 / Vite',
    description: 'Multi-page React application using React Router for client-side navigation, styled with Tailwind CSS v4 on a Vite build.',
    repoUrl: `${GITHUB}/W08-REACT-ROUTER`,
    poster: 'images/next.jpg'
  },
  {
    title: 'Castle Rooms',
    subtitle: 'React 19 / Tailwind v4 / Vite',
    description: 'Component-driven React exercise exploring props, state, and conditional rendering through an interactive castle room browser.',
    repoUrl: `${GITHUB}/W07-React-castle-rooms`,
    poster: 'images/history3.jpg'
  },
  {
    title: 'W09 React SPA Assessment',
    subtitle: 'React.js • Single-Page Application',
    description: 'Single-page React application assessment covering component architecture, state management, and modular design.',
    repoUrl: `${GITHUB}/W09-REACT-ASSESSMENT`,
    poster: 'images/minesy.jpg'
  }
];

const INTERACTIVE_PROJECTS = [
  {
    title: '67 Clicker',
    subtitle: 'JavaScript ES6+ • Browser Game',
    description: 'Incremental clicker game built with vanilla JavaScript, covering DOM events, state updates, and progression mechanics.',
    liveUrl: 'https://67-clicker-mu.vercel.app/',
    repoUrl: `${GITHUB}/WEEK07`,
    poster: 'images/projects/clicker67.jpg'
  },
  {
    title: 'Gen D — Restaurant Site',
    subtitle: 'JavaScript ES6+ • Git Fundamentals',
    description: 'Restaurant menu and reservations concept site built while practising JavaScript DOM manipulation and Git version control fundamentals.',
    liveUrl: 'https://1st-meet-git.vercel.app',
    repoUrl: `${GITHUB}/JS-Restaurant`,
    poster: 'images/projects/jsrestaurant.jpg'
  },
  {
    title: 'Miclone',
    subtitle: 'Web Audio API • Node.js',
    description: 'Browser-based sound engine with a catalogued sound library, layered effects processing, and shared room sessions.',
    repoUrl: `${GITHUB}/Miclone`,
    poster: 'images/reely.jpg'
  },
  {
    title: 'Find My Hat',
    subtitle: 'JavaScript • OOP Terminal Game',
    description: 'Object-oriented terminal maze game built to practise classes, grid generation, and input validation logic.',
    repoUrl: `${GITHUB}/WEEK08-JS-FIND-MY-HAT`,
    poster: 'images/hunt.jpg'
  },
  {
    title: 'Bitburner Script Pack',
    subtitle: 'JavaScript • Automation Scripts',
    description: 'Automation script pack for Bitburner covering early to late-game progression with efficient, scalable, easy-to-deploy strategies.',
    repoUrl: `${GITHUB}/Bitburner-Mastermind-Script-Pack`,
    poster: 'images/carbon.jpg'
  }
];

function ProjectCard({ project, onOpenDemo }) {
  const isLive = Boolean(project.liveUrl);

  return (
    <div
      className="portfolio-item"
      onClick={() => (isLive ? onOpenDemo(project) : window.open(project.repoUrl, '_blank'))}
      data-title={project.title}
      data-subtitle={project.subtitle}
      data-description={project.description}
      data-poster={project.poster}
    >
      <img className="portfolio-item-poster" src={project.poster} alt={project.title} loading="lazy" decoding="async" />
      {isLive && <div className="portfolio-item-live">Live Demo</div>}
      <div className="portfolio-item-play"></div>
      <div className="portfolio-item-overlay">
        <div className="portfolio-item-title">{project.title}</div>
        <div className="portfolio-item-subtitle">{project.subtitle}</div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const [activeDemo, setActiveDemo] = useState(null);

  // Hero word/image reveal for #portfolio-section is owned by main-script.js
  // (runMainScript's "CODROPS-STYLE PORTFOLIO STORY ANIMATIONS" block) — it already
  // handles mobile fallback, video hover, and click-to-open. A second ScrollTrigger
  // here previously fought it for the same nodes with a different trigger point.

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
              onClick={() => window.open(GITHUB, '_blank')}
              data-title="GitHub Repositories"
              data-subtitle="Watcharine Duangsri • Generation Thailand"
              data-description="Full-stack web applications, React.js projects, Node.js APIs, and responsive frontend applications."
              data-width="280"
            >
              <img src="images/mern.png" alt="MERN Stack Full-Stack Developer" loading="lazy" decoding="async" />
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
              onClick={() => setActiveDemo(FULLSTACK_PROJECTS[0])}
              data-title="Choicer Voicer Studio"
              data-subtitle="Node.js / Express / Vite • Multiplayer"
              data-description="Online voice-acting party game with room-based multiplayer, in-browser recording, and voice effects."
              data-width="140"
            >
              <img src="images/projects/dogdub.jpg" alt="Choicer Voicer Studio" loading="lazy" decoding="async" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">that</span>
            <span className="word">scales.</span>
          </h2>
          <p className="story-panel-description">
            Junior Software Developer (JSD13) graduate from Generation Thailand. Building full-stack web applications utilizing React.js, Node.js, Express, MongoDB, PostgreSQL, and RESTful APIs with clean component-driven architecture and industrial-grade quality discipline.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-fullstack">
            View Full-Stack Projects <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            onClick={() => setActiveDemo(FULLSTACK_PROJECTS[0])}
            data-title="Choicer Voicer Studio"
            data-subtitle="Live on Vercel"
            data-description="Create or join a room, pick a Scene Pack, and take turns dubbing scenes together in the browser."
          >
            <img src="images/projects/dogdub.jpg" alt="Choicer Voicer Studio" loading="lazy" decoding="async" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      <div className="panel-portfolio-accordion" id="accordion-fullstack">
        <div className="panel-portfolio-grid">
          {FULLSTACK_PROJECTS.map((project) => (
            <ProjectCard key={project.repoUrl} project={project} onOpenDemo={setActiveDemo} />
          ))}
        </div>
      </div>

      {/* Panel 2: Frontend Engineering */}
      <div className="story-panel story-panel-reversed">
        <div className="story-panel-content">
          <div className="story-panel-label">Frontend Engineering</div>
          <h2 className="story-panel-title">
            <div
              className="title-video"
              onClick={() => setActiveDemo(FRONTEND_PROJECTS[0])}
              data-title="Colmar Academy Landing Page"
              data-subtitle="HTML5 / CSS3 • Vercel Deployment"
              data-description="Clean, fully responsive educational landing page assessment designed with semantic HTML5 and modern flexbox layout."
              data-width="130"
            >
              <img src="images/projects/colmar.jpg" alt="Colmar Academy" loading="lazy" decoding="async" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">Responsive</span>
            <span className="word">User</span>
            <span className="word">Interfaces</span>
          </h2>
          <p className="story-panel-description">
            Crafting intuitive, mobile-first web user interfaces using HTML5, CSS3, JavaScript ES6+, Flexbox, and CSS Grid. Focused on accessibility (WCAG AA), clean UI design, and seamless user experience across desktop and mobile devices.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-frontend">
            View Frontend Projects <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            onClick={() => setActiveDemo(FRONTEND_PROJECTS.find((p) => p.title === 'Saber of Light'))}
            data-title="Saber of Light"
            data-subtitle="HTML5 / CSS3 • GitHub Pages"
            data-description="Modular lightsaber e-commerce storefront concept with a hero banner, product categories, and cart UI."
          >
            <img src="images/projects/saberoflight.jpg" alt="Saber of Light" loading="lazy" decoding="async" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      <div className="panel-portfolio-accordion" id="accordion-frontend">
        <div className="panel-portfolio-grid">
          {FRONTEND_PROJECTS.map((project) => (
            <ProjectCard key={project.repoUrl} project={project} onOpenDemo={setActiveDemo} />
          ))}
        </div>
      </div>

      {/* Panel 3: Games & Interactive Builds */}
      <div className="story-panel">
        <div className="story-panel-content">
          <div className="story-panel-label">Games &amp; Interactive</div>
          <h2 className="story-panel-title">
            <span className="word">Play</span>
            <div
              className="title-video"
              onClick={() => setActiveDemo(INTERACTIVE_PROJECTS[0])}
              data-title="67 Clicker"
              data-subtitle="JavaScript ES6+ • Browser Game"
              data-description="Incremental clicker game built with vanilla JavaScript, covering DOM events, state updates, and progression mechanics."
              data-width="150"
            >
              <img src="images/projects/clicker67.jpg" alt="67 Clicker" loading="lazy" decoding="async" />
              <div className="story-play-icon"></div>
            </div>
            <span className="word">the</span>
            <span className="word">build.</span>
          </h2>
          <p className="story-panel-description">
            Browser games and interactive experiments built to stress-test state handling, Web Audio, real-time multiplayer sessions, and object-oriented JavaScript — where the fastest way to learn a concept is to make something worth clicking.
          </p>
          <button className="view-more-projects-btn" data-accordion="accordion-interactive">
            View Interactive Builds <span className="btn-arrow">▼</span>
          </button>
        </div>
        <div className="story-panel-image-container">
          <div
            className="story-panel-image size-wide"
            onClick={() => setActiveDemo(INTERACTIVE_PROJECTS[0])}
            data-title="67 Clicker"
            data-subtitle="Live on Vercel"
            data-description="Incremental clicker game with progression mechanics, built in vanilla JavaScript."
          >
            <img src="images/projects/clicker67.jpg" alt="67 Clicker" loading="lazy" decoding="async" />
            <div className="story-play-icon"></div>
          </div>
        </div>
      </div>

      <div className="panel-portfolio-accordion" id="accordion-interactive">
        <div className="panel-portfolio-grid">
          {INTERACTIVE_PROJECTS.map((project) => (
            <ProjectCard key={project.repoUrl} project={project} onOpenDemo={setActiveDemo} />
          ))}
        </div>
      </div>

      {activeDemo && (
        <LiveDemoModal key={activeDemo.liveUrl} project={activeDemo} onClose={() => setActiveDemo(null)} />
      )}
    </div>
  );
}

export default PortfolioSection;
