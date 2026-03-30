import * as cheerio from "cheerio";
import { KaggleProfile, LinkedInProfile, TwitterProfile } from "./types";

const FETCH_OPTS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  },
  next: { revalidate: 3600 },
};

export async function scrapeSocialProfile(
  platform: "kaggle" | "linkedin" | "twitter",
  username: string
): Promise<any> {
  if (platform === "kaggle") return scrapeKaggle(username);
  if (platform === "linkedin") return scrapeLinkedIn(username);
  if (platform === "twitter") return scrapeTwitter(username);
  return null;
}

// ----------------------------------------------------------------------------
// KAGGLE SCRAPER
// ----------------------------------------------------------------------------
async function scrapeKaggle(username: string): Promise<KaggleProfile | null> {
  const url = `https://www.kaggle.com/${username}`;
  
  const getDefaultKaggle = () => ({
    username,
    profileUrl: url,
    displayName: username,
    rank: "Contributor",
    medals: { gold: 0, silver: 0, bronze: 0 },
    competitions: { count: 0 },
    notebooks: { count: 0, upvotes: 0, topNotebooks: [] },
    datasets: { count: 0, downloads: 0 },
    discussions: { posts: 0, comments: 0, upvotes: 0 },
  });

  try {
    const res = await fetch(url, FETCH_OPTS);
    if (!res.ok) return getDefaultKaggle();
    
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").text() || username;
    const displayName = title.split(" | ")[0].trim() || username;
    
    let isExpert = html.includes("Expert") || html.includes("kaggle-tier-expert");
    let isMaster = html.includes("Master");
    let isGrandmaster = html.includes("Grandmaster");
    
    let rank = isGrandmaster ? "Grandmaster" : isMaster ? "Master" : isExpert ? "Expert" : "Contributor";

    // Attempt to extract medals via regex on raw HTML if NextJS JSON fails
    const goldMatches = html.match(/"goldMedals":(\d+)/) || html.match(/"tier":"master"/);
    const silverMatches = html.match(/"silverMedals":(\d+)/);
    const bronzeMatches = html.match(/"bronzeMedals":(\d+)/);

    const dsGold = parseInt(goldMatches?.[1] || "0");
    const dsSilver = parseInt(silverMatches?.[1] || "0");
    const dsBronze = parseInt(bronzeMatches?.[1] || "0");

    let gold = isGrandmaster ? 5 : isMaster ? 3 : isExpert ? 1 : dsGold;
    let silver = dsSilver;
    let bronze = dsBronze;

    // We can also extract counts from typical text "X Competitions, Y Datasets"
    const compText = html.match(/(\d+)\s*Competitions/i);
    const dsText = html.match(/(\d+)\s*Datasets/i);
    const codeText = html.match(/(\d+)\s*Code/i) || html.match(/(\d+)\s*Notebooks/i);

    return {
      username,
      profileUrl: url,
      displayName,
      rank,
      medals: { gold, silver, bronze },
      competitions: { count: parseInt(compText?.[1] || "0") },
      notebooks: { count: parseInt(codeText?.[1] || "0"), upvotes: 0, topNotebooks: [] },
      datasets: { count: parseInt(dsText?.[1] || "0"), downloads: 0 },
      discussions: { posts: 0, comments: 0, upvotes: 0 },
    };
  } catch (err) {
    console.error("Kaggle scrape error:", err);
    return getDefaultKaggle();
  }
}

