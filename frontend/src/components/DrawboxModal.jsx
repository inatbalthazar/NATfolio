import React, { useRef, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

function DrawboxModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [userName, setUserName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [history, setHistory] = useState([]);
  
  // Gallery state loaded from localStorage or defaults
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('drawbox_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved gallery', e);
      }
    }
    return [
      {
        id: 1,
        name: 'GLIG',
        date: '30/08/2026 22:24:38',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="white"/><path d="M 30 50 C 150 20 180 120 50 110 C 20 100 120 150 170 140" stroke="black" stroke-width="4" fill="none"/><text x="20" y="180" font-family="monospace" font-size="28" font-weight="bold" fill="black">GLIG</text></svg>'
      },
      {
        id: 2,
        name: 'Heart',
        date: '19/08/2026 06:43:31',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="white"/><path d="M 100 160 Q 30 90 60 50 A 25 25 0 0 1 100 70 A 25 25 0 0 1 140 50 Q 170 90 100 160 Z" stroke="black" stroke-width="4" fill="none"/><line x1="40" y1="130" x2="160" y2="70" stroke="black" stroke-width="3"/><polygon points="160,70 150,75 155,85" fill="black"/></svg>'
      }
    ];
  });

  // Fetch drawings from Supabase Database
  const fetchOnlineDrawings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('drawings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, fallback to local gallery:', error.message);
        return;
      }

      if (data && data.length > 0) {
        setGallery(data);
      }
    } catch (err) {
      console.warn('Failed to load online drawings:', err);
    }
  }, []);

  // Fetch online gallery on mount and when modal opens
  useEffect(() => {
    fetchOnlineDrawings();
  }, [fetchOnlineDrawings, isOpen]);

  // Save gallery to localStorage as fallback
  useEffect(() => {
    localStorage.setItem('drawbox_gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Initialize canvas background
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Save initial blank state
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initCanvas();
      }, 50);
    }
  }, [isOpen, initCanvas]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev, state]);
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const handleRestore = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // Remove current state
    const previousState = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const canvas = canvasRef.current;
    if (!canvas || !previousState) return;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(previousState, 0, 0);
  };

  const handleClear = () => {
    initCanvas();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `drawbox_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newDrawing = {
      name: userName.trim() || 'Anonymous',
      date: dateStr,
      image: dataUrl
    };

    setStatusMsg('Uploading drawing to online gallery...');

    try {
      const { data, error } = await supabase
        .from('drawings')
        .insert([newDrawing])
        .select();

      if (error) {
        console.error('Failed to submit drawing to Supabase:', error);
        setStatusMsg('★ Drawing saved locally! (Online table error)');
        setGallery(prev => [{ ...newDrawing, id: Date.now() }, ...prev]);
      } else {
        setStatusMsg('★ Drawing submitted successfully to global online gallery!');
        if (data && data.length > 0) {
          setGallery(prev => [data[0], ...prev]);
        } else {
          setGallery(prev => [{ ...newDrawing, id: Date.now() }, ...prev]);
        }
      }
    } catch (err) {
      console.error('Error submitting drawing:', err);
      setGallery(prev => [{ ...newDrawing, id: Date.now() }, ...prev]);
      setStatusMsg('★ Drawing saved locally!');
    }

    setTimeout(() => setStatusMsg(''), 4000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="drawbox-modal-overlay"
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
        if (e.target.classList.contains('drawbox-modal-overlay')) {
          onClose();
        }
      }}
    >
      <div 
        className="window" 
        style={{ 
          width: '640px', 
          maxWidth: '100%', 
          maxHeight: '90vh', 
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          zIndex: 1000000
        }}
      >
        <div className="title-bar">
          <div className="title-bar-text">Drawbox</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" title="Minimize"></button>
            <button aria-label="Maximize" title="Maximize"></button>
            <button aria-label="Close" onClick={onClose} title="Close"></button>
          </div>
        </div>

        <div 
          className="window-body" 
          style={{ 
            overflowY: 'auto', 
            flex: 1, 
            padding: '16px',
            backgroundColor: '#c0c0c0'
          }}
        >
          <style>{`
            @font-face {
              font-family: oldschool;
              src: url(https://dl.dropbox.com/scl/fi/h41dws5x4haw7zgw0yc1s/Px437_DOS-V_re_ANK24.ttf?rlkey=2b75apurgp4zrnd2xelqax6ru&st=gwq7wdnt&dl=0);
            }
            .drawbox-text {
              font-family: oldschool, monospace, sans-serif;
              color: #4932c9;
            }
            .stroke-color-swatch {
              width: 24px;
              height: 24px;
              display: inline-block;
              border: 1px solid #000;
              cursor: pointer;
              vertical-align: middle;
              margin-right: 6px;
            }
            .drawbox-gallery-grid {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
              margin-top: 10px;
            }
            .drawbox-image-container {
              border: 1px dashed #9087c4;
              padding: 6px;
              max-width: 180px;
              background: #fff;
              text-align: center;
              box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
            }
            .drawbox-image-container img {
              max-width: 100%;
              height: auto;
              display: block;
              margin-bottom: 6px;
              border: 1px solid #ddd;
            }
          `}</style>

          <h1 className="drawbox-text" style={{ fontSize: '1.4rem', margin: '0 0 6px' }}>.../DRAWBOX (. ❛ ᴗ ❛.)</h1>
          <h3 className="drawbox-text" style={{ fontSize: '0.95rem', margin: '0 0 10px' }}>NSFW and offensive content will be removed !</h3>

          <details style={{ textIndent: '20px', marginBottom: '10px' }}>
            <summary className="drawbox-text" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Help! I can't submit my drawing!
            </summary>
            <p className="drawbox-text" style={{ margin: '8px 0 0' }}>
              If you're having trouble, <i><a href="https://forms.gle/TFUXRncW5CCe3kHbA" target="_blank" rel="noreferrer">directly submit a form here.</a></i>
              <br />
              Drawbox uses Imgur API, which may be blocked in your region. So, using a VPN also works!
              <br /><br />
              <u>!!! REMEMBER TO SAVE YOUR DRAWING BEFORE PROCEEDING WITH THESE !!!</u>
            </p>
          </details>

          <p className="drawbox-text" style={{ margin: '0 0 12px' }}>
            <i><a href="https://xcrystiibox.nekoweb.org/" target="_blank" rel="noreferrer">(click here for full screen)</a> &lt;--- mobile recommended</i>
          </p>

          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <canvas
              ref={canvasRef}
              id="drawboxcanvas"
              width={500}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                border: '2px solid #4932c9',
                cursor: 'crosshair',
                backgroundColor: '#ffffff',
                maxWidth: '100%',
                height: 'auto',
                touchAction: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div 
              onClick={() => setStrokeColor('red')} 
              style={{ background: 'red' }} 
              className="stroke-color-swatch"
              title="Red"
            />
            <div 
              onClick={() => setStrokeColor('blue')} 
              style={{ background: 'blue' }} 
              className="stroke-color-swatch"
              title="Blue"
            />
            <div 
              onClick={() => setStrokeColor('black')} 
              style={{ background: 'black' }} 
              className="stroke-color-swatch"
              title="Black"
            />
            <div 
              onClick={() => setStrokeColor('green')} 
              style={{ background: 'green' }} 
              className="stroke-color-swatch"
              title="Green"
            />
            <div 
              onClick={() => setStrokeColor('#ffffff')} 
              style={{ background: '#ffffff' }} 
              className="stroke-color-swatch"
              title="Eraser / White"
            />

            <input 
              type="color" 
              value={strokeColor} 
              onInput={(e) => setStrokeColor(e.target.value)} 
              title="Custom Color"
              style={{ verticalAlign: 'middle', cursor: 'pointer', height: '26px' }}
            />

            <input 
              type="range" 
              min="1" 
              max="100" 
              value={strokeWidth} 
              onInput={(e) => setStrokeWidth(Number(e.target.value))} 
              style={{ width: '110px', verticalAlign: 'middle' }}
              title="Brush Size"
            />
            <span className="drawbox-text" style={{ fontSize: '0.85rem' }}>{strokeWidth}px</span>

            <button onClick={handleRestore}>Undo</button>
            <button onClick={handleClear}>Clear</button>
            <button id="download" onClick={handleDownload}>Download</button>
          </div>

          <p className="drawbox-text" style={{ margin: '8px 0 6px' }}>ο(=•ω＜=)ρ⌒☆ sign your name ! [anonymous by default]</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <input 
              type="text" 
              value={userName} 
              onInput={(e) => setUserName(e.target.value)} 
              maxLength={30} 
              placeholder="Your Name"
              style={{ padding: '4px 8px', flex: 1 }}
            />
            <button id="submit" className="default" onClick={handleSubmit}>Submit drawing</button>
          </div>

          {statusMsg && (
            <p className="drawbox-text" style={{ color: '#008000', fontWeight: 'bold', margin: '4px 0 10px' }}>
              {statusMsg}
            </p>
          )}

          <hr style={{ margin: '16px 0', borderColor: '#4932c9' }} />

          <h1 className="drawbox-text" style={{ fontSize: '1.2rem', margin: '0 0 10px' }}>Submitted Drawings &lt;3</h1>
          <div id="gallery" className="drawbox-gallery-grid drawbox-text">
            {gallery.length === 0 ? (
              <div>No submitted drawings yet...</div>
            ) : (
              gallery.map((item) => (
                <div key={item.id} className="drawbox-image-container">
                  <img src={item.image} alt={`Drawing by ${item.name}`} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', wordBreak: 'break-word' }}>{item.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>{item.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawboxModal;
