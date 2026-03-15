import { LeetCodeProfile } from "@/lib/platforms/types";
import LeetCodeHeatmap from "./LeetCodeHeatmap";

export default function LeetCodeCard({ data }: { data: LeetCodeProfile }) {
  return (
    <div className="tech-panel p-6 h-full relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-[-50%] left-[-10%] w-[200px] h-[200px] bg-yellow-500/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <span className="text-gray-300">LeetCode</span>
        </h2>
        <a href={data.profileUrl} target="_blank" rel="noreferrer" className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors uppercase tracking-widest font-mono">
          ↗
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10 flex-grow">
        
        {/* LEFT COLUMN: Ring, Difficulty, Contests & Heatmap */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Top Row: 3 Boxes side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#050505] p-4 rounded-xl border border-[#1a1a1a]">
            
            {/* 1. Ring Chart */}
            <div className="flex flex-col items-center justify-center border-r border-[#1a1a1a] pr-4">
              <div className="relative w-24 h-24 flex items-center justify-center mb-1">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="6" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#eab308" strokeWidth="6" 
                    strokeDasharray="283" strokeDashoffset="100" 
                    className="animate-fill transition-all duration-1000" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black tabular-nums tracking-tighter text-white">{data.totalSolved}</span>
                </div>
              </div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Rate: <span className="text-yellow-500">{data.acceptanceRate}%</span></p>
            </div>

            {/* 2. Difficulty Breakdown */}
            <div className="flex flex-col justify-center gap-3 border-r border-[#1a1a1a] pr-4 pl-2">
              <DifficultyBar label="Easy" color="bg-emerald-500" count={data.easySolved} max={800} />
              <DifficultyBar label="Medium" color="bg-yellow-500" count={data.mediumSolved} max={1600} />
              <DifficultyBar label="Hard" color="bg-red-500" count={data.hardSolved} max={700} />
            </div>

            {/* 3. Contest Info */}
            <div className="flex flex-col justify-center gap-2 pl-2">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mb-0.5">Contest Rating</span>
                <span className="text-xl font-black text-gray-200">{data.contestRating}</span>
                <span className="text-[9px] text-yellow-500 font-mono">Top {data.topPercentage}%</span>
              </div>
              <div className="flex flex-col pt-2 border-t border-[#1a1a1a]">
                 <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mb-0.5">Contests</span>
                 <span className="text-lg font-black text-gray-200">{data.contestsAttended}</span>
                 <span className="text-[9px] text-gray-500 font-mono">Global: {data.contestRanking}</span>
              </div>
            </div>

          </div>

          {/* Bottom Left: Activity Matrix */}
          <div className="flex-grow flex flex-col bg-[#050505] p-4 rounded-xl border border-[#1a1a1a]">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-mono">
              Activity Matrix
            </h3>
            <div className="w-full overflow-x-auto scroller-hide flex justify-start pb-2">
              <div className="min-w-max">
                <LeetCodeHeatmap calendarStr={typeof data.submissionCalendar === "string" ? data.submissionCalendar : JSON.stringify(data.submissionCalendar)} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Top Skills */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="bg-[#050505] p-4 rounded-xl border border-[#1a1a1a] h-full flex flex-col">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-mono border-b border-[#222] pb-2">
              Tags Solved
            </h3>
            <div className="flex flex-wrap gap-1.5 overflow-y-auto scroller-hide content-start flex-grow">
              {data.skills.map((skill) => (
                <div key={skill.tag} className="px-2 py-1 bg-[#111] border border-[#222] rounded text-[9px] text-gray-300 font-mono flex items-center gap-1.5 hover:border-yellow-500/40 transition-colors">
                  <span className="whitespace-nowrap">{skill.tag}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-yellow-500 font-bold">{skill.solved}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function DifficultyBar({ label, color, count, max }: { label: string; color: string; count: number; max: number }) {
  const percentage = Math.min((count / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="text-gray-200 font-mono font-bold">{count}</span>
      </div>
      <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full opacity-80`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