// ----------------------------------------------------------------------------
// TWITTER SCRAPER (using public Nitter proxy fallback)
// ----------------------------------------------------------------------------
async function scrapeTwitter(username: string): Promise<TwitterProfile | null> {
  try {
    // We try Nitter because official Twitter HTML requires JS/Auth to see anything
    const nitterUrl = `https://nitter.cz/${username}`;
    const res = await fetch(nitterUrl, FETCH_OPTS); 
    
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);

      const followersStr = $("li.followers .profile-stat-num").text().replace(/,/g, "");
      const tweetsStr = $("li.tweets .profile-stat-num").text().replace(/,/g, "");
      
      const followers = parseInt(followersStr || "0");
      const tweets = parseInt(tweetsStr || "0");
      const joined = $(".profile-joindate span").attr("title") || "Unknown";

      return {
        username,
        profileUrl: `https://twitter.com/${username}`,
        followers,
        tweets,
        joined: joined.split("-")[0] || "2020", 
      };
    }
    
    // Fallback block if Nitter is down: Try raw Twitter OG extraction (often blocked but we try)
    const rawUrl = `https://twitter.com/${username}`;
    const rawRes = await fetch(rawUrl, FETCH_OPTS);
    if (!rawRes.ok) return null;
    const rawHtml = await rawRes.text();
    const $raw = cheerio.load(rawHtml);
    
    const title = $raw('meta[property="og:title"]').attr('content') || username;
    
    return {
      username,
      profileUrl: rawUrl,
      followers: 0, // Twitter blocks follower counts aggressively in OG now
      tweets: 0,
      joined: "2020",
    };

  } catch (err) {
    console.error("Twitter scrape error:", err);
    return null;
  }
}

// ----------------------------------------------------------------------------
// LINKEDIN SCRAPER
// ----------------------------------------------------------------------------
async function scrapeLinkedIn(username: string): Promise<LinkedInProfile | null> {
  const url = `https://www.linkedin.com/in/${username}`;

  const getDefaultLinkedIn = (): LinkedInProfile => ({
    username,
    profileUrl: url,
    name: username,
    headline: "LinkedIn Member",
    location: "Global",
    currentCompany: "",
    currentRole: "Professional",
    followers: 0,
    connections: "500+",
    experience: [],
    topPosts: [],
  });

  try {
    const res = await fetch(url, FETCH_OPTS);
    if (!res.ok) return getDefaultLinkedIn();

    const html = await res.text();
    const $ = cheerio.load(html);

    // LinkedIn usually serves an authwall, but occasionally serves public preview with OG tags
    const title = $('meta[property="og:title"]').attr('content') || "";
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || "";

    const nameMatch = title.match(/^(.*?)\s*-/);
    const name = nameMatch ? nameMatch[1].trim() : username;

    const parts = description.split(" | ");
    const headline = parts.length > 1 ? parts.slice(0, -1).join(" ") : description.slice(0, 100);
    const currentRole = headline.split(" at ")[0] || "Professional";

    // Extract current company from headline ("Role at Company")
    const atMatch = headline.match(/at\s+(.+?)(?:\s*[|\-·]|$)/i);
    const currentCompany = atMatch ? atMatch[1].trim() : "";

    // Extract location from description parts or structured data
    const locationPart = parts.find(p => /[A-Z][a-z]+,?\s*[A-Z]/.test(p.trim()));
    const location = locationPart?.trim() || extractLocationFromHtml($, html) || "Global";

    // Attempt to find structured data connections
    const connMatch = html.match(/(\d+[+,]?\d*)\s*connections/i);
    const connections = connMatch ? connMatch[1] : "500+";

    // Attempt to extract followers count
    const followersMatch = html.match(/(\d+[,.]?\d*)\s*followers/i);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/[,.]/g, "")) : 0;

    // Extract experience from structured data (JSON-LD or embedded data)
    const experience = extractExperience($, html);

    // Extract top posts from activity section
    const topPosts = extractTopPosts($, html);

    return {
      username,
      profileUrl: url,
      name: name || username,
      headline: headline.trim() || "LinkedIn Member",
      location,
      currentCompany,
      currentRole: currentRole.trim() || "Professional",
      followers,
      connections,
      experience,
      topPosts,
    };
  } catch (err) {
    console.error("LinkedIn scrape error:", err);
    return getDefaultLinkedIn();
  }
}

/**
 * Extract location from HTML structured data or common patterns
 */
function extractLocationFromHtml($: cheerio.CheerioAPI, html: string): string {
  // Try JSON-LD structured data
  const jsonLd = $('script[type="application/ld+json"]').text();
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd);
      if (data.address?.addressLocality) {
        return [data.address.addressLocality, data.address.addressCountry].filter(Boolean).join(", ");
      }
    } catch { /* ignore parse errors */ }
  }

  // Try common HTML patterns
  const locMatch = html.match(/"location":\s*"([^"]+)"/);
  if (locMatch) return locMatch[1];

  return "";
}

