import './globals.css';

export const metadata = {
  title: 'Madan Prasath — Ethical Hacker & Cybersecurity Enthusiast',
  description:
    'CEH certified ethical hacker and ISC2 candidate based in Chennai. Breaking systems ethically to make the digital world safer.',
  keywords: 'Madan Prasath, Ethical Hacker, Cybersecurity, CEH, Penetration Testing, Chennai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
