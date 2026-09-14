import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function LiveDemoModal({ project, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStalled, setIsStalled] = useState(false);
  const overlayRef = useRef(null);
  const windowRef = useRef(null);
  const closingRef = useRef(false);

  const url = project?.liveUrl;

  // Matches the enter/exit convention used by WebsiteInquiryDrawer: animate out
  // with GSAP first, then unmount via onClose — never vanish instantly.
  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    gsap.to(windowRef.current, {
      opacity: 0,
      y: 24,
      scale: 0.97,
      duration: 0.3,
      ease: 'power2.in'
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  useEffect(() => {
    if (!url) return;

    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(windowRef.current,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );

    const stallTimer = setTimeout(() => setIsStalled(true), 9000);
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(stallTimer);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (!url) return null;

  const host = new URL(url).host;

  return (
    <div
      className="live-demo-overlay"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target.classList.contains('live-demo-overlay')) handleClose();
      }}
    >
      <div className="window live-demo-window" ref={windowRef}>
        <div className="title-bar">
          <div className="title-bar-text">{project.title} — Live Demo</div>
          <div className="title-bar-controls">
            <button aria-label="Close" title="Close" onClick={handleClose}></button>
          </div>
        </div>

        <div className="live-demo-toolbar">
          <span className="live-demo-dot" aria-hidden="true"></span>
          <span className="live-demo-address" title={url}>{url}</span>
          <a className="live-demo-btn" href={url} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
          {project.repoUrl && (
            <a className="live-demo-btn" href={project.repoUrl} target="_blank" rel="noreferrer">
              Source
            </a>
          )}
        </div>

        <div className="window-body live-demo-body">
          {!isLoaded && (
            <div className="live-demo-loading">
              <div className="live-demo-spinner" aria-hidden="true"></div>
              <p>Connecting to {host}…</p>
              {isStalled && (
                <p className="live-demo-stall">
                  Taking longer than usual. The site may block embedding —{' '}
                  <a href={url} target="_blank" rel="noreferrer">open it in a new tab</a>.
                </p>
              )}
            </div>
          )}
          <iframe
            src={url}
            title={`${project.title} live demo`}
            className="live-demo-frame"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          />
        </div>

        <div className="status-bar live-demo-status">
          <p className="status-bar-field">{project.subtitle}</p>
          <p className="status-bar-field">{isLoaded ? 'Ready' : 'Loading…'}</p>
        </div>
      </div>
    </div>
  );
}

export default LiveDemoModal;
