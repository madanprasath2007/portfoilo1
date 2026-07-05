'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/madan-prasath-459294367/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    label: 'Email',
    href: 'mailto:madanprasath2007@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#00ff88',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('madanprasath2007@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">07 — Connect</p>
        <h2 className="section-title">Get In <span>Touch</span></h2>

        <div className={styles.inner}>
          {/* CTA card */}
          <div className={`glass-card ${styles.cta}`}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaIcon}>👾</div>
            <h3 className={styles.ctaTitle}>Let&apos;s Talk Security</h3>
            <p className={styles.ctaText}>
              Whether you&apos;re looking for a security intern, collaborator on a CTF team,
              or just want to geek out about cybersecurity — I&apos;m always open to new
              connections and opportunities.
            </p>

            <div className={styles.emailRow}>
              <span className={styles.emailText}>madanprasath2007@gmail.com</span>
              <button className={styles.copyBtn} onClick={copyEmail} aria-label="Copy email">
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
              {copied && <span className={styles.copiedMsg}>Copied!</span>}
            </div>

            <div className={styles.socials}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  style={{ '--color': s.color }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Side facts */}
          <div className={styles.facts}>
            {[
              { label: 'Response time', value: '< 24 hours', icon: '⚡' },
              { label: 'Open to', value: 'Internships & Collabs', icon: '🤝' },
              { label: 'Available for', value: 'CTF Teams & Projects', icon: '🏁' },
              { label: 'Located in', value: 'Chennai, TN, India', icon: '📍' },
            ].map((f, i) => (
              <div key={i} className={styles.fact}>
                <span className={styles.factIcon}>{f.icon}</span>
                <div>
                  <p className={styles.factLabel}>{f.label}</p>
                  <p className={styles.factValue}>{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerMono}>{"// madan.prasath"}</span>
        <span className={styles.footerCopy}>© 2025 Madan Prasath. Built with 💚 & code.</span>
        <span className={styles.footerMono}>Ethical Hacker & Builder</span>
      </footer>
    </section>
  );
}
