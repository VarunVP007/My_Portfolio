import { motion } from 'framer-motion';
import { pageVariants } from '../animations/variants';

/**
 * PageTransition - Wraps page content with Framer Motion animation
 */
const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
