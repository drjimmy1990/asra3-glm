'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

// Suppress THREE.Clock deprecation warning (upstream issue in @react-three/fiber)
const origWarn = console.warn;
if (typeof window !== 'undefined') {
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
    origWarn.apply(console, args);
  };
}

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slow ambient rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00ff9d" // Primary color approx
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </Sphere>
      
      {/* Inner solid core */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        className="relative"
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Optimize for mobile vs retina
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ff9d" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        
        <Suspense fallback={null}>
          <AICore />
          <Sparkles 
            count={150} 
            scale={6} 
            size={4} 
            speed={0.4} 
            color="#00ff9d" 
            opacity={0.8}
            noise={1}
          />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
    </div>
  );
}
