import { fetchGitHubProfile } from "@/lib/platforms/github";
import { fetchLeetCodeProfile } from "@/lib/platforms/leetcode";
import { fetchCodeforcesProfile } from "@/lib/platforms/codeforces";
import { fetchHashnodeProfile } from "@/lib/platforms/hashnode";
import { scrapeSocialProfile } from "@/lib/platforms/scraper";
import { extractUsername } from "@/lib/platforms/utils";
import { computeDevScore, generateInsights } from "@/lib/scoring";
import { DevProfile } from "@/lib/platforms/types";
import DashboardClient from "@/components/DashboardClient";
import type { Metadata } from "next";

interface ProfilePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: ProfilePageProps): Promise<Metadata> {
  const params = await searchParams;
  const github = typeof params.github === "string" ? params.github : undefined;
  const name = github || "Developer";

  return {
    title: `${name} | Analytics`,
    description: `View ${name}'s aggregated developer analytics from GitHub, LeetCode, Codeforces, and more.`,
  };
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;

  const githubUser = typeof params.github === "string" ? extractUsername("github", params.github) : undefined;
  const leetcodeUser = typeof params.leetcode === "string" ? extractUsername("leetcode", params.leetcode) : undefined;
  const hashnodeHost = typeof params.hashnode === "string" ? extractUsername("hashnode", params.hashnode) : undefined;
  const codeforcesUser = typeof params.codeforces === "string" ? extractUsername("codeforces", params.codeforces) : undefined;
  
  const linkedinUrl = typeof params.linkedin === "string" ? extractUsername("linkedin", params.linkedin) : undefined;
  const twitterHandle = typeof params.twitter === "string" ? extractUsername("twitter", params.twitter) : undefined;
  const kaggleUser = typeof params.kaggle === "string" ? extractUsername("kaggle", params.kaggle) : undefined;

  const [github, leetcode, codeforces, hashnode, kaggle, linkedin, twitter] = await Promise.all([
    githubUser ? fetchGitHubProfile(githubUser) : null,
    leetcodeUser ? fetchLeetCodeProfile(leetcodeUser) : null,
    codeforcesUser ? fetchCodeforcesProfile(codeforcesUser) : null,
    hashnodeHost ? fetchHashnodeProfile(hashnodeHost) : null,
    kaggleUser ? scrapeSocialProfile("kaggle", kaggleUser) : null,
    linkedinUrl ? scrapeSocialProfile("linkedin", linkedinUrl) : null,
    twitterHandle ? scrapeSocialProfile("twitter", twitterHandle) : null,
  ]);

  const profile: DevProfile = {
    github,
    leetcode,
    codeforces,
    hashnode,
    kaggle,
    linkedin,
    twitter,
  };

  const score = computeDevScore(profile);
  const insights = generateInsights(profile, score);
  
  profile.score = score;
  profile.insights = insights;

  const cleanParams: Record<string, string> = {};
  if (githubUser) cleanParams.github = githubUser;
  if (leetcodeUser) cleanParams.leetcode = leetcodeUser;
  if (hashnodeHost) cleanParams.hashnode = hashnodeHost;
  if (codeforcesUser) cleanParams.codeforces = codeforcesUser;
  if (linkedinUrl) cleanParams.linkedin = linkedinUrl;
  if (twitterHandle) cleanParams.twitter = twitterHandle;
  if (kaggleUser) cleanParams.kaggle = kaggleUser;

  return <DashboardClient profile={profile} score={score} params={cleanParams} />;
}
