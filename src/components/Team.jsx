import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, Eye, Share2 } from 'lucide-react';

import samImg from './images/samimg.jpg';
import sanketImg from './images/Sanketimg.jpg';
import vjyImg from './images/vjydeore.jpg';

const teamMembers = [
  { name: "Swami Kshatriya", role: "Founder", company: "parallax", image: "/swami.jpg" },
  { name: "Sanmati Ukhalkar", role: "Co-Founder", company: "parallax", image: samImg },
  { name: "Sanket Dhage", role: "Co-Founder", company: "parallax", image: sanketImg },
  { name: "Vijay Deore", role: "Founder", company: "nexmize", image: vjyImg },
  { name: "Mansi Deore", role: "Co-Founder", company: "nexmize", image: "/mansideore.jpg" }
];

// Interactive Tilt Card Component
function TeamMemberCard({ name, role, company, image, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      const rotX = (y - halfHeight) / 20;
      const rotY = (halfWidth - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0 transition-transform duration-300 ease-out"
      style={{
        animationName: 'fade-in-up',
        animationDuration: '0.6s',
        animationFillMode: 'forwards',
        animationDelay: `${index * 150}ms`
      }}
    >
      <div className="relative rounded-xl overflow-hidden glass">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <p className="text-white/70 text-sm">{role}</p>
          <div className="flex mt-4 space-x-3">
            {/* Social Links */}
            <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-neon-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-neon-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 py-1 px-4 rounded-full text-xs font-medium ${
          company === 'parallax'
            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
            : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
        }`}
      >
        {company === 'parallax' ? 'Parallax Global' : 'Nexmize AI'}
      </div>
    </div>
  );
}

// Decorative Grid Accent Boxes
function GridAccentBox({ size = 'medium', color, icon, className = '', delay = 0 }) {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  return (
    <div
      className={`opacity-0 rounded-xl overflow-hidden glass flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        animationName: 'fade-in-up',
        animationDuration: '0.6s',
        animationFillMode: 'forwards',
        animationDelay: `${delay}ms`
      }}
    >
      <div className={`w-full h-full rounded-lg flex items-center justify-center ${color} bg-opacity-20 border border-opacity-30`}>
        {icon && <div className="animate-pulse">{icon}</div>}
      </div>
    </div>
  );
}

export default function Team() {
  const canvasRef = useRef(null);

  // Three.js spinning Tetrahedron wireframe
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(100, 100);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TetrahedronGeometry(1.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xFF00AA, // Neon pink
      transparent: true,
      opacity: 0.7
    });
    const lines = new THREE.LineSegments(edges, material);
    scene.add(lines);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      lines.rotation.x += 0.01;
      lines.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      edges.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="team" className="relative py-24 bg-dark overflow-hidden">
      {/* 3D spinning Tetrahedron */}
      <div ref={canvasRef} className="absolute top-24 right-24 z-10 w-[100px] h-[100px]" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4 animate-fade-in">
            <span className="text-sm font-medium text-white/80">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">The Minds Behind Our Success</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Meet our team of visionaries, innovators, and experts who are pushing the boundaries of what's possible in design and artificial intelligence.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          <TeamMemberCard {...teamMembers[0]} index={0} />
          
          <GridAccentBox
            size="medium"
            color="bg-neon-blue"
            icon={<Cpu size={40} className="text-neon-blue" />}
            delay={150}
          />
          
          <TeamMemberCard {...teamMembers[1]} index={2} />
          
          <GridAccentBox
            size="medium"
            color="bg-neon-purple"
            icon={<Eye size={40} className="text-neon-purple" />}
            delay={300}
          />
          
          <TeamMemberCard {...teamMembers[2]} index={4} />
          
          <GridAccentBox
            size="large"
            color="bg-neon-blue"
            className="md:col-span-2 hidden lg:flex"
            delay={450}
          />
          
          <TeamMemberCard {...teamMembers[3]} index={6} />
          <TeamMemberCard {...teamMembers[4]} index={7} />
          
          <GridAccentBox
            size="small"
            color="bg-neon-purple"
            icon={<Share2 size={24} className="text-neon-purple" />}
            delay={600}
          />
        </div>

        {/* Join our team card */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about innovation and pushing the boundaries of technology.
          </p>
          <button className="px-6 py-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300">
            <span className="text-white font-medium">View Open Positions</span>
          </button>
        </div>
      </div>
    </section>
  );
}
