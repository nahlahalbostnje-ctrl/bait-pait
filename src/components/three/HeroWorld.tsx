"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { makeAiScreen, makeCodePanel, makeHoloScreen } from "./screenTextures";

function MouseRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.16, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.07, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

function glowTex() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("ctx");
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  g.addColorStop(0, "rgba(233,213,255,0.95)");
  g.addColorStop(0.25, "rgba(168,85,247,0.55)");
  g.addColorStop(0.55, "rgba(6,182,212,0.18)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function PointCloud() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 520;
    const arr = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i += 1) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r * 0.82;
      arr[i * 3 + 1] = y * 0.82;
      arr[i * 3 + 2] = Math.sin(theta) * r * 0.82;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.18;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.038}
        color="#E9D5FF"
        transparent
        opacity={0.95}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HoloCore() {
  const rings = useRef<THREE.Group>(null);
  const sprite = useMemo(() => glowTex(), []);

  useFrame((s) => {
    if (!rings.current) return;
    rings.current.rotation.y = s.clock.elapsedTime * 0.25;
    rings.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <group position={[0, 0.92, 0]}>
      <sprite scale={[2.15, 2.15, 1]}>
        <spriteMaterial map={sprite} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.58, 64, 64]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#06B6D4"
          emissiveIntensity={2.2}
          roughness={0.12}
          metalness={0.55}
          distort={0.28}
          speed={1.8}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshStandardMaterial
          color="#C084FC"
          emissive="#8B5CF6"
          emissiveIntensity={1.6}
          roughness={0.08}
          metalness={0.7}
          transparent
          opacity={0.28}
        />
      </mesh>
      <PointCloud />
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.08, 0.1, 0]}>
          <torusGeometry args={[1.08, 0.01, 12, 160]} />
          <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={3.2} />
        </mesh>
        <mesh rotation={[0.62, 0.85, 0.12]}>
          <torusGeometry args={[1.32, 0.008, 12, 160]} />
          <meshStandardMaterial color="#E0F2FE" emissive="#06B6D4" emissiveIntensity={2.6} />
        </mesh>
      </group>
    </group>
  );
}

function GlassDashboard({ map }: { map: THREE.Texture }) {
  return (
    <Float speed={0.9} floatIntensity={0.18} rotationIntensity={0.04}>
      <group position={[0.55, -0.42, 1.05]} rotation={[-0.62, 0.78, 0.18]}>
        <RoundedBox args={[2.55, 1.55, 0.08]} radius={0.07} smoothness={8}>
          <meshPhysicalMaterial
            color="#dbeafe"
            metalness={0.08}
            roughness={0.05}
            transparent
            opacity={0.22}
            clearcoat={1}
            clearcoatRoughness={0.03}
            reflectivity={1}
            iridescence={1}
            iridescenceIOR={1.25}
            ior={1.48}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[2.28, 1.32]} />
          <meshBasicMaterial map={map} toneMapped={false} transparent opacity={0.78} />
        </mesh>
        <mesh position={[0, 0, 0.054]}>
          <planeGeometry args={[2.32, 1.36]} />
          <meshBasicMaterial color="#e0f2fe" transparent opacity={0.12} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingPanels({ code, holo }: { code: THREE.Texture; holo: THREE.Texture }) {
  return (
    <>
      <Float speed={1.35} floatIntensity={0.32} rotationIntensity={0.08}>
        <group position={[-1.75, 0.62, 0.55]} rotation={[-0.28, 0.72, -0.12]}>
          <RoundedBox args={[1.18, 0.74, 0.04]} radius={0.045}>
            <meshPhysicalMaterial
              color="#e0e7ff"
              transparent
              opacity={0.2}
              metalness={0.1}
              roughness={0.06}
              clearcoat={1}
              iridescence={0.8}
              ior={1.45}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.06, 0.62]} />
            <meshBasicMaterial map={code} transparent opacity={0.88} toneMapped={false} />
          </mesh>
        </group>
      </Float>
      <Float speed={1.1} floatIntensity={0.26} rotationIntensity={0.07}>
        <group position={[1.7, 1.22, 0.05]} rotation={[-0.22, -0.68, 0.14]}>
          <RoundedBox args={[1.08, 0.6, 0.04]} radius={0.045}>
            <meshPhysicalMaterial
              color="#e0e7ff"
              transparent
              opacity={0.2}
              metalness={0.1}
              roughness={0.06}
              clearcoat={1}
              iridescence={0.8}
              ior={1.45}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.96, 0.5]} />
            <meshBasicMaterial map={holo} transparent opacity={0.86} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

function Crystals() {
  const gems: [number, number, number, string, number][] = [
    [-1.55, 1.55, 0.8, "#67e8f9", 0.09],
    [1.35, 0.15, 0.95, "#c4b5fd", 0.11],
    [-0.35, 1.85, -0.7, "#f472b6", 0.08],
    [0.95, 1.65, 0.55, "#22d3ee", 0.07],
    [-1.9, -0.05, -0.55, "#a78bfa", 0.1],
  ];
  return (
    <>
      {gems.map(([x, y, z, color, s], i) => (
        <Float key={i} speed={1.2 + i * 0.15} floatIntensity={0.45} rotationIntensity={0.8}>
          <mesh position={[x, y, z]}>
            {i % 2 ? <octahedronGeometry args={[s, 0]} /> : <dodecahedronGeometry args={[s, 0]} />}
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2.4}
              roughness={0.12}
              metalness={0.85}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function HeroWorld() {
  const dash = useMemo(() => makeAiScreen(), []);
  const code = useMemo(() => makeCodePanel(), []);
  const holo = useMemo(() => makeHoloScreen(), []);

  return (
    <Canvas
      camera={{ position: [3.45, 2.2, 5.15], fov: 34 }}
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.12} />
      <pointLight position={[-2.15, 2.55, 2.8]} intensity={90} color="#8B5CF6" distance={14} />
      <pointLight position={[2.45, 2.1, 2.5]} intensity={90} color="#06B6D4" distance={14} />
      <pointLight position={[0, 3.2, -1.2]} intensity={28} color="#C084FC" />
      <spotLight position={[3, 6, 4]} angle={0.42} intensity={40} color="#8B5CF6" penumbra={0.8} />
      <MouseRig>
        <HoloCore />
        <GlassDashboard map={dash} />
        <FloatingPanels code={code} holo={holo} />
        <Crystals />
      </MouseRig>
    </Canvas>
  );
}
