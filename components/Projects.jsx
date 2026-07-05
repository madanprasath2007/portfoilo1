'use client';
import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Valkyrie Recon: Custom Network Scanner',
    description:
      'A multi-threaded active reconnaissance utility that scans IP ranges, discovers active hosts, conducts TCP/UDP service banners grabs, and maps network topologies. Generates structured JSON reports for security audits.',
    tech: ['Python', 'Socket Programming', 'JSON Parser', 'Scapy'],
    role: 'Lead Developer',
    type: 'Security Tool',
  },
  {
    title: 'KeyShield: Heuristic Keylogger Detector',
    description:
      'Offensive security mitigation tool that hooks into OS key events and analyses input frequencies and target processes using heuristics to alert users to background unauthorized spy software.',
    tech: ['C++', 'Windows APIs', 'Hooking', 'Anti-Malware'],
    role: 'Security Researcher',
    type: 'Defensive Security',
  },
  {
    title: 'Sentinel: AES-256 Encrypted Forensic Vault',
    description:
      'A cryptographic secure storage vault using AES-256-GCM. Features multi-factor authentication, secure key derivation (PBKDF2), and a strict overwrite/shred function for zero-residual disk data.',
    tech: ['React', 'Web Crypto API', 'NodeJS', 'AES-GCM'],
    role: 'Developer',
    type: 'Cryptography',
  },
];

