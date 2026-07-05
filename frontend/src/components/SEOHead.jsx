import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta = {
  '/': {
    title: 'Varun Prasad | Full Stack Developer',
    description: 'Full Stack Developer, Problem Solver & Tech Enthusiast. Building scalable, user-friendly web applications.',
  },
  '/about': {
    title: 'About | Varun Prasad',
    description: 'Learn about Varun Prasad — his career objective, highlights, and personal journey as a Full Stack Developer.',
  },
  '/education': {
    title: 'Education | Varun Prasad',
    description: 'Varun Prasad\'s education journey — B.Tech Computer Science Engineering at Kalaignar College with 8.75 CGPA.',
  },
  '/skills': {
    title: 'Skills | Varun Prasad',
    description: 'Technical skills of Varun Prasad — React, Node.js, Python, MongoDB, AWS, and more.',
  },
  '/projects': {
    title: 'Projects | Varun Prasad',
    description: 'Explore Varun Prasad\'s portfolio projects including CraftShield, StudySphere, and more.',
  },
  '/experience': {
    title: 'Experience & Certifications | Varun Prasad',
    description: 'Professional experience and certifications of Varun Prasad.',
  },
  '/leetcode': {
    title: 'LeetCode & GitHub | Varun Prasad',
    description: 'Varun Prasad\'s coding activity on LeetCode and GitHub.',
  },
  '/resume': {
    title: 'Resume | Varun Prasad',
    description: 'View and download Varun Prasad\'s professional resume.',
  },
  '/contact': {
    title: 'Contact | Varun Prasad',
    description: 'Get in touch with Varun Prasad for collaboration, job opportunities, or just to say hello.',
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
