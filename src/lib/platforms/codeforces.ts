import { CodeforcesProfile } from "./types";

const CF_API = "https://codeforces.com/api";

export async function fetchCodeforcesProfile(username: string): Promise<CodeforcesProfile | null> {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`${CF_API}/user.info?handles=${username}`, { next: { revalidate: 3600 } }),
      fetch(`${CF_API}/user.rating?handle=${username}`, { next: { revalidate: 3600 } }),
      fetch(`${CF_API}/user.status?handle=${username}`, { next: { revalidate: 3600 } }),
    ]);

    if (!infoRes.ok) return null;

    const infoData = await infoRes.json();
    if (infoData.status !== "OK" || infoData.result.length === 0) return null;
    const user = infoData.result[0];

    const ratingData = ratingRes.ok ? await ratingRes.json() : { result: [] };
    const history = ratingData.status === "OK" ? ratingData.result : [];

    const statusData = statusRes.ok ? await statusRes.json() : { result: [] };
    const submissions = statusData.status === "OK" ? statusData.result : [];

    // Problem solving tags
    const solvedSet = new Set<string>();
    const tagCount = new Map<string, number>();

    for (const sub of submissions) {
      if (sub.verdict === "OK" && sub.problem) {
        const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
        if (!solvedSet.has(problemId)) {
          solvedSet.add(problemId);
          if (sub.problem.tags) {
            for (const tag of sub.problem.tags) {
              tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
            }
          }
        }
      }
    }

    const tagsSolved = Array.from(tagCount.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 tags

    let bestContestRank = Infinity;
    const ratingHistory: { contestName: string; rating: number; date: number }[] = [];

    for (const r of history) {
      if (r.rank < bestContestRank) bestContestRank = r.rank;
      ratingHistory.push({
        contestName: r.contestName,
        rating: r.newRating,
        date: r.ratingUpdateTimeSeconds * 1000,
      });
    }

    return {
      username: user.handle,
      profileUrl: `https://codeforces.com/profile/${user.handle}`,

      rating: user.rating || 0,
      rank: user.rank || "Unrated",
      maxRating: user.maxRating || 0,
      maxRank: user.maxRank || "Unrated",

      contestsParticipated: history.length,
      bestContestRank: bestContestRank === Infinity ? 0 : bestContestRank,
      ratingHistory,

      totalSolved: solvedSet.size,
      tagsSolved,

      daysActive: Math.round(submissions.length / 5), // Rough heuristic if full days active isn't computable
    };
  } catch (error) {
    console.error("Codeforces fetch error:", error);
    return null;
  }
}
