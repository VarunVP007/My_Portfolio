// ─── GitHub Placeholder Data ─────────────────────────────────────────────────
export const githubData = {
  username: 'VarunVP007',
  name: 'Varunprasad V',
  bio: 'Full Stack Developer | Problem Solver | Open Source Enthusiast',
  avatar: 'https://avatars.githubusercontent.com/u/88934578?v=4',
  location: 'Salem, TamilNadu',
  blog: 'https://linkedin.com/in/varunprasad-v/',
  email: 'varunprasadofficial23@gmail.com',
  public_repos: 25,
  followers: 85,
  following: 40,
  total_stars: 210,
  total_commits: 1240,

  pinnedRepos: [
    {
      id: 1,
      name: 'craftshield',
      description: 'An AI-powered platform to detect counterfeit products using computer vision',
      stars: 48,
      forks: 12,
      language: 'JavaScript',
      languageColor: '#F7DF1E',
      url: 'https://github.com/VarunVP007/craftshield',
      topics: ['react', 'nodejs', 'mongodb', 'tensorflow'],
      updatedAt: '2024-05-10',
    },
    {
      id: 2,
      name: 'studysphere',
      description: 'Collaborative learning platform with real-time notes sharing',
      stars: 36,
      forks: 8,
      language: 'JavaScript',
      languageColor: '#F7DF1E',
      url: 'https://github.com/VarunVP007/studysphere',
      topics: ['react', 'socketio', 'mongodb'],
      updatedAt: '2024-04-18',
    },
    {
      id: 3,
      name: 'expense-tracker',
      description: 'Full-stack expense management with charts and insights',
      stars: 29,
      forks: 6,
      language: 'JavaScript',
      languageColor: '#F7DF1E',
      url: 'https://github.com/VarunVP007/expense-tracker',
      topics: ['react', 'expressjs', 'recharts'],
      updatedAt: '2024-03-25',
    },
    {
      id: 4,
      name: 'ai-chat',
      description: 'Conversational AI powered by Google Gemini with context memory',
      stars: 22,
      forks: 5,
      language: 'Python',
      languageColor: '#3776AB',
      url: 'https://github.com/VarunVP007/ai-chat',
      topics: ['python', 'fastapi', 'gemini'],
      updatedAt: '2024-02-12',
    },
  ],

  languageStats: [
    { name: 'JavaScript', percentage: 48, color: '#F7DF1E' },
    { name: 'Python', percentage: 22, color: '#3776AB' },
    { name: 'TypeScript', percentage: 14, color: '#3178C6' },
    { name: 'HTML', percentage: 8, color: '#E34F26' },
    { name: 'CSS', percentage: 5, color: '#1572B6' },
    { name: 'Other', percentage: 3, color: '#6B7280' },
  ],

  recentCommits: [
    { repo: 'craftshield', message: 'feat: add real-time counterfeit detection', time: '2 hours ago', sha: 'abc1234' },
    { repo: 'portfolio', message: 'feat: complete portfolio website build', time: '1 day ago', sha: 'def5678' },
    { repo: 'studysphere', message: 'fix: resolve socket connection timeout issue', time: '2 days ago', sha: 'ghi9012' },
    { repo: 'expense-tracker', message: 'chore: update dependencies to latest versions', time: '3 days ago', sha: 'jkl3456' },
    { repo: 'ai-chat', message: 'feat: add conversation history persistence', time: '4 days ago', sha: 'mno7890' },
  ],

  contributionData: generateContributionData(),
};

// Fallback allRepos is just the pinned list initially
githubData.allRepos = githubData.pinnedRepos;

function generateContributionData() {
  const data = [];
  const today = new Date();
  
  // Go back 365 days and align to starting Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const tempDate = new Date(startDate);
  for (let i = 0; i < 371; i++) {
    data.push({
      date: new Date(tempDate),
      month: tempDate.toLocaleString('default', { month: 'short' }),
      dayOfWeek: tempDate.getDay(),
      count: Math.random() < 0.3 ? Math.floor(Math.random() * 8) : 0,
    });
    tempDate.setDate(tempDate.getDate() + 1);
  }
  return data;
}
