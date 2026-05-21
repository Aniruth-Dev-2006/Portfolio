import React, { useEffect, useRef, useState } from 'react';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    
    // Grid settings
    const gridSize = 45; // Size of each square
    let cols = 0;
    let rows = 0;
    let squares = [];

    // Strictly monochrome/grey colors to match the theme perfectly
    const colors = [
      'rgba(255, 255, 255, 1)',   // White
      'rgba(180, 180, 180, 1)',   // Light Grey
      'rgba(100, 100, 100, 1)',   // Mid Grey
      'rgba(60, 60, 60, 1)'       // Dark Grey
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      cols = Math.ceil(width / gridSize) + 1;
      rows = Math.ceil(height / gridSize) + 1;
      
      // Initialize squares state
      squares = Array.from({ length: cols * rows }, () => ({
        x: 0, y: 0, opacity: 0, targetOpacity: 0, color: colors[0]
      }));
      
      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (squares[i]) {
            squares[i].x = x * gridSize;
            squares[i].y = y * gridSize;
          }
          i++;
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw base grid lines (slightly visible so it's not totally flat)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Much brighter grid lines
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Randomly trigger new squares to light up (more active to avoid dullness)
      if (Math.random() < 0.7) { // Trigger more often
        const randomIndex = Math.floor(Math.random() * squares.length);
        if (squares[randomIndex]) {
          squares[randomIndex].targetOpacity = Math.random() * 0.4 + 0.1; // Much brighter (max 0.5)
          squares[randomIndex].color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      // Update and draw glowing squares
      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];
        
        sq.opacity += (sq.targetOpacity - sq.opacity) * 0.05;
        
        if (Math.abs(sq.opacity - sq.targetOpacity) < 0.01 && sq.targetOpacity > 0) {
          sq.targetOpacity = 0; // fade back out
        }

        if (sq.opacity > 0.01) {
          ctx.fillStyle = sq.color.replace('1)', `${sq.opacity})`);
          ctx.fillRect(sq.x + 1, sq.y + 1, gridSize - 2, gridSize - 2);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="premium-bg-container">
      {/* Interactive Flickering Canvas Grid (Monochrome) */}
      <canvas ref={canvasRef} className="premium-bg-canvas"></canvas>
      
      {/* Soft Vignette Overlay to frame the content */}
      <div className="premium-bg-vignette"></div>

      {/* Dynamic Mouse Glow */}
      <div 
        className="premium-mouse-glow"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 45%)`
        }}
      ></div>

      {/* Subtle Noise for matte texture */}
      <div className="premium-noise"></div>
    </div>
  );
};

export default Background;
