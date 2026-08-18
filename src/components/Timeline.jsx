import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "2022",
    title: "Foundation of Parallax Global",
    description: "Parallax Global was founded with a mission to deliver high-quality offline programming classes, covering core languages like C, C++, Java, and Modern Web Development."
  },
  {
    year: "2023",
    title: "Venture Scale Client Projects",
    description: "Expanded our offerings beyond education to full-service software product design, securing our first custom app design and web developments contracts."
  },
  {
    year: "2024",
    title: "VR & Immersive Media Launch",
    description: "Pioneered virtual reality environments and interactive 3D media applications, establishing our studio at the forefront of immersive tech."
  },
  {
    year: "2025",
    title: "Scale to Enterprise Software",
    description: "Secured enterprise level contracts, developing highly scalable automation software, responsive digital portals, and cloud solutions."
  }
];

function MilestoneCard({ year, title, description, isLeft, isMobile }) {
  return (
    <div
      className={`timeline-event-card relative z-10 opacity-0 mb-12 flex flex-col ${
        isLeft && !isMobile ? 'md:items-end' : 'md:items-start'
      }`}
    >
      {/* Node Dot indicator */}
      <div
        className={`hidden md:block absolute top-6 w-4 h-4 rounded-full bg-neon-blue border-2 border-dark z-20 ${
          isLeft ? 'left-[calc(50%-8px)]' : 'right-[calc(50%-8px)]'
        }`}
      />

      {/* Card Body */}
      <div
        className={`p-6 max-w-lg glass rounded-xl border-l-2 border-neon-blue/30 w-full ${
          isLeft && !isMobile ? 'md:text-right' : 'md:text-left'
        }`}
      >
        <div className="inline-block py-1 px-3 rounded-full bg-neon-blue/10 backdrop-blur-md mb-3">
          <span className="text-xs font-semibold text-white/90">{year}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-neon-blue">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);
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

  // GSAP ScrollTrigger timeline animation
  useGSAP(() => {
    // Scrub the height of the line progress
    gsap.fromTo('.timeline-progress-bar',
      { height: '0%' },
      {
        scrollTrigger: {
          trigger: '.timeline-events-container',
          start: 'top 30%',
          end: 'bottom 70%',
          scrub: true
        },
        height: '100%',
        ease: 'none'
      }
    );

    // Stagger fade-in each milestone card
    gsap.utils.toArray('.timeline-event-card').forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
    });
  }, { scope: containerRef });

  // Three.js floating background particles
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainerRef.current.appendChild(renderer.domElement);

    const count = 80;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00F3FF,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

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

      const arr = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        arr[idx] += velocities[idx];
        arr[idx + 1] += velocities[idx + 1];
        arr[idx + 2] += velocities[idx + 2];

        if (Math.abs(arr[idx]) > 5) velocities[idx] = -velocities[idx] * 0.8;
        if (Math.abs(arr[idx + 1]) > 5) velocities[idx + 1] = -velocities[idx + 1] * 0.8;
        if (Math.abs(arr[idx + 2]) > 5) velocities[idx + 2] = -velocities[idx + 2] * 0.8;
      }
      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;

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
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="relative py-24 bg-dark-lighter overflow-hidden">
      {/* 3D background particles container */}
      <div ref={canvasContainerRef} className="absolute inset-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <span className="text-sm font-medium text-white/80">Our Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Timeline of Innovation</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore the key milestones of Parallax Global as we pioneer cutting-edge tech experiences.
          </p>
        </div>

        <div className="relative timeline-events-container max-w-5xl mx-auto">
          {/* Vertical central indicator line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-white/10 z-0">
            <div className="timeline-progress-bar w-full h-0 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink transition-all duration-100 ease-out" />
          </div>

          {/* Milestones rendering */}
          <div className="relative pl-10 md:pl-0">
            {timelineEvents.map((e, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:grid md:grid-cols-2 md:gap-8 ${
                    isLeft ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Left Column (Desktop) */}
                  <div className={`${isLeft ? 'block' : 'md:hidden'}`}>
                    {isLeft && (
                      <MilestoneCard
                        {...e}
                        isLeft={true}
                        isMobile={isMobile}
                      />
                    )}
                  </div>

                  {/* Empty Column spacer (Desktop) */}
                  <div className="hidden md:block" />

                  {/* Right Column (Desktop) */}
                  <div className={`${!isLeft ? 'block' : 'md:hidden'}`}>
                    {!isLeft && (
                      <MilestoneCard
                        {...e}
                        isLeft={false}
                        isMobile={isMobile}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
