import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useScrollPosition } from '../hooks/useHooks';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About & Education', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'LeetCode & GitHub', path: '/leetcode' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const isScrolled = scrollY > 20;

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-soft'
          : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-3 group"
              aria-label="Varunprasad V - Home"
            >
              <Logo size={44} />
              <span className="font-display font-bold text-xl text-text group-hover:text-primary transition-colors">
                Varun<span className="text-primary">prasad V</span>
              </span>
            </NavLink>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <NavLink
                    to={item.path}
                    role="menuitem"
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-text-muted hover:text-primary hover:bg-primary/5'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 rounded-lg bg-primary/8 -z-10"
                            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Resume CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <NavLink
                to="/resume"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Resume
              </NavLink>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-soft-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-display font-bold text-lg text-text">
                    Varun<span className="text-primary">Prasad V</span>
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-primary/5 text-text-muted hover:text-primary transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-text-muted hover:text-primary hover:bg-primary/5'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <div className="p-4 border-t border-border">
                  <NavLink
                    to="/resume"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Download Resume
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
