"use client";

import { useState, useCallback } from "react";
import { DevProfile, DevScore } from "@/lib/platforms/types";
import TerminalHero from "@/components/TerminalHero";
import GitHubCard from "@/components/GitHubCard";
import LeetCodeCard from "@/components/LeetCodeCard";
import CodeforcesCard from "@/components/CodeforcesCard";
import HashnodeCard from "@/components/HashnodeCard";
import DevScoreCard from "@/components/DevScoreCard";
import SkillRadar from "@/components/SkillRadar";
import ShareButtons from "@/components/ShareButtons";
import SocialLinks from "@/components/SocialLinks";
import RecruiterSnapshot from "@/components/RecruiterSnapshot";
import { KaggleCard, LinkedInCard, TwitterCard } from "@/components/InfluenceCards";

interface DashboardClientProps {
  profile: DevProfile;
  score: DevScore;
  params: Record<string, string>;
}

export default function DashboardClient({
  profile,
  score,
  params,
}: DashboardClientProps) {
  const [dashboardVisible, setDashboardVisible] = useState(false);

  const name = profile.linkedin?.name || profile.github?.name || profile.hashnode?.name || params.github || "Developer";
  const avatarUrl = profile.github?.avatarUrl || "";
  const bio = profile.linkedin?.headline || profile.github?.bio || profile.hashnode?.bio || "Software Engineer & Builder";
  const username = params.github || params.leetcode || params.hashnode || "dev";

  const platforms = [
    { name: "GitHub", loaded: !!profile.github },
    { name: "LeetCode", loaded: !!profile.leetcode },
    { name: "Codeforces", loaded: !!profile.codeforces },
    { name: "Hashnode", loaded: !!profile.hashnode },
    ...(params.linkedin ? [{ name: "LinkedIn", loaded: !!profile.linkedin }] : []),
    ...(params.twitter ? [{ name: "Twitter", loaded: !!profile.twitter }] : []),
    ...(params.kaggle ? [{ name: "Kaggle", loaded: !!profile.kaggle }] : []),
  ];

  const profileUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleTerminalComplete = useCallback(() => {
    setDashboardVisible(true);
  }, []);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans selection:bg-green-500/30 pb-24">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-green-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="w-6 h-6 rounded border border-green-500/30 flex items-center justify-center text-green-500 text-xs font-mono">D</span>
            <span>Dev<span className="text-gray-500">Profile</span></span>
          </a>
          
          {/* Section Jump Links */}
          {dashboardVisible && (
            <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-mono text-gray-500">
              <button onClick={() => scrollTo("overview")} className="hover:text-green-400 transition-colors">Overview</button>
              {profile.github && <button onClick={() => scrollTo("github")} className="hover:text-green-400 transition-colors">OS / GitHub</button>}
              {(profile.leetcode || profile.codeforces) && <button onClick={() => scrollTo("problem-solving")} className="hover:text-green-400 transition-colors">Algorithmic</button>}
              {profile.hashnode && <button onClick={() => scrollTo("writing")} className="hover:text-green-400 transition-colors">Writing</button>}
              {(profile.linkedin || profile.twitter || profile.kaggle) && <button onClick={() => scrollTo("influence")} className="hover:text-green-400 transition-colors">Influence</button>}
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Terminal Loading Overlay */}
        <div className={`transition-all duration-700 ${dashboardVisible ? 'hidden' : 'block mb-8'}`}>
          <TerminalHero
            platforms={platforms}
            username={username}
            onComplete={handleTerminalComplete}
          />
        </div>

        {/* Dashboard Content - Platform Wise Sections */}
        {dashboardVisible && (
          <div id="dashboard-content" className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            
            {/* SECTION: OVERVIEW */}
            <section id="overview" className="scroll-mt-24 mb-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full border border-gray-800 shadow-xl" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-3xl">🧑‍💻</div>
                  )}
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{name}</h1>
                    <p className="text-gray-400 text-lg mb-4 max-w-xl leading-relaxed">{bio}</p>
                    <SocialLinks
                      github={profile.github?.profileUrl}
                      linkedin={profile.linkedin?.profileUrl}
                      twitter={profile.twitter?.profileUrl}
                      leetcode={profile.leetcode?.profileUrl}
                      hashnode={profile.hashnode?.profileUrl}
                      kaggle={profile.kaggle?.profileUrl}
                      codeforces={profile.codeforces?.profileUrl}
                    />
                  </div>
                </div>

                <div className="shrink-0 flex md:flex-col items-center md:items-end gap-4">
                  <div className="text-center md:text-right">
                    <div className="text-5xl font-black tabular-nums tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-600 drop-shadow-sm">
                      {score.overall}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-semibold">Dev Score</div>
                  </div>
                  <ShareButtons profileUrl={profileUrl} username={username} score={score.overall} />
                </div>
              </div>

              {/* Overview HUD Module */}
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="w-full xl:w-2/3">
                  <RecruiterSnapshot profile={profile} />
                </div>
                <div className="w-full xl:w-1/3 flex flex-col gap-4">
                  <DevScoreCard score={score} />
                  <SkillRadar score={score} />
                </div>
              </div>
            </section>

            {/* SECTION: GITHUB (Open Source & Engineering) */}
            {profile.github && (
              <section id="github" className="scroll-mt-24 mb-24 relative z-10">
                <div className="hud-title">
                  <span>Open Source & Engineering</span>
                  <span className="text-xs opacity-50">SYS.01</span>
                </div>
                <div className="hud-grid">
                  <div className="col-span-1 md:col-span-12">
                    <GitHubCard data={profile.github} />
                  </div>
                </div>
              </section>
            )}

            {/* SECTION: ALGORITHMIC (LeetCode & Codeforces) */}
            {(profile.leetcode || profile.codeforces) && (
              <section id="problem-solving" className="scroll-mt-24 mb-24 relative z-10">
                <div className="hud-title" style={{ color: "var(--yellow-warn)", textShadow: "0 0 5px var(--yellow-warn)", borderColor: "rgba(255, 204, 0, 0.2)" }}>
                  <span>Algorithmic Core</span>
                  <span className="text-xs opacity-50">SYS.02</span>
                </div>
                <div className="hud-grid">
                  {profile.leetcode && (
                    <div className="col-span-1 md:col-span-12">
                      <LeetCodeCard data={profile.leetcode} />
                    </div>
                  )}
                  {profile.codeforces && (
                    <div className="col-span-1 md:col-span-12">
                      <CodeforcesCard data={profile.codeforces} />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION: WRITING (Hashnode) */}
            {profile.hashnode && (
              <section id="writing" className="scroll-mt-24 mb-24 relative z-10">
                <div className="hud-title" style={{ color: "#3b82f6", textShadow: "0 0 5px #3b82f6", borderColor: "rgba(59, 130, 246, 0.2)" }}>
                  <span>Technical Data Stream</span>
                  <span className="text-xs opacity-50">SYS.03</span>
                </div>
                <div className="hud-grid">
                  <div className="col-span-1 md:col-span-12">
                    <HashnodeCard data={profile.hashnode} />
                  </div>
                </div>
              </section>
            )}

            {/* SECTION: INFLUENCE (Kaggle, LinkedIn, Twitter) */}
            {(profile.kaggle || profile.linkedin || profile.twitter) && (
              <section id="influence" className="scroll-mt-24 mb-24 relative z-10">
                <div className="hud-title" style={{ color: "#a855f7", textShadow: "0 0 5px #a855f7", borderColor: "rgba(168, 85, 247, 0.2)" }}>
                  <span>Network Nodes</span>
                  <span className="text-xs opacity-50">SYS.04</span>
                </div>
                <div className="hud-grid items-stretch">
                  {profile.kaggle && <div className="col-span-12 lg:col-span-4"><KaggleCard data={profile.kaggle} /></div>}
                  {profile.linkedin && <div className="col-span-12 lg:col-span-4"><LinkedInCard data={profile.linkedin} /></div>}
                  {profile.twitter && <div className="col-span-12 lg:col-span-4"><TwitterCard data={profile.twitter} /></div>}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </main>
  );
}
