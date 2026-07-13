import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Star, GitFork, Users, BookOpen, Clock, 
  ExternalLink, MapPin, Mail, Link as LinkIcon, Search, 
  Book, Box, Code
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { githubData } from '../data/githubData';

// Helper to map programming language colors
const getLanguageColor = (lang) => {
  switch (lang?.toLowerCase()) {
    case 'javascript': return '#f1e05a';
    case 'typescript': return '#3178c6';
    case 'python': return '#3572A5';
    case 'html': return '#e34c26';
    case 'css': return '#563d7c';
    case 'java': return '#b07219';
    case 'c++':
    case 'cpp': return '#f34b7d';
    case 'c': return '#555555';
    case 'shell': return '#89e051';
    case 'mysql':
    case 'sql': return '#e38c00';
    default: return '#858585';
  }
};

// ─── Heatmap Component ────────────────────────────────────────────────────────
const ContributionCalendar = ({ cells }) => {
  const weeks = [];
  for (let i = 0; i < 53; i++) {
    weeks.push(cells.slice(i * 7, i * 7 + 7));
  }

  // Find index where month changes to render labels
  const monthLabels = [];
  let prevMonth = null;
  
  weeks.forEach((week, weekIdx) => {
    const firstDayOfMonth = week[0].month;
    if (firstDayOfMonth !== prevMonth) {
      monthLabels.push({ label: firstDayOfMonth, index: weekIdx });
      prevMonth = firstDayOfMonth;
    }
  });

  return (
    <div className="flex gap-2 w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      {/* Weekday labels */}
      <div className="flex flex-col justify-between text-[10px] text-zinc-500 pr-1 pt-6 pb-2 select-none h-[84px]">
        <span>Mon</span>
        <span>Wed</span>
        <span>Fri</span>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        {/* Month Labels */}
        <div className="relative h-4 w-full min-w-[640px] text-[10px] text-zinc-500 font-medium">
          {monthLabels.map(({ label, index }, i) => (
            <span
              key={i}
              className="absolute"
              style={{ left: `${index * 12}px` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid container */}
        <div className="flex gap-[2px] min-w-[640px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[2px]">
              {week.map((day, dIdx) => {
                let bgClass = 'bg-[#161B22]'; // GitHub empty cell color
                if (day.count > 0) {
                  if (day.count <= 2) bgClass = 'bg-[#0e4429]';
                  else if (day.count <= 4) bgClass = 'bg-[#006d32]';
                  else if (day.count <= 7) bgClass = 'bg-[#26a641]';
                  else bgClass = 'bg-[#39d353] shadow-sm shadow-[#39d353]/15';
                }
                const cellDate = day.date instanceof Date ? day.date : new Date(day.date);
                return (
                  <div
                    key={dIdx}
                    className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-200 hover:scale-125 cursor-pointer ${bgClass}`}
                    title={`${cellDate.toDateString()}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Repo Card Component ──────────────────────────────────────────────────────
const RepoCard = ({ repo }) => (
  <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-sm flex flex-col justify-between h-[160px] hover:border-[#8b949e] transition-colors duration-200">
    <div>
      <div className="flex items-start justify-between mb-1.5">
        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#58a6ff] hover:underline font-bold text-sm truncate max-w-[85%] flex items-center gap-1.5"
        >
          <Book size={14} className="text-[#8b949e]" />
          {repo.name}
        </a>
        <span className="text-[10px] text-[#8b949e] border border-[#30363D] px-1.5 py-0.5 rounded-full font-medium">
          Public
        </span>
      </div>
      <p className="text-xs text-[#8b949e] leading-relaxed mb-3 line-clamp-2">
        {repo.description}
      </p>
    </div>
    
    <div className="flex items-center gap-4 text-xs text-[#8b949e]">
      {repo.language && (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor || getLanguageColor(repo.language) }} />
          {repo.language}
        </span>
      )}
      {repo.stars > 0 && (
        <span className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors cursor-pointer">
          <Star size={12} className="fill-current" />
          {repo.stars}
        </span>
      )}
      {repo.forks > 0 && (
        <span className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors cursor-pointer">
          <GitFork size={12} />
          {repo.forks}
        </span>
      )}
    </div>
  </div>
);

// ─── Main GitHub Dashboard Content Component ──────────────────────────────────
export const GitHubContent = ({ profile, loading }) => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Filter repos based on query and language
  const allRepos = profile.allRepos || [];
  const filteredRepos = allRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === 'All' || 
      (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());
    
    return matchesSearch && matchesLanguage;
  });

  // Extract unique languages
  const languagesList = ['All', ...new Set(allRepos.map(r => r.language).filter(Boolean))];

  return (
    <div className="bg-[#0D1117] text-[#C9D1D9] p-6 sm:p-8 rounded-3xl border border-[#30363D] shadow-2xl font-sans relative overflow-hidden">
      
      {/* Top background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sync Status Indicator */}
      {loading && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-[#58a6ff] font-semibold bg-[#58a6ff]/10 px-3 py-1 rounded-full border border-[#58a6ff]/20 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-ping" />
          Syncing live...
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-4 border-b border-[#30363D] mb-6 overflow-x-auto select-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-1.5 pb-3 px-1 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'overview' 
              ? 'border-[#f78166] text-white' 
              : 'border-transparent text-[#8b949e] hover:text-white'
          }`}
        >
          <BookOpen size={16} />
          Overview
        </button>
        <button
          onClick={() => setActiveSubTab('repositories')}
          className={`flex items-center gap-1.5 pb-3 px-1 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'repositories' 
              ? 'border-[#f78166] text-white' 
              : 'border-transparent text-[#8b949e] hover:text-white'
          }`}
        >
          <Book size={16} />
          Repositories
          <span className="bg-[#30363D] text-xs text-white px-2 py-0.5 rounded-full font-bold">
            {allRepos.length || profile.public_repos}
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('stars')}
          className={`flex items-center gap-1.5 pb-3 px-1 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'stars' 
              ? 'border-[#f78166] text-white' 
              : 'border-transparent text-[#8b949e] hover:text-white'
          }`}
        >
          <Star size={16} />
          Stars
          <span className="bg-[#30363D] text-xs text-white px-2 py-0.5 rounded-full font-bold">
            {profile.total_stars || 12}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Left Column: GitHub Sidebar Profile */}
        <div className="space-y-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Avatar */}
            <div className="relative group mb-4">
              <div className="w-48 h-48 rounded-full border border-[#30363D] overflow-hidden shadow-lg bg-zinc-800">
                <img 
                  src={profile.avatar || 'https://avatars.githubusercontent.com/u/88934578?v=4'} 
                  alt="GitHub User Avatar" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => {
                    e.target.src = 'https://avatars.githubusercontent.com/u/9919?v=4';
                  }}
                />
              </div>
              <div 
                className="absolute bottom-3 right-3 w-5 h-5 bg-[#238636] rounded-full border-4 border-[#0D1117]" 
                title="Status: Active" 
              />
            </div>

            {/* Display Name & Username */}
            <h3 className="font-extrabold text-white text-2xl tracking-tight leading-tight">{profile.name}</h3>
            <p className="text-lg text-[#8b949e] font-light">@{profile.username}</p>
            
            {/* Bio */}
            <p className="text-sm text-[#c9d1d9] mt-3.5 leading-relaxed font-normal border-t border-[#30363D]/40 pt-3.5 w-full">
              {profile.bio}
            </p>

            {/* Follow Button */}
            <button className="w-full mt-4 py-1.5 text-center bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363D] rounded-lg text-sm font-semibold transition-colors duration-200">
              Follow
            </button>

            {/* Stats list */}
            <div className="flex items-center gap-3 text-sm mt-5 text-[#8b949e] border-b border-[#30363D]/40 pb-4 w-full justify-center lg:justify-start">
              <span className="hover:text-[#58a6ff] cursor-pointer flex items-center gap-1">
                <Users size={16} /> 
                <strong className="text-white font-semibold">{profile.followers}</strong> followers
              </span>
              <span>•</span>
              <span className="hover:text-[#58a6ff] cursor-pointer flex items-center gap-1">
                <strong className="text-white font-semibold">{profile.following}</strong> following
              </span>
            </div>

            {/* Links & Contact */}
            <div className="mt-4 space-y-2.5 text-xs text-[#c9d1d9] w-full text-left">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#8b949e]" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#8b949e]" />
                  <a href={`mailto:${profile.email}`} className="hover:text-[#58a6ff] hover:underline truncate block max-w-[90%]">{profile.email}</a>
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-2">
                  <LinkIcon size={14} className="text-[#8b949e]" />
                  <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff] hover:underline truncate block max-w-[90%]">
                    {profile.blog.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Switching Views */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* Overview Tab */}
            {activeSubTab === 'overview' && (
              <motion.div
                key="overview-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Pinned Repos Grid */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Popular Repositories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.pinnedRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </div>

                {/* Heatmap calendar graph */}
                <div className="bg-[#161B22] p-5 rounded-2xl border border-[#30363D] shadow-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-white">
                      {profile.total_commits || 0} contributions in the last year
                    </h4>
                  </div>
                  
                  <ContributionCalendar cells={profile.contributionData} />

                  <div className="flex items-center gap-2 mt-2 justify-end text-[10px] text-zinc-500 select-none">
                    <span>Less</span>
                    {['bg-[#161B22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'].map((bg, idx) => (
                      <div key={idx} className={`w-2.5 h-2.5 rounded-[1px] ${bg}`} />
                    ))}
                    <span>More</span>
                  </div>
                </div>

                {/* Top Languages Percentage Bar */}
                {profile.languageStats && profile.languageStats.length > 0 && (
                  <div className="bg-[#161B22] p-5 rounded-2xl border border-[#30363D] shadow-md space-y-4">
                    <h4 className="text-sm font-semibold text-white">Top Languages</h4>
                    
                    {/* The bar */}
                    <div className="h-2.5 w-full bg-[#30363D] rounded-full overflow-hidden flex">
                      {profile.languageStats.map((lang, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            width: `${lang.percentage}%`,
                            backgroundColor: lang.color || getLanguageColor(lang.name) 
                          }}
                          className="h-full first:rounded-l-full last:rounded-r-full"
                          title={`${lang.name}: ${lang.percentage}%`}
                        />
                      ))}
                    </div>

                    {/* Legends */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-xs text-[#8b949e] font-medium">
                      {profile.languageStats.map((lang, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: lang.color || getLanguageColor(lang.name) }} 
                          />
                          <span className="text-[#C9D1D9]">{lang.name}</span>
                          <span>{lang.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Repositories Tab */}
            {activeSubTab === 'repositories' && (
              <motion.div
                key="repos-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Search & Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-3 text-[#8b949e]" />
                    <input 
                      type="text"
                      placeholder="Find a repository..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg py-1.5 pl-10 pr-4 text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
                    />
                  </div>
                  
                  {/* Language Selector */}
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-[#21262d] border border-[#30363D] rounded-lg py-1.5 px-3.5 text-sm text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] hover:bg-[#30363d] cursor-pointer transition-colors"
                  >
                    {languagesList.map((lang, idx) => (
                      <option key={idx} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Repos list */}
                <div className="divide-y divide-[#30363D]/60 border-t border-[#30363D]">
                  {filteredRepos.length > 0 ? (
                    filteredRepos.map((repo) => (
                      <div key={repo.id} className="py-5 flex flex-col justify-between gap-2">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0">
                            <a 
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#58a6ff] hover:underline font-bold text-lg flex items-center gap-1.5"
                            >
                              {repo.name}
                            </a>
                            <p className="text-sm text-[#8b949e] mt-1.5 max-w-2xl leading-relaxed">
                              {repo.description}
                            </p>
                          </div>
                          <span className="text-[10px] text-[#8b949e] border border-[#30363D] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                            Public
                          </span>
                        </div>
                        
                        <div className="flex items-center flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#8b949e] mt-2">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor || getLanguageColor(repo.language) }} />
                              {repo.language}
                            </span>
                          )}
                          {repo.stars > 0 && (
                            <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                              <Star size={12} className="fill-current" />
                              {repo.stars}
                            </span>
                          )}
                          {repo.forks > 0 && (
                            <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                              <GitFork size={12} />
                              {repo.forks}
                            </span>
                          )}
                          <span>Updated {repo.updatedAt}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#8b949e]">
                      No repositories found matching your filters.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Stars Tab */}
            {activeSubTab === 'stars' && (
              <motion.div
                key="stars-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-semibold text-white mb-2">Starred Repositories</h4>
                {/* List repos that have stars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allRepos.filter(r => r.stars > 0).length > 0 ? (
                    allRepos.filter(r => r.stars > 0).map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-[#8b949e]">
                      No starred repositories found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

// ─── Default Page Wrapper Component ───────────────────────────────────────────
const GitHub = ({ isNested = false }) => {
  const [profile, setProfile] = useState(githubData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.allSettled([
      fetch(`https://api.github.com/users/${githubData.username}`),
      fetch(`https://api.github.com/users/${githubData.username}/repos?sort=pushed&per_page=30`),
      fetch(`https://github-contributions-api.jogruber.de/v4/${githubData.username}`)
    ])
      .then(async ([userRes, reposRes, contributionsRes]) => {
        if (!isMounted) return;

        let userData = null;
        let reposData = null;
        let contributionsData = null;

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          try { userData = await userRes.value.json(); } catch (e) {}
        }
        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          try { reposData = await reposRes.value.json(); } catch (e) {}
        }
        if (contributionsRes.status === 'fulfilled' && contributionsRes.value.ok) {
          try { contributionsData = await contributionsRes.value.json(); } catch (e) {}
        }

        setProfile((prev) => {
          let updated = { ...prev };

          if (userData) {
            updated = {
              ...updated,
              name: userData.name || prev.name,
              bio: userData.bio || prev.bio,
              avatar: userData.avatar_url || prev.avatar,
              location: userData.location || prev.location,
              blog: userData.blog || prev.blog,
              public_repos: userData.public_repos ?? prev.public_repos,
              followers: userData.followers ?? prev.followers,
              following: userData.following ?? prev.following,
              email: userData.email || prev.email,
            };
          }

          if (reposData && Array.isArray(reposData)) {
            // Map GitHub repos to format
            const mappedRepos = reposData.map((repo) => ({
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description provided.',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              language: repo.language || 'HTML',
              languageColor: getLanguageColor(repo.language),
              url: repo.html_url,
              topics: repo.topics || [],
              updatedAt: new Date(repo.pushed_at).toLocaleDateString(),
            }));
            
            updated.allRepos = mappedRepos;
            // Sort by stars descending to show top repos in Overview
            const sortedByStars = [...mappedRepos].sort((a, b) => b.stars - a.stars);
            updated.pinnedRepos = sortedByStars.slice(0, 6);

            // Re-calculate language stats
            const langCounts = {};
            let totalCount = 0;
            reposData.forEach(repo => {
              if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
                totalCount++;
              }
            });
            if (totalCount > 0) {
              updated.languageStats = Object.entries(langCounts)
                .map(([name, count]) => ({
                  name,
                  percentage: Math.round((count / totalCount) * 100),
                  color: getLanguageColor(name)
                }))
                .sort((a, b) => b.percentage - a.percentage);
            }
          }

          if (contributionsData && Array.isArray(contributionsData.contributions)) {
            const rawContributions = contributionsData.contributions;
            
            // Re-map daily records to 53-week Sunday-aligned calendar cells
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 365);
            const startDayOfWeek = startDate.getDay();
            startDate.setDate(startDate.getDate() - startDayOfWeek);

            const cells = [];
            const tempDate = new Date(startDate);
            for (let i = 0; i < 371; i++) {
              const dateStr = tempDate.toISOString().split('T')[0];
              const contribRecord = rawContributions.find(c => c.date === dateStr);
              
              cells.push({
                date: new Date(tempDate),
                month: tempDate.toLocaleString('default', { month: 'short' }),
                dayOfWeek: tempDate.getDay(),
                count: contribRecord ? contribRecord.count : 0
              });
              tempDate.setDate(tempDate.getDate() + 1);
            }
            
            updated.contributionData = cells;
            updated.total_commits = contributionsData.total ? Object.values(contributionsData.total).reduce((a, b) => a + b, 0) : prev.total_commits;
          }

          return updated;
        });

        setProfile(prev => {
          // If allRepos isn't populated (e.g. rate limit), point it to pinnedRepos fallback
          if (!prev.allRepos || prev.allRepos.length === 0) {
            prev.allRepos = prev.pinnedRepos;
          }
          return prev;
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to sync GitHub live data', err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isNested) {
    return <GitHubContent profile={profile} loading={loading} />;
  }

  return (
    <PageTransition>
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="GitHub Profile" />
          <GitHubContent profile={profile} loading={loading} />
        </div>
      </section>
    </PageTransition>
  );
};

export default GitHub;
