import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const timelineEvents = [
  {
    year: "2022",
    title: "Foundation of Parallax Global",
    description: "Parallax Global was founded with a mission to provide high-quality offline programming classes, covering C, C++, Java, and Web Development.",
    companyType: "parallax"
  },
  {
    year: "2023",
    title: "Foundation of Nexmize",
    description: "Nexmize was founded with a focus on AI, starting by sharing informative posts about AI advancements and trends.",
    companyType: "nexmize"
  },
  {
    year: "2023",
    title: "Client Projects",
    description: "Parallax Global began working on small-scale client projects, building experience in software development.",
    companyType: "parallax"
  },
  {
    year: "2024",
    title: "Client Acquisition and AI Solutions",
    description: "Nexmize secured its first clients, helping businesses improve efficiency with AI-driven solutions like bots and automation.",
    companyType: "nexmize"
  },
  {
    year: "2024",
    title: "Expansion and Growth",
    description: "Parallax Global expanded its client base, successfully managing an increased number of projects and enhancing service quality.",
    companyType: "parallax"
  },
  {
    year: "2025",
    title: "Breakthrough in AI Innovation",
    description: "Nexmize developed and deployed live voice recognition AI projects, showcasing its technical strength and market impact.",
    companyType: "nexmize"
  },
  {
    year: "2025",
    title: "Handling Big Clients",
    description: "Parallax Global secured major clients and started handling complex, large-scale projects — setting the stage for future growth.",
    companyType: "parallax"
  }
];

// Helper card component
function MilestoneCard({ year, title, description, isLeft, index, companyType, isMobile }) {
  return (
    <div
      className={`relative z-10 transition-all duration-700 ease-out opacity-0 translate-y-6 ${
        isLeft && !isMobile ? 'md:text-right' : ''
      }`}
      style={{
        animationName: 'fade-in-up',
        animationDuration: '0.6s',
        animationFillMode: 'forwards',
        animationDelay: `${index * 200}ms`
      }}
    >
      {/* Node Dot indicator */}
      {!isMobile && (
        <div
          className={`hidden md:block absolute top-0 w-3 h-3 rounded-full ${
            companyType === 'parallax' ? 'bg-neon-blue' : 'bg-neon-purple'
          } ${isLeft ? '-right-1.5' : '-left-1.5'}`}
        />
      )}
      {isMobile && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 ${
            companyType === 'parallax' ? 'bg-neon-blue' : 'bg-neon-purple'
          } ${companyType === 'parallax' ? '-right-1.5' : '-left-1.5'}`}
        />
      )}

      {/* Card Body */}
      <div
        className={`p-6 max-w-md glass rounded-xl mb-10 ${isLeft && !isMobile ? 'md:ml-auto' : ''} ${
          companyType === 'parallax' ? 'border-l-2 border-neon-blue/30' : 'border-l-2 border-neon-purple/30'
        }`}
      >
        <div
          className={`inline-block py-1 px-3 rounded-full backdrop-blur-md mb-3 ${
            companyType === 'parallax' ? 'bg-neon-blue/10' : 'bg-neon-purple/10'
          }`}
        >
          <span className="text-xs font-semibold text-white/90">{year}</span>
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${
            companyType === 'parallax' ? 'text-neon-blue' : 'text-neon-purple'
          }`}
        >
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const lineRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Three.js floating particles animation
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainerRef.current.appendChild(renderer.domElement);

    // Create particles data
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Three colored particle styles
    const materials = [
      new THREE.PointsMaterial({ size: 0.1, color: 0x00F3FF, transparent: true, opacity: 0.8 }), // blue
      new THREE.PointsMaterial({ size: 0.1, color: 0xAE00FF, transparent: true, opacity: 0.8 }), // purple
      new THREE.PointsMaterial({ size: 0.1, color: 0xFF00AA, transparent: true, opacity: 0.8 }), // pink
    ];

    const particleSystems = [];
    for (let i = 0; i < 3; i++) {
      const system = new THREE.Points(geometry.clone(), materials[i]);
      scene.add(system);
      particleSystems.push(system);
    }

    const handleResize = () => {
      const width = window.innerWidth;
      camera.aspect = width / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(width, 600);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Move particle positions
      particleSystems.forEach((system, index) => {
        const arr = system.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          arr[idx] += velocities[idx];
          arr[idx + 1] += velocities[idx + 1];
          arr[idx + 2] += velocities[idx + 2];

          // Bounce if boundary crossed
          if (Math.abs(arr[idx]) > 5) velocities[idx] = -velocities[idx] * 0.8;
          if (Math.abs(arr[idx + 1]) > 5) velocities[idx + 1] = -velocities[idx + 1] * 0.8;
          if (Math.abs(arr[idx + 2]) > 5) velocities[idx + 2] = -velocities[idx + 2] * 0.8;
        }
        system.geometry.attributes.position.needsUpdate = true;
        system.rotation.y += 0.001 * (index + 1);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  // IntersectionObserver for Growing Timeline Line (Desktop only)
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            line.classList.add('after:h-full');
            line.classList.remove('after:h-0');
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(line);
    return () => observer.unobserve(line);
  }, []);

  return (
    <section id="timeline" className="relative py-24 bg-dark-lighter overflow-hidden">
      {/* 3D background particles container */}
      <div ref={canvasContainerRef} className="absolute inset-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <span className="text-sm font-medium text-white/80">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Timeline of Innovation</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore the key milestones that have shaped our collaborative journey in pioneering innovative solutions and transforming industries.
          </p>
        </div>

        <div className="relative">
          {/* Central Line for Desktop */}
          {!isMobile && (
            <div
              ref={lineRef}
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/20 after:absolute after:top-0 after:left-0 after:right-0 after:h-0 after:bg-gradient-to-b after:from-neon-blue after:via-neon-purple after:to-neon-pink after:transition-all after:duration-[2000ms] after:ease-in-out"
            />
          )}

          {/* Central indicator line for Mobile */}
          {isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex flex-col">
              <div className="w-px h-full bg-gradient-to-b from-neon-blue via-white/20 to-neon-purple" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-dark-lighter border-2 border-white/20 flex items-center justify-center z-20">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="bg-dark-lighter px-3 py-1 rounded-full border border-white/10 mt-2 text-xs text-white/70">
                  Partnership
                </div>
              </div>
            </div>
          )}

          {/* Milestones rendering */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pr-4">
                {timelineEvents
                  .filter((e) => e.companyType === 'parallax')
                  .map((e, idx) => (
                    <MilestoneCard
                      key={`parallax-${idx}`}
                      {...e}
                      isLeft={false}
                      index={idx}
                      isMobile={true}
                    />
                  ))}
              </div>
              <div className="space-y-4 pl-4">
                {timelineEvents
                  .filter((e) => e.companyType === 'nexmize')
                  .map((e, idx) => (
                    <MilestoneCard
                      key={`nexmize-${idx}`}
                      {...e}
                      isLeft={true}
                      index={idx}
                      isMobile={true}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="md:grid md:grid-cols-2 md:gap-x-12">
              {timelineEvents.map((e, idx) => (
                <MilestoneCard
                  key={idx}
                  {...e}
                  isLeft={idx % 2 === 0}
                  index={idx}
                  isMobile={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
