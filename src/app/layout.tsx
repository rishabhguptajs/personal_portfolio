import type { Metadata } from "next";
import { Inter, Lato, Metamorphous } from "next/font/google";
import { ThemeProvider } from "./context/ThemeProvider";
import GSAPProvider from "./components/GSAPProvider";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });
const metamorphous = Metamorphous({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-metamorphous",
});

export const metadata: Metadata = {
    title: "Rishabh Gupta | Full Stack Developer",
    description:
        "Full stack developer building scalable applications, agentic systems, and clean web experiences. Specialising in React, Next.js, Node.js, and AI-native architectures.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${lato.className} ${metamorphous.variable}`}>
                <ThemeProvider>
                    <GSAPProvider>
                        <CustomCursor />
                        <Navbar />
                        {children}
                    </GSAPProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
