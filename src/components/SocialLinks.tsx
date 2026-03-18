"use client";

interface SocialLinksProps {
  github?: string;
  linkedin?: string;
  twitter?: string;
  leetcode?: string;
  hashnode?: string;
  kaggle?: string;
  codeforces?: string;
}

const LINKS = [
  { key: "github", label: "GitHub", icon: "⚡", makeUrl: (v: string) => v.startsWith("http") ? v : `https://github.com/${v}` },
  { key: "linkedin", label: "LinkedIn", icon: "💼", makeUrl: (v: string) => v.startsWith("http") ? v : `https://www.linkedin.com/in/${v}` },
  { key: "twitter", label: "Twitter", icon: "🐦", makeUrl: (v: string) => v.startsWith("http") ? v : `https://twitter.com/${v}` },
  { key: "leetcode", label: "LeetCode", icon: "🧩", makeUrl: (v: string) => v.startsWith("http") ? v : `https://leetcode.com/u/${v}` },
  { key: "hashnode", label: "Hashnode", icon: "✍️", makeUrl: (v: string) => v.startsWith("http") ? v : `https://${v}` },
  { key: "kaggle", label: "Kaggle", icon: "📊", makeUrl: (v: string) => v.startsWith("http") ? v : `https://www.kaggle.com/${v}` },
  { key: "codeforces", label: "Codeforces", icon: "🏆", makeUrl: (v: string) => v.startsWith("http") ? v : `https://codeforces.com/profile/${v}` },
];


export default function SocialLinks(props: SocialLinksProps) {
  const activeLinks = LINKS.filter(
    (l) => props[l.key as keyof SocialLinksProps]
  );

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {activeLinks.map((link) => {
        const value = props[link.key as keyof SocialLinksProps]!;
        return (
          <a
            key={link.key}
            href={link.makeUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{
              background: "var(--green-subtle)",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
