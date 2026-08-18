import React, { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Vision from './components/Vision.jsx';
import Timeline from './components/Timeline.jsx';
import Team from './components/Team.jsx';

export default function App() {
  // Smooth scroll for hash links
  useEffect(() => {
    const handleHashClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((t) => t.addEventListener('click', handleHashClick));
    return () => {
      links.forEach((t) => t.removeEventListener('click', handleHashClick));
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <Work />
      <Vision />
      <Timeline />
      <Team />
    </Layout>
  );
}