const PRESETS = {
  '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
  '098f6bcd4621d373cade4e832627b4f6': 'test',
  '21232f297a57a5a743894a0e4a801fc3': 'admin',
  'e10adc3949ba59abbe56e057f20f883e': '123456',
  '5a105e8b9d40e1329780d62ea2265d8a': 'hacker',
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('showcase'); // showcase | labs
  const [scanIp, setScanIp] = useState('192.168.1.104');
  const [scanLog, setScanLog] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hashInput, setHashInput] = useState('5f4dcc3b5aa765d61d8327deb882cf99');
  const [decryptResult, setDecryptResult] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Simulated scan process
  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanLog([]);
    
    const logs = [
      `[*] Initializing active reconnaissance on target ${scanIp}...`,
      `[+] Target responded. ICMP Ping Echo latency: 12ms.`,
      `[*] Commencing multi-threaded TCP SYN port scanning (Ports 1-1024)...`,
      `[+] Port 22/tcp [OPEN]  -> SSH-2.0-OpenSSH_9.2p1 Debian`,
      `[-] Port 23/tcp [CLOSED] -> Telnet`,
      `[+] Port 80/tcp [OPEN]  -> nginx 1.22.1 (Apache emulation)`,
      `[+] Port 443/tcp [OPEN] -> nginx 1.22.1 (SSL/TLS V1.3)`,
      `[-] Port 445/tcp [FILTERED] -> SMB Active Directory`,
      `[+] Port 8080/tcp [OPEN] -> Apache Tomcat/10.1.7 (Unauthorized access risk!)`,
      `[*] Vulnerability assessment complete. Target OS: Linux 5.10.x.`,
      `[!] WARNING: Outdated Tomcat service detected on port 8080. Potential CVE-2023-28708 exposure.`,
      `[+] Scan sequence successfully finalized. Output saved.`,
    ];

    logs.forEach((line, index) => {
      setTimeout(() => {
        setScanLog((prev) => [...prev, line]);
        if (index === logs.length - 1) {
          setIsScanning(false);
        }
      }, index * 450);
    });
  };

  // Simulated hash cracking
  const startDecrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(false);
    setIsDecrypting(true);
    setDecryptResult('');

    setTimeout(() => {
      const cleanHash = hashInput.trim().toLowerCase();
      if (PRESETS[cleanHash]) {
        setDecryptResult(`[+] HASH CRACKED SUCCESSFULLY!\nPlaintext match: "${PRESETS[cleanHash]}"`);
      } else {
        setDecryptResult(`[-] ERROR: Wordlist search complete. No match found for hash "${cleanHash}".\nTry one of: \n- 5f4dcc3b5aa765d61d8327deb882cf99 (password)\n- 098f6bcd4621d373cade4e832627b4f6 (test)\n- 5a105e8b9d40e1329780d62ea2265d8a (hacker)`);
      }
      setIsDecrypting(false);
    }, 1200);
  };

  return (
    <section id="projects" className={styles.wrapper}>
      <div className="section">
        <p className="section-label">04 — Offensive / Defensive Labs</p>
        <h2 className="section-title">Projects <span>& Interactive Labs</span></h2>

        {/* Tab Selection */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'showcase' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('showcase')}
          >
            📁 Projects Showcase
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'labs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('labs')}
          >
            ⚡ Live Cyber Simulator Labs
          </button>
        </div>

        {/* Showcase Tab */}
        {activeTab === 'showcase' && (
          <div className={styles.grid}>
            {projects.map((proj, i) => (
              <div key={i} className={`glass-card ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.projType}>{proj.type}</span>
                  <span className={styles.projRole}>{proj.role}</span>
                </div>
                <h3 className={styles.projTitle}>{proj.title}</h3>
                <p className={styles.projDesc}>{proj.description}</p>
                <div className={styles.techStack}>
                  {proj.tech.map((t, j) => (
                    <span key={j} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Cyber Labs Tab */}
        {activeTab === 'labs' && (
          <div className={styles.labsContainer}>
            {/* Port Scanner Sim */}
            <div className={`glass-card ${styles.labBox}`}>
              <div className={styles.labHeader}>
                <span className={styles.labIcon}>🔍</span>
                <div>
                  <h3 className={styles.labTitle}>Subnet TCP Port Scanner</h3>
                  <p className={styles.labDesc}>Simulate subnet discovery & banner grabbing</p>
                </div>
              </div>

              <div className={styles.labInputRow}>
                <input
                  type="text"
                  value={scanIp}
                  onChange={(e) => setScanIp(e.target.value)}
                  className={styles.labInput}
                  placeholder="Target IP Address..."
                  disabled={isScanning}
                />
                <button
                  onClick={startScan}
                  className={styles.labButton}
                  disabled={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Launch Recon'}
                </button>
              </div>

              <div className={styles.terminalWindow}>
                <div className={styles.terminalBar}>
                  <span>root@recon-agent:~#</span>
                </div>
                <div className={styles.terminalBody}>
                  {scanLog.length === 0 && (
                    <span className={styles.terminalPlaceholder}>Enter target IP and launch scan simulation...</span>
                  )}
                  {scanLog.map((log, index) => (
                    <div
                      key={index}
                      className={`${styles.logLine} ${
                        log.startsWith('[+]')
                          ? styles.logGreen
                          : log.startsWith('[!')
                          ? styles.logRed
                          : styles.logDim
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MD5 Hash Decrypter Sim */}
            <div className={`glass-card ${styles.labBox}`}>
              <div className={styles.labHeader}>
                <span className={styles.labIcon}>🔑</span>
                <div>
                  <h3 className={styles.labTitle}>MD5 Wordlist Attack Simulator</h3>
                  <p className={styles.labDesc}>Simulate a dictionary attack against MD5 hashes</p>
                </div>
              </div>

              <div className={styles.labInputRow}>
                <input
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  className={styles.labInput}
                  placeholder="MD5 Hash..."
                  disabled={isDecrypting}
                />
                <button
                  onClick={startDecrypt}
                  className={styles.labButton}
                  disabled={isDecrypting}
                >
                  {isDecrypting ? 'Cracking...' : 'Decrypt Hash'}
                </button>
              </div>

              <div className={styles.terminalWindow}>
                <div className={styles.terminalBar}>
                  <span>root@hashcat:~# hashcat -m 0 hash.txt dict.txt</span>
                </div>
                <div className={styles.terminalBody}>
                  {!decryptResult && !isDecrypting && (
                    <span className={styles.terminalPlaceholder}>Provide an MD5 hash to perform a dictionary attack...</span>
                  )}
                  {isDecrypting && (
                    <div className={styles.logLine}>
                      [*] Loading wordlist.txt (14,354,231 entries)...<br />
                      [*] Commencing multi-core cracking pipeline...<br />
                      [*] Keyspace progress: [██████████████░░░░░░] 74%...
                    </div>
                  )}
                  {decryptResult && (
                    <pre className={styles.crackResult}>{decryptResult}</pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
