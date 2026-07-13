# Implementation Plan - Recreate GitHub Profile Interface with Real-Time Data

We will recreate the GitHub profile page to look like a premium, pixel-perfect clone of the official GitHub dark mode interface, featuring real-time data integration.

## Proposed Changes

### Frontend Configuration

#### [MODIFY] [githubData.js](file:///c:/Users/Lenovo/Downloads/FInal%20year%20Project/portfolio/frontend/src/data/githubData.js)
*   Add location, website, email, and social metadata to the fallback data.
*   Update fallback username to `'VarunVP007'`.

#### [MODIFY] [GitHub.jsx](file:///c:/Users/Lenovo/Downloads/FInal%20year%20Project/portfolio/frontend/src/pages/GitHub.jsx)
*   **Real-time Data Fetching**:
    *   Implement dynamic `useEffect` fetch that makes three `Promise.allSettled` network calls:
        1.  `https://api.github.com/users/VarunVP007` to fetch profile details (followers, following, bio, public repos count, name, avatar).
        2.  `https://api.github.com/users/VarunVP007/repos?sort=pushed&per_page=8` to dynamically fetch actual repositories.
        3.  `https://github-contributions-api.jogruber.de/v4/VarunVP007` to retrieve real-time contribution heatmap calendars.
    *   Set up graceful fallback to local data structure if any fetch fails or gets rate-limited by GitHub.
*   **Design & Theme**:
    *   Restyle the dashboard with the official GitHub dark mode palette: `#0D1117` background, `#161B22` card containers, `#30363D` borders, `#C9D1D9` text, `#8B949E` muted text, and green shades for contributions.
    *   Implement standard GitHub navigation tabs at the top: **Overview**, **Repositories**, **Projects**, **Packages**, **Stars** with badges showing counts.
*   **Layout**:
    *   **Sidebar (Left Column)**:
        *   Large circular avatar with status dot.
        *   Display Name & Username.
        *   Bio.
        *   Follow button and stats (Followers, Following).
        *   Location, email, and blog link metadata.
    *   **Main Section (Right Column)**:
        *   Overview Tab:
            *   *Pinned Repositories Grid*: Replicate the 2-column layout of GitHub pinned repository cards with language dots, stars, and fork counts.
            *   *Contribution Heatmap*: Replicate the GitHub contribution graph with Mon/Wed/Fri labels on the left, months above, and the official GitHub green shades color scale.
            *   *Top Languages*: Simple visualization matching GitHub's language percentage bar.

## Verification Plan

### Manual Verification
1. Open the website and navigate to `/leetcode`.
2. Click the **GitHub** tab.
3. Verify that the GitHub Profile Dashboard displays a pixel-perfect replica of the official GitHub dark mode page.
4. Verify that clicking the "GitHub" link in the navigation takes the user to the standalone GitHub page which renders the exact same dashboard.
5. Check developer logs to ensure API requests execute correctly and fall back gracefully if rate-limited.