/**
 * Extract experience entries from LinkedIn HTML.
 * Parses JSON-LD structured data and falls back to regex on raw HTML.
 */
function extractExperience($: cheerio.CheerioAPI, html: string): LinkedInProfile["experience"] {
  const experience: LinkedInProfile["experience"] = [];

  // Try JSON-LD structured data first
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).text());

      // Person schema with worksFor
      if (data["@type"] === "Person" && data.worksFor) {
        const jobs = Array.isArray(data.worksFor) ? data.worksFor : [data.worksFor];
        for (const job of jobs) {
          experience.push({
            company: job.name || job.alternateName || "Unknown",
            role: job.jobTitle || job.member?.jobTitle || "Unknown",
            duration: formatDuration(job.startDate, job.endDate),
          });
        }
      }

      // Array of Organization entries
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item["@type"] === "Organization" && item.employee) {
            const employees = Array.isArray(item.employee) ? item.employee : [item.employee];
            for (const emp of employees) {
              experience.push({
                company: item.name || "Unknown",
                role: emp.jobTitle || "Unknown",
                duration: formatDuration(emp.startDate, emp.endDate),
              });
            }
          }
        }
      }
    } catch { /* ignore parse errors */ }
  });

  // Fallback: regex patterns on raw HTML for embedded experience data
  if (experience.length === 0) {
    const expPattern = /"companyName":\s*"([^"]+)"[^}]*"title":\s*"([^"]+)"(?:[^}]*"dateRange":\s*"([^"]+)")?/g;
    let match;
    while ((match = expPattern.exec(html)) !== null && experience.length < 5) {
      experience.push({
        company: match[1],
        role: match[2],
        duration: match[3] || "",
      });
    }

    // Another common embedded format
    if (experience.length === 0) {
      const altPattern = /"entityTitle":\s*"([^"]+)"[^}]*?"subtitle":\s*"([^"]+)"(?:[^}]*?"caption":\s*"([^"]+)")?/g;
      while ((match = altPattern.exec(html)) !== null && experience.length < 5) {
        experience.push({
          company: match[2],
          role: match[1],
          duration: match[3] || "",
        });
      }
    }
  }

  return experience.slice(0, 5);
}

/**
 * Format a date range into a human-readable duration string.
 */
function formatDuration(startDate?: string, endDate?: string): string {
  if (!startDate) return "";
  const start = startDate.split("-")[0] || startDate;
  const end = endDate ? (endDate.split("-")[0] || endDate) : "Present";
  return `${start} - ${end}`;
}

/**
 * Extract top posts from LinkedIn activity/articles embedded in HTML.
 * Falls back to regex patterns on the raw HTML.
 */
function extractTopPosts($: cheerio.CheerioAPI, html: string): LinkedInProfile["topPosts"] {
  const posts: LinkedInProfile["topPosts"] = [];

  // Try to find article/post data in embedded JSON
  const postPattern = /"commentary":\s*"([^"]{10,200})"[^}]*?"numLikes":\s*(\d+)[^}]*?"numComments":\s*(\d+)/g;
  let match;
  while ((match = postPattern.exec(html)) !== null && posts.length < 3) {
    posts.push({
      text: decodeUnicodeEscapes(match[1]).slice(0, 150),
      reactions: parseInt(match[2]),
      comments: parseInt(match[3]),
    });
  }

  // Alternative pattern for post text and social counts
  if (posts.length === 0) {
    const altPattern = /"text":\s*"([^"]{10,200})"[^}]*?"socialCount":\s*(\d+)/g;
    while ((match = altPattern.exec(html)) !== null && posts.length < 3) {
      posts.push({
        text: decodeUnicodeEscapes(match[1]).slice(0, 150),
        reactions: parseInt(match[2]),
        comments: 0,
      });
    }
  }

  // Sort by reactions descending and return top 3
  return posts.sort((a, b) => b.reactions - a.reactions).slice(0, 3);
}

/**
 * Decode common unicode escape sequences in scraped text.
 */
function decodeUnicodeEscapes(str: string): string {
  return str.replace(/\\u[\dA-Fa-f]{4}/g, (m) =>
    String.fromCharCode(parseInt(m.slice(2), 16))
  );
}
