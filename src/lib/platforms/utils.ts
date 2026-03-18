/**
 * Extracts a username or handle from a platform URL or returns the input if it's already a username.
 */
export function extractUsername(platformId: string, input: string): string {
  if (!input) return "";

  const trimmed = input.trim();

  // If it doesn't look like a URL, return as is
  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed;
  }

  try {
    // Basic normalization: remove trailing slashes
    let normalized = trimmed.replace(/\/+$/, "");

    switch (platformId) {
      case "github":
        // https://github.com/username
        return normalized.split("github.com/").pop()?.split("/")[0] || trimmed;

      case "leetcode":
        // https://leetcode.com/u/username/ 
        if (normalized.includes("leetcode.com/u/")) {
          return normalized.split("leetcode.com/u/").pop()?.split("/")[0] || trimmed;
        }
        return normalized.split("leetcode.com/").pop()?.split("/")[0] || trimmed;

      case "codeforces":
        // https://codeforces.com/profile/handle
        return normalized.split("codeforces.com/profile/").pop()?.split("/")[0] || trimmed;

      case "hashnode":
        // username.hashnode.dev or hashnode.com/@username
        if (normalized.includes("hashnode.dev")) {
          return normalized.split(".hashnode.dev")[0].split("//").pop() || trimmed;
        }
        if (normalized.includes("hashnode.com/@")) {
          return normalized.split("hashnode.com/@").pop()?.split("/")[0] || trimmed;
        }
        return trimmed;

      case "kaggle":
        // https://www.kaggle.com/username
        return normalized.split("kaggle.com/").pop()?.split("/")[0] || trimmed;

      case "linkedin":
        // https://www.linkedin.com/in/username
        return normalized.split("linkedin.com/in/").pop()?.split("/")[0] || trimmed;

      case "twitter":
        // https://twitter.com/handle or https://x.com/handle
        if (normalized.includes("twitter.com/")) {
          return normalized.split("twitter.com/").pop()?.split("/")[0] || trimmed;
        }
        if (normalized.includes("x.com/")) {
          return normalized.split("x.com/").pop()?.split("/")[0] || trimmed;
        }
        return trimmed;

      default:
        return trimmed;
    }
  } catch (error) {
    console.error(`Error extracting username for ${platformId}:`, error);
    return trimmed;
  }
}
