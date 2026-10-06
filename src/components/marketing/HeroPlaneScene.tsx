"use client";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PLANE_POINTS, PLANE_VIEWBOX } from "@/components/brand/plane-path";
import { useResolvedTheme } from "@/lib/use-theme";

function PlaneMesh({ reduced, light }: { reduced: boolean; light: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const [cx, cy] = [PLANE_VIEWBOX.width / 2, PLANE_VIEWBOX.height / 2];
    PLANE_POINTS.forEach(([x, y], i) => {
      const px = x - cx;
      const py = -(y - cy); // SVG y-down → three y-up
      if (i === 0) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    });
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 30,
      bevelEnabled: true,
      bevelThickness: 14,
      bevelSize: 9,
      bevelSegments: 18,
      curveSegments: 24,
    });
    geo.center();
    geo.scale(0.01, 0.01, 0.01); // ≈2.3 world units wide
    return geo;
  }, []);

  // Fit the mark to ~55% of the visible width, capped so it never dwarfs the headline.
  const { viewport } = useThree();
  const scale = Math.min((viewport.width * 0.55) / 2.3, 1.55);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    m.scale.setScalar(scale);
    if (reduced) return;
    // bank back and forth rather than spin, so the thin mark never goes edge-on
    m.rotation.y = -0.45 + Math.sin(state.clock.elapsedTime * 0.35) * 0.5;
    // gentle tilt toward the pointer
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0.35 + state.pointer.y * 0.15, 0.04);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -0.25 + state.pointer.x * 0.1, 0.04);
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[0.35, -0.5, -0.25]}>
      {/* Dark chrome on the dark theme; pale silver-green chrome on light so it never blocks the headline. */}
      <meshPhysicalMaterial
        color={light ? "#e4ece0" : "#151d14"}
        metalness={light ? 0.55 : 0.85}
        roughness={light ? 0.3 : 0.38}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={0.7}
        iridescenceIOR={1.4}
        envMapIntensity={light ? 1.1 : 2.2}
      />
    </mesh>
  );
}

export default function HeroPlaneScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion() ?? false;
  const light = useResolvedTheme() === "light";

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        frameloop={visible && !reduced ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
      >
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
          <PlaneMesh reduced={reduced} light={light} />
        </Float>
        <Environment resolution={256}>
          <color attach="background" args={[light ? "#eef3ea" : "#050805"]} />
          <Lightformer form="rect" intensity={5} color="#e5ffbb" position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
          <Lightformer form="rect" intensity={4} color="#87da81" position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={3} color="#ffffff" position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer form="circle" intensity={1.6} color="#87da81" position={[-4, 3, 7]} scale={7} />
          <Lightformer form="circle" intensity={1.1} color="#e5ffbb" position={[4, -3, 7]} scale={5} />
          <Lightformer form="rect" intensity={4} color="#ffffff" position={[1, 1, 7]} rotation-z={-0.6} scale={[9, 0.35, 1]} />
          <Lightformer form="ring" intensity={2} color="#b8f5d6" position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={5} />
        </Environment>
      </Canvas>
    </div>
  );
}
