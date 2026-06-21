"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.getAttribute("data-theme");
  return current === "dark" ? "dark" : "light";
}

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      title="Toggle theme"
    >
      {/* Avoid hydration mismatch: render nothing decisive until mounted */}
      {mounted ? (theme === "dark" ? <FaSun size={15} /> : <FaMoon size={15} />) : <FaMoon size={15} />}
    </button>
  );
};
