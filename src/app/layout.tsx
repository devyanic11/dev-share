import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevProfile | Developer Analytics Dashboard",
  description:
    "Aggregate your developer profiles from GitHub, LeetCode, Hashnode, and more into a stunning, shareable analytics dashboard.",
  keywords: ["developer", "portfolio", "analytics", "github", "leetcode", "profile"],
  openGraph: {
    title: "DevProfile | Developer Analytics Dashboard",
    description: "Your complete developer analytics in one stunning page.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevProfile | Developer Analytics Dashboard",
    description: "Your complete developer analytics in one stunning page.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
