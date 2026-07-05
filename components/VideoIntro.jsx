'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';

const SOUND_HINT_TIMEOUT = 4500;

export default function VideoIntro({
  videoSrc = '/videos/madan-intro.mp4',
  eyebrow = 'Frontend Engineer & Digital Craftsman',
  firstName = 'Madan',
  lastName = 'P',
  subtitle = 'Building cinematic, high-performance web experiences at the intersection of design, motion, and code.',
  nextSectionId = 'next-section',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  const eyebrowRef = useRef(null);
  const nameFirstRef = useRef(null);
  const nameLastRef = useRef(null);
  const subtitleRef = useRef(null);
  const controlsRef = useRef(null);
  const scrollRef = useRef(null);
  const frameRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // ---- GSAP entrance sequence ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.out' }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 24, letterSpacing: '0.05em' },
          { opacity: 1, y: 0, letterSpacing: '0.32em', duration: 1 },
          '-=0.7'
        )
        .fromTo(
          nameFirstRef.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
          '-=0.5'
        )
        .fromTo(
          nameLastRef.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
          '-=0.85'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          controlsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ---- auto-hide the "tap for sound" badge ----
  useEffect(() => {
    if (!showSoundHint) return undefined;
    const id = setTimeout(() => setShowSoundHint(false), SOUND_HINT_TIMEOUT);
    return () => clearTimeout(id);
  }, [showSoundHint]);

  // ---- keep play/pause icon state honest ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      bgVideo?.play();
    } else {
      video.pause();
      bgVideo?.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
    setShowSoundHint(false);
  }, []);

  const scrollToNext = useCallback(() => {
    const target = document.getElementById(nextSectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, [nextSectionId]);

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Intro">
      <div ref={frameRef} className={styles.frame}>
        {/* ambient blurred duplicate, always muted, purely atmospheric */}
        <div className={styles.bgVideoWrap} aria-hidden="true">
          <video
            ref={bgVideoRef}
            className={styles.bgVideo}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* cinematic particle atmosphere */}
        <CinematicLayer className={styles.particleLayer} />

        {/* foreground talking-head video */}
        <div className={styles.videoWrap}>
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
          />
        </div>

        {/* readability gradients */}
        <div className={styles.gradientBottom} />
        <div className={styles.gradientTop} />
        <div className={styles.vignette} />

        {/* content */}
        <div className={styles.content}>
          <span ref={eyebrowRef} className={styles.eyebrow}>
            {eyebrow}
          </span>

          <h1 className={styles.name}>
            <span ref={nameFirstRef} className={styles.nameLine}>
              {firstName}
            </span>
            <span ref={nameLastRef} className={styles.nameLine}>
              {lastName}
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            {subtitle}
          </p>
        </div>

        {/* glass controls */}
        <div ref={controlsRef} className={styles.controls}>
          <button
            type="button"
            className={styles.glassButton}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            type="button"
            className={styles.glassButton}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <MuteIcon /> : <UnmuteIcon />}
          </button>

          {showSoundHint && (
            <span className={styles.soundHint} onClick={toggleMute} role="presentation">
              <span className={styles.soundHintDot} />
              Tap for sound
            </span>
          )}
        </div>

        {/* scroll cue */}
        <button
          ref={scrollRef}
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          <span className={styles.scrollWave}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className={styles.scrollLabel}>Scroll</span>
        </button>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.5v11l10-5.5-10-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M2 6h2.6L9 3v10L4.6 10H2V6z" fill="currentColor" />
      <path d="M11 5.5a4 4 0 010 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
      <path d="M12.6 12.6L4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
      <path d="M2 6h2.6L9 3v10L4.6 10H2V6z" fill="currentColor" />
      <path d="M11 5.3a4.2 4.2 0 010 5.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12.8 3.6a7.8 7.8 0 010 8.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
