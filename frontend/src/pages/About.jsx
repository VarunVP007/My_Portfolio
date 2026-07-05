import { motion } from 'framer-motion';
import { MapPin, Mail, Briefcase, GraduationCap, User, Calendar, Star, BookOpen, School } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { personalInfo, highlights } from '../data/personalData';
import { education } from '../data/educationData';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

const infoItems = [
  { icon: User, label: 'Name', value: personalInfo.name },
  { icon: Calendar, label: 'Age', value: `${personalInfo.age} years` },
  { icon: MapPin, label: 'Location', value: personalInfo.location },
  { icon: Mail, label: 'Email', value: personalInfo.email },
  { icon: GraduationCap, label: 'Degree', value: personalInfo.degree },
];

const iconMap = {
  graduation: GraduationCap,
  book: BookOpen,
  school: School,
};

const EducationCard = ({ item }) => {
  const IconComponent = iconMap[item.iconType] || GraduationCap;
  const { theme } = item;

  return (
    <motion.div variants={staggerItem} className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Timeline Bullet Dot */}
      <div className="mt-6 w-3 h-3 rounded-full bg-slate-300 border-2 border-white shadow-sm flex-shrink-0 z-10 group-hover:bg-primary transition-colors" />

      {/* Main Card */}
      <div className="flex-1 bg-white border border-border/80 rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side: Icon + Details */}
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 ${theme.boxBg}`}>
            <IconComponent size={24} />
          </div>

          {/* Details */}
          <div>
            <div className="text-xs font-semibold text-text-muted/80 mb-1">{item.period}</div>
            <h3 className="font-display font-bold text-text text-base sm:text-lg leading-snug">
              {item.degree}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">{item.institution}</p>
          </div>
        </div>

        {/* Right Side: Score Badge */}
        <div className="sm:self-center flex-shrink-0">
          <span className={`inline-block px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border ${theme.pillBg}`}>
            {item.score}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <PageTransition>
      {/* ── About Section ── */}
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="About" highlight="Me" />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <motion.div {...scrollReveal(0)}>
              <h2 className="text-2xl font-display font-bold text-text mb-6">
                Get to Know <span className="gradient-text">Me Better</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-5">
                {personalInfo.bio}
              </p>
              <p className="text-text-muted leading-relaxed mb-5">
                {personalInfo.bio2}
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                When I'm not coding, I enjoy exploring new technologies, contributing to open source, participating in hackathons, and helping fellow students learn programming.
              </p>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-2xl border border-border bg-gradient-to-br from-background to-white text-center hover:shadow-soft transition-all"
                  >
                    <div className="text-3xl mb-2">{h.icon}</div>
                    <div className="font-semibold text-text text-sm mb-1">{h.title}</div>
                    <div className="text-text-muted text-xs leading-snug">{h.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personal Info */}
            <motion.div {...scrollReveal(0.15)}>
              <div className="card p-6 mb-6">
                <h3 className="font-display font-semibold text-text mb-5 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  {infoItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">{label}</div>
                        <div className="text-sm font-medium text-text">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Objective */}
              <div className="card p-6 bg-gradient-to-br from-primary/3 to-secondary/3 border-primary/15">
                <h3 className="font-display font-semibold text-text mb-3 flex items-center gap-2">
                  <Star size={16} className="text-primary" />
                  Career Objective
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  To build innovative, user-centric web applications that solve real-world problems, while continuously growing as a full-stack developer and contributing to impactful projects.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Education Section ── */}
      <section className="py-12 bg-background border-t border-border/60" id="education">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Education" />

          {/* Timeline Wrapper */}
          <div className="relative">
            {/* Continuous Vertical Line */}
            <div aria-hidden="true" className="absolute left-1.5 top-6 bottom-6 w-px border-l border-dashed border-slate-300" />

            {/* Education Items List */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {education.map((item) => (
                <EducationCard key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
