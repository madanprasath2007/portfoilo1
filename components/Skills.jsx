'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

const skills = [
  {
    category: 'Offensive Security',
    icon: '⚔️',
    items: [
      { name: 'Ethical Hacking', level: 85 },
      { name: 'Penetration Testing', level: 78 },
      { name: 'Vulnerability Assessment', level: 75 },
      { name: 'Social Engineering', level: 70 },
    ],
  },
  {
    category: 'Defensive Security',
    icon: '🛡️',
    items: [
      { name: 'Cybersecurity Fundamentals', level: 88 },
      { name: 'Network Security', level: 72 },
      { name: 'Incident Response', level: 65 },
      { name: 'Risk Management', level: 68 },
    ],
  },
  {
    category: 'Tools & Frameworks',
    icon: '🔧',
    items: [
      { name: 'Kali Linux', level: 80 },
      { name: 'Nmap / Wireshark', level: 75 },
      { name: 'Metasploit', level: 70 },
      { name: 'OWASP Top 10', level: 82 },
    ],
  },
];

const tags = [
  'CTF Player', 'ISC2 Candidate', 'CEH Certified', 'Bug Hunter',
  'Network Analysis', 'Web App Security', 'Linux', 'OSINT',
  'Cryptography', 'Malware Analysis', 'Forensics', 'AI Security',
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">02 — Arsenal</p>
        <h2 className="section-title">Technical <span>Skills</span></h2>

        <div className={styles.grid}>
          {skills.map((group, gi) => (
            <div key={gi} className={`glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{group.icon}</span>
                <h3 className={styles.category}>{group.category}</h3>
              </div>
              <div className={styles.bars}>
                {group.items.map((skill, si) => (
                  <div key={si} className={styles.barRow}>
                    <div className={styles.barMeta}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          '--width': visible ? `${skill.level}%` : '0%',
                          '--delay': `${gi * 0.15 + si * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag}
              style={{ '--d': `${i * 0.05}s` }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
