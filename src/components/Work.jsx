import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import pgLogo from './images/pg_transparent.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Immersive Virtual Experience",
    description: "A cutting-edge virtual reality solution transforming how users interact with digital environments.",
    category: "Virtual Reality",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Interactive Data Visualization",
    description: "Complex data sets transformed into intuitive, interactive visualizations for enhanced understanding.",
    category: "Data Visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Responsive Web Application",
    description: "Seamless cross-platform web application with state-of-the-art UI/UX design principles.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Enterprise AI Recommendation Engine",
    description: "Machine learning algorithm providing personalized content and product recommendations with high accuracy.",
    category: "AI Integration",
    image: "https://images.unsplash.com/photo-1677442135145-4773308ecab1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Custom Natural Language Processor",
    description: "Advanced custom NLP systems capable of understanding and generating human-like context-aware text.",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Automated Business Intelligence",
    description: "Smart analytics platform that identifies patterns and provides actionable business insights.",
    category: "Business Intelligence",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Work() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // GSAP ScrollTrigger for cards
  useGSAP(() => {
    gsap.fromTo('.project-card', 
      {
        opacity: 0,
        y: 60
      },
      {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  }, { scope: containerRef });

  // Three.js wireframe Box animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(100, 100);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00F3FF, // Neon blue
      transparent: true,
      opacity: 0.7
    });
    const cubeLines = new THREE.LineSegments(edges, material);
    scene.add(cubeLines);

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Skip rendering when out of viewport
      cubeLines.rotation.x += 0.01;
      cubeLines.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      geometry.dispose();
      edges.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative py-24 bg-dark-lighter overflow-hidden">
      {/* 3D spinning box element */}
      <div ref={canvasRef} className="absolute top-20 right-20 z-10 w-[100px] h-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-neon-blue/10 backdrop-blur-md border border-neon-blue/20 mb-6">
            <img
              src={pgLogo}
              alt="Parallax Global Logo"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-neon-blue">Parallax Global</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Our Showcase</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover how Parallax Global translates ambitious concepts into premium digital products.
          </p>
        </div>

        {/* Re-designed Single Grid Showcase */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div 
              key={idx} 
              className="project-card opacity-0 group relative rounded-xl overflow-hidden glass hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-neon-blue tracking-wider uppercase">{p.category}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
