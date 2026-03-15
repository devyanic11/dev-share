import { GitHubProfile, GitHubRepo } from "@/lib/platforms/types";
import GitHubHeatmap from "./GitHubHeatmap";

export default function GitHubCard({ data }: { data: GitHubProfile }) {
  return (
    <div className="tech-panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-[#222] pb-2">
        <h2 className="text-sm font-mono font-bold tracking-tight text-white uppercase flex items-center gap-2">
           <span className="text-[#00ff41]">SYS.01</span> / GITHUB_CORE
        </h2>
        <a href={data.profileUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:text-[#00ff41] transition-colors uppercase tracking-widest font-mono">
           [ACCESS LINK]
        </a>
      </div>

      <div className="flex flex-col gap-6 flex-grow">
        
        {/* TOP ROW: STATS & REPOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* STATS & DNA (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <Stat label="STARS" value={data.totalStars.toString()} />
              <Stat label="COMMITS" value={data.contributionsLastYear.toString()} />
              <Stat label="PRS M" value={data.prsMerged.toString()} />
              <Stat label="ISSUES" value={data.issuesSolved.toString()} />
              <Stat label="FLWRS" value={data.followers.toString()} />
              <Stat label="CNTRB" value={`${data.totalContributors}+`} />
            </div>
            
            <div>
              <h3 className="text-[10px] text-gray-500 font-mono mb-2 flex justify-between uppercase tracking-widest border-b border-[#222] pb-1">
                <span>LANG_DNA</span>
                <span className="text-[#00ff41]">ANALYZE</span>
              </h3>
              <div className="space-y-2 mt-2">
                {data.languages.slice(0, 5).map((lang) => (
                  <div key={lang.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400">
                      <span>{lang.name}</span>
                      <span className="text-[#00ff41]">{lang.percentage}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-[#111] overflow-hidden">
                      <div 
                        className="h-full bg-[#00ff41]" 
                        style={{ width: `${lang.percentage}%`, boxShadow: '0 0 5px #00ff41' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REPOS (Span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-widest border-b border-[#222] pb-1 flex justify-between">
              <span>ACTIVE_REPOSITORIES</span>
              <span className="text-[#00ff41]">Top 4</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 flex-grow">
              {data.topRepos.slice(0, 4).map((repo: GitHubRepo) => (
                <a 
                  key={repo.name} 
                  href={repo.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block border-l-2 border-[#333] hover:border-[#00ff41] pl-4 py-2 bg-[#050505] transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-mono font-bold text-gray-200 group-hover:text-[#00ff41] truncate max-w-[80%] transition-colors">{repo.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1"><span className="text-yellow-500">★</span>{repo.stars}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-mono text-[#00ff41] bg-[#00ff41]/10 px-1.5 py-0.5 border border-[#00ff41]/20">{repo.language}</span>
                    {repo.openIssues > 0 && <span className="text-[10px] font-mono text-red-500 bg-red-500/10 px-1.5 py-0.5 border border-red-500/20">{repo.openIssues} iss</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: HEATMAP (Full Width) */}
        <div className="w-full flex flex-col">
          <h3 className="text-[10px] text-gray-500 font-mono mb-3 uppercase tracking-widest border-b border-[#222] pb-1 flex justify-between">
            <span>ACTIVITY_MATRIX</span>
            <span className="text-[#00ff41]">Live</span>
          </h3>
          <div className="flexitems-center justify-center bg-[#000] border border-[#111] p-6 relative overflow-hidden mt-1 w-full flex justify-center">
            <div className="absolute inset-0 bg-green-500/5 blur-[50px]"></div>
            <div className="relative z-10 overflow-x-auto scroller-hide max-w-full">
              <GitHubHeatmap username={data.username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#050505] border border-[#222] p-2 flex justify-between items-center group hover:border-[#00ff41] transition-colors">
      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono group-hover:text-gray-300 transition-colors">{label}</span>
      <span className="text-xs font-mono font-bold text-gray-100 group-hover:text-[#00ff41] transition-colors">{value}</span>
    </div>
  );
}
