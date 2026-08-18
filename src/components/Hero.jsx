import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    // Scroll Parallax Effect
    const handleScroll = () => {
      if (!textRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(1, scrollY / 700);
      textRef.current.style.opacity = opacity.toString();
      textRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-lighter to-dark"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 -z-10" />
      <div ref={canvasContainerRef} className="absolute inset-0 -z-5 pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-neon-blue/10 blur-[120px] -translate-x-1/4" />
      </div>

      {/* Main Hero Header */}
      <div
        ref={textRef}
        className="container mx-auto px-6 z-10 text-center transition-all duration-300 ease-out"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 animate-fade-in">
            <span className="text-sm font-medium text-white/80">Collaborative Innovation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            <span className="block">Shaping the Future of</span>
            <span className="text-gradient block mt-2">Design & AI</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Parallax Global and Nexmize AI join forces to create a new paradigm in digital experiences and intelligent software solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-3 rounded-md bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white font-medium transition-all duration-300 shadow-lg shadow-neon-blue/20"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3 rounded-md border border-white/20 hover:bg-white/10 text-white font-medium transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
