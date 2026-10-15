"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { makeAiScreen, makeAppScreen, makeCodeScreen, makeHoloScreen } from "./screenTextures";

const shell = {
  metalness: 1,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  reflectivity: 1,
};

function Keyboard() {
  const keys = useMemo(() => {
    const list: [number, number][] = [];
      for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 11; c += 1) list.push([c, r]);
    }
    return list;
  }, []);
  return (
    <group position={[-0.91, 0.05, -0.38]}>
      {keys.map(([c, r]) => (
        <mesh key={`${c}-${r}`} position={[c * 0.132, 0, r * 0.13]}>
          <boxGeometry args={[0.11, 0.018, 0.1]} />
          <meshPhysicalMaterial color="#2a1744" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Laptop({ map }: { map: THREE.Texture }) {
  return (
    <group position={[0.2, -0.72, 0.45]} rotation={[-0.48, 0.38, 0.06]}>
      <RoundedBox args={[2.42, 0.05, 1.55]} radius={0.035} smoothness={6}>
        <meshPhysicalMaterial color="#0d0814" {...shell} />
      </RoundedBox>
      <Keyboard />
      <RoundedBox args={[0.72, 0.01, 0.42]} radius={0.02} position={[0, 0.04, 0.42]}>
        <meshPhysicalMaterial color="#1a1028" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <group position={[0, 0.86, -0.72]} rotation={[0.12, 0, 0]}>
        <RoundedBox args={[2.38, 1.48, 0.05]} radius={0.035} smoothness={6}>
          <meshPhysicalMaterial color="#0a0610" {...shell} />
        </RoundedBox>
        <mesh position={[0, 0.01, 0.03]}>
          <planeGeometry args={[2.18, 1.3]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.01, 0.028]}>
          <planeGeometry args={[2.22, 1.34]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.07} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Phone({ map }: { map: THREE.Texture }) {
  return (
    <Float speed={1.6} floatIntensity={0.45} rotationIntensity={0.12}>
      <group position={[-2.05, 0.05, 1.05]} rotation={[0.18, 0.62, -0.12]}>
        <RoundedBox args={[0.58, 1.18, 0.06]} radius={0.09} smoothness={8}>
          <meshPhysicalMaterial color="#050308" {...shell} />
        </RoundedBox>
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[0.5, 1.06]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.5, 0.036]}>
          <boxGeometry args={[0.16, 0.035, 0.01]} />
          <meshPhysicalMaterial color="#111" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function Tablet({ map }: { map: THREE.Texture }) {
  return (
    <Float speed={1.25} floatIntensity={0.32} rotationIntensity={0.1}>
      <group position={[2.15, 0.62, -0.2]} rotation={[0.28, -0.62, 0.16]}>
        <RoundedBox args={[1.55, 1.02, 0.05]} radius={0.05} smoothness={7}>
          <meshPhysicalMaterial color="#0b0712" {...shell} />
        </RoundedBox>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.42, 0.9]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function ServerRack({ holo }: { holo: THREE.Texture }) {
  return (
    <Float speed={0.9} floatIntensity={0.18}>
      <group position={[-2.05, -0.45, -0.75]} rotation={[0.08, 0.5, 0]}>
        {[0, 0.2, 0.4, 0.6].map((y, i) => (
          <RoundedBox key={i} args={[1.05, 0.16, 0.62]} radius={0.025} position={[0, y, 0]}>
            <meshPhysicalMaterial
              color={i % 2 ? "#3b0764" : "#160b24"}
              metalness={0.92}
              roughness={0.18}
              emissive="#6d28d9"
              emissiveIntensity={i === 2 ? 0.45 : 0.12}
            />
          </RoundedBox>
        ))}
        {[0, 0.2, 0.4, 0.6].map((y, i) => (
          <mesh key={`led-${i}`} position={[0.42, y, 0.32]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color={i === 3 ? "#22d3ee" : "#34d399"}
              emissive={i === 3 ? "#22d3ee" : "#34d399"}
              emissiveIntensity={4}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.22, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.4} />
        </mesh>
        <mesh position={[0, 1.18, 0.05]} rotation={[-0.18, 0, 0]}>
          <planeGeometry args={[1.42, 0.68]} />
          <meshBasicMaterial map={holo} transparent opacity={0.92} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function AiCore() {
  const ring = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ring.current) {
      ring.current.rotation.y = s.clock.elapsedTime * 0.45;
      ring.current.rotation.z = s.clock.elapsedTime * 0.18;
    }
  });
  return (
    <group position={[0.12, 1.12, -0.2]}>
      <mesh>
        <icosahedronGeometry args={[0.52, 24]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          roughness={0.08}
          metalness={0.45}
          distort={0.42}
          speed={2.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.26, 48, 48]} />
        <meshPhysicalMaterial
          color="#ec4899"
          emissive="#f472b6"
          emissiveIntensity={2.8}
          transmission={0.55}
          thickness={0.6}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.07} />
      </mesh>
      <Sparkles count={28} scale={2.2} size={2} speed={0.6} color="#E9D5FF" />
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2.15, 0.15, 0]}>
          <torusGeometry args={[0.86, 0.012, 16, 120]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={3} />
        </mesh>
        <mesh rotation={[0.55, 0.9, 0.2]}>
          <torusGeometry args={[1.08, 0.008, 16, 120]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2.2} />
        </mesh>
        <mesh rotation={[1.2, -0.4, 0.5]}>
          <torusGeometry args={[1.28, 0.006, 12, 100]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1.8} />
        </mesh>
      </group>
    </group>
  );
}

function NeuralLinks() {
  const pts = useMemo(
    () => [
      [new THREE.Vector3(0.12, 1.12, -0.2), new THREE.Vector3(-2.05, 0.25, 1.05)],
      [new THREE.Vector3(0.12, 1.12, -0.2), new THREE.Vector3(2.15, 0.62, -0.2)],
      [new THREE.Vector3(0.12, 1.12, -0.2), new THREE.Vector3(0.2, 0.05, 0.3)],
      [new THREE.Vector3(0.12, 1.12, -0.2), new THREE.Vector3(-2.05, 0.15, -0.75)],
    ],
    [],
  );
  return (
    <>
      {pts.map((p, i) => (
        <Line
          key={i}
          points={p}
          color={i % 2 ? "#22D3EE" : "#E879F9"}
          lineWidth={1.6}
          transparent
          opacity={0.7}
        />
      ))}
    </>
  );
}

export function AiStudio() {
  const ai = useMemo(() => makeAiScreen(), []);
  const phone = useMemo(() => makeCodeScreen(), []);
  const tablet = useMemo(() => makeAppScreen(), []);
  const holo = useMemo(() => makeHoloScreen(), []);

  return (
    <group>
      <AiCore />
      <Laptop map={ai} />
      <Phone map={phone} />
      <Tablet map={tablet} />
      <ServerRack holo={holo} />
      <NeuralLinks />
    </group>
  );
}
