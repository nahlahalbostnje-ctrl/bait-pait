"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Drift() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.y = s.clock.elapsedTime * 0.04;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.12) * 0.08;
  });
  const gems: [number, number, number, string, number][] = [
    [-6.2, 2.6, -7, "#7C3AED", 0.22],
    [7.1, -2.1, -8, "#06B6D4", 0.18],
    [-4.4, -3.2, -7.5, "#EC4899", 0.16],
    [5.2, 3.4, -9, "#C084FC", 0.2],
    [1.2, 2.1, -10, "#8B5CF6", 0.24],
  ];
  return (
    <group ref={g}>
      {gems.map(([x, y, z, color, s], i) => (
        <mesh key={i} position={[x, y, z]}>
          <dodecahedronGeometry args={[s, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.2} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.8, 0.4, 0]} position={[3, 0, -5]}>
        <torusGeometry args={[2.4, 0.015, 8, 80]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export function WorldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.4]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 4, 4]} intensity={18} color="#8B5CF6" />
        <Sparkles count={140} scale={[16, 10, 8]} size={1.8} speed={0.28} color="#C4B5FD" />
        <Drift />
      </Canvas>
    </div>
  );
}
