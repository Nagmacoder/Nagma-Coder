"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const C = {
  violet: "#8F7BFF",
  cobalt: "#5B7BFF",
  mint: "#7CD6BC",
  ivory: "#F1EADB",
  body: "#262a3f",
  bodyDark: "#171a29",
  edge: "#3a4060",
};

type Props = { active: boolean; reducedMotion: boolean; onReady: () => void };

/* ---------- procedural textures (generated once, no image downloads) ---------- */

function makeCanvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  if (g) draw(g);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function codeTexture() {
  return makeCanvasTexture(512, 336, (g) => {
    const grd = g.createLinearGradient(0, 0, 512, 336);
    grd.addColorStop(0, "#1a1d30");
    grd.addColorStop(1, "#0f111c");
    g.fillStyle = grd;
    g.fillRect(0, 0, 512, 336);
    // editor chrome
    g.fillStyle = "#14172a";
    g.fillRect(0, 0, 512, 28);
    [C.violet, C.cobalt, C.mint].forEach((c, i) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc(16 + i * 16, 14, 5, 0, Math.PI * 2);
      g.fill();
    });
    g.fillStyle = "rgba(241,234,219,.55)";
    g.font = "600 13px ui-monospace, monospace";
    g.fillText("nagma.exe / app / page.tsx", 72, 19);
    // gutter
    g.fillStyle = "rgba(241,234,219,.18)";
    for (let i = 0; i < 13; i++) g.fillText(String(i + 1).padStart(2, " "), 10, 54 + i * 22);
    // code lines as colored tokens
    const rows: [number, string, number][][] = [
      [[0, C.violet, 60], [68, C.ivory, 90], [166, C.mint, 70]],
      [[20, C.cobalt, 80], [108, C.ivory, 130]],
      [[20, C.violet, 50], [78, C.mint, 110], [196, C.ivory, 40]],
      [[40, C.ivory, 150], [198, C.cobalt, 70]],
      [[40, C.mint, 90], [138, C.ivory, 60]],
      [[20, C.ivory, 30]],
      [[20, C.violet, 70], [98, C.ivory, 120]],
      [[40, C.cobalt, 60], [108, C.mint, 140]],
      [[60, C.ivory, 110]],
      [[40, C.ivory, 40]],
      [[20, C.violet, 40], [68, C.mint, 90]],
      [[0, C.ivory, 20]],
    ];
    rows.forEach((row, r) => {
      row.forEach(([x, color, w]) => {
        g.globalAlpha = color === C.ivory ? 0.45 : 0.9;
        g.fillStyle = color;
        g.beginPath();
        g.roundRect(44 + x, 46 + r * 22, w, 9, 4.5);
        g.fill();
      });
    });
    g.globalAlpha = 1;
    g.fillStyle = C.mint;
    g.fillRect(44, 46 + 12 * 22, 8, 12);
  });
}

function terminalTexture(lines: string[]) {
  return makeCanvasTexture(384, 240, (g) => {
    g.fillStyle = "#121423";
    g.beginPath();
    g.roundRect(0, 0, 384, 240, 18);
    g.fill();
    g.strokeStyle = "rgba(143,123,255,.55)";
    g.lineWidth = 3;
    g.stroke();
    [C.violet, C.cobalt, C.mint].forEach((c, i) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc(24 + i * 18, 24, 6, 0, Math.PI * 2);
      g.fill();
    });
    g.font = "500 22px ui-monospace, monospace";
    lines.forEach((l, i) => {
      g.fillStyle = i === lines.length - 1 ? C.mint : "rgba(241,234,219,.8)";
      g.fillText(l, 22, 80 + i * 36);
    });
  });
}

function shadowTexture() {
  return makeCanvasTexture(256, 256, (g) => {
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, "rgba(0,0,0,.7)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
  });
}

/* ---------- objects ---------- */

