"use client";

import { useCallback, useState } from "react";

interface ShareButtonsProps {
  profileUrl: string;
  username: string;
  score: number;
}

export default function ShareButtons({ profileUrl, username, score }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out my developer profile! 🚀\nOverall Score: ${score}/100\n\n${profileUrl}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Check out my developer profile! 🚀 Overall Score: ${score}/100`
  )}&url=${encodeURIComponent(profileUrl)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    profileUrl
  )}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [profileUrl]);

  const handlePdf = useCallback(async () => {
    // Dynamic imports for PDF generation
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const dashboard = document.getElementById("dashboard-content");
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard, {
      backgroundColor: "#050505",
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`devprofile-${username}.pdf`);
  }, [username]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Twitter */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
        style={{
          background: "var(--green-subtle)",
          border: "1px solid var(--border-color)",
          color: "var(--text-secondary)",
        }}
      >
        <span>𝕏</span>
        <span>Share on Twitter</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
        style={{
          background: "var(--green-subtle)",
          border: "1px solid var(--border-color)",
          color: "var(--text-secondary)",
        }}
      >
        <span>💼</span>
        <span>Share on LinkedIn</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="share-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
        style={{
          background: "var(--green-subtle)",
          border: `1px solid ${copied ? "var(--green-neon)" : "var(--border-color)"}`,
          color: copied ? "var(--green-neon)" : "var(--text-secondary)",
        }}
      >
        <span>{copied ? "✓" : "🔗"}</span>
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* Download PDF */}
      <button
        onClick={handlePdf}
        className="share-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
        style={{
          background: "var(--green-subtle)",
          border: "1px solid var(--border-color)",
          color: "var(--text-secondary)",
        }}
      >
        <span>📄</span>
        <span>Download PDF</span>
      </button>
    </div>
  );
}
