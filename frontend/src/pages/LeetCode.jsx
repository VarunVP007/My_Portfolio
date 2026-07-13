import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GitHub from './GitHub';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { leetcodeData } from '../data/leetcodeData';
import { personalInfo } from '../data/personalData';

// Helper to generate 53 weeks (371 days) of calendar cells aligning to Sunday
const generateYearCalendar = (submissionCalendar = {}) => {
  const cells = [];
  const today = new Date();
  
  // Go back 365 days and align to the starting Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);
  const startDayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDayOfWeek);

  const tempDate = new Date(startDate);
  for (let i = 0; i < 371; i++) {
    const dayStart = Math.floor(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime() / 1000);
    const dayEnd = dayStart + 86400;

    let count = 0;
    for (const [ts, c] of Object.entries(submissionCalendar)) {
      const t = Number(ts);
      if (t >= dayStart && t < dayEnd) {
        count += c;
      }
    }

    cells.push({
      date: new Date(tempDate),
      month: tempDate.toLocaleString('default', { month: 'short' }),
      dayOfWeek: tempDate.getDay(),
      count
    });

    tempDate.setDate(tempDate.getDate() + 1);
  }
  return cells;
};

// Helper to calculate consecutive submission streaks from calendar data
const calculateStreak = (calendar) => {
  if (!calendar || Object.keys(calendar).length === 0) return { current: 0, max: 0 };
  const dates = Object.keys(calendar)
    .map(ts => {
      const d = new Date(Number(ts) * 1000);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });
  const uniqueDates = Array.from(new Set(dates)).sort();
  
  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate = null;
  
  uniqueDates.forEach(dateStr => {
    const currentDate = new Date(dateStr);
    if (!prevDate) {
      currentStreak = 1;
    } else {
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        currentStreak = 1;
      }
    }
    prevDate = currentDate;
  });
  if (currentStreak > maxStreak) maxStreak = currentStreak;
  
  let current = 0;
  if (prevDate) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    
    const lastActiveStr = uniqueDates[uniqueDates.length - 1];
    if (lastActiveStr === todayStr || lastActiveStr === yesterdayStr) {
      current = currentStreak;
    }
  }

  return { current, max: maxStreak };
};

// Helper for formatting programming languages
const mapLanguage = (lang) => {
  switch (lang?.toLowerCase()) {
    case 'cpp': return 'C++';
    case 'python':
    case 'python3': return 'Python';
    case 'javascript': return 'JavaScript';
    case 'typescript': return 'TypeScript';
    case 'java': return 'Java';
    case 'sql':
    case 'mysql': return 'MySQL';
    default: return lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : 'Unknown';
  }
};

// Helper for relative time string
const getRelativeTime = (timestamp) => {
  const diffMs = Date.now() - (Number(timestamp) * 1000);
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins || 1} min${diffMins !== 1 ? 's' : ''} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
};

