"use client";

import { useState, useEffect } from "react";
import { ActivityCalendar, ThemeInput } from "react-activity-calendar";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export default function GitHubHeatmap({ username }: { username: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true);
        setError(null);
        
        // Using a reliable public proxy for GitHub contributions
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch contribution data");
        }
        
        const rawData = await response.json();
        
        // Transform the nested week arrays into a flat array of days
        // that react-activity-calendar expects
        const calendarData = rawData.contributions.flat().map((day: any) => {
          // Map GitHub's level strings to numeric levels 0-4
          let level = 0;
          switch (day.contributionLevel) {
            case "FIRST_QUARTILE": level = 1; break;
            case "SECOND_QUARTILE": level = 2; break;
            case "THIRD_QUARTILE": level = 3; break;
            case "FOURTH_QUARTILE": level = 4; break;
            default: level = 0;
          }
          
          return {
            date: day.date,
            count: day.contributionCount,
            level: level,
          };
        });
        
        setData(calendarData);
      } catch (err) {
        console.error("Error fetching GitHub heatmap:", err);
        setError("Could not load real contribution data.");
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  const customTheme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  if (loading) return <div className="h-32 w-full animate-pulse bg-[#111] rounded-xl" />;
  
  if (error || data.length === 0) {
    return (
      <div className="h-32 w-full flex items-center justify-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-sm italic">
        {error || "No contribution data available"}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[700px]">
        <ActivityCalendar
          data={data}
          theme={customTheme}
          colorScheme="dark"
          labels={{
            totalCount: '{{count}} contributions in the last year',
          }}
          blockRadius={3}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
}
