"use client";

import { useTheme } from "@/Components/theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className="flex w-full items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <span>{isDark ? "Dark theme" : "Light theme"}</span>
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
    </button>
  );
}