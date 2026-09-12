import Link from "next/link";
export const resume = "/rishabh-gupta-resume.pdf";
export const socials = [
  ["GitHub", "https://github.com/rishabhguptajs"],
  ["LinkedIn", "https://linkedin.com/in/rishabhguptajs"],
  ["X / Twitter", "https://x.com/rishabhguptajs"],
  ["Instagram", "https://instagram.com/daldalikeeda"],
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="eyebrow mb-5">A good idea deserves a conversation.</p>
            <Link href="/contact" className="footer-invite">
              Let’s make
              <br />
              <em>something.</em> ↗
            </Link>
          </div>
          <div className="footer-links grid grid-cols-2 gap-x-10 gap-y-1">
            {socials.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name} ↗
              </a>
            ))}
            <a href={resume} target="_blank" rel="noopener noreferrer">
              Résumé ↗
            </a>
            <Link href="/resources">Reading room ↗</Link>
            <a
              href="https://cal.com/rishabhguptajs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rishabh Gupta</span>
          <span>Curiosity is a renewable resource.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
