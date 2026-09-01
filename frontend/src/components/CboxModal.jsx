import React from 'react';

function CboxModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="cbox-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target.classList.contains('cbox-modal-overlay')) {
          onClose();
        }
      }}
    >
      <div 
        className="window" 
        style={{ 
          width: '450px', 
          maxWidth: '100%', 
          height: '580px', 
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          zIndex: 1000000
        }}
      >
        <div className="title-bar">
          <div className="title-bar-text">BarkMark Chat</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" title="Minimize"></button>
            <button aria-label="Maximize" title="Maximize"></button>
            <button aria-label="Close" onClick={onClose} title="Close"></button>
          </div>
        </div>

        <div 
          className="window-body" 
          style={{ 
            overflow: 'hidden', 
            flex: 1, 
            padding: 0,
            margin: 0,
            backgroundColor: '#c0c0c0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <iframe
            src="https://www3.cbox.ws/box/?boxid=3559911&boxtag=VlGuvh"
            width="100%"
            height="100%"
            allowTransparency="true"
            allow="autoplay"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="auto"
            title="Cbox Live Chat"
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CboxModal;
