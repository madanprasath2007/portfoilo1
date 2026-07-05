'use client';
import { useState } from 'react';
import styles from './DailyActivity.module.css';
import ActivityHeatmap from './ActivityHeatmap';

const tracks = [
  {
    id: 'picoctf',
    icon: '🚩',
    title: 'picoCTF',
    subtitle: 'CTF Challenges',
    color: '#00ff88',
    streak: 12,
    total: 38,
    unit: 'flags',
    entries: [
      { label: 'General Skills — Bases', tag: 'Easy', done: true, points: 100 },
      { label: 'Cryptography — Caesar', tag: 'Easy', done: true, points: 100 },
      { label: 'Web — Inspect HTML', tag: 'Easy', done: true, points: 150 },
      { label: 'Forensics — File Types', tag: 'Medium', done: true, points: 200 },
      { label: 'Binary — Buffer Overflow 0', tag: 'Medium', done: false, points: 300 },
      { label: 'Reverse Eng — Safe Opener', tag: 'Medium', done: false, points: 250 },
    ],
  },
  {
    id: 'portswigger',
    icon: '🕷️',
    title: 'PortSwigger',
    subtitle: 'Web Security Labs',
    color: '#ff6a2e',
    streak: 8,
    total: 24,
    unit: 'labs',
    entries: [
      { label: 'SQL Injection — WHERE clause', tag: 'Apprentice', done: true, points: 1 },
      { label: 'XSS — Reflected into HTML', tag: 'Apprentice', done: true, points: 1 },
      { label: 'Auth — Username enum via timing', tag: 'Practitioner', done: true, points: 2 },
      { label: 'CSRF — No defenses', tag: 'Apprentice', done: true, points: 1 },
      { label: 'Path Traversal — Simple case', tag: 'Apprentice', done: false, points: 1 },
      { label: 'XXE — Basic file retrieval', tag: 'Practitioner', done: false, points: 2 },
    ],
  },
  {
    id: 'internship',
    icon: '💼',
    title: 'Internship',
    subtitle: 'Professional Work',
    color: '#00d4ff',
    streak: 5,
    total: 20,
    unit: 'tasks',
    entries: [
      { label: 'Network Recon Report', tag: 'Submitted', done: true, points: null },
      { label: 'Vulnerability Scan — Target A', tag: 'Completed', done: true, points: null },
      { label: 'Write CVE Analysis Doc', tag: 'In Progress', done: false, points: null },
      { label: 'Firewall Rules Review', tag: 'Pending', done: false, points: null },
      { label: 'OWASP Top 10 Presentation', tag: 'Draft', done: false, points: null },
    ],
  },
  {
    id: 'morning',
    icon: '🌅',
    title: 'Morning Series',
    subtitle: 'Daily Learning',
    color: '#a855f7',
    streak: 21,
    total: 63,
    unit: 'sessions',
    entries: [
      { label: 'Linux Privilege Escalation', tag: 'TryHackMe', done: true, points: null },
      { label: 'Nmap Scripting Engine', tag: 'Notes', done: true, points: null },
      { label: 'OSINT Framework Deep Dive', tag: 'Research', done: true, points: null },
      { label: 'Metasploit Meterpreter Basics', tag: 'Lab', done: true, points: null },
      { label: 'Social Engineering Tactics', tag: 'Reading', done: false, points: null },
      { label: 'Wi-Fi Hacking Fundamentals', tag: 'Upcoming', done: false, points: null },
    ],
  },
  {
    id: 'tryhackme',
    icon: '🎯',
    title: 'TryHackMe',
    subtitle: 'Rooms & Paths',
    color: '#ff3e3e',
    streak: 15,
    total: 31,
    unit: 'rooms',
    entries: [
      { label: 'Pre-Security Path', tag: 'Completed', done: true, points: null },
      { label: 'Jr Penetration Tester', tag: 'In Progress', done: false, points: null },
      { label: 'Linux Fundamentals 1-3', tag: 'Completed', done: true, points: null },
      { label: 'Burp Suite: Basics', tag: 'Completed', done: true, points: null },
      { label: 'OWASP Top 10 — 2021', tag: 'Completed', done: true, points: null },
      { label: 'Advent of Cyber 2024', tag: 'In Progress', done: false, points: null },
    ],
  },
  {
    id: 'research',
    icon: '📖',
    title: 'Research & Notes',
    subtitle: 'Self Study',
    color: '#ffb066',
    streak: 7,
    total: 45,
    unit: 'notes',
    entries: [
      { label: 'CVE-2024-3400 Analysis', tag: 'Published', done: true, points: null },
      { label: 'Kerberos Attack Paths', tag: 'Notes', done: true, points: null },
      { label: 'Phishing Kit Dissection', tag: 'WIP', done: false, points: null },
      { label: 'IDOR Vulnerability Patterns', tag: 'Draft', done: true, points: null },
      { label: 'Cloud Pentesting Basics', tag: 'Reading', done: false, points: null },
    ],
  },
];