function Laptop() {
  const screenTex = useMemo(() => codeTexture(), []);
  useEffect(() => () => screenTex.dispose(), [screenTex]);
  return (
    <group position={[0, -0.78, 0.15]}>
      <mesh castShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[2.1, 0.08, 1.4]} />
        <meshStandardMaterial color={C.body} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* keyboard well */}
      <mesh position={[0, 0.082, 0.05]}>
        <boxGeometry args={[1.8, 0.005, 0.7]} />
        <meshStandardMaterial color={C.bodyDark} roughness={0.8} />
      </mesh>
      <group position={[0, 0.08, -0.68]} rotation={[-0.26, 0, 0]}>
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[2.1, 1.36, 0.05]} />
          <meshStandardMaterial color={C.body} metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.68, 0.027]}>
          <planeGeometry args={[1.96, 1.24]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Orbit({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.y += dt * 0.45;
  });
  const ring = (rot: [number, number, number], color: string) => (
    <mesh rotation={rot}>
      <torusGeometry args={[0.62, 0.016, 12, 96]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
    </mesh>
  );
  return (
    <Float position={[-2.0, 0.85, -0.1]} speed={0.9} amplitude={0.08} animate={animate}>
      {/* Three ellipses at 0/60/-60 degrees in one plane, like the familiar atom mark. */}
      <group ref={ref} rotation={[0.25, 0.4, 0]}>
        <group scale={[1, 0.36, 1]}>{ring([0, 0, 0], C.violet)}</group>
        <group rotation={[0, 0, Math.PI / 3]}>
          <group scale={[1, 0.36, 1]}>{ring([0, 0, 0], C.violet)}</group>
        </group>
        <group rotation={[0, 0, -Math.PI / 3]}>
          <group scale={[1, 0.36, 1]}>{ring([0, 0, 0], C.cobalt)}</group>
        </group>
        <mesh>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial color={C.ivory} emissive={C.violet} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function ServerStack({ animate }: { animate: boolean }) {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame(({ clock }) => {
    if (!animate) return;
    leds.current.forEach((m, i) => {
      m.emissiveIntensity = 0.8 + Math.max(0, Math.sin(clock.elapsedTime * 2.2 + i * 1.7)) * 1.6;
    });
  });
  return (
    <group position={[1.95, -0.44, -0.45]} rotation={[0, -0.35, 0]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, i * 0.27, 0]}>
          <mesh>
            <boxGeometry args={[0.86, 0.22, 0.62]} />
            <meshStandardMaterial color={C.body} metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[-0.28, 0, 0.312]}>
            <boxGeometry args={[0.06, 0.06, 0.01]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) leds.current[i] = m;
              }}
              color={C.mint}
              emissive={C.mint}
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0.08, 0, 0.312]}>
            <boxGeometry args={[0.46, 0.035, 0.01]} />
            <meshStandardMaterial color={C.edge} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Database() {
  return (
    <group position={[-1.9, -0.62, 0.6]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, i * 0.23, 0]}>
          <mesh>
            <cylinderGeometry args={[0.32, 0.32, 0.17, 40]} />
            <meshStandardMaterial color="#323858" metalness={0.4} roughness={0.35} />
          </mesh>
          {/* glowing seam between disks */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.322, 0.322, 0.018, 40]} />
            <meshBasicMaterial color={C.cobalt} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TerminalWindow({
  position,
  scale,
  lines,
  animate,
  phase,
}: {
  position: [number, number, number];
  scale: number;
  lines: string[];
  animate: boolean;
  phase: number;
}) {
  const tex = useMemo(() => terminalTexture(lines), [lines]);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <Float position={position} speed={0.7} amplitude={0.06} animate={animate} phase={phase}>
      <mesh scale={scale} rotation={[0, -0.25, 0]}>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function NodeGraph() {
  const { nodes, lines } = useMemo(() => {
    const pts = [
      [-3.2, 1.4, -2.2], [-1.9, 2.05, -2.4], [-0.4, 1.7, -2.6], [1.0, 2.2, -2.4],
      [2.4, 1.6, -2.3], [3.3, 2.1, -2.6], [-1.2, 1.05, -2.5], [1.8, 0.95, -2.5],
    ].map((p) => new THREE.Vector3(...(p as [number, number, number])));
    const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [3, 7], [6, 2], [7, 4]];
    const geo = new THREE.BufferGeometry().setFromPoints(
      links.flatMap(([a, b]) => [pts[a]!, pts[b]!]),
    );
    return { nodes: pts, lines: geo };
  }, []);
  useEffect(() => () => lines.dispose(), [lines]);
  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={C.mint} transparent opacity={0.28} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={C.mint} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 70;
    const arr = new Float32Array(count * 3);
    // Deterministic pseudo-random so every render looks the same.
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + rnd() * 2.2;
      const t = rnd() * Math.PI * 2;
      const y = (rnd() - 0.35) * 3.4;
      arr.set([Math.cos(t) * r, y, Math.sin(t) * r - 1], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, dt) => {
    if (animate && ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={C.violet} size={0.035} sizeAttenuation transparent opacity={0.75} toneMapped={false} />
    </points>
  );
}

function Float({
  children,
  position,
  speed = 1,
  amplitude = 0.1,
  phase = 0,
  animate,
}: {
  children: ReactNode;
  position: [number, number, number];
  speed?: number;
  amplitude?: number;
  phase?: number;
  animate: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!animate || !ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + phase) * amplitude;
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

/* ---------- camera, pointer parallax and drag ---------- */

function Rig({ children, animate }: { children: ReactNode; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, size, gl } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, startX: 0, base: 0, yaw: 0 });

  // Frame the composition for the container's aspect ratio.
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(0, 1.25, aspect < 1 ? 10 : aspect < 1.25 ? 8.8 : 7.6);
    cam.lookAt(0, 0.38, 0);
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useEffect(() => {
    if (!animate) return;
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (drag.current.active) {
        drag.current.yaw = drag.current.base + ((e.clientX - drag.current.startX) / el.clientWidth) * 2.2;
      }
    };
    const onDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.startX = e.clientX;
      drag.current.base = drag.current.yaw;
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => (drag.current.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [animate, gl]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || !animate) return;
    const d = drag.current;
    // Released drags drift slowly back toward the designed angle.
    if (!d.active) d.yaw *= Math.pow(0.35, dt);
    d.yaw = THREE.MathUtils.clamp(d.yaw, -1.2, 1.2);
    const targetY = -0.18 + pointer.current.x * 0.18 + d.yaw;
    const targetX = pointer.current.y * 0.06;
    const k = 1 - Math.pow(0.04, dt);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  return (
    <group ref={group} rotation={[0, -0.18, 0]}>
      {children}
    </group>
  );
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    requestAnimationFrame(() => onReady());
  });
  return null;
}

