'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 3D Glass Device and Holographic Core
function GlassDevice() {
  const groupRef = useRef();
  const innerOrbRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x * 0.45;
    const pointerY = state.pointer.y * 0.45;

    // Smooth physical tilt toward mouse pointer
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointerX + Math.sin(t * 0.5) * 0.15, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointerY + Math.cos(t * 0.5) * 0.1, 0.05);
    }

    // Holographic inner orb pulse & rotation
    if (innerOrbRef.current) {
      innerOrbRef.current.rotation.y = t * 0.8;
      innerOrbRef.current.rotation.z = t * 0.4;
    }

    // Outer orbital ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.6;
      ringRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Outer Floating Frosted Glass Tablet Device */}
      <RoundedBox args={[3.2, 2.1, 0.28]} radius={0.22} smoothness={8}>
        <meshPhysicalMaterial
          roughness={0.12}
          transmission={0.92}
          thickness={0.8}
          ior={1.52}
          color="#ffffff"
          emissive="#2e1065"
          emissiveIntensity={0.15}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
        />
      </RoundedBox>

      {/* Sleek Bezel Border Frame */}
      <RoundedBox args={[3.25, 2.15, 0.22]} radius={0.24} smoothness={8}>
        <meshStandardMaterial
          color="#3b0764"
          metalness={0.85}
          roughness={0.2}
          wireframe={true}
          transparent
          opacity={0.35}
        />
      </RoundedBox>

      {/* Inner Holographic Pulsing Energy Orb */}
      <Sphere ref={innerOrbRef} args={[0.55, 64, 64]} position={[0, 0, 0.05]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>

      {/* Orbital Glowing Gyro Rings */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.95, 0.018, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.015, 16, 100]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Subtle Mini Floating UI Card Surfaces */}
      <mesh position={[-0.95, 0.55, 0.16]}>
        <planeGeometry args={[0.8, 0.35]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.95, -0.55, 0.16]}>
        <planeGeometry args={[0.8, 0.35]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Hero3DDevice() {
  return (
    <div className="relative w-full max-w-xl h-80 sm:h-96 md:h-[420px] mx-auto flex items-center justify-center">
      {/* Ambient background glow matching Three.js scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-500/15 to-sky-500/20 rounded-full blur-[80px] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <pointLight position={[0, 0, 2]} intensity={2.2} color="#38bdf8" distance={6} />

        <Float speed={2.4} rotationIntensity={0.6} floatIntensity={0.8}>
          <GlassDevice />
        </Float>
      </Canvas>

      {/* Floating Center Glass Badge */}
      <div className="absolute z-20 pointer-events-auto bottom-6">
        <a
          href="#work"
          className="glass-pill px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl border border-white/30 text-white font-syne font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Interactive 3D Engine · Explore Work ↓</span>
        </a>
      </div>
    </div>
  );
}
