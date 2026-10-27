import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Keeda from "./components/Keeda";
import SiteNav from "./components/SiteNav";
import "./globals.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--mono" });

export const metadata: Metadata = {
  title: { default: "rishabh gupta", template: "%s · rishabh gupta" },
  description:
    "full stack dev from shahjahanpur, india. i build agents and apps, and i'm also daldalikeeda.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        {/* pick day/night before first paint: saved choice, else the system setting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"night":"day";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="k-skip">
          Skip to content
        </a>
        {/* The keeda lives in the layout, so it keeps crawling across pages */}
        <Keeda />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
