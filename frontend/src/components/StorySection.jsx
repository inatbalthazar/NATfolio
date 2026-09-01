import React, { useEffect } from 'react';
import CodingJungleCanvas from './CodingJungleCanvas';

function StorySection() {
  useEffect(() => {
    let ctx;
    const initAnimation = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        const gsap = window.gsap;

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".resume-letter-composite",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          });

          // Layer 1: Envelope Entrance
          tl.fromTo(".resume-envelope-layer",
            { y: 120, opacity: 0, rotate: -16, scale: 0.82 },
            { y: 0, opacity: 1, rotate: -7, scale: 1, duration: 0.85, ease: "power3.out" }
          )
            // Layer 2: Paper Unfolding/Sliding Out
            .fromTo(".resume-paper-layer",
              { y: 150, opacity: 0, rotate: 12, scale: 0.85 },
              { y: 0, opacity: 1, rotate: 3, scale: 1, duration: 0.95, ease: "power4.out" },
              "-=0.55"
            )
            // Layer 3: Photo & Paperclip Bouncing In
            .fromTo(".resume-photo-clip-group",
              { y: -70, opacity: 0, scale: 0.6, rotate: -25 },
              { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.75, ease: "back.out(1.8)" },
              "-=0.4"
            )
            // Layer 4: Text Cascade Reveal
            .fromTo(".resume-paper-header, .resume-paper-body p, .resume-quotes p",
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power2.out" },
              "-=0.3"
            );
        });
      }
    };

    const timer = setTimeout(initAnimation, 300);
    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div id="story-section">
      <div className="story-bg-gif-container">
        <CodingJungleCanvas className="story-bg-gif" />
        <div className="story-bg-overlay"></div>
      </div>
      <div className="story-content">
        <h1>Who I Am<br />&amp; What I Build.</h1>
        <p className="story-paragraph">
          Watcharine <span className="nat-nickname">(Nat)</span> is a dedicated <strong>Full-Stack Software Developer (JSD13 Alum)</strong> based in Thailand.
          Combining intensive software engineering training in the MERN Stack (React, Node.js, Express, MongoDB, SQL) with
          over four years of high-precision industrial troubleshooting at Ford Motor Company and BYD Auto, Watcharine creates digital products
          with structural discipline, clean architecture, and user-first reliability.
        </p>
        <br />

        {/* 3-Layer Skewed Letter & Paper Composite replacing bio-section bio-left */}
        <div className="bio-section bio-left resume-letter-composite">
          {/* Layer 1: Bottom Envelope (letter.png) */}
          <img className="resume-envelope-layer" src="/images/resume/letter.png" alt="Envelope" />

          {/* Layer 2: Middle Paper Document (paper.png) */}
          <div className="resume-paper-layer">
            <img className="resume-paper-bg" src="/images/resume/paper.png" alt="Paper Document" />

            {/* Layer 3: Top Photo + Paperclip */}
            <div className="resume-photo-clip-group">
              <img className="resume-photo" src="/images/resume/me1.jpg" alt="Watcharine Duangsri" />
              <img className="resume-paperclip" src="/images/resume/clip.png" alt="Paperclip" />
            </div>

            {/* Document Content Overlay */}
            <div className="resume-paper-content">
              <div className="resume-paper-header">
                <div className="resume-header-title">Full-Stack Software Developer</div>
                <div className="resume-header-email">JSD13 Alum | inatbalthazar@gmail.com</div>
              </div>

              <div className="resume-paper-body">
                <p className="resume-greeting">What's up, builders &amp; creators.</p>
                <p>Let's be honest, software engineering requires precision.</p>

                <div className="resume-quotes">
                  <p>"Modular clean code"</p>
                  <p>"Root-cause troubleshooting"</p>
                  <p>"Zero-downtime reliability"</p>
                  <p>"User-centered design"</p>
                  <p>"Agile team collaboration"</p>
                </div>

                <p className="resume-emphasis">Real engineering. Minimal bullshit.</p>
                <p>My path into software development wasn't conventional—it was driven by a deep curiosity for how complex systems work.</p>
                <p>Time for something built to last.</p>

                <p className="resume-bold">Introducing Watcharine Duangsri: Full-Stack Developer.</p>
                <p>A developer for teams who want clean code, system reliability, and straight answers.</p>
                <p>Trained through Generation Thailand's intensive JSD13 software engineering program. Specializes in building full-stack web applications with React, Node.js, Express, MongoDB, SQL, RESTful APIs, and responsive design—backed by years of high-precision root-cause troubleshooting at Ford and BYD Auto.</p>

                <p>Building modern web applications that adapt to human habits.</p>
                <p className="resume-bold">Certified Level-1 Thai Culinary Chef &amp; Craftsman.</p>
                <p>Let's build together.</p>

                <p className="resume-signature">– Watcharine</p>
              </div>
            </div>
          </div>
        </div>

        <p className="story-paragraph">
          Built on a foundation of clean code, root-cause troubleshooting, and technical precision.
          Whether architecting responsive MERN stack web applications, optimizing database workflows,
          or building robust software systems, Watcharine delivers system reliability,
          technical depth, and engineering excellence.
        </p>
        <div className="real-life-inline">
          <span className="real-life-static">Trusted by modern tech programs, </span>
          <span className="real-life-word" id="real-life-word">software teams</span>
          <span className="real-life-static">, &amp; engineering projects:</span>
        </div>
      </div>
    </div>
  );
}

export default StorySection;
