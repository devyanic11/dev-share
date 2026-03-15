# Contributing to DevShare

First off, thank you for considering contributing to DevProfile! It's people like you that make this dashboard the best developer analytics tool for the year 2090.

## The Architecture
This project is designed with modularity at its core. Most features revolve around **Platform Scrapers**.

### How to add a new Platform (e.g., CodeChef, GFG)

To add a new platform, follow these steps:

1. **Define the Type:**
   Open `src/lib/platforms/types.ts` and add an interface for your new platform.
   ```typescript
   export interface CodeChefProfile {
     username: string;
     rank: string;
     stars: number;
     // ...
   }
   ```

2. **Add to the Scraper:**
   In `src/lib/platforms/scraper.ts`, create a new fetching function using `cheerio` or an official API.
   ```typescript
   export async function scrapeCodeChef(username: string): Promise<CodeChefProfile> {
     const url = `https://www.codechef.com/users/${username}`;
     const html = await fetchHtml(url);
     const $ = cheerio.load(html);
     // ... logic to extract data
   }
   ```

3. **Register the Module:**
   Update the main `scrapeSocialProfile` or `getDevProfile` function in `scraper.ts` to include your new fetcher.

4. **Create a HUD Component:**
   Create a new file in `src/components/` (e.g., `CodeChefCard.tsx`) and use the `.tech-panel` CSS class to maintain the 2090 aesthetic.
   - Use `font-mono` for all data.
   - Add neon glow effects using Tailwind `shadow-[0_0_10px_...]`.
   - Use high-density layouts (minimize padding).

5. **Update DashboardClient:**
   Add your new component to `src/components/DashboardClient.tsx` in a relevant `col-span` grid.

## Aesthetic Guidelines
- **Primary Color:** `#00ff41` (Matrix Green)
- **Secondary Colors:** Neon Cyans, Blues, and Ambers for different platforms.
- **Grids:** Use `hud-grid` class for consistent spacing.
- **Micro-animations:** Use `animate-pulse` or `transition-all` for interactive elements.

## Testing
Run `npm run dev` and navigate to `/profile?yourplatform=username` to verify that your new card renders correctly and fetches real data.

## Pull Request Process
1. Create a new branch: `feature/add-platform-name`.
2. Ensure no lint errors: `npm run lint`.
3. Submit the PR with a screenshot of your new HUD component!

