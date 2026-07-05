import { motion } from 'framer-motion';

/**
 * LoadingSpinner - Full page loading animation
 */
const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <motion.div
          className={`${sizes[size]} rounded-full border-3 border-border`}
          style={{ borderWidth: 3 }}
        />
        <motion.div
          className={`${sizes[size]} rounded-full absolute inset-0`}
          style={{
            borderWidth: 3,
            borderColor: 'transparent',
            borderTopColor: '#2563EB',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-muted font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

/**
 * SkeletonCard - Shimmer loading card
 */
export const SkeletonCard = ({ className = '' }) => (
  <div className={`card p-6 ${className}`}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl shimmer flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-2/3 rounded shimmer" />
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
