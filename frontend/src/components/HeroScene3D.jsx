import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D({ theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPower = (navigator.hardwareConcurrency || 4) <= 4 || window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowPower,
      alpha: true,
      powerPreference: 'high-performance',
    });
    // Cap pixel ratio at 1.75 for 60fps guarantee
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower ? 1.25 : 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const accentHex = theme === 'light' ? 0x5b21b6 : 0xd4ff00;
    const secondaryHex = theme === 'light' ? 0x18181b : 0x38bdf8;

    // Group holding interactive 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Morphing Core Icosahedron
    const detail = isLowPower ? 2 : 4;
    const coreGeo = new THREE.IcosahedronGeometry(1.45, detail);
    const originalPositions = coreGeo.attributes.position.array.slice();

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: theme === 'light' ? 0x18181b : 0x121217,
      emissive: accentHex,
      emissiveIntensity: theme === 'light' ? 0.18 : 0.22,
      roughness: 0.22,
      metalness: 0.85,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.82, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      wireframe: true,
      transparent: true,
      opacity: theme === 'light' ? 0.35 : 0.42,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    // 3. Orbital Torus Ring
    const ringGeo = new THREE.TorusGeometry(2.35, 0.012, 12, isLowPower ? 48 : 90);
    const ringMat = new THREE.MeshBasicMaterial({
      color: secondaryHex,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.38;
    ringMesh.rotation.y = Math.PI * 0.15;
    mainGroup.add(ringMesh);

    // 4. Instanced Floating Particle Field (single draw call)
    const particleCount = isLowPower ? 55 : 130;
    const particleGeo = new THREE.OctahedronGeometry(0.032, 0);
    const particleMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.65,
    });
    const instancedParticles = new THREE.InstancedMesh(
      particleGeo,
      particleMat,
      particleCount
    );

    const dummy = new THREE.Object3D();
    const particleData = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const scale = 0.5 + Math.random() * 1.3;
      particleData.push({ x, y, z, scale, speed: 0.3 + Math.random() * 0.7, offset: i });
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    scene.add(instancedParticles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(accentHex, 2.8);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(secondaryHex, 1.6);
    dirLight2.position.set(-4, -3, 2);
    scene.add(dirLight2);

    // Mouse & Scroll state
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let rafId = null;

    const onMouseMove = (e) => {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };

    // Pause rendering when hero canvas is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible || !isTabActive) return;

      const t = clock.getElapsedTime();

      // Smooth pointer lerp
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (!prefersReducedMotion) {
        // Vertex organic morphing on core mesh
        const posAttr = coreGeo.attributes.position;
        const arr = posAttr.array;
        for (let i = 0; i < arr.length; i += 3) {
          const ox = originalPositions[i];
          const oy = originalPositions[i + 1];
          const oz = originalPositions[i + 2];
          const wave =
            1 +
            0.09 *
              Math.sin(ox * 2.2 + t * 1.7 + pointer.x * 1.5) *
              Math.cos(oy * 2.2 + t * 1.3 + pointer.y * 1.5);
          arr[i] = ox * wave;
          arr[i + 1] = oy * wave;
          arr[i + 2] = oz * wave;
        }
        posAttr.needsUpdate = true;

        coreMesh.rotation.y = t * 0.25 + pointer.x * 0.5;
        coreMesh.rotation.x = t * 0.18 - pointer.y * 0.4;

        cageMesh.rotation.y = -t * 0.15 + pointer.x * 0.3;
        cageMesh.rotation.z = t * 0.12;

        ringMesh.rotation.z = t * 0.22;

        // Scroll-driven camera & group shift
        const scrollFactor = Math.min(scrollY / 900, 1);
        mainGroup.position.y = scrollFactor * 0.8;
        mainGroup.rotation.z = scrollFactor * 0.6;
        camera.position.z = 6.2 + scrollFactor * 1.4;

        // Subtle instanced particle oscillation
        instancedParticles.rotation.y = t * 0.05 + pointer.x * 0.15;
        instancedParticles.rotation.x = -pointer.y * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-90"
    />
  );
}
