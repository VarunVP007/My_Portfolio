import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Twitter, Instagram, Mail, MapPin, Briefcase, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';
import { personalInfo, stats } from '../data/personalData';
import { useCounter } from '../hooks/useHooks';
import { staggerContainer, staggerItem, scrollReveal } from '../animations/variants';

// ─── Animated Counter ─────────────────────────────────────────────────────────
const CounterStat = ({ stat, isVisible }) => {
  const count = useCounter(stat.value, 2000, isVisible);
  return (
    <motion.div
      variants={staggerItem}
      className="glass-card p-6 text-center hover:shadow-soft-lg transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="text-4xl mb-2">{stat.icon}</div>
      <div className="text-3xl font-display font-bold gradient-text">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-text-muted mt-1 font-medium">{stat.label}</div>
    </motion.div>
  );
};

// ─── Background Blobs ─────────────────────────────────────────────────────────
const BackgroundBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-blob" />
    <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-accent/6 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
);

// ─── Social Links ─────────────────────────────────────────────────────────────
const socialData = [
  { icon: Github, href: 'https://github.com/varunprasad-dev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/varunprasad', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:varunprasadofficial23@example.com', label: 'Email' },
];

// ─── Typewriter words ─────────────────────────────────────────────────────────
const roles = ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Open Source Contributor'];

// ─── Main Hero Component ──────────────────────────────────────────────────────
const Home = () => {

  return (
    <PageTransition>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-hero-gradient overflow-hidden pt-2 pb-12 lg:pt-4 lg:pb-16">
        <BackgroundBlobs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4 lg:py-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-muted font-medium text-lg mb-2"
              >
                Hi, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display font-bold mb-3 text-5xl sm:text-6xl lg:text-7xl tracking-tight"
              >
                <span className="text-text">Varun</span>
                <span className="gradient-text">Prasad V</span>
              </motion.h1>

              {/* Role Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                <TypewriterText words={roles} />
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-text-muted text-base leading-relaxed max-w-md mb-8"
              >
                {personalInfo.bio2}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn-accent"
                  aria-label="Download Resume"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <Link to="/contact" className="btn-outline" aria-label="Hire Me">
                  Let's Connect
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3"
              >
                {socialData.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.07 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl border border-border bg-white/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-primary hover:border-primary hover:shadow-soft transition-all"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6 rounded-full border-2 border-dashed border-primary/20"
                  aria-hidden="true"
                />
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" aria-hidden="true" />

                {/* Image container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-soft-xl"
                >
                  <img
                    src="/assets/hero.jpg"
                    alt="Varun Prasad - Full Stack Developer"
                    className="w-full h-full object-cover scale-125 origin-center transition-transform duration-300"
                    loading="eager"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.triedPng) {
                        e.currentTarget.dataset.triedPng = "true";
                        e.currentTarget.src = "/assets/hero.png";
                      } else {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face";
                      }
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </motion.div>

                {/* Floating cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-4 top-10 glass-card px-4 py-3 shadow-soft-lg"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text">Full Stack</div>
                      <div className="text-2xs text-text-muted">Developer</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-4 bottom-16 glass-card px-4 py-2.5 shadow-soft-lg"
                  style={{ animation: 'float 5s ease-in-out infinite 1s' }}
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-text">Salem, TamilNadu</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-6 glass-card px-4 py-3 shadow-soft-lg whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text">Open to</div>
                      <div className="text-2xs text-green-600 font-semibold">Opportunities</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick About Section ── */}
      <section className="py-20 bg-section-alt">
        <div className="section-container py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...scrollReveal(0)}>
              <span className="badge-primary mb-4 inline-flex">About Me</span>
              <h2 className="section-title mb-4">
                Turning Ideas into{' '}
                <span className="gradient-text">Real Products</span>
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-8">
                {personalInfo.bio2}
              </p>
              <Link to="/about" className="btn-primary">
                Learn More About Me
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              {...scrollReveal(0.2)}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Problem Solver', desc: 'Complex problems made simple', icon: '🧩', color: 'from-blue-50 to-blue-100 border-blue-200' },
                { label: 'Quick Learner', desc: 'Adapts to new tech fast', icon: '⚡', color: 'from-cyan-50 to-cyan-100 border-cyan-200' },
                { label: 'Team Player', desc: 'Collaboration is key', icon: '🤝', color: 'from-orange-50 to-orange-100 border-orange-200' },
                { label: 'Clean Coder', desc: 'Code that reads like prose', icon: '✨', color: 'from-purple-50 to-purple-100 border-purple-200' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-5 rounded-2xl border bg-gradient-to-br ${item.color} transition-all`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-text text-sm mb-1">{item.label}</div>
                  <div className="text-text-muted text-xs">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-white">
        <div className="section-container py-0">
          <motion.div
            {...scrollReveal(0)}
            className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary via-primary-700 to-secondary p-10 lg:p-16 text-center"
          >
            {/* BG pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Open to internships, collaborations, and full-time opportunities. Let's connect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Get In Touch
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  View My Work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

// ─── Typewriter Component ─────────────────────────────────────────────────────
const TypewriterText = ({ words }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, isDeleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <span className="text-lg sm:text-xl font-semibold text-primary font-mono">
      {words[wordIndex].slice(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Home;
