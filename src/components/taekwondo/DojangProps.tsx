import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

/** Procedural 3D props for the "Dojang y etiqueta" terms, placed next to the mannequin. */
const FLOOR = -1.7;
const WHITE = "#f4f1ea";
const DARK = "#141416";
const RED = "#c81e1e";
const BLUE = "#1d4ed8";
const WOOD = "#b4824e";

function Spin({
  children,
  speed = 0.5,
  y = 0,
}: {
  children: React.ReactNode;
  speed?: number;
  y?: number;
}) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (g.current) {
      g.current.rotation.y = clock.elapsedTime * speed;
      g.current.position.y = y + Math.sin(clock.elapsedTime * 1.6) * 0.06;
    }
  });
  return <group ref={g}>{children}</group>;
}

function Box({
  args,
  position,
  color,
  rotation,
}: {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number] | undefined;
}) {
  return (
    <mesh
      position={position}
      rotation={rotation ?? [0, 0, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}

function Dobok() {
  return (
    <group scale={0.85}>
      <Box args={[0.9, 1, 0.38]} position={[0, 0.5, 0]} color={WHITE} />
      <mesh position={[-0.62, 0.78, 0]} rotation={[0, 0, 1.1]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.6, 10]} />
        <meshStandardMaterial color={WHITE} roughness={0.8} />
      </mesh>
      <mesh position={[0.62, 0.78, 0]} rotation={[0, 0, -1.1]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.6, 10]} />
        <meshStandardMaterial color={WHITE} roughness={0.8} />
      </mesh>
      <Box
        args={[0.07, 0.6, 0.02]}
        position={[-0.13, 0.72, 0.2]}
        rotation={[0, 0, -0.45]}
        color={DARK}
      />
      <Box
        args={[0.07, 0.6, 0.02]}
        position={[0.13, 0.72, 0.2]}
        rotation={[0, 0, 0.45]}
        color={DARK}
      />
      <Box args={[0.94, 0.1, 0.42]} position={[0, 0.08, 0]} color={DARK} />
      <Box
        args={[0.36, 0.9, 0.34]}
        position={[-0.22, -0.45, 0]}
        color={WHITE}
      />
      <Box args={[0.36, 0.9, 0.34]} position={[0.22, -0.45, 0]} color={WHITE} />
    </group>
  );
}

function Belt({ color = DARK }: { color?: string }) {
  return (
    <group>
      <mesh rotation-x={Math.PI / 2} castShadow>
        <torusGeometry args={[0.42, 0.06, 10, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.43]} castShadow>
        <sphereGeometry args={[0.1, 12, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <Box
        args={[0.1, 0.5, 0.04]}
        position={[-0.1, -0.28, 0.46]}
        rotation={[0, 0, 0.25]}
        color={color}
      />
      <Box
        args={[0.1, 0.5, 0.04]}
        position={[0.1, -0.28, 0.46]}
        rotation={[0, 0, -0.25]}
        color={color}
      />
    </group>
  );
}

function Dojang() {
  const tiles = [];
  for (let x = -1; x <= 1; x++)
    for (let z = -1; z <= 1; z++)
      tiles.push(
        <Box
          key={`${x}${z}`}
          args={[0.58, 0.05, 0.58]}
          position={[x * 0.6, 0.025, z * 0.6]}
          color={(x + z) % 2 === 0 ? RED : BLUE}
        />,
      );
  return (
    <group>
      {tiles}
      <Box args={[1.9, 1.3, 0.06]} position={[0, 0.7, -0.95]} color={WHITE} />
      <Box
        args={[0.6, 0.4, 0.02]}
        position={[-0.45, 0.9, -0.91]}
        color={"#fafafa"}
      />
      <mesh position={[-0.45, 0.9, -0.895]}>
        <circleGeometry args={[0.1, 20]} />
        <meshStandardMaterial color={RED} />
      </mesh>
      <Box
        args={[0.6, 0.4, 0.02]}
        position={[0.45, 0.9, -0.91]}
        color={"#fafafa"}
      />
      <mesh position={[0.45, 0.9, -0.895]}>
        <circleGeometry args={[0.1, 20]} />
        <meshStandardMaterial color={BLUE} />
      </mesh>
    </group>
  );
}

function Plaque({ dan, gold }: { dan: number; gold?: boolean }) {
  return (
    <group>
      <Box args={[0.7, 0.8, 0.5]} position={[0, 0.4, 0]} color={WOOD} />
      <Box
        args={[0.8, 0.06, 0.6]}
        position={[0, 0.83, 0]}
        color={gold ? "#d4a017" : DARK}
      />
      {Array.from({ length: dan }, (_, i) => (
        <Box
          key={i}
          args={[0.08, 0.3, 0.02]}
          position={[-0.24 + i * 0.16, 0.45, 0.26]}
          color={gold ? "#d4a017" : "#e5c46b"}
        />
      ))}
      <Spin speed={0.7} y={1.25}>
        <group scale={0.6}>
          <Belt />
        </group>
      </Spin>
    </group>
  );
}

function PoomsaeLines() {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (g.current)
      g.current.children.forEach((c, i) => {
        const m = (c as Mesh).material as unknown as {
          emissiveIntensity: number;
        };
        m.emissiveIntensity =
          0.2 + 0.8 * Math.max(0, Math.sin(clock.elapsedTime * 2 - i * 0.7));
      });
  });
  const seg: [number, number, number, number, number, number][] = [
    [0, 0, 0.1, 1.6, 0, 0],
    [0, -0.6, 1.4, 0.1, 0, 0],
    [0, 0.1, 1.4, 0.1, 0, 0],
    [0, 0.7, 1.4, 0.1, 0, 0],
  ];
  return (
    <group ref={g}>
      {seg.map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, 0.03, z]} receiveShadow>
          <boxGeometry args={[w, 0.03, d]} />
          <meshStandardMaterial
            color={RED}
            emissive={RED}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Hogu() {
  return (
    <Spin speed={0.6} y={0.6}>
      <group>
        <mesh scale={[1, 1.2, 0.55]} castShadow>
          <sphereGeometry args={[0.42, 20, 14]} />
          <meshStandardMaterial color={BLUE} roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.05, 0.24]}>
          <circleGeometry args={[0.16, 24]} />
          <meshStandardMaterial color={WHITE} />
        </mesh>
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry
            args={[0.26, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.62]}
          />
          <meshStandardMaterial color={RED} roughness={0.45} />
        </mesh>
      </group>
    </Spin>
  );
}

