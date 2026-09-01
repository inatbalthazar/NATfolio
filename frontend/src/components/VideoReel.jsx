import React from 'react';

function VideoReel() {
  return (
    <>
      <div id="reel-scroll-section">
        <div id="reel-sticky-wrapper">
          <h2 id="reel-headline">Coding, Connecting to <span className="nat-highlight">Nat</span>ure</h2>
          <div 
            id="reel-video-container" 
            data-video="loop_scrub.mp4" 
            data-title="Watcharine Duangsri Highlights" 
            data-subtitle="Full-Stack Software Development &amp; Tech Highlights • 2026" 
            data-description="A showcase of full-stack software development, MERN web applications, UI/UX craftsmanship, and precision industrial engineering by Watcharine Duangsri."
          >
            <video id="reel-preview" loop muted playsInline>
              <source src="/nature.mp4" type="video/mp4" />
            </video>
            <video id="reel-video" playsInline>
              <source src="https://dfpsmith.com/videos/full/reel-2022.mp4" type="video/mp4" />
            </video>
            <div id="vhs-overlay">
              <div className="vhs-blue-screen"></div>
              <div className="vhs-scanlines"></div>
              <div className="vhs-noise"></div>
              <div className="vhs-noise vhs-noise-moving"></div>
              <div className="vhs-text-overlay">
                <div className="vhs-play-text">PLAY</div>
              </div>
            </div>
            <div id="reel-darken-overlay"></div>
            <div id="reel-label">Tech Overview</div>
            <div id="reel-controls">
              <button className="reel-btn" id="reel-play-pause-btn">
                <svg viewBox="0 0 24 24" className="reel-play-icon"><path d="M8 5v14l11-7z"/></svg>
                <svg viewBox="0 0 24 24" className="reel-pause-icon" style={{display: 'none'}}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              </button>
              <div className="reel-progress-container">
                <div className="reel-progress-bar">
                  <div className="reel-progress-fill" id="reel-progress-fill"></div>
                </div>
                <input type="range" className="reel-progress-input" id="reel-progress-input" min="0" max="100" defaultValue="0" />
              </div>
              <div className="reel-time" id="reel-time">0:00 / 0:00</div>
              <div className="reel-volume-control">
                <button className="reel-btn" id="reel-mute-btn">
                  <svg viewBox="0 0 24 24" className="reel-volume-icon"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                  <svg viewBox="0 0 24 24" className="reel-muted-icon" style={{display: 'none'}}><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                </button>
                <input type="range" className="reel-volume-slider" id="reel-volume-slider" min="0" max="100" defaultValue="80" />
              </div>
              <button className="reel-btn" id="reel-fullscreen-btn" title="Fullscreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="fullscreen-player">
        <div id="fullscreen-close"></div>
        <div id="fullscreen-video-wrapper">
          <video id="fullscreen-video" controls>
            <source src="/loop_scrub.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

export default VideoReel;
