import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlowingStarsBackgroundCard } from "./components/ui/glowing-stars";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rishabh Gupta | rishabhguptajs | Full Stack Developer",
  description: "Passionate Full Stack Developer specializing in modern web technologies like React, Next.js, and Node.js. Currently pursuing Computer Science Engineering, with experience in building scalable applications using MERN stack, AI integration, and cloud technologies. Former intern at Simule and Medireg, with a track record of delivering impactful solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
