"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["/works", "works"],
  ["/about", "about"],
  ["/thoughts", "thoughts"],
  ["/contact", "contact"],
];

export default function SiteNav() {
  const path = usePathname();
  return (
    <nav className="k-nav" aria-label="Main navigation">
      <Link href="/" className="k-name">
        Rishabh Gupta
      </Link>
      <div>
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}>
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
