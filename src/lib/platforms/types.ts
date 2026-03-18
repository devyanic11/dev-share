export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  updatedAt: string;
  license?: string;
  openIssues: number;
  topics: string[];
  url: string;
}

export interface GitHubProfile {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  profileUrl: string;
  
  // Contribution Metrics
  totalCommits: number;
  contributionsLastYear: number;
  longestStreak: number;
  currentStreak: number;

  // Repo Metrics
  publicRepos: number;
  topRepos: GitHubRepo[];
  mostStarredRepo?: GitHubRepo;
  mostActiveRepo?: GitHubRepo;

  // Language Breakdown
  languages: { name: string; percentage: number; count: number }[];

  // Open Source (Heuristic/Search)
  prsCreated: number;
  prsMerged: number;
  issuesOpened: number;
  issuesSolved: number;
  discussions: number;

  // Community Recognition
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalContributors: number;

  // Organizations
  organizations: { login: string; avatarUrl: string; role: string }[];
  
  createdAt: string;
}

export interface LeetCodeProfile {
  username: string;
  profileUrl: string;

  // Overall
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;

  // Contests
  contestRating: number;
  contestRanking: number;
  contestsAttended: number;
  topPercentage: number;

  // Activity
  submissionCalendar: Record<string, number>;
  problemsSolvedPerWeek: { week: string; count: number }[];

  // Skill Breakdown
  skills: { tag: string; solved: number }[];

  // Badges
  badges: { name: string; icon: string }[];
}

export interface CodeforcesProfile {
  username: string;
  profileUrl: string;
  
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;

  contestsParticipated: number;
  bestContestRank: number;
  ratingHistory: { contestName: string; rating: number; date: number }[];

  totalSolved: number;
  tagsSolved: { tag: string; count: number }[];

  daysActive: number;
}

export interface KaggleProfile {
  username: string;
  profileUrl: string;
  displayName: string;
  rank: string; // Expert, Master, etc

  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };

  competitions: { count: number; bestRank?: number; topPercent?: number };
  notebooks: { count: number; upvotes: number; topNotebooks: any[] };
  datasets: { count: number; downloads: number };
  discussions: { posts: number; comments: number; upvotes: number };
}

export interface HashnodeProfile {
  username: string;
  profileUrl: string;
  name: string;
  bio: string;
  
  totalArticles: number;
  totalViews: number;
  totalReactions: number;
  totalComments: number;

  writingTopics: { tag: string; count: number }[];
  topArticles: { title: string; views: number; url: string; publishedAt: string }[];
  articlesLast30Days: number;
}

export interface LinkedInProfile {
  username: string;
  profileUrl: string;
  name: string;
  headline: string;
  location: string;
  currentRole: string;
  followers: number;
  connections: string;
}

export interface TwitterProfile {
  username: string;
  profileUrl: string;
  followers: number;
  tweets: number;
  joined: string;
}

export interface CrossPlatformInsights {
  topSkills: string[];
  highlights: string[];
  personalityInsights: string[];
}

export interface DevScore {
  engineering: number;
  problemSolving: number;
  openSource: number;
  community: number;
  writing: number;
  overall: number;
}

export interface DevProfile {
  github?: GitHubProfile | null;
  leetcode?: LeetCodeProfile | null;
  codeforces?: CodeforcesProfile | null;
  kaggle?: KaggleProfile | null;
  hashnode?: HashnodeProfile | null;
  linkedin?: LinkedInProfile | null;
  twitter?: TwitterProfile | null;
  
  score?: DevScore;
  insights?: CrossPlatformInsights;
}
