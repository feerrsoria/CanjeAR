"use client";


import React from "react";
import { useTheme } from "next-themes";



export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  // Use system as default, but only show light/dark toggle
  const current = resolvedTheme || theme || "system";

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", gap: "0.3rem" }}>
      <button
        aria-label="Modo claro"
        onClick={() => setTheme("light")}
        style={{
          background: current === "light" ? "var(--primary)" : "transparent",
          color: current === "light" ? "var(--secondary)" : "var(--secondary)",
          border: current === "light" ? "2px solid var(--accent)" : "1.5px solid var(--secondary)",
          borderRadius: "50%",
          fontSize: "1.4rem",
          width: "2.2rem",
          height: "2.2rem",
          cursor: "pointer",
          transition: "background 0.18s, border 0.18s",
          outline: "none"
        }}
        title="Modo claro"
      >
        ☀️
      </button>
      <button
        aria-label="Modo oscuro"
        onClick={() => setTheme("dark")}
        style={{
          background: current === "dark" ? "var(--primary)" : "transparent",
          color: current === "dark" ? "var(--secondary)" : "var(--secondary)",
          border: current === "dark" ? "2px solid var(--accent)" : "1.5px solid var(--secondary)",
          borderRadius: "50%",
          fontSize: "1.4rem",
          width: "2.2rem",
          height: "2.2rem",
          cursor: "pointer",
          transition: "background 0.18s, border 0.18s",
          outline: "none"
        }}
        title="Modo oscuro"
      >
        🌙
      </button>
    </div>
  );
}