// ─── Heatmap Component ────────────────────────────────────────────────────────
const SubmissionCalendar = ({ cells }) => {
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
    <div className="flex flex-col gap-1.5 w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
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
              let bgClass = 'bg-zinc-800/60';
              if (day.count > 0) {
                if (day.count <= 1) bgClass = 'bg-green-950 text-green-400';
                else if (day.count <= 3) bgClass = 'bg-green-800 text-green-200';
                else if (day.count <= 5) bgClass = 'bg-green-600 text-white';
                else bgClass = 'bg-green-500 shadow-sm shadow-green-500/20 text-white';
              }
              return (
                <div
                  key={dIdx}
                  className={`w-[10px] h-[10px] rounded-[1px] transition-all duration-200 hover:scale-125 cursor-pointer ${bgClass}`}
                  title={`${day.date.toDateString()}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main LeetCode Page ───────────────────────────────────────────────────────
const LeetCode = () => {
  const [data, setData] = useState(leetcodeData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('leetcode');

  useEffect(() => {
    if (activeTab !== 'leetcode') return;

    let isMounted = true;
    setLoading(true);

    Promise.allSettled([
      fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeData.username}`),
      fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeData.username}/submission`)
    ])
      .then(async ([statsRes, subsRes]) => {
        if (!isMounted) return;

        let statsData = null;
        let subsData = null;

        if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
          try {
            statsData = await statsRes.value.json();
          } catch (e) {
            console.error('Failed to parse stats json', e);
          }
        }

        if (subsRes.status === 'fulfilled' && subsRes.value.ok) {
          try {
            subsData = await subsRes.value.json();
          } catch (e) {
            console.error('Failed to parse submissions json', e);
          }
        }

        setData((prev) => {
          let updated = { ...prev };

          if (statsData) {
            const easySolved = statsData.easySolved ?? prev.easySolved;
            const mediumSolved = statsData.mediumSolved ?? prev.mediumSolved;
            const hardSolved = statsData.hardSolved ?? prev.hardSolved;
            const totalSolved = statsData.totalSolved ?? prev.totalSolved;

            const totalEasy = statsData.totalEasy ?? prev.totalEasy;
            const totalMedium = statsData.totalMedium ?? prev.totalMedium;
            const totalHard = statsData.totalHard ?? prev.totalHard;

            const ranking = statsData.ranking ?? prev.ranking;
            const reputation = statsData.reputation ?? prev.reputation;

            updated = {
              ...updated,
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              totalEasy,
              totalMedium,
              totalHard,
              ranking,
              reputation,
              globalRank: ranking ? `#${ranking.toLocaleString()}` : prev.globalRank,
              submissionCalendar: statsData.submissionCalendar || prev.submissionCalendar,
            };
          }

          if (subsData && Array.isArray(subsData.submission)) {
            const formattedSubs = subsData.submission.slice(0, 8).map((sub, i) => ({
              id: sub.id || i,
              title: sub.title || 'Unknown Problem',
              difficulty: 'Medium',
              status: sub.statusDisplay || 'Accepted',
              language: mapLanguage(sub.lang),
              time: getRelativeTime(sub.timestamp),
            }));
            updated.recentSubmissions = formattedSubs;
          }

          return updated;
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to sync LeetCode live data', err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <PageTransition>
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          {/* Header Row: Title & Switcher parallel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-border/30">
            <SectionTitle title="Coding Profiles" className="mb-0" />

            {/* Switcher Tabs */}
            <div className="relative flex p-1 bg-background border border-border/80 rounded-2xl w-full max-w-sm shadow-inner-soft">
              <button
                onClick={() => setActiveTab('leetcode')}
                className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 z-10 ${
                  activeTab === 'leetcode' ? 'text-primary' : 'text-text-muted hover:text-text'
                }`}
              >
                LeetCode
                {activeTab === 'leetcode' && (
                  <motion.div
                    layoutId="active-profile-tab"
                    className="absolute inset-0 bg-white border border-border/30 rounded-xl shadow-soft -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 z-10 ${
                  activeTab === 'github' ? 'text-primary' : 'text-text-muted hover:text-text'
                }`}
              >
                GitHub
                {activeTab === 'github' && (
                  <motion.div
                    layoutId="active-profile-tab"
                    className="absolute inset-0 bg-white border border-border/30 rounded-xl shadow-soft -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'leetcode' ? (
              <motion.div
                key="leetcode-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* LeetCode Custom Dark Dashboard */}
                <div className="bg-[#1A1A1A] text-zinc-300 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl font-sans relative overflow-hidden">
                  
                  {/* Top glowing indicators */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                  {/* Sync status loader */}
                  {loading && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-green-400 font-semibold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                      Syncing live...
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                    
                    {/* Left Column: Sidebar Profile */}
                    <div className="space-y-6">
                      
                      {/* Profile Card */}
                      <div className="bg-[#282828] p-5 rounded-2xl border border-zinc-800/80 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 shadow-md overflow-hidden flex-shrink-0">
                            <img 
                              src={data.avatar || 'https://assets.leetcode.com/users/avatars/avatar_1627541578.png'} 
                              alt="Varunprasad V Avatar" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                e.target.src = 'https://assets.leetcode.com/users/default_avatar.jpg';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-white text-base truncate flex items-center gap-1.5">
                              Varunprasad V
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#282828]" title="Active" />
                            </h3>
                            <p className="text-xs text-zinc-400 font-medium">{data.username}</p>
                            <p className="text-xs text-zinc-500 mt-1 font-medium">Rank <span className="font-bold text-zinc-200">{data.ranking?.toLocaleString() || '1,613,219'}</span></p>
                          </div>
                        </div>

                        <div className="flex gap-4 text-xs text-zinc-400 mb-5 border-t border-zinc-800/80 pt-3.5">
                          <div><span className="font-bold text-white">0</span> Following</div>
                          <div><span className="font-bold text-white">0</span> Followers</div>
                        </div>

                        <a 
                          href={`https://leetcode.com/u/${data.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-2.5 text-center bg-[#333333] hover:bg-[#444444] hover:border-zinc-600 text-green-400 hover:text-green-300 rounded-xl text-xs font-semibold transition-all border border-zinc-700"
                        >
                          View Profile
                        </a>

                        {/* Social Links */}
                        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2.5">
                          <a href={`https://github.com/${personalInfo.githubUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            {personalInfo.githubUsername}
                          </a>
                          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            {personalInfo.linkedinUrl.replace('https://linkedin.com/in/', '').replace(/\/$/, '')}
                          </a>
                        </div>
                      </div>

                      {/* Community Stats */}
                      <div className="bg-[#282828] p-5 rounded-2xl border border-zinc-800/80 shadow-md space-y-4">
                        <h4 className="font-bold text-white text-xs border-b border-zinc-800 pb-2">Community Stats</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="text-zinc-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Views
                            </div>
                            <div className="font-bold text-white text-sm mt-0.5">0</div>
                            <div className="text-[10px] text-zinc-500">Last week 0</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Solution
                            </div>
                            <div className="font-bold text-white text-sm mt-0.5">0</div>
                            <div className="text-[10px] text-zinc-500">Last week 0</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Discuss
                            </div>
                            <div className="font-bold text-white text-sm mt-0.5">0</div>
                            <div className="text-[10px] text-zinc-500">Last week 0</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Reputation
                            </div>
                            <div className="font-bold text-white text-sm mt-0.5">{data.reputation ?? 0}</div>
                            <div className="text-[10px] text-zinc-500">Last week 0</div>
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="bg-[#282828] p-5 rounded-2xl border border-zinc-800/80 shadow-md space-y-3">
                        <h4 className="font-bold text-white text-xs border-b border-zinc-800 pb-2">Languages</h4>
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="bg-[#333333] px-2 py-0.5 rounded text-zinc-300 font-medium">Java</span>
                            <span className="text-zinc-400"><strong className="text-white font-semibold">{data.totalSolved > 3 ? data.totalSolved - 3 : 95}</strong> solved</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="bg-[#333333] px-2 py-0.5 rounded text-zinc-300 font-medium">MySQL</span>
                            <span className="text-zinc-400"><strong className="text-white font-semibold">3</strong> solved</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Dashboard Charts & Tables */}
                    <div className="lg:col-span-3 space-y-6">
                      
                      {/* Row 1: Solved Gauge + Badges */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        
                        {/* Solved progress circle (col-span-3) */}
                        <div className="bg-[#282828] p-5 rounded-2xl border border-zinc-800/80 shadow-md md:col-span-3 flex flex-col sm:flex-row items-center justify-around gap-6">
                          
                          {/* Circular Gauge */}
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="72"
                                cy="72"
                                r="56"
                                stroke="#333333"
                                strokeWidth="8"
                                fill="transparent"
                              />
                              <circle
                                cx="72"
                                cy="72"
                                r="56"
                                stroke="url(#leetcodeProgressGradient)"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="351.8"
                                strokeDashoffset={351.8 - (351.8 * Math.min(data.totalSolved ?? 98, 3991)) / 3991}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                              <defs>
                                <linearGradient id="leetcodeProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFA116" stopOpacity="0.8" />
                                  <stop offset="50%" stopColor="#FFA116" />
                                  <stop offset="100%" stopColor="#FFA116" stopOpacity="0.9" />
                                </linearGradient>
                              </defs>
                            </svg>
                            
                            {/* Inside Gauge Text */}
                            <div className="absolute text-center">
                              <div className="text-2xl font-black text-white leading-none">
                                {data.totalSolved ?? 98}
                                <span className="text-[10px] text-zinc-500 font-bold block mt-0.5">/{3991}</span>
                              </div>
                              <div className="text-[9px] text-green-500 font-bold mt-1 flex items-center justify-center gap-0.5">
                                <span>✓</span> Solved
                              </div>
                              <div className="text-[9px] text-zinc-500 mt-0.5">
                                0 Attempting
                              </div>
                            </div>
                          </div>

                          {/* Difficulty breakdown list */}
                          <div className="flex-1 space-y-3.5 w-full max-w-xs">
                            {/* Easy */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-green-500 font-bold bg-green-500/10 px-1.5 py-0.5 rounded text-[10px]">Easy</span>
                                <span className="text-zinc-200 font-bold text-xs">{data.easySolved ?? 45}<span className="text-zinc-500 font-semibold">/{data.totalEasy ?? 954}</span></span>
                              </div>
                              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${((data.easySolved ?? 45) / (data.totalEasy ?? 954)) * 100}%` }}
                                />
                              </div>
                            </div>

                            {/* Medium */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">Med.</span>
                                <span className="text-zinc-200 font-bold text-xs">{data.mediumSolved ?? 53}<span className="text-zinc-500 font-semibold">/{data.totalMedium ?? 2084}</span></span>
                              </div>
                              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${((data.mediumSolved ?? 53) / (data.totalMedium ?? 2084)) * 100}%` }}
                                />
                              </div>
                            </div>

                            {/* Hard */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded text-[10px]">Hard</span>
                                <span className="text-zinc-200 font-bold text-xs">{data.hardSolved ?? 0}<span className="text-zinc-500 font-semibold">/{data.totalHard ?? 953}</span></span>
                              </div>
                              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${((data.hardSolved ?? 0) / (data.totalHard ?? 953)) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Badges Card (col-span-2) */}
                        <div className="bg-[#282828] p-5 rounded-2xl border border-zinc-800/80 shadow-md md:col-span-2 flex flex-col justify-between min-h-[176px]">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Badges</h4>
                              <div className="text-3xl font-extrabold text-white mt-0.5">{data.badges ?? 2}</div>
                            </div>
                            <a href={`https://leetcode.com/u/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M9 5l7 7-7 7" /></svg>
                            </a>
                          </div>

                          {/* Badge icons row */}
                          <div className="flex justify-around items-center py-2.5">
                            {/* Badge 1: 50 Days */}
                            <div className="relative group flex flex-col items-center">
                              <div className="w-14 h-14 bg-gradient-to-br from-green-500/10 to-green-500/30 rounded-2xl flex items-center justify-center border border-green-500/35 shadow-lg shadow-green-500/5 group-hover:scale-105 transition-all cursor-pointer">
                                <div className="absolute inset-1.5 border border-dashed border-green-400/30 rounded-xl" />
                                <span className="text-base font-black text-green-400 z-10 font-display">50</span>
                              </div>
                              <span className="text-[9px] text-zinc-400 mt-1.5 font-semibold">50 Days 2025</span>
                            </div>

                            {/* Badge 2: Member Badge */}
                            <div className="relative group flex flex-col items-center">
                              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/10 to-amber-500/30 rounded-2xl flex items-center justify-center border border-yellow-500/35 shadow-lg shadow-yellow-500/5 group-hover:scale-105 transition-all cursor-pointer">
                                <div className="absolute inset-1.5 border border-dashed border-yellow-400/30 rounded-xl" />
                                <span className="text-2xl z-10" role="img" aria-label="gold medal">🏅</span>
                              </div>
                              <span className="text-[9px] text-zinc-400 mt-1.5 font-semibold">Active Member</span>
                            </div>
                          </div>

                          <div className="text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-2 flex justify-between items-center">
                            <span>Most Recent Badge</span>
                            <span className="font-bold text-zinc-300">50 Days Badge 2025</span>
                          </div>
                        </div>

                      </div>

                      {/* Row 2: Heatmap calendar */}
                      <div className="bg-[#282828] p-5 rounded-2xl border border-[#383838] shadow-md space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h4 className="font-bold text-white text-base">
                              {Object.values(data.submissionCalendar || {}).reduce((a, b) => a + b, 0) || 51} submissions in the past one year
                            </h4>
                          </div>
                          <div className="flex gap-4 text-xs text-zinc-400">
                            <div>Total active days: <span className="text-white font-semibold">{Object.values(data.submissionCalendar || {}).filter(c => c > 0).length || 41}</span></div>
                            <div>Max streak: <span className="text-white font-semibold">{calculateStreak(data.submissionCalendar).max || 7}</span></div>
                          </div>
                        </div>

                        {/* Grid cells */}
                        <SubmissionCalendar cells={generateYearCalendar(data.submissionCalendar)} />

                        <div className="flex items-center gap-2 mt-2 justify-end text-[10px] text-zinc-500">
                          <span>Less</span>
                          {['bg-zinc-800/60', 'bg-green-950', 'bg-green-800', 'bg-green-600', 'bg-green-500'].map((bg, idx) => (
                            <div key={idx} className={`w-2.5 h-2.5 rounded-[1px] ${bg}`} />
                          ))}
                          <span>More</span>
                        </div>
                      </div>

                      {/* Row 3: Recent AC Submissions */}
                      <div className="bg-[#282828] rounded-2xl border border-zinc-800/80 shadow-md overflow-hidden">
                        
                        {/* Header tabs */}
                        <div className="flex items-center justify-between px-6 py-4 bg-[#303030] border-b border-zinc-800">
                          <div className="flex gap-5">
                            <button className="text-white font-bold text-sm border-b-2 border-green-500 pb-1.5 flex items-center gap-1.5">
                              <span>📄</span> Recent AC
                            </button>
                            <button className="text-zinc-500 hover:text-zinc-400 font-bold text-sm pb-1.5 flex items-center gap-1.5 cursor-not-allowed">
                              <span>📋</span> List
                            </button>
                            <button className="text-zinc-500 hover:text-zinc-400 font-bold text-sm pb-1.5 flex items-center gap-1.5 cursor-not-allowed">
                              <span>✔️</span> Solutions
                            </button>
                          </div>
                          <a href={`https://leetcode.com/u/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white text-xs font-semibold flex items-center gap-1">
                            View all submissions <span className="font-bold">&gt;</span>
                          </a>
                        </div>

                        {/* List */}
                        <div className="divide-y divide-zinc-800/60">
                          {data.recentSubmissions.map((sub) => (
                            <div key={sub.id} className="px-6 py-3.5 flex justify-between items-center hover:bg-zinc-800/10 transition-colors">
                              <div className="flex flex-col gap-1 min-w-0">
                                <span className="font-semibold text-zinc-200 text-sm hover:text-green-400 transition-colors cursor-pointer truncate">
                                  {sub.title}
                                </span>
                                <span className="text-[10px] text-zinc-500 flex items-center gap-3">
                                  <span>Language: <strong className="text-zinc-400">{sub.language}</strong></span>
                                  <span className="text-green-500 font-medium">✓ Accepted</span>
                                </span>
                              </div>
                              <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">{sub.time}</span>
                            </div>
                          ))}
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="github-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <GitHub isNested={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
};

export default LeetCode;
