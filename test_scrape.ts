import { scrapeSocialProfile } from './src/lib/platforms/scraper';

async function test() {
  console.log("--- SCRAPING KAGGLE ---");
  const kaggle = await scrapeSocialProfile("kaggle", "devyanichavan");
  console.log(kaggle);

  console.log("\n--- SCRAPING LINKEDIN ---");
  const linkedin = await scrapeSocialProfile("linkedin", "devyani-chavan");
  console.log(linkedin);

  console.log("\n--- SCRAPING TWITTER ---");
  const twitter = await scrapeSocialProfile("twitter", "devyaniCh");
  console.log(twitter);
}

test();
