import { motion } from 'framer-motion';

/**
 * SectionTitle - Reusable heading with dot icon, title, and accent underline bar
 */
const SectionTitle = ({ title, highlight, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-2"
      >
        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        <h2 className="text-3xl font-display font-bold text-text">
          {title}{' '}
          {highlight && (
            <span className="gradient-text">{highlight}</span>
          )}
        </h2>
      </motion.div>

      {/* Accent Underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-1 bg-primary rounded-full"
      />

      {subtitle && (
        <p className="text-text-muted text-sm mt-3 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
