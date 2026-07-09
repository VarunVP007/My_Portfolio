import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta = {
  '/': {
    title: 'Varunprasad V | Full Stack Developer',
    description: 'Full Stack Developer, Problem Solver & Tech Enthusiast. Building scalable, user-friendly web applications.',
  },
  '/about': {
    title: 'About | Varunprasad V',
    description: 'Learn about Varunprasad V — his career objective, highlights, and personal journey as a Full Stack Developer.',
  },
  '/education': {
    title: 'Education | Varunprasad V',
    description: 'Varunprasad V\'s education journey — B.Tech Computer Science Engineering at Kalaignar College with 8.75 CGPA.',
  },
  '/skills': {
    title: 'Skills | Varunprasad V',
    description: 'Technical skills of Varunprasad V — React, Node.js, Python, MongoDB, AWS, and more.',
  },
  '/projects': {
    title: 'Projects | Varunprasad V',
    description: 'Explore Varunprasad V\'s portfolio projects including CraftShield, StudySphere, and more.',
  },
  '/experience': {
    title: 'Experience & Certifications | Varunprasad V',
    description: 'Professional experience and certifications of Varunprasad V.',
  },
  '/leetcode': {
    title: 'LeetCode & GitHub | Varunprasad V',
    description: 'Varunprasad V\'s coding activity on LeetCode and GitHub.',
  },
  '/resume': {
    title: 'Resume | Varunprasad V',
    description: 'View and download Varunprasad V\'s professional resume.',
  },
  '/contact': {
    title: 'Contact | Varunprasad V',
    description: 'Get in touch with Varunprasad V for collaboration, job opportunities, or just to say hello.',
  },
};

const SEOHead = () => {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || pageMeta['/'];

  useEffect(() => {
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
  }, [meta]);

  return null;
};

export default SEOHead;