export default function DailyActivity() {
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <section id="activity" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">05 — Grind Log</p>
        <h2 className="section-title">Daily <span>Activity</span></h2>

        {/* Summary bar */}
        <div className={styles.summaryBar}>
          {tracks.map((t) => (
            <button
              key={t.id}
              className={`${styles.summaryChip} ${activeTrack === t.id ? styles.active : ''}`}
              style={{ '--c': t.color }}
              onClick={() => setActiveTrack(activeTrack === t.id ? null : t.id)}
            >
              <span className={styles.chipIcon}>{t.icon}</span>
              <span className={styles.chipLabel}>{t.title}</span>
              <span className={styles.chipCount}>{t.total}</span>
            </button>
          ))}
        </div>

        {/* Kanban columns */}
        <div className={styles.board}>
          {tracks
            .filter((t) => activeTrack === null || t.id === activeTrack)
            .map((track) => (
              <div
                key={track.id}
                className={styles.column}
                style={{ '--c': track.color }}
              >
                {/* Column header */}
                <div className={styles.colHeader}>
                  <div className={styles.colIcon}>{track.icon}</div>
                  <div className={styles.colMeta}>
                    <h3 className={styles.colTitle}>{track.title}</h3>
                    <p className={styles.colSub}>{track.subtitle}</p>
                  </div>
                  <div className={styles.colStats}>
                    <div className={styles.streak}>
                      <span className={styles.streakFire}>🔥</span>
                      <span className={styles.streakNum}>{track.streak}</span>
                    </div>
                    <span className={styles.streakLabel}>day streak</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className={styles.progressWrap}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{
                        '--pct': `${Math.round((track.entries.filter((e) => e.done).length / track.entries.length) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className={styles.progressLabel}>
                    {track.entries.filter((e) => e.done).length}/{track.entries.length} this week
                  </span>
                </div>

                {/* Task cards */}
                <div className={styles.cards}>
                  {track.entries.map((entry, i) => (
                    <div
                      key={i}
                      className={`${styles.taskCard} ${entry.done ? styles.done : styles.todo}`}
                    >
                      <span className={styles.taskCheck}>
                        {entry.done ? (
                          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="var(--c)" strokeWidth="1.5" />
                            <polyline points="4.5,8.5 7,11 11.5,5.5" stroke="var(--c)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="#3a4a5a" strokeWidth="1.5" />
                          </svg>
                        )}
                      </span>
                      <span className={`${styles.taskLabel} ${entry.done ? styles.taskDoneText : ''}`}>
                        {entry.label}
                      </span>
                      <div className={styles.taskRight}>
                        {entry.points && (
                          <span className={styles.points}>+{entry.points}pts</span>
                        )}
                        <span className={styles.tag}>{entry.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column footer */}
                <div className={styles.colFooter}>
                  <span className={styles.totalBadge}>
                    {track.total} {track.unit} total
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Activity Dashboard */}
        <ActivityHeatmap />
      </div>
    </section>
  );
}
