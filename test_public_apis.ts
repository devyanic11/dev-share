async function testPublicAPIs() {
  console.log("--- SCRAPING TWITTER SYNDICATION ---");
  const username = "devyaniCh";
  try {
    const res = await fetch(`https://syndication.twitter.com/srv/timeline-profile/screen-name/${username}`);
    if (res.ok) {
        const text = await res.text();
        console.log("SUCCESS! Got Syndication data length:", text.length);
        // Look for followers in the HTML
        const followersMatch = text.match(/"followers_count":(\d+)/) || text.match(/"screen_name":"[^"]+","followers_count":(\d+)/) || text.match(/"statuses_count":(\d+)/) || text.match(/Followers<\/span>\s*<span[^>]*>(.*?)<\/span>/i);
        console.log("Found matches:", text.slice(0, 500)); 
    } else {
        console.log("Syndication failed:", res.status);
    }
  } catch(e) { console.log(e) }
  
  console.log("\n--- SCRAPING LINKEDIN VIA GOOGLE ---");
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=site:linkedin.com/in/+"devyani-chavan"`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    if (res.ok) {
        const html = await res.text();
        console.log("DuckDuckGo HTML snippet:", html.slice(0, 500));
        const snippetMatch = html.match(/<a class="result__snippet[^>]*>(.*?)<\/a>/i);
        console.log("LinkedIn Snippet:", snippetMatch ? snippetMatch[1] : "not found");
    }
  } catch(e) { console.log(e) }
}
testPublicAPIs();
