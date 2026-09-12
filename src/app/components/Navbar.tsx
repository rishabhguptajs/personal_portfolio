"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MotionToggle from "./MotionToggle";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header" data-home={pathname === "/"}>
      <nav
        aria-label="Main navigation"
        className="shell flex items-center justify-between gap-4"
      >
        <Link href="/" className="wordmark" aria-label="Rishabh Gupta home">
          rg<span>✳</span>
        </Link>
        <span className="nav-caption font-mono text-[10px] uppercase tracking-widest">
          Independent mind.
          <br />
          Full-stack craft.
        </span>
        <div className="flex items-center gap-1 sm:gap-5 ml-auto">
          {[
            ["/works", "Works"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="nav-link"
            >
              <sup>0{i + 1}</sup>
              {label}
            </Link>
          ))}
          <MotionToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
