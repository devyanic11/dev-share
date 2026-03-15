import { KaggleProfile, LinkedInProfile, TwitterProfile } from "@/lib/platforms/types";

export function KaggleCard({ data }: { data: KaggleProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-6 hover:border-cyan-500 transition-colors group block relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-6 border-b border-[#222] pb-3 relative z-10">
        <h3 className="text-cyan-500 font-mono font-bold text-sm tracking-widest uppercase flex items-center gap-2">
          <span>{'>'} KAGGLE_NODE</span>
        </h3>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">[ DATA_SCIENCE ]</span>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1 tracking-widest">Global Rank</span>
            <div className="text-3xl font-black text-gray-200 group-hover:text-white transition-colors tracking-tighter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              {data.rank}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1 tracking-widest">User</span>
            <span className="text-xs font-mono text-cyan-400">@{data.username}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex justify-between mb-2">
              <span>Medal Vault</span>
              <span className="text-cyan-500">SYNC_OK</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#111] border border-[#222] p-2 flex flex-col items-center justify-center rounded">
                <span className="text-sm mb-1 text-yellow-500">🥇</span>
                <span className="text-xs font-mono text-gray-300 font-bold">{data.medals?.gold || 0}</span>
              </div>
              <div className="bg-[#111] border border-[#222] p-2 flex flex-col items-center justify-center rounded">
                <span className="text-sm mb-1 text-gray-400">🥈</span>
                <span className="text-xs font-mono text-gray-300 font-bold">{data.medals?.silver || 0}</span>
              </div>
              <div className="bg-[#111] border border-[#222] p-2 flex flex-col items-center justify-center rounded">
                <span className="text-sm mb-1 text-orange-400">🥉</span>
                <span className="text-xs font-mono text-gray-300 font-bold">{data.medals?.bronze || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border-l-2 border-cyan-500/50 pl-2">
               <span className="text-[9px] font-mono text-gray-500 block uppercase">Datasets</span>
               <span className="text-sm font-bold text-gray-200">{data.datasets?.count || 0}</span>
            </div>
            <div className="border-l-2 border-cyan-500/50 pl-2">
               <span className="text-[9px] font-mono text-gray-500 block uppercase">Notebooks</span>
               <span className="text-sm font-bold text-gray-200">{data.notebooks?.count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function LinkedInCard({ data }: { data: LinkedInProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-6 hover:border-blue-500 transition-colors group block relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none group-hover:bg-blue-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-6 border-b border-[#222] pb-3 relative z-10">
        <h3 className="text-blue-500 font-mono font-bold text-sm tracking-widest uppercase flex items-center gap-2">
          <span>{'>'} LINKEDIN_NODE</span>
        </h3>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">[ NETWORK ]</span>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center">
        <div className="mb-6">
          <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1 tracking-widest">Active Role</span>
          <div className="text-xl font-bold text-gray-200 truncate group-hover:text-white transition-colors leading-tight drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
            {data.currentRole}
          </div>
          <div className="text-xs text-gray-400 mt-2 line-clamp-2 font-sans opacity-80 leading-snug">
            {data.headline}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#1a1a1a]">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-1">Connections</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse pulse-blue"></div>
                <span className="font-mono text-lg font-bold text-gray-200">{data.connections}</span>
              </div>
            </div>
            {data.location && (
              <div className="text-right">
                <span className="bg-[#111] border border-[#222] px-2 py-1 text-[9px] font-mono text-gray-400 uppercase">
                  LOC: {data.location}
                </span>
              </div>
            )}
          </div>
          
          {/* Decorative networking visual */}
          <div className="h-1.5 w-full bg-[#111] mt-4 relative overflow-hidden flex">
            <div className="h-full bg-blue-500/40 w-[20%]"></div>
            <div className="h-full bg-blue-500 w-[15%]"></div>
            <div className="h-full bg-blue-500/60 w-[40%]"></div>
            <div className="h-full bg-blue-400 w-[5%] shadow-[0_0_10px_#3b82f6]"></div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function TwitterCard({ data }: { data: TwitterProfile }) {
  return (
    <a href={data.profileUrl} target="_blank" rel="noreferrer" className="tech-panel p-6 hover:border-gray-500 transition-colors group block relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-500/10 blur-[50px] pointer-events-none group-hover:bg-gray-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-6 border-b border-[#222] pb-3 relative z-10">
        <h3 className="text-gray-200 font-mono font-bold text-sm tracking-widest uppercase flex items-center gap-2">
          <span>{'>'} X_NODE</span>
        </h3>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">[ BROADCAST ]</span>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1 tracking-widest">Handle</span>
            <div className="text-2xl font-black text-gray-200 group-hover:text-white transition-colors tracking-tighter">
              @{data.username}
            </div>
          </div>
          
          <div className="text-right">
             <span className="bg-[#111] border border-[#222] px-2 py-1 text-[9px] font-mono text-gray-400 uppercase whitespace-nowrap">
               EST: {data.joined || "N/A"}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-[#1a1a1a]">
          <div className="bg-[#050505] border border-[#222] p-3 flex flex-col">
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Followers</span>
            <span className="text-lg font-bold font-mono text-gray-300">{data.followers || 0}</span>
          </div>
          <div className="bg-[#050505] border border-[#222] p-3 flex flex-col">
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Posts</span>
            <span className="text-lg font-bold font-mono text-gray-300">{data.tweets || 0}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
