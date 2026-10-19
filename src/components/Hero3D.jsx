import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function GlassSculpture() {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x * 0.16;
    const pointerY = state.pointer.y * 0.12;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointerX + Math.sin(t * 0.28) * 0.08, 0.035);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointerY + Math.cos(t * 0.24) * 0.04, 0.035);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Three overlapping glass petals create a light, sculptural silhouette. */}
      {[0, 1, 2].map((petal) => (
        <mesh
          key={petal}
          rotation={[0.18, (petal * Math.PI * 2) / 3, (petal * Math.PI * 2) / 3]}
          position={[0, 0, petal === 1 ? -0.12 : 0]}
          scale={[0.62, 1.02, 0.34]}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color={petal === 1 ? '#d9d0ff' : '#b9a4ff'}
            metalness={0.12}
            roughness={0.16}
            transmission={0.72}
            thickness={0.7}
            ior={1.38}
            clearcoat={1}
            clearcoatRoughness={0.12}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}

      {/* A small polished crystal gives the sculpture a calm focal point. */}
      <mesh ref={coreRef} position={[0, 0, 0.24]} rotation={[0.2, 0.35, 0.1]}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshPhysicalMaterial
          color="#f0eaff"
          metalness={0.3}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive="#7652c8"
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative w-full max-w-xl h-72 sm:h-80 md:h-[360px] mx-auto flex items-center justify-center">
      <div className="absolute inset-[18%] bg-gradient-to-br from-violet-500/20 via-indigo-400/10 to-transparent rounded-full blur-[70px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 6]} intensity={2} color="#ffffff" />
        <pointLight position={[-3, 1, 2]} intensity={1.2} color="#a78bfa" distance={7} />
        <pointLight position={[3, -2, -1]} intensity={0.8} color="#a5d8ff" distance={6} />

        <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.28}>
          <GlassSculpture />
        </Float>
      </Canvas>

      <div className="absolute z-20 pointer-events-auto bottom-2 sm:bottom-3">
        <a
          href="#work"
          className="glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 text-white font-syne font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,.9)]" />
          <span>Explore selected work ↓</span>
        </a>
      </div>
    </div>
  );
}