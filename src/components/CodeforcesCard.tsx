import { CodeforcesProfile } from "@/lib/platforms/types";

export default function CodeforcesCard({ data }: { data: CodeforcesProfile }) {
  return (
    <div className="tech-panel p-6 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10 blur-sm pointer-events-none text-9xl">CP</div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-lg font-bold">Codeforces Algorithm</h2>
        <a href={data.profileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest font-mono">
          ↗
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div>
          <span className="text-xs text-gray-500 font-mono block mb-1">Current Rating</span>
          <span className={`text-2xl font-black ${getRatingColor(data.rating)}`}>{data.rating}</span>
          <span className="text-xs text-gray-400 block mt-1">{data.rank}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-mono block mb-1">Peak Rating</span>
          <span className={`text-2xl font-bold ${getRatingColor(data.maxRating)}`}>{data.maxRating}</span>
          <span className="text-xs text-gray-400 block mt-1">{data.maxRank}</span>
        </div>
      </div>

      <div className="relative z-10 mb-6">
        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-mono">Top Mastered Tags</h3>
        <div className="flex flex-wrap gap-2">
          {data.tagsSolved.slice(0, 6).map((tag) => (
            <span key={tag.tag} className="px-2 py-1 bg-blue-950/30 border border-blue-900/30 rounded text-[10px] text-blue-300 font-mono">
              {tag.tag} ({tag.count})
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10 border-t border-[#222] pt-4">
        <div>
          <span className="text-[10px] text-gray-500 font-mono block">Problems Solved</span>
          <span className="text-lg font-bold text-gray-200">{data.totalSolved}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-500 font-mono block">Best Contest Rank</span>
          <span className="text-lg font-bold text-gray-200">#{data.bestContestRank}</span>
        </div>
      </div>
    </div>
  );
}

function getRatingColor(rating: number) {
  if (rating >= 2400) return "text-red-500";
  if (rating >= 2100) return "text-orange-400";
  if (rating >= 1900) return "text-fuchsia-500";
  if (rating >= 1600) return "text-blue-500";
  if (rating >= 1400) return "text-cyan-400";
  if (rating >= 1200) return "text-green-500";
  return "text-gray-400";
}
