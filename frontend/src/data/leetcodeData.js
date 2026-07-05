// ─── LeetCode Placeholder Data ───────────────────────────────────────────────
export const leetcodeData = {
  username: 'varunprasad',
  avatar: 'https://assets.leetcode.com/users/avatars/avatar_1627541578.png',
  ranking: 214578,
  contestRating: 1600,
  contestRatingLabel: 'Top 23.34%',
  totalSolved: 380,
  easySolved: 140,
  mediumSolved: 180,
  hardSolved: 60,
  totalEasy: 800,
  totalMedium: 1600,
  totalHard: 700,
  acceptanceRate: 87.4,
  totalSubmissions: 1200,
  reputation: 245,
  badges: 5,
  streak: 32,
  globalRank: '#214,578',
  globalRankLabel: 'Top 13.67%',

  recentSubmissions: [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'Accepted', language: 'JavaScript', time: '2 hours ago' },
    { id: 2, title: 'LRU Cache', difficulty: 'Medium', status: 'Accepted', language: 'Python', time: '1 day ago' },
    { id: 3, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', status: 'Accepted', language: 'Java', time: '2 days ago' },
    { id: 4, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'Accepted', language: 'JavaScript', time: '3 days ago' },
    { id: 5, title: 'Merge K Sorted Lists', difficulty: 'Hard', status: 'Accepted', language: 'Python', time: '4 days ago' },
    { id: 6, title: 'Valid Parentheses', difficulty: 'Easy', status: 'Accepted', language: 'JavaScript', time: '5 days ago' },
  ],

  // Generate heatmap data (last 6 months)
  heatmapData: generateHeatmapData(),

  problemsChartData: [
    { name: 'Easy', solved: 140, total: 800, fill: '#22C55E' },
    { name: 'Medium', solved: 180, total: 1600, fill: '#F59E0B' },
    { name: 'Hard', solved: 60, total: 700, fill: '#EF4444' },
  ],

  contestHistory: [
    { contest: 'Weekly 395', rating: 1600, rank: 3200, date: '2024-06-01' },
    { contest: 'Weekly 394', rating: 1580, rank: 3450, date: '2024-05-25' },
    { contest: 'Biweekly 132', rating: 1540, rank: 4100, date: '2024-05-18' },
    { contest: 'Weekly 393', rating: 1510, rank: 4500, date: '2024-05-11' },
    { contest: 'Weekly 392', rating: 1490, rank: 5000, date: '2024-05-04' },
    { contest: 'Biweekly 131', rating: 1470, rank: 5200, date: '2024-04-27' },
  ],
};

function generateHeatmapData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [];
  months.forEach((month, mIdx) => {
    for (let day = 1; day <= 28; day++) {
      data.push({
        month,
        day,
        count: Math.random() < 0.6 ? Math.floor(Math.random() * 8) : 0,
      });
    }
  });
  return data;
}
