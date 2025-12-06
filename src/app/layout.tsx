import type { Metadata } from "next";
import { Inter, Lato, Metamorphous } from "next/font/google";
import { ThemeProvider } from "./context/ThemeProvider";
import GSAPProvider from "./components/GSAPProvider";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});
const metamorphous = Metamorphous({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-metamorphous'
});

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${lato.className} ${metamorphous.variable}`}>
        <ThemeProvider>
          <GSAPProvider>
            <CustomCursor />
            {children}
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
