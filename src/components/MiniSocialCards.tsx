import { KaggleProfile, LinkedInProfile, TwitterProfile } from "@/lib/platforms/types";

export function MiniKaggleCard({ data }: { data: KaggleProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-5 hover:border-cyan-500/50 group block">
      <div className="flex justify-between mb-3">
        <h3 className="text-cyan-500 font-bold text-sm tracking-wide">Kaggle</h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Data Science</span>
      </div>
      <div>
        <div className="text-lg font-black text-gray-200 group-hover:text-white transition-colors">
          {data.rank}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs font-mono">
          <span className="text-yellow-500">🥇 {data.medals.gold}</span>
          <span className="text-gray-400">🥈 {data.medals.silver}</span>
          <span className="text-orange-400">🥉 {data.medals.bronze}</span>
        </div>
      </div>
    </a>
  );
}

export function MiniLinkedInCard({ data }: { data: LinkedInProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-5 hover:border-blue-500/50 group block">
      <div className="flex justify-between mb-3">
        <h3 className="text-blue-500 font-bold text-sm tracking-wide">LinkedIn</h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Network</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
          {data.currentRole}
        </div>
        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{data.headline}</div>
        <div className="mt-3 text-[10px] font-mono text-gray-500 bg-[#111] inline-block px-2 py-1 rounded">
          {data.connections} Connections
        </div>
      </div>
    </a>
  );
}

export function MiniTwitterCard({ data }: { data: TwitterProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-5 hover:border-gray-300/50 group block">
      <div className="flex justify-between mb-3">
        <h3 className="text-gray-100 font-bold text-sm tracking-wide">𝕏 / Twitter</h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Social</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
          @{data.username}
        </div>
        <div className="mt-3 flex gap-3 text-[10px] font-mono text-gray-500">
          <span className="bg-[#111] px-2 py-1 rounded">Joined {data.joined}</span>
        </div>
      </div>
    </a>
  );
}
