'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ActivityHeatmap.module.css';

/* ── Data ─────────────────────────────────────────────── */
const tracks = [
  { id: 'picoctf',    label: 'picoCTF',      color: '#00ff88', total: 38,  streak: 12, icon: '🚩' },
  { id: 'portswigger',label: 'PortSwigger',  color: '#ff6a2e', total: 24,  streak: 8,  icon: '🕷️' },
  { id: 'internship', label: 'Internship',   color: '#00d4ff', total: 20,  streak: 5,  icon: '💼' },
  { id: 'morning',    label: 'Morning',      color: '#a855f7', total: 63,  streak: 21, icon: '🌅' },
  { id: 'tryhackme',  label: 'TryHackMe',   color: '#ff3e3e', total: 31,  streak: 15, icon: '🎯' },
  { id: 'research',   label: 'Research',     color: '#ffb066', total: 45,  streak: 7,  icon: '📖' },
];

const WEEKS = 15;
const DAYS  = 7;
const TOTAL = WEEKS * DAYS; // 105 cells

/* Deterministic seeded value 0..1 — no hydration mismatch */
const seed = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const levelOf = (i) => { const r = seed(i); return r < 0.18 ? 0 : r < 0.38 ? 1 : r < 0.62 ? 2 : r < 0.82 ? 3 : 4; };

const MONTH_LABELS = ['Apr', 'May', 'Jun', 'Jul'];
const DAY_LABELS   = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
const CELL_COLORS  = ['#0d1a0d', '#003d1f', '#007a3d', '#00bb5c', '#00ff88'];

/* ── Animated counter hook ─────────────────────────── */
function useCountUp(target, duration = 1600, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * p * target)); // ease‑in-square
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return val;
}

