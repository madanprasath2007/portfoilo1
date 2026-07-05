'use client';
import { useEffect, useRef } from 'react';

export default function MatrixRain({ opacity = 0.04 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アイウエオカキクケコ{}[]<>/\\|!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    let cols;
    let drops = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    }
    resize();
    window.addEventListener('resize', resize);

    let rafId;
    function draw() {
      ctx.fillStyle = 'rgba(8, 12, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // gradient from green to cyan across columns
        const ratio = i / cols;
        const r = Math.round(0 + ratio * 0);
        const g = Math.round(255 - ratio * 43);
        const b = Math.round(136 + ratio * 119);
        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
      rafId = requestAnimationFrame(draw);
    }

    // Pause on tab hidden
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibility);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
