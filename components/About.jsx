'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './About.module.css';

/* ─── Script ─────────────────────────────────────────────────────── */
const SCRIPT = [
  {
    cmd: 'whoami',
    output: 'Madan Prasath',
    outputColor: '#00ff88',
  },
  {
    cmd: 'cat location.txt',
    output: 'Chennai, Tamil Nadu, India',
    outputColor: '#00d4ff',
  },
  {
    cmd: 'cat status.txt',
    output: 'Student @ Nandha Engineering College (2025–Present)',
    outputColor: '#e8f5ff',
  },
  {
    cmd: 'cat mission.txt',
    output: 'Breaking systems ethically to make the digital world safer.',
    outputColor: '#ffb066',
  },
  {
    cmd: 'cat interests.txt',
    output: 'Ethical Hacking  •  Penetration Testing  •  Cybersecurity Research',
    outputColor: '#a855f7',
  },
];

const TYPE_SPEED  = 42;   // ms per character while typing command
const OUTPUT_DELAY = 180; // ms after command finishes before output appears
const LINE_GAP    = 340;  // ms between output appearing and next prompt

/* ─── Hook: runs the typewriter sequence once `started` is true ─── */
function useTypewriter(started) {
  const [lines, setLines]         = useState([]); // committed lines (cmd+output done)
  const [currentCmd, setCurrentCmd] = useState('');  // chars typed so far for active cmd
  const [phase, setPhase]         = useState('idle'); // idle | typing | output | gap
  const [lineIdx, setLineIdx]     = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const timers = useRef([]);

  const clear = () => timers.current.forEach(clearTimeout);

  const schedule = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    if (!started || phase !== 'idle') return;
    const t = setTimeout(() => setPhase('typing'), 0);
    return () => clearTimeout(t);
  }, [started, phase]);

  useEffect(() => {
    if (phase !== 'typing') return;
    const entry = SCRIPT[lineIdx];
    if (!entry) return;

    let charIdx = 0;
    const t = setTimeout(() => setCurrentCmd(''), 0);

    const typeNext = () => {
      charIdx++;
      setCurrentCmd(entry.cmd.slice(0, charIdx));
      if (charIdx < entry.cmd.length) {
        schedule(typeNext, TYPE_SPEED + Math.random() * 18); // tiny jitter
      } else {
        // Command fully typed → show output after delay
        schedule(() => {
          setShowOutput(true);
          setPhase('output');
        }, OUTPUT_DELAY);
      }
    };
    schedule(typeNext, TYPE_SPEED);

    return () => {
      clearTimeout(t);
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lineIdx]);

  useEffect(() => {
    if (phase !== 'output') return;
    const entry = SCRIPT[lineIdx];

    schedule(() => {
      // Commit this line as done
      setLines((prev) => [...prev, { ...entry, typedCmd: entry.cmd }]);
      setCurrentCmd('');
      setShowOutput(false);
      setPhase('gap');
    }, LINE_GAP);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lineIdx]);

  useEffect(() => {
    if (phase !== 'gap') return;
    const next = lineIdx + 1;

    schedule(() => {
      setLineIdx(next);
      setPhase(next < SCRIPT.length ? 'typing' : 'done');
    }, 80);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lineIdx]);

  useEffect(() => () => clear(), []);

  return { lines, currentCmd, showOutput, lineIdx, phase };
}

/* ─── Terminal component ─────────────────────────────────────────── */
function LiveTerminal() {
  const [started, setStarted] = useState(false);
  const wrapRef  = useRef(null);
  const bodyRef  = useRef(null);

  // Start when scrolled into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const { lines, currentCmd, showOutput, lineIdx, phase } = useTypewriter(started);

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, currentCmd, showOutput]);

  const activeEntry = SCRIPT[lineIdx];

  return (
    <div ref={wrapRef} className={styles.terminal}>
      {/* macOS-style title bar */}
      <div className={styles.termBar}>
        <div className={styles.termDots}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>
        <span className={styles.termTitle}>
          <span className={styles.termUser}>madan</span>
          <span className={styles.termAt}>@</span>
          <span className={styles.termHost}>kali</span>
          <span className={styles.termColon}>:</span>
          <span className={styles.termPath}>~</span>
        </span>
        <div className={styles.termTopRight}>
          <span className={styles.termLive} />
          LIVE
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className={styles.termBody}>
        {/* Welcome line */}
        {started && (
          <div className={styles.welcomeLine}>
            <span className={styles.welcome}>
              Kali GNU/Linux 2024.4 — kernel 6.6.9-amd64
            </span>
          </div>
        )}

        {/* Committed lines */}
        {lines.map((line, i) => (
          <div key={i} className={styles.lineBlock}>
            <div className={styles.promptLine}>
              <Prompt />
              <span className={styles.cmdText}>{line.typedCmd}</span>
            </div>
            <div
              className={styles.outputLine}
              style={{ '--oc': line.outputColor }}
            >
              {line.output}
            </div>
          </div>
        ))}

        {/* Active typing line */}
        {started && phase !== 'idle' && phase !== 'done' && (
          <div className={styles.lineBlock}>
            <div className={styles.promptLine}>
              <Prompt />
              <span className={styles.cmdText}>{currentCmd}</span>
              <span className={styles.caret} />
            </div>
            {showOutput && activeEntry && (
              <div
                className={`${styles.outputLine} ${styles.outputReveal}`}
                style={{ '--oc': activeEntry.outputColor }}
              >
                {activeEntry.output}
              </div>
            )}
          </div>
        )}

        {/* Final idle prompt */}
        {phase === 'done' && (
          <div className={styles.promptLine}>
            <Prompt />
            <span className={styles.caret} />
          </div>
        )}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className={styles.prompt}>
      <span className={styles.promptUser}>madan</span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptHost}>kali</span>
      <span className={styles.promptColon}>:</span>
      <span className={styles.promptPath}>~</span>
      <span className={styles.promptDollar}>$&nbsp;</span>
    </span>
  );
}

/* ─── About section ──────────────────────────────────────────────── */
export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <div className="section">
        <p className="section-label">01 — Identity</p>
        <h2 className="section-title">About <span>Me</span></h2>

        <div className={styles.grid}>
          <LiveTerminal />

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { value: '4',    label: 'Certifications Earned', icon: '🎯' },
              { value: '319',  label: 'LinkedIn Connections',  icon: '🔗' },
              { value: '2025', label: 'Started Security Journey', icon: '🚀' },
              { value: '∞',   label: 'Curiosity Level',        icon: '🔬' },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statIcon}>{s.icon}</span>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
