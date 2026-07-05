import { motion } from 'framer-motion';
import { Terminal, Layout, Server, Database, Wrench, Cloud, Layers } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { skillCategories } from '../data/skillsData';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

const iconMap = {
  terminal: Terminal,
  layout: Layout,
  server: Server,
  database: Database,
  wrench: Wrench,
  cloud: Cloud,
  layers: Layers,
};

const SkillCard = ({ category }) => {
  const IconComponent = iconMap[category.iconType] || Terminal;
  const { theme } = category;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.08)' }}
      className="bg-white border border-border/80 rounded-2xl p-6 shadow-soft transition-all duration-300 flex flex-col justify-start"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${theme.boxBg}`}>
          <IconComponent size={18} />
        </div>
        <h3 className="font-display font-bold text-text text-base">{category.label}</h3>
      </div>

      {/* Skills List */}
      <ul className="space-y-3">
        {category.skills.map((skillName) => (
          <li key={skillName} className="flex items-center gap-2.5 text-sm text-text-muted font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} flex-shrink-0`} />
            <span className="text-text/90">{skillName}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <PageTransition>
      <section className="py-12 bg-background min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <SectionTitle title="Skills" />

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skillCategories.map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Skills;
