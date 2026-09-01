import React from 'react';

function HeroSection() {
  return (
    <>
      <a href="#" id="logo" title="Watcharine Duangsri Portfolio"></a>
      <div id="video-container">
        <canvas id="image-canvas"></canvas>
      </div>
      <div className="content-overlay" id="combined-text-overlay">
        <div className="combined-text-wrapper">
          <div className="text-section" id="text-1">
            <div className="text-gradient-bg"></div>
            <div className="we-tell">Code that</div>
            <div className="text-1-line">
              <span className="big-word highlighted">FEEL</span>
              <span className="stories-word"><span className="nat-highlight">Nat</span>ural</span>
            </div>
          </div>
          <div className="text-section" id="text-2">
            <div className="text-gradient-bg"></div>
            <div className="text-2-line">
              <span className="for-word">and</span>
              <span className="regular-word" id="regular-word-trigger">Developing</span>
            </div>
            <div className="sized-people-word">software , connected to <span className="nat-highlight">nat</span>ure.</div>
          </div>
        </div>
      </div>
      <div id="spacer"></div>
    </>
  );
}

export default HeroSection;
