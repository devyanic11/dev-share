"use client";

import { DevScore } from "@/lib/platforms/types";

export default function DevScoreCard({ score }: { score: DevScore }) {
  const rings = [
    { label: "Engineering", value: score.engineering, color: "#00ff41" },
    { label: "Problem Solving", value: score.problemSolving, color: "#ffcc00" },
    { label: "Open Source", value: score.openSource, color: "#ff2a2a" },
    { label: "Community", value: score.community, color: "#a855f7" },
    { label: "Writing", value: score.writing, color: "#3b82f6" },
  ];

  return (
    <div className="tech-panel p-4 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[10px] uppercase tracking-widest text-[#00ff41] font-mono">SYS.SCORE</h3>

      </div>

      <div className="w-full space-y-2.5">
        {rings.map((ring) => (
          <div key={ring.label} className="w-full group">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-gray-400 font-mono group-hover:text-white transition-colors">{ring.label}</span>
              <span className="text-gray-400 font-mono">{ring.value}</span>
            </div>
            <div className="h-1 w-full bg-[#111] overflow-hidden border border-[#222]">
              <div
                className="h-full opacity-90 transition-all duration-1000 ease-out"
                style={{ width: `${ring.value}%`, backgroundColor: ring.color, boxShadow: `0 0 10px ${ring.color}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
