import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { experience } from '../data/experienceData';

const colorMap = {
  primary: 'from-primary to-primary-700',
  secondary: 'from-secondary to-secondary-600',
  accent: 'from-accent to-accent-600',
};

// ─── Experience Timeline ──────────────────────────────────────────────────────
const ExperienceItem = ({ exp, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-5 mb-8 last:mb-0"
    >
      {/* Icon + line */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${colorMap[exp.color]} flex items-center justify-center text-white text-lg shadow-soft z-10 overflow-hidden`}>
          {exp.logo && !imgError ? (
            <img
              src={exp.logo}
              alt={`${exp.company} Logo`}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            exp.icon
          )}
        </div>
        {index < experience.length - 1 && (
          <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/30 to-transparent" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 card p-5 hover:shadow-soft-lg transition-all pb-8">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-display font-bold text-text">{exp.role}</h3>
            <div className="text-sm text-primary font-medium">{exp.company}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="badge-primary text-xs flex items-center gap-1">
              <Calendar size={10} />
              {exp.period}
            </span>
            <span className="badge-secondary text-xs flex items-center gap-1">
              <MapPin size={10} />
              {exp.location}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Responsibilities</h4>
          <ul className="space-y-1.5">
            {exp.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((t) => (
            <span key={t} className="tech-tag text-xs">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Experience = () => {
  return (
    <PageTransition>
      {/* Content */}
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <div className="max-w-3xl mx-auto">
            <SectionTitle title="Experience" />
            <div className="mt-8">
              {experience.map((exp, i) => (
                <ExperienceItem key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Experience;