function Kyokpa() {
  const l = useRef<Group>(null);
  const r = useRef<Group>(null);
  useFrame(({ clock }) => {
    const p = (clock.elapsedTime % 3.6) / 3.6;
    const s = p > 0.45 && p < 0.85 ? Math.min(1, (p - 0.45) * 8) : 0;
    if (l.current && r.current) {
      l.current.rotation.z = s * 0.5;
      r.current.rotation.z = -s * 0.5;
      l.current.position.y = r.current.position.y = 0.62 - s * 0.12;
    }
  });
  return (
    <group>
      <Box
        args={[0.25, 0.55, 0.4]}
        position={[-0.45, 0.27, 0]}
        color={"#9ca3af"}
      />
      <Box
        args={[0.25, 0.55, 0.4]}
        position={[0.45, 0.27, 0]}
        color={"#9ca3af"}
      />
      <group ref={l} position={[-0.01, 0.62, 0]}>
        <Box args={[0.6, 0.07, 0.45]} position={[-0.3, 0, 0]} color={WOOD} />
      </group>
      <group ref={r} position={[0.01, 0.62, 0]}>
        <Box args={[0.6, 0.07, 0.45]} position={[0.3, 0, 0]} color={WOOD} />
      </group>
    </group>
  );
}

function Thanks() {
  return (
    <Spin speed={0.4} y={0.9}>
      <group>
        <mesh castShadow>
          <torusKnotGeometry args={[0.22, 0.07, 64, 10]} />
          <meshStandardMaterial color={RED} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.58, 0]} rotation-x={Math.PI / 2}>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshStandardMaterial
            color={WHITE}
            emissive={RED}
            emissiveIntensity={0.35}
            side={2}
          />
        </mesh>
      </group>
    </Spin>
  );
}

const PROPS: Record<string, () => React.ReactNode> = {
  dojang: () => <Dojang />,
  dobok: () => (
    <Spin speed={0.5} y={0.75}>
      <Dobok />
    </Spin>
  ),
  ti: () => (
    <Spin speed={0.8} y={0.8}>
      <Belt />
    </Spin>
  ),
  sabeomnim: () => <Plaque dan={4} />,
  kwanjangnim: () => <Plaque dan={5} gold />,
  poomsae: () => <PoomsaeLines />,
  kyorugi: () => <Hogu />,
  kyokpa: () => <Kyokpa />,
  kamsahamnida: () => <Thanks />,
};

export const hasDojangProp = (id: string) => id in PROPS;

export function DojangProp({ technique }: { technique: string }) {
  const render = PROPS[technique];
  if (!render) return null;
  return (
    <group position={[-2.1, FLOOR, -0.9]} scale={1.45}>
      {render()}
    </group>
  );
}
