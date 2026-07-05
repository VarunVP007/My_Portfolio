import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Users, UserCheck, BookOpen, Clock, ExternalLink } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { githubData } from '../data/githubData';
import { githubService } from '../services/githubService';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

// ─── Contribution Heatmap ─────────────────────────────────────────────────────
const ContributionHeatmap = ({ data }) => {
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }
  const getColor = (count) => {
    if (count === 0) return '#EBEDF0';
    if (count <= 2) return '#C8E6C9';
    if (count <= 5) return '#81C784';
    if (count <= 9) return '#388E3C';
    return '#1B5E20';
  };
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-0.5 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(day.count) }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Repo Card ────────────────────────────────────────────────────────────────
const RepoCard = ({ repo }) => (
  <motion.a
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
    variants={staggerItem}
    whileHover={{ scale: 1.02, y: -4 }}
    className="card p-5 hover:shadow-soft-lg transition-all block"
    aria-label={repo.name}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <BookOpen size={16} className="text-primary" />
        <h3 className="font-semibold text-primary hover:underline">{repo.name}</h3>
      </div>
      <ExternalLink size={14} className="text-text-muted flex-shrink-0" />
    </div>
    <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">{repo.description}</p>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {repo.topics?.map((t) => (
        <span key={t} className="px-2 py-0.5 bg-primary/8 text-primary text-xs rounded-full">{t}</span>
      ))}
    </div>
    <div className="flex items-center gap-4 text-xs text-text-muted">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
        {repo.language}
      </span>
      <span className="flex items-center gap-1">
        <Star size={12} className="text-yellow-500" />
        {repo.stars}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={12} />
        {repo.forks}
      </span>
    </div>
  </motion.a>
);

// ─── Main GitHub Page ─────────────────────────────────────────────────────────
const GitHub = () => {
  const [liveProfile, setLiveProfile] = useState(null);

  useEffect(() => {
    githubService.getProfile(githubData.username)
      .then(setLiveProfile)
      .catch(() => {/* use placeholder */});
  }, []);

  const profile = { ...githubData, ...(liveProfile || {}) };

  return (
    <PageTransition>
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          {/* Profile Card */}
          <motion.div {...scrollReveal(0)} className="card p-8 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-border shadow-soft">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl text-white">
                    👨‍💻
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-display font-bold text-text">{profile.name}</h2>
                <div className="text-text-muted text-sm mt-1">@{profile.username}</div>
                <p className="text-sm text-text-muted mt-2 max-w-md">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start">
                  {[
                    { icon: BookOpen, label: 'Repos', value: profile.public_repos },
                    { icon: Users, label: 'Followers', value: profile.followers },
                    { icon: UserCheck, label: 'Following', value: profile.following },
                    { icon: Star, label: 'Stars', value: profile.total_stars },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-1.5 text-sm">
                      <Icon size={14} className="text-primary" />
                      <span className="font-semibold text-text">{value}</span>
                      <span className="text-text-muted">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <Github size={16} /> View Profile
              </a>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Language Pie */}
            <motion.div {...scrollReveal(0)} className="card p-6">
              <h3 className="font-display font-semibold text-text mb-6">Top Languages</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie data={githubData.languageStats} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="percentage">
                      {githubData.languageStats.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 flex-1">
                  {githubData.languageStats.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-sm text-text">{lang.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-text-muted">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Commit Activity */}
            <motion.div {...scrollReveal(0.1)} className="card p-6">
              <h3 className="font-display font-semibold text-text mb-6">Recent Commits</h3>
              <div className="space-y-3">
                {githubData.recentCommits.map((commit, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Github size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text truncate">{commit.message}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-primary">{commit.repo}</span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Clock size={10} /> {commit.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contribution Heatmap */}
          <motion.div {...scrollReveal(0)} className="card p-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-text">Contribution Graph</h3>
              <span className="text-sm text-text-muted">{profile.total_commits} contributions in the last year</span>
            </div>
            <ContributionHeatmap data={githubData.contributionData} />
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-xs text-text-muted">Less</span>
              {['#EBEDF0', '#C8E6C9', '#81C784', '#388E3C', '#1B5E20'].map((c) => (
                <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
              ))}
              <span className="text-xs text-text-muted">More</span>
            </div>
          </motion.div>

          {/* Pinned Repos */}
          <div>
            <h2 className="text-xl font-display font-bold text-text mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Pinned Repositories
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {githubData.pinnedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default GitHub;
