"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalHeroProps {
  platforms: { name: string; loaded: boolean }[];
  username: string;
  onComplete: () => void;
}

export default function TerminalHero({
  platforms,
  username,
  onComplete,
}: TerminalHeroProps) {
  const [lines, setLines] = useState<
    { text: string; type: "cmd" | "info" | "success" | "dim" }[]
  >([]);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entries: { text: string; type: "cmd" | "info" | "success" | "dim" }[] = [
      { text: `$ dev-profile ${username}`, type: "cmd" },
      { text: "Loading developer metrics...", type: "info" },
      ...platforms.map((p) => ({
        text: `${p.loaded ? "✓" : "✗"} ${p.name}${p.loaded ? "" : " (not found)"}`,
        type: (p.loaded ? "success" : "dim") as "success" | "dim",
      })),
      { text: "Generating developer analysis...", type: "info" },
      { text: "Profile ready ✓", type: "success" },
    ];

    const lineIndex = { current: 0 };
    const interval = setInterval(() => {
      if (lineIndex.current < entries.length) {
        const line = entries[lineIndex.current];
        setLines((prev) => [...prev, line]);
        lineIndex.current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 400);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [platforms, username, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`glass-card p-6 transition-all duration-700 ${
        done ? "opacity-80 scale-[0.98]" : ""
      }`}
      style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-3 text-xs" style={{ color: "var(--text-dim)" }}>
          dev-profile — analysis
        </span>
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i}>
            {!line ? (
              <span>&nbsp;</span>
            ) : line.type === "cmd" ? (
              <span className="neon-text-subtle">{line.text}</span>
            ) : line.type === "info" ? (
              <span style={{ color: "var(--text-secondary)" }}>{line.text}</span>
            ) : line.type === "success" ? (
              <span className="neon-text-subtle">{line.text}</span>
            ) : line.type === "dim" ? (
              <span style={{ color: "var(--text-dim)" }}>{line.text}</span>
            ) : null}
          </div>
        ))}
        {!done && <span className="cursor-blink neon-text">▋</span>}
      </div>
    </div>
  );
}
