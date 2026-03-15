export default function RecruiterSnapshot({ profile }: { profile: any }) {
  if (!profile.insights) return null;
  const { topSkills, highlights, personalityInsights } = profile.insights;

  return (
    <div className="tech-panel h-full p-6 flex flex-col relative overflow-hidden">
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="flex items-center gap-3 mb-6 border-b border-[#222] pb-3 relative z-10">
        <div className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-pulse"></div>
        <h2 className="text-xl font-mono font-bold tracking-tight text-white uppercase flex items-center gap-2">
           <span className="text-[#00ff41]">ROOT@SYS:~</span> /SNAPSHOT <span className="w-2 h-4 bg-[#00ff41] animate-pulse inline-block"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow relative z-10">
        
        {/* SKILLS STREAM */}
        <div className="flex flex-col">
          <h3 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3 border-l-2 border-[#00ff41] pl-2">ACTIVE_NODES</h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill: string, i: number) => (
              <span key={i} className="px-2 py-1 text-xs font-mono text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30">
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* HIGH VALUE TARGETS */}
        <div className="flex flex-col">
          <h3 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3 border-l-2 border-[#ffcc00] pl-2">ACHIEVEMENTS</h3>
          <ul className="space-y-2">
            {highlights.map((highlight: string, i: number) => (
              <li key={i} className="text-sm font-mono text-gray-300 leading-snug flex items-start gap-2">
                <span className="text-[#ffcc00] opacity-70 mt-0.5">►</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PSYCH PROFILE */}
        <div className="flex flex-col">
          <h3 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3 border-l-2 border-[#a855f7] pl-2">PSYCH_EVAL</h3>
          <ul className="space-y-3">
            {personalityInsights.map((insight: string, i: number) => (
              <li key={i} className="text-xs font-mono text-gray-400 leading-relaxed">
                <span className="text-[#a855f7] mr-2 opacity-70">&gt;&gt;</span>{insight}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
