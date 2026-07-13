import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Twitter, Instagram, Mail, MapPin, Briefcase, Zap, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';
import { personalInfo, stats } from '../data/personalData';
import { useCounter } from '../hooks/useHooks';
import { staggerContainer, staggerItem, scrollReveal } from '../animations/variants';

// ─── Animated Counter ─────────────────────────────────────────────────────────
const CounterStat = ({ stat }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const count = useCounter(stat.value, 2000, inView);
  return (
    <motion.div
      ref={ref}
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
  { icon: Github, href: 'https://github.com/VarunVP007', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/varunprasad-v/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:varunprasadofficial23@gmail.com', label: 'Email' },
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
                    alt="Varunprasad V - Full Stack Developer"
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

      {/* ── Stats Counter Section ── */}
      <section className="py-12 bg-white border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <CounterStat key={stat.label} stat={stat} />
            ))}
          </motion.div>
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

      {/* ── Collaboration Idea Generator Section ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="section-container py-0">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-primary mb-4 inline-flex">Collaboration</span>
            <h2 className="section-title mb-4">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-text-muted text-base max-w-xl mx-auto">
              Want to start a new project together but not sure where to begin? Give the idea generator below a spin to spark inspiration!
            </p>
          </div>

          <motion.div
            {...scrollReveal(0.1)}
            className="relative"
          >
            <CollabIdeaGenerator />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

// ─── Collaborative Project Idea Generator Component ──────────────────────────
const CollabIdeaGenerator = () => {
  const ideas = [
    { tech: 'React & Node.js', text: 'Build a secure, real-time SaaS platform with multi-tenant interactive dashboards.' },
    { tech: 'AI & Next.js', text: 'Deploy an intelligent chat agent using Google Gemini API and serverless database integration.' },
    { tech: 'Tailwind & Framer Motion', text: 'Design a ultra-responsive premium landing page with smooth physics-based layout transitions.' },
    { tech: 'MongoDB & Node.js', text: 'Develop a high-throughput REST API with advanced query caching and automatic rate-limiting.' },
    { tech: 'Java & React', text: 'Create an automated ATS parser and optimizer for developer profiles.' }
  ];

  const [index, setIndex] = useState(-1);
  const [rolling, setRolling] = useState(false);

  const rollIdea = () => {
    if (rolling) return;
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * ideas.length));
      count++;
      if (count > 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 90);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-slate-800 p-8 lg:p-12 text-center shadow-2xl">
        {/* Background visual gradient glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-400 mb-2">
            <Sparkles size={20} className={rolling ? "animate-spin" : "animate-pulse"} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Ready to Build Something Epic?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Have a project concept or need inspiration? Roll the generator to spark a new collaboration idea we can tackle together.
          </p>

          {/* Generator Screen */}
          <div className="min-h-[140px] flex flex-col justify-center items-center p-6 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 shadow-inner my-8 transition-all duration-300">
            {index === -1 ? (
              <span className="text-slate-500 italic text-sm">
                Click the spin button below to generate a collaboration concept...
              </span>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className="space-y-3"
              >
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  {ideas[index].tech}
                </span>
                <p className="text-white font-medium text-base sm:text-xl px-2 leading-relaxed max-w-xl mx-auto">
                  "{ideas[index].text}"
                </p>
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={rollIdea}
              disabled={rolling}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-700 hover:to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
            >
              <Sparkles size={16} />
              {rolling ? 'Rolling ideas...' : 'Spin Collab Idea'}
            </motion.button>

            {index !== -1 && !rolling && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  Let's Build It
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
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
