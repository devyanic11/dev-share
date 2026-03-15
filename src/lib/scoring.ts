import { DevProfile, DevScore, CrossPlatformInsights } from "./platforms/types";

export function computeDevScore(profile: DevProfile): DevScore {
  let engineering = 0;
  let problemSolving = 0;
  let openSource = 0;
  let community = 0;
  let writing = 0;

  // Engineering
  if (profile.github) {
    engineering += Math.min(profile.github.totalCommits * 0.05, 30);
    engineering += Math.min(profile.github.publicRepos * 2, 30);
    engineering += Math.min(profile.github.languages.length * 5, 20);
    engineering += Math.min(profile.github.followers * 0.5, 20);
  }

  // Problem Solving
  if (profile.leetcode) {
    problemSolving += Math.min(profile.leetcode.hardSolved * 0.5, 30);
    problemSolving += Math.min((profile.leetcode.contestRating / 100) * 2, 30);
    problemSolving += Math.min(profile.leetcode.totalSolved * 0.05, 20);
  }
  if (profile.codeforces) {
    problemSolving += Math.min((profile.codeforces.rating / 100) * 3, 40);
  }

  // Open Source
  if (profile.github) {
    openSource += Math.min(profile.github.prsMerged * 5, 40);
    openSource += Math.min(profile.github.issuesSolved * 3, 30);
    openSource += Math.min(profile.github.totalStars * 2, 30);
  }

  // Community
  if (profile.github) community += Math.min(profile.github.followers, 30);
  if (profile.linkedin) community += Math.min(profile.linkedin.followers * 0.01, 30);
  if (profile.twitter) community += Math.min(profile.twitter.followers * 0.01, 30);
  if (profile.hashnode) community += Math.min(profile.hashnode.totalReactions * 0.05, 10);

  // Writing
  if (profile.hashnode) {
    writing += Math.min(profile.hashnode.totalArticles * 10, 50);
    writing += Math.min(profile.hashnode.totalViews * 0.005, 30);
    writing += Math.min(profile.hashnode.articlesLast30Days * 10, 20);
  }
  // Bonus points for markdown READMEs on GitHub as writing
  if (profile.github && writing < 30) {
    writing += Math.min(profile.github.publicRepos * 1.5, 30);
  }

  // Clamp
  const clamp = (val: number) => Math.min(Math.round(val), 100);
  engineering = clamp(engineering);
  problemSolving = clamp(problemSolving);
  openSource = clamp(openSource);
  community = clamp(community);
  writing = clamp(writing);

  const overall = Math.round(
    engineering * 0.3 +
    problemSolving * 0.3 +
    openSource * 0.15 +
    writing * 0.15 +
    community * 0.1
  );

  return { engineering, problemSolving, openSource, community, writing, overall };
}

export function generateInsights(profile: DevProfile, score: DevScore): CrossPlatformInsights {
  const topSkills: string[] = [];
  const highlights: string[] = [];
  const personality: string[] = [];

  // Top Skills
  if (profile.github?.languages.length) {
    topSkills.push(...profile.github.languages.slice(0, 3).map(l => l.name));
  }
  if (profile.leetcode?.skills.length) {
    topSkills.push(profile.leetcode.skills[0].tag);
  }
  if (profile.hashnode?.writingTopics.length) {
    topSkills.push(profile.hashnode.writingTopics[0].tag);
  }
  
  // Dedup skills
  const uniqueSkills = Array.from(new Set(topSkills)).slice(0, 5);
  if (uniqueSkills.length === 0) uniqueSkills.push("Software Engineering");

  // Highlights
  if (profile.leetcode && profile.leetcode.totalSolved > 200) {
    highlights.push(`${profile.leetcode.totalSolved}+ LeetCode problems solved`);
  }
  if (profile.github && profile.github.totalStars > 100) {
    highlights.push(`${profile.github.totalStars}+ stars on GitHub open source projects`);
  }
  if (profile.codeforces && profile.codeforces.rating > 1400) {
    highlights.push(`Codeforces Rating ${profile.codeforces.rating} (${profile.codeforces.rank})`);
  }
  if (profile.kaggle && profile.kaggle.rank !== "Contributor") {
    highlights.push(`Kaggle ${profile.kaggle.rank} with ${profile.kaggle.medals.gold + profile.kaggle.medals.silver} medals`);
  }
  if (profile.hashnode && profile.hashnode.totalViews > 5000) {
    highlights.push(`${(profile.hashnode.totalViews / 1000).toFixed(1)}k+ views on technical articles`);
  }

  // Fallback Highlight
  if (highlights.length === 0) {
    highlights.push("Active developer building side projects and learning continuously.");
  }

  // Personality Insights
  if (score.problemSolving > 80 && score.engineering > 80) {
    personality.push("A rare hybrid of strong algorithmic problem-solving and practical engineering skills.");
  } else if (score.problemSolving > 75) {
    personality.push("Strong analytical thinker with a solid foundation in data structures and competitive programming.");
  } else if (score.engineering > 75) {
    personality.push("Product-focused engineer who consistently ships code and builds full projects.");
  }

  if (score.openSource > 60) {
    personality.push("Active open-source contributor who thrives in collaborative, global developer ecosystems.");
  }

  if (score.writing > 60 || score.community > 60) {
    personality.push("Excellent communicator who frequently shares knowledge and drives technical discussions.");
  }

  if (personality.length === 0) {
    personality.push("Dedicated software professional constantly expanding their technical horizon.");
  }

  return {
    topSkills: uniqueSkills,
    highlights,
    personalityInsights: personality,
  };
}
