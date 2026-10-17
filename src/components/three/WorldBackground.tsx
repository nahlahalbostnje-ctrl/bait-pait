"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function glassMat(color: string, extra?: THREE.MeshPhysicalMaterialParameters) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.12,
    roughness: 0.06,
    transmission: 0.78,
    thickness: 1.35,
    ior: 1.46,
    iridescence: 1,
    iridescenceIOR: 1.28,
    iridescenceThicknessRange: [140, 420],
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 0.92,
    ...extra,
  });
}

function LuxuryField() {
  const rig = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const mats = useMemo(
    () => ({
      violet: glassMat("#9B7DFF"),
      cyan: glassMat("#67E8F9", { transmission: 0.72 }),
      rose: glassMat("#F0ABFC", { transmission: 0.7 }),
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.22, 0.035);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -state.pointer.y * 0.1, 0.035);
      rig.current.position.y = Math.sin(t * 0.18) * 0.1;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.08;
    if (ringB.current) ringB.current.rotation.x = t * 0.06;
  });

  return (
    <group ref={rig}>
      <group position={[-3.35, 1.15, -5.2]}>
        <mesh material={mats.violet}>
          <sphereGeometry args={[1.85, 48, 48]} />
        </mesh>
        <pointLight intensity={22} color="#C4B5FD" distance={9} />
      </group>
      <group position={[4.15, -1.05, -5.8]}>
        <mesh material={mats.cyan}>
          <sphereGeometry args={[1.35, 48, 48]} />
        </mesh>
        <pointLight intensity={18} color="#67E8F9" distance={8} />
      </group>
      <group position={[0.15, 2.15, -6.8]}>
        <mesh material={mats.rose}>
          <sphereGeometry args={[0.82, 32, 32]} />
        </mesh>
        <pointLight intensity={12} color="#F0ABFC" distance={6} />
      </group>
      <mesh position={[2.7, 1.55, -5.4]} rotation={[0.6, 0.3, 0.2]} material={mats.violet}>
        <octahedronGeometry args={[0.42, 0]} />
      </mesh>
      <mesh position={[-2.1, -1.7, -5.6]} rotation={[0.2, 0.8, 0]} material={mats.cyan}>
        <octahedronGeometry args={[0.32, 0]} />
      </mesh>
      <mesh ref={ringA} position={[-0.2, 0.15, -6.4]} rotation={[Math.PI / 2.6, 0.35, 0]}>
        <torusGeometry args={[3.15, 0.02, 12, 160]} />
        <meshBasicMaterial color="#C4B5FD" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ringB} position={[1.05, -0.25, -7]} rotation={[0.9, -0.4, 0.2]}>
        <torusGeometry args={[2.15, 0.014, 12, 140]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.38} />
      </mesh>
      <Sparkles count={110} scale={[16, 10, 8]} size={2.6} speed={0.24} color="#E9D5FF" opacity={0.85} />
    </group>
  );
}

export function WorldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <color attach="background" args={["#07040f"]} />
        <fog attach="fog" args={["#07040f", 11, 26]} />
        <ambientLight intensity={0.28} />
        <pointLight position={[-6, 4, 4]} intensity={48} color="#8B5CF6" distance={24} />
        <pointLight position={[6, -2, 5]} intensity={36} color="#06B6D4" distance={22} />
        <pointLight position={[0, 6, 2]} intensity={22} color="#F5D0FE" distance={20} />
        <spotLight position={[0, 8, 6]} angle={0.55} intensity={30} color="#C084FC" penumbra={0.9} />
        <LuxuryField />
      </Canvas>
    </div>
  );
}
