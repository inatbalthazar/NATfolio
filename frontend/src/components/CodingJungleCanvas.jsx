import React, { useEffect, useRef, useState } from 'react';

function CodingJungleCanvas({ className = "story-bg-gif" }) {
  const canvasRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer the 145-frame preload until the canvas is about to scroll into view —
  // firing all of it on mount competed for bandwidth with everything else at page load.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let currentFrame = 1;
    let direction = 1; // 1 = forward, -1 = reverse
    const totalFrames = 145;
    const fps = 30; // 30 frames per second
    const frameInterval = 1000 / fps;
    let lastFrameTime = 0;
    let isMounted = true;

    // Cache array for preloaded HTMLImageElements
    const imageCache = new Array(totalFrames);

    // Initial canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;

    // Preload first frame immediately
    const firstImg = new Image();
    firstImg.src = `/codingjungle/codingjungle_001.jpg`;
    firstImg.onload = () => {
      if (!isMounted) return;
      imageCache[0] = firstImg;
      if (firstImg.naturalWidth && firstImg.naturalHeight) {
        canvas.width = firstImg.naturalWidth;
        canvas.height = firstImg.naturalHeight;
      }
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
    };

    // Preload all remaining frames in background
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/codingjungle/codingjungle_${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        imageCache[i - 1] = img;
      };
    }

    const animate = (currentTime) => {
      if (!isMounted) return;

      if (currentTime - lastFrameTime >= frameInterval) {
        lastFrameTime = currentTime;

        const imgToDraw = imageCache[currentFrame - 1];
        if (imgToDraw && imgToDraw.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
        }

        currentFrame += direction;

        // Ping-pong loop logic (forward -> last frame -> reverse -> first frame -> repeat)
        if (currentFrame >= totalFrames) {
          currentFrame = totalFrames;
          direction = -1;
        } else if (currentFrame <= 1) {
          currentFrame = 1;
          direction = 1;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldLoad]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
}

export default CodingJungleCanvas;
