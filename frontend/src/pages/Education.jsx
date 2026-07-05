import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { education } from '../data/educationData';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

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

const Education = () => {
  return (
    <PageTransition>
      <section className="py-12 bg-background min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
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

export default Education;
