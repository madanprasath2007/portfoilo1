'use client';
import styles from './Education.module.css';

const education = [
  {
    school: 'Nandha Engineering College',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science & Engineering',
    period: '2025 — Present',
    location: 'Erode, Tamil Nadu',
    status: 'Current',
    highlights: [
      'Focusing on Cybersecurity & Ethical Hacking specialization',
      'Active member of cybersecurity club & CTF team',
      'Pursuing multiple industry certifications alongside academics',
    ],
    icon: '🎓',
  },
];

export default function Education() {
  return (
    <section id="education" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">06 — Background</p>
        <h2 className="section-title">Education <span>& Training</span></h2>

        <div className={styles.timeline}>
          {education.map((edu, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.dot}>
                <span>{edu.icon}</span>
              </div>

              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardHead}>
                  <div>
                    <h3 className={styles.school}>{edu.school}</h3>
                    <p className={styles.degree}>
                      {edu.degree} — <span className={styles.field}>{edu.field}</span>
                    </p>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.period}>{edu.period}</span>
                    <span className={styles.statusBadge}>{edu.status}</span>
                  </div>
                </div>

                <p className={styles.location}>📍 {edu.location}</p>

                <ul className={styles.highlights}>
                  {edu.highlights.map((h, j) => (
                    <li key={j}>
                      <span className={styles.bullet}>▹</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Future roadmap card */}
          <div className={styles.item}>
            <div className={`${styles.dot} ${styles.dotFuture}`}>
              <span>🚀</span>
            </div>
            <div className={`glass-card ${styles.card} ${styles.roadmapCard}`}>
              <h3 className={styles.school}>Next Goal</h3>
              <p className={styles.degree}>
                OSCP / CEH Master — <span className={styles.field}>Advanced Offensive Security</span>
              </p>
              <div className={styles.roadmapTags}>
                {['OSCP', 'CEH Master', 'Bug Bounty', 'Red Team'].map((t) => (
                  <span key={t} className={styles.roadmapTag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
