"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const PLATFORMS = [
  {
    id: "github",
    label: "GitHub",
    placeholder: "username (e.g. devyanic11)",
    icon: "⚡",
    prefix: "github.com/",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    placeholder: "username (e.g. devyanichavan110)",
    icon: "🧩",
    prefix: "leetcode.com/u/",
  },
  {
    id: "hashnode",
    label: "Hashnode",
    placeholder: "blog URL (e.g. devyanichavan.hashnode.dev)",
    icon: "✍️",
    prefix: "",
  },
  {
    id: "kaggle",
    label: "Kaggle",
    placeholder: "username (e.g. devyanichavan)",
    icon: "📊",
    prefix: "kaggle.com/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "profile URL",
    icon: "💼",
    prefix: "linkedin.com/in/",
  },
  {
    id: "twitter",
    label: "Twitter / 𝕏",
    placeholder: "handle (e.g. devyaniCh)",
    icon: "🐦",
    prefix: "twitter.com/",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    placeholder: "handle (e.g. devyanic11)",
    icon: "🐦",
    prefix: "https://codeforces.com/profile/",
  },
];

const TERMINAL_LINES = [
  "$ dev-profile init",
  "Initializing DevProfile engine...",
  "Scanning developer platforms...",
  "Ready to aggregate your metrics.",
  "",
  "Enter your platform usernames below.",
];

export default function HomePage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lineIndex = { current: 0 };
    const interval = setInterval(() => {
      if (lineIndex.current < TERMINAL_LINES.length) {
        const line = TERMINAL_LINES[lineIndex.current];
        setTerminalLines((prev) => [...prev, line]);
        lineIndex.current++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowForm(true), 300);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, val]) => {
      if (val.trim()) params.set(key, val.trim());
    });
    if (params.toString()) {
      setLoading(true);
      router.push(`/profile?${params.toString()}`);
    }
  };

  const hasAnyValue = Object.values(values).some((v) => v.trim());

  return (
    <main className="min-h-screen grid-bg scanline relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-20 pb-32">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="neon-text">Dev</span>
            <span style={{ color: "var(--text-primary)" }}>Profile</span>
          </h1>
          <p
            className="mt-3 text-sm tracking-widest uppercase"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Developer Analytics Dashboard
          </p>
        </div>

        {/* Terminal */}
        <div
          ref={terminalRef}
          className="glass-card p-6 mb-10"
          style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#ffbd2e" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#28c840" }}
            />
            <span
              className="ml-3 text-xs"
              style={{ color: "var(--text-dim)" }}
            >
              dev-profile — terminal
            </span>
          </div>
          <div className="space-y-1">
            {terminalLines.map((line, i) => (
              <div key={i}>
                {!line ? (
                  <span>&nbsp;</span>
                ) : line.startsWith("$") ? (
                  <span className="neon-text-subtle">{line}</span>
                ) : line.includes("...") || line.includes("Ready") ? (
                  <span style={{ color: "var(--text-secondary)" }}>
                    {line}
                  </span>
                ) : (
                  <span style={{ color: "var(--text-dim)" }}>{line}</span>
                )}
              </div>
            ))}
            {!showForm && (
              <span className="cursor-blink neon-text">▋</span>
            )}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="animate-fade-in-up space-y-5"
          >
            {PLATFORMS.map((platform, idx) => (
              <div
                key={platform.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <label
                  className="flex items-center gap-2 mb-2 text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.label}</span>
                  {platform.prefix && (
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--text-dim)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {platform.prefix}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={platform.placeholder}
                  value={values[platform.id] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [platform.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}

            <div
              className="pt-6 animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3"
                disabled={!hasAnyValue || loading}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>Generating Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Developer Profile</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            <p
              className="text-center text-xs mt-4"
              style={{ color: "var(--text-dim)" }}
            >
              Enter at least one platform to generate your profile.
              <br />
              All data is fetched in real-time from public APIs.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
