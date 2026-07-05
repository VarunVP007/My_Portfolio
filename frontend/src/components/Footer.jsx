import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const socialLinks = [
  { icon: Github, href: 'https://github.com/varunprasad-dev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/varunprasad', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:varunprasadofficial23@example.com', label: 'Email' },
];

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About & Education', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#CCD5AE] text-[#2F2F2F] border-t border-black/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Logo size={36} />
              <span className="font-display font-bold text-xl text-[#3A342D]">
                Varun<span className="text-[#D4A373]">Prasad V</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Full Stack Developer passionate about building beautiful, scalable web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-text mb-4">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-text-muted mt-4">
              <a
                href="mailto:varunprasadofficial23@example.com"
                className="hover:text-primary transition-colors"
              >
                varunprasadofficial23@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            © {new Date().getFullYear()} Varun Prasad. Made with{' '}
            <Heart size={14} className="text-red-500 fill-red-500" /> and
            <span className="text-primary font-medium">React</span>
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
