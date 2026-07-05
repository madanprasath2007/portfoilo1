'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CinematicLayer
 * A transparent, GPU-light Three.js overlay that renders slow-drifting
 * warm-orange / white bokeh particles with additive blending and a
 * gentle mouse-parallax camera move. Purely decorative — pointer events
 * pass through to whatever sits beneath it.
 */
export default function CinematicLayer({ className, particleCount = 140 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- soft radial sprite so points read as glowing bokeh, not squares ---
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,205,150,0.55)');
    gradient.addColorStop(1, 'rgba(255,150,80,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // --- particle field ---
    const COUNT = particleCount;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const offsets = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const warm = new THREE.Color(0xff8a3d);
    const white = new THREE.Color(0xfff3e6);
    const cool = new THREE.Color(0x5b8cff);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.15 + Math.random() * 0.35;
      offsets[i] = Math.random() * Math.PI * 2;

      const roll = Math.random();
      let c;
      if (roll < 0.55) c = warm.clone().lerp(white, Math.random() * 0.5);
      else if (roll < 0.85) c = white.clone();
      else c = cool.clone().lerp(white, 0.4);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const basePositions = positions.slice();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: spriteTexture,
      transparent: true,
      opacity: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- mouse parallax state ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const clock = new THREE.Clock();
    let frameId;
    let isVisible = true;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        arr[ix + 1] = basePositions[ix + 1] + Math.sin(t * speeds[i] + offsets[i]) * 0.6;
        arr[ix] = basePositions[ix] + Math.cos(t * speeds[i] * 0.6 + offsets[i]) * 0.3;
      }
      posAttr.needsUpdate = true;

      camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.7 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // pause rendering when tab is hidden (saves battery / GPU)
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
