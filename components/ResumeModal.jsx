'use client';
import styles from './ResumeModal.module.css';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls */}
        <div className={styles.controls}>
          <button onClick={handlePrint} className={styles.ctrlBtn}>
            🖨️ Print / Save PDF
          </button>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕ Close
          </button>
        </div>

        {/* Printable Resume Sheet */}
        <div className={styles.sheet} id="printable-resume">
          <header className={styles.header}>
            <h1 className={styles.name}>Madan Prasath</h1>
            <p className={styles.title}>Ethical Hacker & Cybersecurity Specialist</p>
            <div className={styles.contactRow}>
              <span>📧 madanprasath2007@gmail.com</span>
              <span>📍 Chennai, Tamil Nadu, India</span>
              <span>🔗 linkedin.com/in/madan-prasath-459294367</span>
            </div>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Summary</h2>
            <p className={styles.bodyText}>
              Cybersecurity enthusiast and Certified Ethical Hacker (CEH) with a deep passion for offensive security, active reconnaissance, vulnerability assessment, and malware analysis. Highly proactive and continuous learner with multiple industry credentials, seeking opportunities to collaborate on security audits, penetration testing, and incident response teams.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>Nandha Engineering College</span>
                <span className={styles.itemDate}>2025 — Present</span>
              </div>
              <p className={styles.itemSubtitle}>Bachelor of Engineering in Computer Science & Engineering</p>
              <ul className={styles.itemBulletList}>
                <li>Specialized focus on Cybersecurity fundamentals, networking protocols, and systems infrastructure.</li>
                <li>Active participant in Capture The Flag (CTF) challenges and cybersecurity research clubs.</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <div className={styles.itemGrid}>
              <div>
                <strong>Certified Ethical Hacker (CEH)</strong> - HackupTechnology (Jul 2026)
                <br />
                <span className={styles.subInfo}>Credential ID: HACKUP1105741</span>
              </div>
              <div>
                <strong>ISC2 Candidate (CC)</strong> - ISC2 (Jun 2026 — Jun 2027)
                <br />
                <span className={styles.subInfo}>Certified in Cybersecurity Candidate</span>
              </div>
              <div>
                <strong>Hack2Hire Hackathon</strong> - UnsaidTalks Education (Feb 2026)
                <br />
                <span className={styles.subInfo}>Credential ID: 2CE025B73AEA</span>
              </div>
              <div>
                <strong>Ethical Hacking & Cyber Security</strong> - Professional Training (Jan 2026)
                <br />
                <span className={styles.subInfo}>Reconnaissance, Nmap, Wireshark Labs</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              <div>
                <strong>Offensive:</strong> Ethical Hacking, Penetration Testing, Vulnerability Scan, Social Engineering, Reconnaissance.
              </div>
              <div>
                <strong>Defensive:</strong> Cybersecurity Fundamentals, Network Security, Incident Response, Risk Management.
              </div>
              <div>
                <strong>Tools:</strong> Kali Linux, Nmap, Wireshark, Metasploit, Burp Suite, Scapy, OSINT Frameworks.
              </div>
              <div>
                <strong>Languages & Dev:</strong> Python, C++, HTML/CSS, JavaScript, React.
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Projects</h2>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <strong>Valkyrie Recon: Custom Network Scanner</strong>
                <span className={styles.itemDate}>Python, Sockets, Scapy</span>
              </div>
              <p className={styles.bodyText}>
                Developed active network scanner mapping subnets, retrieving service banners, identifying active hosts, and mapping system fingerprints.
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemHeader}>
                <strong>KeyShield: Heuristic Keylogger Detector</strong>
                <span className={styles.itemDate}>C++, Windows APIs, Hooking</span>
              </div>
              <p className={styles.bodyText}>
                Created defensive tool detecting keystroke hooking patterns dynamically and warning users of unauthorized hardware/software inputs.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