export default function WorkspaceScene({ active, reducedMotion, onReady }: Props) {
  const animate = active && !reducedMotion;
  const shadow = useMemo(() => shadowTexture(), []);
  useEffect(() => () => shadow.dispose(), [shadow]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 36, near: 0.1, far: 40, position: [0, 1.35, 7.6] }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={animate ? "always" : "demand"}
      style={{ touchAction: "pan-y" }}
    >
      <FirstFrame onReady={onReady} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#c9c2ff", "#0d0e14", 0.6]} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff3e0" />
      <pointLight position={[-2.5, 1.2, 1.5]} intensity={6} distance={7} color={C.violet} />
      <pointLight position={[2.6, 0.4, 1.2]} intensity={4} distance={6} color={C.mint} />

      <Rig animate={animate}>
        {/* desk */}
        <mesh position={[0, -0.92, 0]}>
          <boxGeometry args={[5.2, 0.14, 2.7]} />
          <meshStandardMaterial color="#1e2133" metalness={0.3} roughness={0.55} />
        </mesh>
        <mesh position={[0, -0.848, 1.34]}>
          <boxGeometry args={[5.2, 0.006, 0.02]} />
          <meshBasicMaterial color={C.violet} toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[8, 5]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} />
        </mesh>

        <Laptop />
        <Orbit animate={animate} />
        <ServerStack animate={animate} />
        <Database />
        <TerminalWindow position={[1.75, 1.3, 0.1]} scale={0.8} lines={["$ npm run build", "✓ compiled", "> ship it_"]} animate={animate} phase={1.2} />
        <TerminalWindow position={[-0.55, 1.95, -1.1]} scale={0.55} lines={["$ curl /api/health", "200 OK", "> ok_"]} animate={animate} phase={2.6} />
        <NodeGraph />
        <Particles animate={animate} />
      </Rig>
    </Canvas>
  );
}
