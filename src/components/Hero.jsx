import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // GSAP animations
  useGSAP(() => {
    // 1. Entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.fromTo('.animate-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, delay: 0.3 })
      .fromTo('.animate-title span', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2 }, '-=0.5')
      .fromTo('.animate-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo('.animate-btns a', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15 }, '-=0.5');

    // 2. Parallax and Fade out on scroll
    gsap.to('.hero-content-wrap', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: 150,
      ease: 'none'
    });

    gsap.to('.hero-3d-wrap', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: 80,
      ease: 'none'
    });
  }, { scope: containerRef });

  // Three.js wireframe Icosahedron animation
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainerRef.current.appendChild(renderer.domElement);

    // 2. 3D Icosahedron Shapes
    const geometry = new THREE.IcosahedronGeometry(10, 4);

    // Wireframe Mesh
    const wireframeMat = new THREE.MeshPhongMaterial({
      color: 0x00F3FF, // neon-blue
      emissive: 0x00F3FF,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    scene.add(wireframeMesh);

    // Solid inner silhouette
    const solidMat = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x000000,
      specular: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.1,
    });
    const solidMesh = new THREE.Mesh(geometry, solidMat);
    scene.add(solidMesh);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const pointLightBlue = new THREE.PointLight(0x00F3FF, 1, 50);
    pointLightBlue.position.set(20, 0, 15);
    scene.add(pointLightBlue);

    const pointLightPurple = new THREE.PointLight(0xAE00FF, 1, 50);
    pointLightPurple.position.set(-20, 0, 15);
    scene.add(pointLightPurple);

    // 4. Starfield Particles
    const particlesGeom = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(12, 30);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      sizes[i / 3] = THREE.MathUtils.randFloat(0.1, 0.5);
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(particlesGeom, particlesMat);
    scene.add(starField);

    // Visibility Observer to pause renderer when scrolled out
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    // 5. Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Skip rendering when out of viewport

      wireframeMesh.rotation.y += 0.002;
      wireframeMesh.rotation.z += 0.001;

      solidMesh.rotation.y += 0.002;
      solidMesh.rotation.z += 0.001;

      starField.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      geometry.dispose();
      wireframeMat.dispose();
      solidMat.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-lighter to-dark"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 -z-10" />
      <div ref={canvasContainerRef} className="absolute inset-0 -z-5 pointer-events-none hero-3d-wrap" />
      
      {/* Ambient background glows and moving objects */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-neon-blue/10 blur-[120px] -translate-x-1/4" />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-white/10 rounded-sm animate-pulse" />
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-white/5 rounded-md animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-white/10 rounded-sm animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-white/5 rounded-md animate-bounce" />
        <div className="absolute top-10 left-1/2 w-12 h-12 bg-white/[0.02] rounded-lg animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/[0.03] rounded-xl animate-pulse" />
      </div>

      {/* Main Hero Header */}
      <div
        ref={textRef}
        className="container mx-auto px-6 z-10 text-center hero-content-wrap"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="animate-badge inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 opacity-0">
            <span className="text-sm font-medium text-white/80">Startup Innovation Partner</span>
          </div>
          
          <h1 className="animate-title text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            <span className="block opacity-0">Shaping the Future of</span>
            <span className="text-gradient block mt-2 opacity-0">Design & Technology</span>
          </h1>
          
          <p className="animate-desc text-xl text-white/70 max-w-2xl mx-auto opacity-0">
            Parallax Global delivers premium digital design, custom software development, and virtual reality experiences. We build cutting-edge products to scale your startup venture.
          </p>
          
          <div className="animate-btns flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <a
              href="#work"
              className="animate-btn-work w-full sm:w-auto px-8 py-3 rounded-md bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white font-medium transition-all duration-300 shadow-lg shadow-neon-blue/20 opacity-0"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="animate-btn-contact w-full sm:w-auto px-8 py-3 rounded-md border border-white/20 hover:bg-white/10 text-white font-medium transition-colors duration-300 opacity-0"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
