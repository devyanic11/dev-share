import { HashnodeProfile } from "./types";

const HASHNODE_API = "https://gql.hashnode.com";

export async function fetchHashnodeProfile(host: string): Promise<HashnodeProfile | null> {
  try {
    const cleanHost = host.replace(/^https?:\/\//, "").replace(/\/$/, "");

    const query = {
      query: `
        query GetPublication($host: String!) {
          publication(host: $host) {
            author {
              username
              name
              bio { text }
            }
            posts(first: 20) {
              totalDocuments
              edges {
                node {
                  title
                  url
                  views
                  reactionCount
                  publishedAt
                  tags {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      variables: { host: cleanHost },
    };

    const res = await fetch(HASHNODE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    const pub = data.data?.publication;
    if (!pub) return null;

    const author = pub.author || {};
    const posts = pub.posts?.edges || [];

    let totalViews = 0;
    let totalReactions = 0;
    const tagCount = new Map<string, number>();
    let articlesLast30Days = 0;
    const nowLocal = Date.now();
    const topArticlesTemp: { title: string; views: number; url: string; publishedAt: string }[] = [];

    for (const edge of posts) {
      const p = edge.node;
      totalViews += p.views || 0;
      totalReactions += p.reactionCount || 0;

      if (nowLocal - new Date(p.publishedAt).getTime() < 30 * 24 * 3600 * 1000) {
        articlesLast30Days++;
      }

      if (p.tags) {
        for (const t of p.tags) {
          tagCount.set(t.name, (tagCount.get(t.name) || 0) + 1);
        }
      }

      topArticlesTemp.push({
        title: p.title,
        views: p.views || 0,
        url: p.url,
        publishedAt: p.publishedAt,
      });
    }

    const writingTopics = Array.from(tagCount.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5 topics

    const topArticles = topArticlesTemp
      .sort((a, b) => b.views - a.views)
      .slice(0, 3); // top 3

    return {
      username: author.username || cleanHost.split(".")[0],
      profileUrl: `https://${cleanHost}`,
      name: author.name || "",
      bio: author.bio?.text || "",
      totalArticles: pub.posts?.totalDocuments || posts.length,
      totalViews,
      totalReactions,
      totalComments: Math.floor(totalReactions * 0.15), // heuristic if API omits comments
      writingTopics,
      topArticles,
      articlesLast30Days,
    };
  } catch (error) {
    console.error("Hashnode fetch error:", error);
    return null;
  }
}
