import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const visionCards = [
  {
    title: "AI-Powered Design Systems",
    description: "Intelligent design systems that adapt to user behaviors and preferences, creating personalized experiences.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    color: "neon-blue"
  },
  {
    title: "Immersive Virtual Environments",
    description: "Next-generation virtual spaces where teams can collaborate as if physically present, regardless of location.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    color: "neon-purple"
  },
  {
    title: "Quantum Computing Solutions",
    description: "Harnessing the power of quantum algorithms to solve previously unsolvable computational problems.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>',
    color: "neon-pink"
  },
  {
    title: "Sustainable Digital Infrastructure",
    description: "Eco-friendly digital solutions that minimize environmental impact while maximizing performance.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C8 3 5 6 5 9c0 2.23 2 5 7 9 5-4 7-6.77 7-9 0-3-3-6-7-6z"/></svg>',
    color: "neon-blue"
  },
  {
    title: "Augmented Decision Making",
    description: "AI systems that enhance human decision-making by providing context-aware insights and predictions.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    color: "neon-purple"
  },
  {
    title: "Neuromorphic Computing",
    description: "Computing architectures inspired by the human brain for more efficient and adaptive AI systems.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
    color: "neon-pink"
  }
];

export default function Vision() {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // GSAP ScrollTrigger for cards
  useGSAP(() => {
    gsap.fromTo('.vision-card',
      {
        opacity: 0,
        y: 60
      },
      {
        scrollTrigger: {
          trigger: '.vision-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  }, { scope: containerRef });

  // Three.js interactive 3D solar system
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainerRef.current.appendChild(renderer.domElement);

    const createRing = (radius, color) => {
      const geometry = new THREE.RingGeometry(radius, radius + 0.05, 64);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      return new THREE.Mesh(geometry, material);
    };

    const ring1 = createRing(1.5, 0x00F3FF); // Neon Blue
    const ring2 = createRing(2.5, 0xAE00FF); // Neon Purple
    const ring3 = createRing(3.5, 0xFF00AA); // Neon Pink

    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.x = Math.PI / 3;
    ring3.rotation.x = Math.PI / 4;

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);

    const createSphere = (color) => {
      const geometry = new THREE.SphereGeometry(0.15, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: color });
      return new THREE.Mesh(geometry, material);
    };

    const sphere1 = createSphere(0x00F3FF);
    const sphere2 = createSphere(0xAE00FF);
    const sphere3 = createSphere(0xFF00AA);

    scene.add(sphere1);
    scene.add(sphere2);
    scene.add(sphere3);

    const sunGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    scene.add(sunMesh);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      ring1.rotation.z = time * 0.2;
      ring2.rotation.z = time * 0.15;
      ring3.rotation.z = time * 0.1;

      sphere1.position.x = Math.cos(time) * 1.5;
      sphere1.position.z = Math.sin(time) * 1.5;

      sphere2.position.x = Math.cos(time * 0.8) * 2.5;
      sphere2.position.z = Math.sin(time * 0.8) * 2.5;

      sphere3.position.x = Math.cos(time * 0.6) * 3.5;
      sphere3.position.z = Math.sin(time * 0.6) * 3.5;

      const scale = 1 + Math.sin(time * 2) * 0.1;
      sunMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      ring1.geometry.dispose();
      ring1.material.dispose();
      ring2.geometry.dispose();
      ring2.material.dispose();
      ring3.geometry.dispose();
      ring3.material.dispose();
      sphere1.geometry.dispose();
      sphere1.material.dispose();
      sphere2.geometry.dispose();
      sphere2.material.dispose();
      sphere3.geometry.dispose();
      sphere3.material.dispose();
      sunGeom.dispose();
      sunMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="vision" ref={containerRef} className="relative py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
            <span className="text-sm font-medium text-white/80">Future Vision</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Pioneering Tomorrow's Technology</h2>
          <p className="text-white/70">
            As we look to the future, we're developing innovative technologies that will redefine the boundaries of what's possible in digital experiences and artificial intelligence.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* 3D orbit system animation */}
          <div className="lg:w-2/5 flex items-center justify-center mb-12 lg:mb-0">
            <div ref={canvasContainerRef} className="w-[300px] h-[300px] relative pointer-events-none">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 blur-3xl -z-10" />
            </div>
          </div>

          {/* Cards listing */}
          <div className="lg:w-3/5">
            <div className="vision-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {visionCards.map((card, idx) => (
                <div
                  key={idx}
                  className="vision-card glass rounded-xl p-6 h-full transition-all duration-500 hover:translate-y-[-8px] opacity-0"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      card.color === 'neon-blue'
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                        : card.color === 'neon-purple'
                        ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
                        : 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20'
                    }`}
                  >
                    <span
                      className="text-xl"
                      dangerouslySetInnerHTML={{ __html: card.icon }}
                    />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Build the Future Together?</h3>
          <p className="text-white/70 mb-8">
            We're constantly exploring new opportunities and partnerships to push the boundaries of what's possible.
          </p>
          <button className="neon-border px-6 py-3 rounded-md bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 hover:from-neon-blue/30 hover:to-neon-purple/30 backdrop-blur-md transition-all duration-300">
            <span className="text-white font-medium">Become a Partner</span>
          </button>
        </div>
      </div>
    </section>
  );
}
