"use client";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PLANE_POINTS, PLANE_VIEWBOX } from "@/components/brand/plane-path";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { useResolvedTheme } from "@/lib/use-theme";

const smooth = (a: number, b: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

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

  useFrame((state) => {
    const m = ref.current;
    if (!m || reduced) return;
    // bank back and forth rather than spin, so the thin mark never goes edge-on
    m.rotation.y = -0.45 + Math.sin(state.clock.elapsedTime * 0.35) * 0.45;
    // gentle tilt toward the pointer
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0.35 + state.pointer.y * 0.15, 0.04);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -0.25 + state.pointer.x * 0.1, 0.04);
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[0.35, -0.5, -0.25]}>
      {/* Dark chrome on the dark theme; sage chrome on light, deep enough to hold its shape on a pale page. */}
      <meshPhysicalMaterial
        color={light ? "#b7c4b3" : "#151d14"}
        metalness={light ? 0.9 : 0.85}
        roughness={light ? 0.28 : 0.38}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={0.7}
        iridescenceIOR={1.4}
        envMapIntensity={light ? 1.2 : 2.2}
      />
    </mesh>
  );
}

/**
 * Moves the plane with the page: it waits above the headline, then climbs out
 * along its nose (up and to the left) as you scroll.
 */
function FlightRig({ progress, reduced, children }: { progress?: MotionValue<number>; reduced: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const mobile = size.width < 768;
    const base = mobile ? Math.min((viewport.width * 0.38) / 2.3, 0.75) : Math.min((viewport.width * 0.23) / 2.3, 1.0);
    // parked centred above the headline
    const home = mobile ? { x: 0.04 * viewport.width, y: 0.37 * viewport.height } : { x: 0.02 * viewport.width, y: 0.29 * viewport.height };

    const p = reduced ? 0 : (progress?.get() ?? 0);
    const roll = smooth(0.02, 0.16, p); // rotate onto the climb heading
    const climb = smooth(0.05, 0.4, p); // then leave along the nose, before the statement arrives
    const e = climb * climb;

    const tx = home.x - e * viewport.width * 0.5;
    const ty = home.y + e * viewport.height * 0.9;
    // ease toward the target so wheel steps feel like flight, not jumps
    g.position.x = THREE.MathUtils.lerp(g.position.x, tx, 0.12);
    g.position.y = THREE.MathUtils.lerp(g.position.y, ty, 0.12);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.32 * roll, 0.1);
    g.scale.setScalar(base * (1 - 0.3 * climb));
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroPlaneScene({ progress }: { progress?: MotionValue<number> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotionSafe();
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
        // the canvas sits under the page content, so listen for the pointer on the document
        eventSource={document.body}
        eventPrefix="client"
      >
        <FlightRig progress={progress} reduced={reduced}>
          <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
            <PlaneMesh reduced={reduced} light={light} />
          </Float>
        </FlightRig>
        <Environment resolution={256}>
          <color attach="background" args={[light ? "#5f6a5c" : "#050805"]} />
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
