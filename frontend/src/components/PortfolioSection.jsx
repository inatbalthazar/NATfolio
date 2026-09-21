import React, { useState } from 'react';
import LiveDemoModal from './LiveDemoModal';

const GITHUB = 'https://github.com/inatbalthazar';

const FULLSTACK_PROJECTS = [
  {
    title: 'That-tae — ธาตุแท้ Cooking Kit',
    subtitle: 'MERN Stack • JSD13 Team Capstone',
    description: 'Graduation capstone built by a 5-person JSD13 team. A Thai wellness food platform that profiles your body element (ธาตุเจ้าเรือน) through a quiz, then recommends menus matched to your element, health goals, and lifestyle — with a full menu catalogue, cart, and accounts.',
    liveUrl: 'https://jsd-13-thattae.vercel.app/',
    repoUrl: 'https://github.com/ctrlaltnate/JSD13-Thattae',
    poster: 'images/projects/thattae.jpg'
  },
  {
    title: 'Choicer Voicer Studio',
    subtitle: 'Node.js / Express / Vite • Multiplayer',
    description: 'Online voice-acting party game. Load a voice pack, record each line in your own voice, then watch the finished dub — solo, or splitting the lines with friends in a shared multiplayer room.',
    liveUrl: 'https://dogdub.vercel.app',
    repoUrl: `${GITHUB}/dogdub`,
    poster: 'images/projects/dogdub.jpg'
  },
  {
    title: 'VICTO — Print-on-Demand Platform',
    subtitle: 'MERN Stack • E-Commerce',
    description: 'Premium print-on-demand apparel platform with an interactive design customizer, independent artwork canvases for four garment sides, and a dashboard for saving reusable product templates.',
    liveUrl: 'https://victo-iota.vercel.app',
    repoUrl: `${GITHUB}/Victo`,
    poster: 'images/projects/victo.jpg'
  },
  {
    title: 'PlengGuessr',
    subtitle: 'Cloudflare Workers • Audio Game',
    description: 'Bandle-style song guessing game with a 226-track library split across International, Thai, and K-Pop playlists. Guess from the instrument stems — the faster you answer, the more stars you earn.',
    liveUrl: 'https://plengguessr.inatbalthazar.workers.dev/',
    repoUrl: `${GITHUB}/PlengGuessr`,
    poster: 'images/projects/plengguessr.jpg'
  },
  {
    title: 'Chrome & Burger',
    subtitle: 'MongoDB / PostgreSQL • Database Assessment',
    description: 'Food truck restaurant management system with a gourmet menu and ordering flow, built to practise MongoDB and PostgreSQL queries, schema design, and CRUD operations.',
    liveUrl: 'https://dbs-assessment.vercel.app/',
    repoUrl: `${GITHUB}/DBS-assessment`,
    poster: 'images/projects/chromaburger.jpg'
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
    title: 'Castle Rooms',
    subtitle: 'React 19 / Tailwind v4 / Vite',
    description: 'Interstellar-themed room browser — the Cornfield, the Wormhole, Miller’s Planet, Gargantua, the Tesseract — built as a component-driven React exercise in props, state, and conditional rendering, with messages relayed between Earth and Cooper.',
    liveUrl: 'https://w07-react-castle-rooms.vercel.app',
    repoUrl: `${GITHUB}/W07-React-castle-rooms`,
    poster: 'images/projects/castlerooms.jpg'
  },
  {
    title: 'W09 React SPA Assessment',
    subtitle: 'React.js • Single-Page Application',
    description: 'Single-page React application assessment with separate User and Admin sections, covering component architecture, state management, and modular design.',
    liveUrl: 'https://w09-react-assessment.vercel.app/',
    repoUrl: `${GITHUB}/W09-REACT-ASSESSMENT`,
    poster: 'images/projects/w09react.jpg'
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
    title: 'Gen D — Premium Dining',
    subtitle: 'JavaScript ES6+ • 11-Language i18n',
    description: 'Restaurant menu and reservations site with cuisine filtering, pre-order flow, and an eleven-language switcher — built while practising JavaScript DOM manipulation and Git version control fundamentals.',
    liveUrl: 'https://1st-meet-git.vercel.app',
    repoUrl: `${GITHUB}/JS-Restaurant`,
    poster: 'images/projects/jsrestaurant.jpg'
  },
  {
    title: 'Dayology',
    subtitle: 'TypeScript / Vite • Interactive Cards',
    description: 'Self-discovery card experience framed around Carl Jung’s psychology — explore the Persona you show the world, the Shadow you keep hidden, and a healing note for each of the seven days.',
    liveUrl: 'https://dayology.vercel.app',
    repoUrl: `${GITHUB}/dayology`,
    poster: 'images/projects/dayology.jpg'
  }
];

function ProjectCard({ project, onOpenDemo }) {
  return (
    <div
      className="portfolio-item"
      onClick={() => onOpenDemo(project)}
      data-title={project.title}
      data-subtitle={project.subtitle}
      data-description={project.description}
      data-poster={project.poster}
    >
      <img className="portfolio-item-poster" src={project.poster} alt={project.title} loading="lazy" decoding="async" />
      <div className="portfolio-item-live">Live Demo</div>
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
              data-title="That-tae — ธาตุแท้ Cooking Kit"
              data-subtitle="MERN Stack • JSD13 Team Capstone"
              data-description="Graduation capstone built by a 5-person JSD13 team — a Thai wellness food platform that matches menus to your body element."
              data-width="140"
            >
              <img src="images/projects/thattae.jpg" alt="That-tae Cooking Kit" loading="lazy" decoding="async" />
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
            data-title="That-tae — ธาตุแท้ Cooking Kit"
            data-subtitle="Live on Vercel"
            data-description="Team capstone project (5 developers) from Generation Thailand JSD13, built end-to-end on the MERN stack."
          >
            <img src="images/projects/thattae.jpg" alt="That-tae Cooking Kit" loading="lazy" decoding="async" />
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
            Browser games and interactive experiments built to stress-test state handling, progression systems, internationalisation, and animation-driven UI — where the fastest way to learn a concept is to make something worth clicking.
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
