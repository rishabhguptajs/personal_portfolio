import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeProvider";
import GSAPProvider from "./components/GSAPProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rishabh Gupta — Ideas into systems.",
    template: "%s | Rishabh Gupta",
  },
  description:
    "Full stack developer and AI-native builder. Scalable applications, agentic systems, and a healthy appetite for the unconventional. Based in India.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <GSAPProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            {children}
            <Footer />
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
