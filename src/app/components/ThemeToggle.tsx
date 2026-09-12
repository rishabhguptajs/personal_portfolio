"use client";
import { useTheme } from "../context/ThemeProvider";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Change the ink"
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
