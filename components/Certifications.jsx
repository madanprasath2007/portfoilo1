'use client';
import styles from './Certifications.module.css';

const certs = [
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'HackupTechnology',
    date: 'Jul 2026',
    credentialId: 'HACKUP1105741',
    credentialUrl: 'http://www.hackuptechnology.com',
    description:
      'Credential validating knowledge of ethical hacking techniques, tools, and methodologies used by professional penetration testers. Specialized focus on system compromise, vulnerability assessment, and scanning networks.',
    badge: '🎯',
    accent: '#00ff88',
    tags: ['Penetration Testing', 'System Hacking', 'Vulnerability Assessment'],
  },
  {
    title: 'ISC2 Candidate',
    issuer: 'ISC2 — (CC) Certified in Cybersecurity',
    date: 'Jun 2026',
    credentialId: 'CC Candidate',
    credentialUrl: 'https://www.credly.com/badges/1115ea53-e977-4c13-802b-f9ed0a290acb/linked_in_profile',
    description:
      'Active member of the ISC2 global cyber community, preparing for the Certified in Cybersecurity (CC) credential, the entry-level gold standard validation of professional security concepts and operations.',
    badge: '🔐',
    accent: '#a855f7',
    tags: ['ISC2', 'CC Candidate', 'Access Control', 'Security Operations'],
  },
  {
    title: 'Hack2Hire: AI-Powered Interview Hackathon',
    issuer: 'UnsaidTalks Education',
    date: 'Feb 2026',
    credentialId: '2CE025B73AEA',
    credentialUrl: 'https://app.credissuer.com/credentials/verify/980bf8009faae7df76c83d8c9314161849dddcc4774beb389b77668a567503d0',
    description:
      'Recognized achiever in the AI-powered technical hiring and problem-solving competition. Developed and validated real-time problem solving, critical thinking, and algorithmic execution.',
    badge: '🏆',
    accent: '#ffb066',
    tags: ['Hackathon', 'AI Integration', 'Problem Solving'],
  },
  {
    title: 'Ethical Hacking & Cyber Security',
    issuer: 'Professional Certification & Training',
    date: 'Jan 2026',
    credentialId: 'Hands-on Labs',
    credentialUrl: 'https://www.linkedin.com/in/madan-prasath-459294367/',
    description:
      'Hands-on lab training covering offensive and defensive cybersecurity concepts, active reconnaissance (Nmap), packet inspection (Wireshark), and network perimeter security.',
    badge: '🛡️',
    accent: '#00d4ff',
    tags: ['Cybersecurity', 'Network Security', 'Wireshark', 'Nmap'],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">03 — Credentials</p>
        <h2 className="section-title">Certifications <span>& Credentials</span></h2>

        <div className={styles.grid}>
          {certs.map((cert, i) => (
            <article
              key={i}
              className={styles.card}
              style={{ '--accent': cert.accent, '--delay': `${i * 0.1}s` }}
            >
              <div className={styles.cardTop}>
                <div className={styles.badge}>{cert.badge}</div>
                <div className={styles.meta}>
                  <span className={styles.date}>{cert.date}</span>
                  <div className={styles.verifiedBadge}>
                    <span className={styles.verifiedDot} />
                    Verified
                  </div>
                </div>
              </div>

              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.issuer}>{cert.issuer}</p>
              
              {cert.credentialId && (
                <p className={styles.credId}>
                  Credential ID: <code>{cert.credentialId}</code>
                </p>
              )}

              <p className={styles.description}>{cert.description}</p>

              <div className={styles.tags}>
                {cert.tags.map((t, j) => (
                  <span key={j} className={styles.tag}>{t}</span>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.verifyBtn}
                >
                  Verify Credential
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
                  </svg>
                </a>
              )}

              <div className={styles.glowLine} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
