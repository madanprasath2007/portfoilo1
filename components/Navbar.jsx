'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activity', href: '#activity' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className={styles.logoPrompt}>$</span>
          <span className={styles.logoText}>madan.sh</span>
          <span className={styles.cursor} />
        </a>

        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}
              onClick={(e) => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenResume}
            className={styles.resumeBtn}
            aria-label="Open resume modal"
          >
            📄 Resume
          </button>
          <a
            href="https://www.linkedin.com/in/madan-prasath-459294367/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Hire Me
          </a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={mobileOpen ? styles.burgerOpen : ''} />
          <span className={mobileOpen ? styles.burgerOpen : ''} />
          <span className={mobileOpen ? styles.burgerOpen : ''} />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobile}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.mobileLink}
              onClick={(e) => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenResume();
            }}
            className={styles.mobileResumeBtn}
          >
            📄 Resume
          </button>
          <a
            href="https://www.linkedin.com/in/madan-prasath-459294367/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