/* ── Radar (hexagonal) SVG chart ──────────────────── */
function RadarChart({ active }) {
  const cx = 140, cy = 140, r = 100;
  const n  = tracks.length;
  const points = tracks.map((t, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const ratio = t.total / 65; // normalise to max ≈ 65
    return { x: cx + r * ratio * Math.cos(angle), y: cy + r * ratio * Math.sin(angle), ...t, angle };
  });
  const spokes = tracks.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x2: cx + r * Math.cos(angle), y2: cy + r * Math.sin(angle) };
  });
  const poly = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className={styles.radarWrap}>
      <p className={styles.radarTitle}>Track Distribution</p>
      <svg viewBox="0 0 280 280" className={styles.radarSvg}>
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((s, i) => (
          <polygon key={i}
            points={tracks.map((_, j) => {
              const a = (Math.PI * 2 * j) / n - Math.PI / 2;
              return `${cx + r * s * Math.cos(a)},${cy + r * s * Math.sin(a)}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(0,255,136,0.08)"
            strokeWidth="1"
          />
        ))}
        {/* Spokes */}
        {spokes.map((s, i) => (
          <line key={i} x1={cx} y1={cy} x2={s.x2} y2={s.y2}
            stroke="rgba(0,255,136,0.12)" strokeWidth="1" />
        ))}
        {/* Filled polygon */}
        <polygon points={poly}
          fill="rgba(0,255,136,0.08)"
          stroke="#00ff88"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className={styles.radarPoly}
        />
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4"
            fill={p.color}
            stroke="#080c10"
            strokeWidth="1.5"
            className={styles.radarDot}
          />
        ))}
        {/* Labels */}
        {spokes.map((s, i) => {
          const t = tracks[i];
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          const lx = cx + (r + 22) * Math.cos(angle);
          const ly = cy + (r + 22) * Math.sin(angle);
          return (
            <text key={i} x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="10" fill={t.color} fontFamily="var(--font-mono)"
              className={styles.radarLabel}
            >
              {t.icon}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div className={styles.radarLegend}>
        {tracks.map((t) => (
          <div key={t.id} className={styles.radarLegendItem}>
            <span className={styles.radarLegendDot} style={{ background: t.color }} />
            <span className={styles.radarLegendLabel}>{t.label}</span>
            <span className={styles.radarLegendVal} style={{ color: t.color }}>{t.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Streak leaderboard ────────────────────────────── */
function StreakBoard() {
  const sorted = [...tracks].sort((a, b) => b.streak - a.streak);
  const max = sorted[0].streak;
  return (
    <div className={styles.streakBoard}>
      <p className={styles.streakBoardTitle}>🔥 Streak Leaderboard</p>
      <div className={styles.streakList}>
        {sorted.map((t, i) => (
          <div key={t.id} className={styles.streakRow}>
            <span className={styles.streakRank}
              style={{ color: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'var(--text-muted)' }}>
              #{i + 1}
            </span>
            <span className={styles.streakIcon}>{t.icon}</span>
            <span className={styles.streakName}>{t.label}</span>
            <div className={styles.streakBarTrack}>
              <div className={styles.streakBarFill}
                style={{ '--w': `${(t.streak / max) * 100}%`, '--c': t.color }} />
            </div>
            <span className={styles.streakDays} style={{ color: t.color }}>
              {t.streak}d
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Calendar Heatmap ──────────────────────────────── */
function CalendarGrid() {
  const [tooltip, setTooltip] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  const cells = Array.from({ length: TOTAL }, (_, i) => ({
    index: i,
    level: levelOf(i),
    week: Math.floor(i / DAYS),
    day: i % DAYS,
  }));

  // Month label positions (every ~4 weeks)
  const monthPositions = [0, 4, 8, 12].map((w, i) => ({ week: w, label: MONTH_LABELS[i] }));

  const handleHover = (cell, e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const labels = ['None', 'Light', 'Moderate', 'Active', 'Intense'];
    const daysAgo = TOTAL - 1 - cell.index;
    setTooltip({
      label: labels[cell.level],
      daysAgo,
      level: cell.level,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div ref={gridRef} className={styles.calendarWrap}>
      {/* Month labels */}
      <div className={styles.monthRow}>
        <div className={styles.dayLabelSpacer} />
        <div className={styles.monthLabels}>
          {monthPositions.map((m, i) => (
            <span key={i} className={styles.monthLabel}
              style={{ gridColumn: `${m.week + 1} / ${m.week + 4}` }}>
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridOuter}>
        {/* Day labels */}
        <div className={styles.dayLabels}>
          {DAY_LABELS.map((d, i) => (
            <span key={i} className={styles.dayLabel}>{d}</span>
          ))}
        </div>

        {/* Cells — arranged week‑column by day‑row */}
        <div className={styles.cellGrid}>
          {Array.from({ length: WEEKS }, (_, w) => (
            <div key={w} className={styles.weekCol}>
              {Array.from({ length: DAYS }, (_, d) => {
                const idx = w * DAYS + d;
                const cell = cells[idx];
                const delay = revealed ? `${w * 30 + d * 4}ms` : '999s';
                return (
                  <div
                    key={d}
                    className={`${styles.cell} ${revealed ? styles.cellVisible : ''}`}
                    style={{
                      '--bg': CELL_COLORS[cell.level],
                      '--glow': cell.level > 2 ? `0 0 ${cell.level * 6}px ${CELL_COLORS[cell.level]}80` : 'none',
                      animationDelay: delay,
                    }}
                    onMouseEnter={(e) => handleHover(cell, e)}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.calLegend}>
        <span className={styles.calLegendLabel}>Less</span>
        {CELL_COLORS.map((c, i) => (
          <span key={i} className={styles.calLegendCell} style={{ '--bg': c }} />
        ))}
        <span className={styles.calLegendLabel}>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y - 52 }}>
          <span className={styles.tooltipLevel} style={{ color: CELL_COLORS[tooltip.level] }}>
            {tooltip.label}
          </span>
          <span className={styles.tooltipDays}>
            {tooltip.daysAgo === 0 ? 'Today' : `${tooltip.daysAgo}d ago`}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Main export ───────────────────────────────────── */
export default function ActivityHeatmap() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const totalTasks  = useCountUp(221,  1400, visible);
  const bestStreak  = useCountUp(21,   1200, visible);
  const ctfFlags    = useCountUp(38,   1000, visible);
  const labsDone    = useCountUp(24,   1100, visible);

  const stats = [
    { label: 'Total Completed', value: totalTasks, suffix: '',  color: '#00ff88', icon: '✅' },
    { label: 'Best Streak',     value: bestStreak, suffix: 'd', color: '#a855f7', icon: '🔥' },
    { label: 'CTF Flags',       value: ctfFlags,   suffix: '',  color: '#ffb066', icon: '🚩' },
    { label: 'Labs Solved',     value: labsDone,   suffix: '',  color: '#00d4ff', icon: '🕷️' },
  ];

  return (
    <div ref={ref} className={styles.dashWrap}>
      {/* Header */}
      <div className={styles.dashHeader}>
        <span className={styles.dashTitle}>
          <span className={styles.dashTitleIcon}>📊</span>
          Activity Dashboard
        </span>
        <span className={styles.dashSub}>Live grind metrics — updated daily</span>
      </div>

      {/* Stat counters */}
      <div className={styles.statsRow}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statBox} style={{ '--c': s.color }}>
            <div className={styles.statGlow} />
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>
              {s.value}{s.suffix}
            </span>
            <span className={styles.statLabel}>{s.label}</span>
            <div className={styles.statBar} />
          </div>
        ))}
      </div>

      {/* Main panel: radar + streak + calendar */}
      <div className={styles.mainPanel}>
        <RadarChart />
        <div className={styles.rightPanel}>
          <StreakBoard />
          <CalendarGrid />
        </div>
      </div>

      {/* Terminal footer */}
      <div className={styles.terminalFooter}>
        <span className={styles.termCmd}>$ uptime --hacking</span>
        <span className={styles.termOut}>
          <span style={{ color: '#00ff88' }}>▶</span> 105 days active · {' '}
          <span style={{ color: '#a855f7' }}>🔥 21-day streak</span> · {' '}
          <span style={{ color: '#00d4ff' }}>221 tasks done</span>
        </span>
      </div>
    </div>
  );
}
