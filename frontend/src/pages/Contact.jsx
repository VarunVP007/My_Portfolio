import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { contactAPI } from '../services/api';
import { isValidEmail } from '../utils/helpers';
import { scrollReveal } from '../animations/variants';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'varunprasadofficial23@example.com', href: 'mailto:varunprasadofficial23@example.com', color: 'primary' },
  { icon: Phone, label: 'Phone', value: '+91 9345440269', href: 'tel:+919345440269', color: 'secondary' },
  { icon: MapPin, label: 'Location', value: 'Salem, TamilNadu', href: 'https://maps.google.com/?q=Salem,TamilNadu', color: 'accent' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/varunprasad-dev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/varunprasad', label: 'LinkedIn' },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = { ...INITIAL_ERRORS };
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !isValidEmail(form.email)) errs.email = 'Please enter a valid email';
    if (!form.subject.trim() || form.subject.length < 5) errs.subject = 'Subject must be at least 5 characters';
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.values(errs).every((e) => !e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
      toast.success('Message sent successfully! I\'ll get back to you soon. 🎉');
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
  };

  return (
    <PageTransition>
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="Contact" highlight="Me" />
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div {...scrollReveal(0)}>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card p-10 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text mb-3">Message Sent!</h3>
                  <p className="text-text-muted mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <div className="card p-8">
                  <h2 className="text-xl font-display font-bold text-text mb-6">Send Me a Message</h2>
                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className={`form-input ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1.5" role="alert">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`form-input ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1.5" role="alert">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Project Collaboration"
                        className={`form-input ${errors.subject ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                      />
                      {errors.subject && <p id="subject-error" className="text-red-500 text-xs mt-1.5" role="alert">{errors.subject}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className={`form-input resize-none ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message && <p id="message-error" className="text-red-500 text-xs" role="alert">{errors.message}</p>}
                        <span className="text-xs text-text-muted ml-auto">{form.message.length}/2000</span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="btn-primary w-full justify-center py-3.5 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Contact Info */}
              <motion.div {...scrollReveal(0.1)}>
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-text mb-5">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group"
                        aria-label={`${label}: ${value}`}
                      >
                        <div className={`w-11 h-11 rounded-xl bg-${color}/8 flex items-center justify-center flex-shrink-0 group-hover:bg-${color}/15 transition-colors border border-${color}/20`}>
                          <Icon size={18} className={`text-${color}`} />
                        </div>
                        <div>
                          <div className="text-xs text-text-muted">{label}</div>
                          <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">{value}</div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-border">
                    <h4 className="text-sm font-semibold text-text mb-3">Follow Me</h4>
                    <div className="flex gap-3">
                      {socialLinks.map(({ icon: Icon, href, label }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <Icon size={17} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
