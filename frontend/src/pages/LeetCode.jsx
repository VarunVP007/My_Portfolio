import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Clock } from 'lucide-react';
import {
  RadialBarChart, RadialBar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie,
} from 'recharts';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { leetcodeData } from '../data/leetcodeData';
import { getDifficultyColor, getStatusColor } from '../utils/helpers';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

// ─── Heatmap ──────────────────────────────────────────────────────────────────
const HeatmapCell = ({ count }) => {
  const intensity = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
  const colors = ['#EBEDF0', '#C8E6C9', '#81C784', '#388E3C', '#1B5E20'];
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{ backgroundColor: colors[intensity] }}
      title={`${count} submissions`}
    />
  );
};

const ContributionHeatmap = ({ data }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <div className="flex gap-0.5 mb-1">
          {months.map((m) => (
            <div key={m} className="text-xs text-text-muted" style={{ width: `${28 * 4}px` }}>{m}</div>
          ))}
        </div>
        <div className="flex gap-1">
          {months.map((month) => {
            const monthData = data.filter((d) => d.month === month);
            const rows = Array.from({ length: 4 }, (_, w) => monthData.slice(w * 7, w * 7 + 7));
            return (
              <div key={month} className="flex gap-0.5">
                {rows.map((row, ri) => (
                  <div key={ri} className="flex flex-col gap-0.5">
                    {row.map((cell, ci) => (
                      <HeatmapCell key={ci} count={cell.count} />
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon }) => (
  <motion.div
    variants={staggerItem}
    className="glass-card p-5 text-center hover:shadow-soft-lg transition-all hover:-translate-y-1"
  >
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-2xl font-display font-bold gradient-text">{value}</div>
    <div className="text-sm font-medium text-text mt-0.5">{label}</div>
    {sub && <div className="text-xs text-text-muted mt-0.5">{sub}</div>}
  </motion.div>
);

// ─── Main LeetCode Page ───────────────────────────────────────────────────────
const LeetCode = () => {
  const { problemsChartData, contestHistory } = leetcodeData;

  return (
    <PageTransition>
      {/* Profile Card */}
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="LeetCode & GitHub" />
          <motion.div
            {...scrollReveal(0)}
            className="card p-8 mb-10 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl shadow-primary/30 shadow-lg">
              👨‍💻
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-display font-bold text-text">{leetcodeData.username}</h2>
              <div className="text-text-muted text-sm mt-1">LeetCode Profile</div>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="badge-primary">Global Rank: {leetcodeData.globalRank}</span>
                <span className="badge badge-secondary">{leetcodeData.globalRankLabel}</span>
                <span className="badge badge-accent">🔥 {leetcodeData.streak} day streak</span>
              </div>
            </div>
            <a
              href={`https://leetcode.com/${leetcodeData.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <ExternalLink size={14} /> View Profile
            </a>
          </motion.div>



          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Problem Distribution */}
            <motion.div {...scrollReveal(0)} className="card p-6">
              <h3 className="font-display font-semibold text-text mb-6">Problem Distribution</h3>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={problemsChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="solved"
                    >
                      {problemsChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v} solved`, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {problemsChartData.map((d) => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }} />
                      <div>
                        <div className="text-sm font-semibold text-text">{d.name}</div>
                        <div className="text-xs text-text-muted">{d.solved} / {d.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contest Rating Chart */}
            <motion.div {...scrollReveal(0.1)} className="card p-6">
              <h3 className="font-display font-semibold text-text mb-6">Contest Rating History</h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={leetcodeData.contestHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="contest" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} hide />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="rating" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Heatmap */}
          <motion.div {...scrollReveal(0)} className="card p-6 mb-10">
            <h3 className="font-display font-semibold text-text mb-4">Submission Heatmap</h3>
            <ContributionHeatmap data={leetcodeData.heatmapData} />
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-xs text-text-muted">Less</span>
              {['#EBEDF0', '#C8E6C9', '#81C784', '#388E3C', '#1B5E20'].map((c) => (
                <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
              ))}
              <span className="text-xs text-text-muted">More</span>
            </div>
          </motion.div>

          {/* Recent Submissions */}
          <motion.div {...scrollReveal(0)} className="card p-6">
            <h3 className="font-display font-semibold text-text mb-6">Recent Submissions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-border">
                    <th className="pb-3 font-medium">Problem</th>
                    <th className="pb-3 font-medium">Difficulty</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Language</th>
                    <th className="pb-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leetcodeData.recentSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-background transition-colors">
                      <td className="py-3 font-medium text-text">{sub.title}</td>
                      <td className="py-3">
                        <span className={`badge text-xs ${getDifficultyColor(sub.difficulty)}`}>
                          {sub.difficulty}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${getStatusColor(sub.status)}`}>
                          <CheckCircle size={12} /> {sub.status}
                        </span>
                      </td>
                      <td className="py-3 text-text-muted">{sub.language}</td>
                      <td className="py-3 text-text-light flex items-center gap-1">
                        <Clock size={12} /> {sub.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default LeetCode;
