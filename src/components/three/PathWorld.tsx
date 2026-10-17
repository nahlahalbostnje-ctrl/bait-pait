"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const STATIONS = [
  "الاكتشاف والتحليل",
  "التصميم والنماذج",
  "التطوير والبرمجة",
  "دمج الذكاء الاصطناعي",
  "فحص الجودة والأمان",
  "الإطلاق والتدريب",
];
const COLORS = ["#8B5CF6", "#C084FC", "#EC4899", "#06B6D4", "#22D3EE", "#A78BFA"];

function helixPoint(t: number) {
  const turns = 1.65;
  const a = t * Math.PI * 2 * turns;
  return new THREE.Vector3(Math.cos(a) * 1.55, (t - 0.5) * 2.35, Math.sin(a) * 1.55);
}

function Helix() {
  const g = useRef<THREE.Group>(null);
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i += 1) pts.push(helixPoint(i / 80));
    return pts;
  }, []);
  const stations = useMemo(() => STATIONS.map((_, i) => helixPoint(i / (STATIONS.length - 1))), []);

  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.32;
  });

  return (
    <group ref={g}>
      <Line points={curve} color="#C084FC" lineWidth={2.2} />
      {stations.map((p, i) => (
        <group key={STATIONS[i]} position={p}>
          <mesh>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color={COLORS[i]} emissive={COLORS[i]} emissiveIntensity={1.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function PathWorld() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%", background: "#0A0612" }}
    >
      <color attach="background" args={["#0A0612"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#8B5CF6" />
      <pointLight position={[-3, -1, 2]} intensity={18} color="#06B6D4" />
      <Sparkles count={50} scale={7} size={2} speed={0.4} color="#E9D5FF" />
      <Helix />
    </Canvas>
  );
}
