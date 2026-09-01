import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function AdventureFooter({ onOpenDrawbox, onOpenCbox }) {
  const footerRef = useRef(null);
  const andyRef = useRef(null);
  const andyImgRef = useRef(null);
  const speechBubbleRef = useRef(null);
  const tooltipRef = useRef(null);
  const treasureRef = useRef(null);

  const [tooltipText, setTooltipText] = useState('LOOK');
  const [speechText, setSpeechText] = useState('');

  const animState = useRef({
    inside: false,
    targetX: 30,
    targetY: 50,
    currentX: 30,
    currentY: 50,
    lastX: 30,
    isFlying: false
  });
  const hotspots = {
    'adventure-sequoia': { 
      action: 'CHAT', 
      response: 'Opening Cbox Chat! Chat live with other visitors...',
      execute: () => {
        if (onOpenCbox) onOpenCbox();
        window.dispatchEvent(new CustomEvent('open-cbox'));
      }
    },
    'adventure-tent': { action: 'LOOK', response: 'Basecamp for late-night Full-Stack coding sessions!' },
    'adventure-campfire': { action: 'LOOK', response: 'Warm campfire & high-efficiency power systems.' },
    'adventure-camera': { 
      action: 'DRAW', 
      response: 'Opening Drawbox! Time to create retro art...',
      execute: () => {
        if (onOpenDrawbox) onOpenDrawbox();
        window.dispatchEvent(new CustomEvent('open-drawbox'));
      }
    },
    'adventure-laptop': { action: 'LOOK', response: 'Full-Stack Development Workstation • React, Node & SQL.' },
    'adventure-canteen': { 
      action: 'PICK UP', 
      response: 'Hydration acquired! Ready for peak performance.',
      execute: (e) => { e.target.style.display = 'none'; }
    },
    'adventure-mud': { action: 'LOOK', response: '4x4 Suspension & steering calibration field.' },
    'adventure-owl': { action: 'LOOK', response: 'Hoo-hoo! Night-owl developer hard at work.' },
    'adventure-drone': { action: 'LOOK', response: 'Telemetry drone monitoring system metrics.' },
    'adventure-jsd13': { action: 'LOOK', response: 'JSD13 — Junior Software Developer Cohort 13 (Generation Thailand)!' }
  };

  const setFlyMode = () => {
    if (!animState.current.isFlying && andyImgRef.current) {
      andyImgRef.current.src = '/images/andy_walk.gif';
      andyRef.current.classList.add('walking');
      animState.current.isFlying = true;
    }
  };

  const setIdleMode = () => {
    if (animState.current.isFlying && andyImgRef.current) {
      andyImgRef.current.src = '/images/andy_still.png';
      andyRef.current.classList.remove('walking');
      animState.current.isFlying = false;
    }
  };

  useGSAP(() => {
    const lerpSpeed = 0.08;
    let animFrameId;

    const animateAndy = () => {
      if (animState.current.inside && andyRef.current && andyImgRef.current) {
        let { targetX, targetY, currentX, currentY, lastX } = animState.current;
        
        currentX += (targetX - currentX) * lerpSpeed;
        currentY += (targetY - currentY) * lerpSpeed;

        currentX = Math.max(2, Math.min(95, currentX));
        currentY = Math.max(2, Math.min(90, currentY));

        andyRef.current.style.left = `${currentX}%`;
        andyRef.current.style.bottom = 'auto';
        andyRef.current.style.top = `${currentY}%`;

        const dx = currentX - lastX;
        if (Math.abs(dx) > 0.02) {
          andyImgRef.current.style.transform = dx > 0 ? 'scaleX(1)' : 'scaleX(-1)';
        }
        
        const bobY = Math.sin(Date.now() * 0.004) * 1.5;
        andyRef.current.style.marginTop = `${bobY}px`;

        animState.current = { ...animState.current, currentX, currentY, lastX: currentX };
      }
      animFrameId = requestAnimationFrame(animateAndy);
    };

    animFrameId = requestAnimationFrame(animateAndy);

    return () => cancelAnimationFrame(animFrameId);
  }, { scope: footerRef });

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const targetX = ((e.clientX - rect.left) / rect.width) * 100;
    const targetY = ((e.clientY - rect.top) / rect.height) * 100;

    if (!animState.current.inside) {
      animState.current.inside = true;
      animState.current.currentX += (targetX - animState.current.currentX) * 0.3;
      animState.current.currentY += (targetY - animState.current.currentY) * 0.3;
    }
    
    animState.current.targetX = targetX;
    animState.current.targetY = targetY;
    setFlyMode();
  };

  const handleMouseLeave = () => {
    animState.current.inside = false;
    setIdleMode();

    if (andyRef.current) {
      gsap.killTweensOf(andyRef.current);
      gsap.to(andyRef.current, {
        top: 'auto',
        bottom: '1%',
        left: `${animState.current.currentX}%`,
        marginTop: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  const showCharacterSpeech = (text) => {
    if (!speechBubbleRef.current || !andyRef.current) return;
    setSpeechText(text);
    
    const rect = andyRef.current.getBoundingClientRect();
    speechBubbleRef.current.style.position = 'fixed';
    speechBubbleRef.current.style.left = `${rect.left + rect.width / 2}px`;
    speechBubbleRef.current.style.top = `${rect.top - 70}px`;
    speechBubbleRef.current.style.transform = 'translateX(-50%)';
    speechBubbleRef.current.style.display = 'block';
    speechBubbleRef.current.style.zIndex = '1000';

    gsap.killTweensOf(speechBubbleRef.current);
    gsap.fromTo(speechBubbleRef.current, 
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );

    gsap.to(speechBubbleRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      delay: 3,
      onComplete: () => {
        if (speechBubbleRef.current) {
          speechBubbleRef.current.style.display = 'none';
        }
      }
    });
  };

  const handleHotspotHover = (e, id) => {
    const data = hotspots[id];
    if (tooltipRef.current && data) {
      setTooltipText(data.action);
      tooltipRef.current.style.display = 'block';
      tooltipRef.current.classList.add('visible');
    }
  };

  const handleHotspotMove = (e) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 15}px`;
      tooltipRef.current.style.top = `${e.clientY - 25}px`;
    }
  };

  const handleHotspotLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.remove('visible');
      tooltipRef.current.style.display = 'none';
    }
  };

  const handleHotspotClick = (e, id) => {
    e.stopPropagation();
    const data = hotspots[id];
    if (data) {
      showCharacterSpeech(data.response);
      if (data.execute) data.execute(e);
    }
  };

  const handleTreasureClick = (e) => {
    e.stopPropagation();
    showCharacterSpeech("Treasure unlocked! Opening Watcharine's GitHub Repos...");
    if (treasureRef.current) {
      gsap.to(treasureRef.current, {
        scale: 1.25,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          window.open('https://github.com/inatbalthazar', '_blank');
        }
      });
    }
  };

  return (
    <>
      <footer 
        className="adventure-footer" 
        id="adventure-footer" 
        ref={footerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="adventure-scene">
          <img className="scene-layer" id="adventure-layer-bg" src="/images/solidbg.png" alt="" style={{objectFit:'cover', zIndex:0}} /> 
          <img className="scene-layer" id="adventure-layer-mountains" src="/images/mountainscn.png" alt="" style={{objectFit:'cover', zIndex:1}} /> 
          
          <img 
            className="hotspot-object" id="adventure-sequoia" src="/images/bigtree2.png" alt="Sequoia Tree" 
            style={{position:'absolute', left:'5%', bottom:'15%', height:'85%', width:'auto', objectFit:'contain', objectPosition:'bottom', imageRendering:'pixelated'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-sequoia')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-sequoia')}
          />
          <img 
            className="hotspot-object" id="adventure-tent" src="/images/tent.png" alt="Tent" 
            style={{position:'absolute', left:'57%', bottom:'9%', width:'170px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-tent')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-tent')}
          />
          <img 
            className="hotspot-object" id="adventure-campfire" src="/images/fire.gif" alt="Campfire" 
            style={{position:'absolute', left:'63%', bottom:'13%', width:'190px'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-campfire')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-campfire')}
          /> 
          <img 
            className="hotspot-object" id="adventure-camera" src="/images/paint.png" alt="Paint Palette" 
            style={{position:'absolute', left:'75%', bottom:'10%', width:'60px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-camera')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-camera')}
          />
          <img 
            className="hotspot-object" id="adventure-laptop" src="/images/laptop.png" alt="Laptop" 
            style={{position:'absolute', left:'55%', bottom:'9%', width:'70px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-laptop')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-laptop')}
          />
          <img 
            className="hotspot-object" id="adventure-canteen" src="/images/canteen.png" alt="Canteen" 
            style={{position:'absolute', left:'59%', bottom:'6%', width:'50px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-canteen')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-canteen')}
          />
          <img 
            className="hotspot-object" id="adventure-mud" src="/images/mud.png" alt="Mud" 
            style={{position:'absolute', left:'80%', bottom:'8%', width:'150px', opacity:0.3, imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-mud')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-mud')}
          />
          <img 
            className="hotspot-object" id="adventure-owl" src="/images/owl.png" alt="Owl" 
            style={{position:'absolute', left:'89%', bottom:'49%', width:'60px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-owl')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-owl')}
          />
          <img 
            className="hotspot-object" id="adventure-drone" src="/images/drone.gif" alt="Drone" 
            style={{position:'absolute', left:'60%', top:'10%', width:'110px', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) saturate(.8)'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-drone')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-drone')}
          />

          <div 
            className="hotspot-object" id="adventure-jsd13" title="JSD13 Sign"
            style={{position:'absolute', left:'74.5%', top:'45%', width:'8.5%', height:'11%', zIndex:5, cursor:'pointer'}}
            onMouseEnter={(e) => handleHotspotHover(e, 'adventure-jsd13')} onMouseMove={handleHotspotMove} onMouseLeave={handleHotspotLeave} onClick={(e) => handleHotspotClick(e, 'adventure-jsd13')}
          />

          <div className="adventure-treasure" id="adventure-treasure" ref={treasureRef} onClick={handleTreasureClick}>
            <img src="/images/treasure.gif" alt="Treasure" style={{width:'100%', height:'100%', zIndex:100, bottom:'10%', imageRendering:'pixelated', filter:'brightness(.7) contrast(.85) sepia(.3) hue-rotate(190deg) saturate(.6)'}} />
          </div>
          
          <div className="adventure-character" id="adventure-char-andy" ref={andyRef} style={{position:'absolute', left:'30%', bottom:'1%', width:'90px', zIndex:6}}>
            <img src="/images/andy_still.png" alt="Andy" ref={andyImgRef} />
          </div>
          
        </div>
      </footer>

      <div className="adventure-speech" id="adventure-speech-bubble" ref={speechBubbleRef} style={{display:'none'}}>
        <div className="speech-text">{speechText}</div>
      </div>
      
      <div className="adventure-tooltip" id="adventure-tooltip" ref={tooltipRef}>{tooltipText}</div>
    </>
  );
}

export default AdventureFooter;
