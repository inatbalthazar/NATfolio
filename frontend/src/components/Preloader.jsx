import React from 'react';

function Preloader() {
  return (
    <div id="preloader">
      <div id="vhs-wrapper">
        <img id="vhs-base" src="/shell32_160.gif" alt="Loading..." />
      </div>

      {/* Windows XP Progress Bar */}
      <div className="xp-progress-wrapper">
        <div className="xp-progress-container">
          <div className="xp-progress-bar" id="xp-progress-fill" style={{ width: '0%' }}></div>
        </div>
      </div>

      <div className="loader-text">loading portfolio <span id="vhs-title">0%</span></div>
    </div>
  );
}

export default Preloader;
