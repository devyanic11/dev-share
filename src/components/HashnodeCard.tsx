import { HashnodeProfile } from "@/lib/platforms/types";

export default function HashnodeCard({ data }: { data: HashnodeProfile }) {
  return (
    <div className="tech-panel p-8 h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 mb-2">
            <span className="text-blue-500">Hashnode Writing</span>
          </h2>
          {data.bio && <p className="text-sm text-gray-500 max-w-md">{data.bio}</p>}
        </div>
        <a href={data.profileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-mono">
          Visit Blog ↗
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Total Articles" value={data.totalArticles.toString()} />
        <Stat label="Total Views" value={formatCompact(data.totalViews)} />
        <Stat label="Reactions" value={formatCompact(data.totalReactions)} />
        <Stat label="30d Activity" value={`${data.articlesLast30Days} posts`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#1a1a1a] pt-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-mono">Top Reads</h3>
          <div className="space-y-3">
            {data.topArticles.map((article, i) => (
              <a 
                key={i} 
                href={article.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-blue-500/50 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 truncate max-w-[70%]">
                  {article.title}
                </span>
                <span className="text-xs font-mono text-gray-500 bg-[#111] px-2 py-1 rounded">
                  👁️ {formatCompact(article.views)}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-mono">Frequently Writes About</h3>
          <div className="flex flex-wrap gap-2">
            {data.writingTopics.map((topic) => (
              <span key={topic.tag} className="px-3 py-1.5 bg-blue-950/20 border border-blue-900/30 rounded-lg text-xs text-blue-300 font-mono">
                {topic.tag} <span className="text-blue-500/50 ml-1">({topic.count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]">
      <div className="text-2xl font-black text-white tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{label}</div>
    </div>
  );
}

function formatCompact(num: number) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}
