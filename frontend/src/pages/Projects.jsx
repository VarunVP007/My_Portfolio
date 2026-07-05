import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { projects, projectCategories } from '../data/projectsData';
import { useDebounce } from '../hooks/useHooks';
import { scrollReveal, staggerContainer, staggerItem } from '../animations/variants';

const ITEMS_PER_PAGE = 6;

// ─── Tech Badge ──────────────────────────────────────────────────────────────
const TechBadge = ({ tech }) => (
  <span className="tech-tag text-xs">{tech}</span>
);

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = memo(({ project, onOpen }) => (
  <motion.article
    variants={staggerItem}
    layout
    whileHover={{ y: -6 }}
    className="card overflow-hidden group cursor-pointer"
    onClick={() => onOpen(project)}
    aria-label={`View ${project.title} details`}
  >
    {/* Image */}
    <div className="relative overflow-hidden h-48">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg text-text text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Live demo of ${project.title}`}
          >
            <ExternalLink size={14} /> Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg text-text text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`GitHub repo of ${project.title}`}
          >
            <Github size={14} /> Code
          </a>
        )}
      </div>
      <div className="absolute top-3 left-3">
        <span className={`badge text-xs font-semibold ${project.status === 'Completed' ? 'badge-primary' : 'badge-accent'}`}>
          {project.status}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-display font-bold text-text group-hover:text-primary transition-colors">{project.title}</h3>
        <span className="badge-secondary text-xs ml-2 flex-shrink-0">{project.category}</span>
      </div>
      <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map((t) => <TechBadge key={t} tech={t} />)}
        {project.techStack.length > 4 && (
          <span className="tech-tag text-xs">+{project.techStack.length - 4}</span>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-primary font-medium">
        <Eye size={14} />
        View Details
      </div>
    </div>
  </motion.article>
));

// ─── Project Modal ─────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="bg-white rounded-3xl shadow-soft-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-56 overflow-hidden rounded-t-3xl">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-4 left-5">
              <h2 className="text-2xl font-display font-bold text-white">{project.title}</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-primary">{project.category}</span>
              <span className={`badge text-xs ${project.status === 'Completed' ? 'badge-primary' : 'badge-accent'}`}>{project.status}</span>
              <span className="badge badge-secondary">{project.year}</span>
            </div>

            <p className="text-text-muted leading-relaxed mb-6">{project.longDescription}</p>

            <div className="mb-6">
              <h4 className="font-semibold text-text mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => <TechBadge key={t} tech={t} />)}
              </div>
            </div>

            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <Github size={16} /> View Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Projects Page ───────────────────────────────────────────────────────
const Projects = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, category]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <PageTransition>
      {/* Projects Section */}
      <section className="py-12 bg-white">
        <div className="section-container py-0">
          <SectionTitle title="Projects" />


          {/* Results info */}
          <div className="text-sm text-text-muted mb-6">
            Showing <span className="font-semibold text-text">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
            {debouncedSearch && ` for "${debouncedSearch}"`}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {paged.length > 0 ? (
              <motion.div
                key={category + debouncedSearch + page}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
              >
                {paged.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-text mb-2">No projects found</h3>
                <p className="text-text-muted text-sm">Try adjusting your search or category filter.</p>
                <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-primary mt-4 text-sm">
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${page === p
                      ? 'bg-primary text-white shadow-primary/30 shadow-md'
                      : 'border border-border text-text-muted hover:text-primary hover:border-primary'
                    }`}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </PageTransition>
  );
};

export default Projects;
