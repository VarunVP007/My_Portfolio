// ─── LeetCode Placeholder Data ───────────────────────────────────────────────
export const leetcodeData = {
  username: 'OH6I3R4UyZ',
  avatar: 'https://assets.leetcode.com/users/avatars/avatar_1627541578.png',
  ranking: 1613219,
  contestRating: 0,
  contestRatingLabel: 'N/A',
  totalSolved: 98,
  easySolved: 45,
  mediumSolved: 53,
  hardSolved: 0,
  totalEasy: 954,
  totalMedium: 2084,
  totalHard: 953,
  acceptanceRate: 46.2,
  totalSubmissions: 51,
  reputation: 0,
  badges: 2,
  streak: 7,
  globalRank: '#1,613,219',
  globalRankLabel: 'Top 45%',
  
  submissionCalendar: generateSubmissionCalendar(),

  recentSubmissions: [
    { id: 1, title: 'Big Countries', difficulty: 'Easy', status: 'Accepted', language: 'MySQL', time: '4 months ago' },
    { id: 2, title: 'Find Customer Referee', difficulty: 'Easy', status: 'Accepted', language: 'MySQL', time: '4 months ago' },
    { id: 3, title: 'Recyclable and Low Fat Products', difficulty: 'Easy', status: 'Accepted', language: 'MySQL', time: '4 months ago' },
    { id: 4, title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', status: 'Accepted', language: 'Java', time: '8 months ago' },
    { id: 5, title: 'Merge Two Sorted Lists', difficulty: 'Easy', status: 'Accepted', language: 'Java', time: '8 months ago' },
    { id: 6, title: 'Valid Parentheses', difficulty: 'Easy', status: 'Accepted', language: 'Java', time: '8 months ago' },
  ],
};

function generateSubmissionCalendar() {
  const calendar = {};
  const today = new Date();
  
  // We want to generate exactly 41 active days distributed over the past year.
  const activeDays = 41;
  
  // Deterministic offsets relative to today
  const offsets = [];
  for (let i = 0; i < activeDays; i++) {
    let offset;
    if (i < 7) {
      // 7-day max streak (matching user's screenshot max streak)
      offset = 12 + i;
    } else if (i < 10) {
      // 3-day streak
      offset = 45 + (i - 7);
    } else if (i < 17) {
      // Scattered
      offset = 60 + (i - 10) * 14;
    } else if (i < 22) {
      // 5-day streak
      offset = 180 + (i - 17);
    } else if (i < 31) {
      // Scattered
      offset = 200 + (i - 22) * 11;
    } else {
      // Recent active days
      offset = 350 + (i - 31);
    }
    offsets.push(offset);
  }

  // Assign counts (51 submissions total across 41 active days)
  const dayCounts = Array(activeDays).fill(1);
  for (let j = 0; j < 10; j++) {
    dayCounts[j % activeDays]++;
  }

  offsets.forEach((offset, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const startOfDay = Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000);
    calendar[startOfDay] = dayCounts[idx];
  });

  return calendar;
}
