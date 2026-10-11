import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import yinYangImage from "@/assets/equilibrio-yinyang.png";
import {
  createBoardGeometry,
  createBoardTexture,
  createDustTexture,
  seededValue,
} from "./breakingBoardTextures";

function Board({ brokenAt }: { brokenAt: number | null }) {
  const board = useRef<THREE.Group>(null);
  const leftPiece = useRef<THREE.Group>(null);
  const rightPiece = useRef<THREE.Group>(null);
  const splinterRefs = useRef<Array<THREE.Mesh | null>>([]);
  const dustRef = useRef<THREE.Points>(null);
  const woodEmblem = useTexture(yinYangImage);
  const { viewport } = useThree();
  const boardWidth = viewport.width * 0.84;
  const boardHeight = viewport.height * 0.84;
  const texture = useMemo(
    () =>
      createBoardTexture(
        woodEmblem.image as HTMLImageElement,
        boardWidth,
        boardHeight,
      ),
    [boardHeight, boardWidth, woodEmblem],
  );
  const materials = useMemo(
    () => ({
      face: new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.62,
        metalness: 0,
      }),
      edge: new THREE.MeshStandardMaterial({
        color: "#59351f",
        roughness: 0.86,
      }),
    }),
    [texture],
  );
  const leftGeometry = useMemo(
    () => createBoardGeometry("left", boardWidth, boardHeight),
    [boardHeight, boardWidth],
  );
  const rightGeometry = useMemo(
    () => createBoardGeometry("right", boardWidth, boardHeight),
    [boardHeight, boardWidth],
  );
  const splinterGeometry = useMemo(
    () => new THREE.TetrahedronGeometry(1, 0),
    [],
  );

  const splinterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#794523",
        roughness: 0.92,
        flatShading: true,
      }),
    [],
  );
  const splinters = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const verticalPosition =
          (seededValue(index, 1) - 0.5) * boardHeight * 0.92;

        return {
          side,
          x: (seededValue(index, 2) - 0.5) * 0.16,
          y: verticalPosition,
          z: 0.38 + seededValue(index, 3) * 0.16,
          velocityX: side * (0.75 + seededValue(index, 4) * 2.3),
          velocityY: 0.7 + seededValue(index, 5) * 2.5,
          velocityZ: 0.2 + seededValue(index, 6) * 1.2,
          rotationX: (seededValue(index, 7) - 0.5) * 13,
          rotationY: (seededValue(index, 8) - 0.5) * 13,
          rotationZ: (seededValue(index, 9) - 0.5) * 13,
          scale: 0.035 + seededValue(index, 10) * 0.09,
        };
      }),
    [boardHeight],
  );
  const dustTexture = useMemo(() => createDustTexture(), []);
  const dustMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#e9c59a",
        map: dustTexture,
        size: 0.11,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    [dustTexture],
  );
  const dustPositions = useMemo(() => {
    const positions = new Float32Array(170 * 3);

    for (let index = 0; index < 170; index += 1) {
      positions[index * 3] = (seededValue(index, 11) - 0.5) * 0.18;
      positions[index * 3 + 1] = (seededValue(index, 12) - 0.5) * boardHeight;
      positions[index * 3 + 2] = 0.4 + seededValue(index, 13) * 0.3;
    }

    return positions;
  }, [boardHeight]);
  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );
    return geometry;
  }, [dustPositions]);
  const dustVelocity = useMemo(
    () =>
      Array.from({ length: 170 }, (_, index) => ({
        x: (seededValue(index, 14) - 0.5) * 1.25,
        y: (seededValue(index, 15) - 0.12) * 1.3,
        z: 0.3 + seededValue(index, 16) * 1.3,
      })),
    [],
  );
  const disposableResources = useMemo(
    () => [
      texture,
      materials.face,
      materials.edge,
      leftGeometry,
      rightGeometry,
      splinterGeometry,
      splinterMaterial,
      dustGeometry,
      dustMaterial,
      dustTexture,
    ],
    [
      dustGeometry,
      dustMaterial,
      dustTexture,
      leftGeometry,
      materials,
      rightGeometry,
      splinterGeometry,
      splinterMaterial,
      texture,
    ],
  );
  const pendingDisposals = useRef<
    Array<{ resources: typeof disposableResources; timer: number }>
  >([]);

  useEffect(() => {
    pendingDisposals.current = pendingDisposals.current.filter((pending) => {
      if (pending.resources !== disposableResources) return true;
      window.clearTimeout(pending.timer);
      return false;
    });

    return () => {
      const pending = {
        resources: disposableResources,
        timer: 0,
      };
      pending.timer = window.setTimeout(() => {
        pending.resources.forEach((resource) => resource.dispose());
        pendingDisposals.current = pendingDisposals.current.filter(
          (entry) => entry !== pending,
        );
      }, 0);
      pendingDisposals.current.push(pending);
    };
  }, [disposableResources]);

  useFrame(({ clock, pointer }, delta) => {
    if (!board.current) return;

    board.current.position.x = THREE.MathUtils.damp(
      board.current.position.x,
      brokenAt === null ? pointer.x * 0.16 : 0,
      2.4,
      delta,
    );
    board.current.position.y = THREE.MathUtils.damp(
      board.current.position.y,
      brokenAt === null ? pointer.y * 0.12 : 0,
      2.4,
      delta,
    );
    board.current.rotation.x = THREE.MathUtils.damp(
      board.current.rotation.x,
      brokenAt === null ? -pointer.y * 0.085 : 0,
      2.4,
      delta,
    );
    board.current.rotation.y = THREE.MathUtils.damp(
      board.current.rotation.y,
      brokenAt === null ? pointer.x * 0.11 : 0,
      2.4,
      delta,
    );

    const entrance = Math.min(clock.elapsedTime / 0.9, 1);
    const entranceEase = 1 - (1 - entrance) ** 4;
    if (brokenAt === null) {
      board.current.scale.setScalar(0.965 + entranceEase * 0.035);
      return;
    }

    const elapsed = Math.max(0, (performance.now() - brokenAt) / 1000);
    const progress = Math.min(elapsed / 1.55, 1);
    const easedProgress = 1 - (1 - progress) ** 3;
    leftPiece.current?.position.set(
      -easedProgress * boardWidth * 0.88,
      -easedProgress * boardHeight * 0.17,
      easedProgress * 1.35,
    );
    rightPiece.current?.position.set(
      easedProgress * boardWidth * 0.88,
      -easedProgress * boardHeight * 0.2,
      easedProgress * 1.05,
    );
    leftPiece.current?.rotation.set(
      easedProgress * 0.24,
      -easedProgress * 0.92,
      easedProgress * 0.52,
    );
    rightPiece.current?.rotation.set(
      -easedProgress * 0.18,
      easedProgress * 0.92,
      -easedProgress * 0.48,
    );

    splinterRefs.current.forEach((splinter, index) => {
      if (!splinter) return;
      const fragment = splinters[index];
      const time = Math.min(elapsed, 1.35);

      splinter.position.set(
        fragment.x + fragment.velocityX * time,
        fragment.y + fragment.velocityY * time - 2.5 * time * time,
        fragment.z + fragment.velocityZ * time,
      );
      splinter.rotation.set(
        fragment.rotationX * time,
        fragment.rotationY * time,
        fragment.rotationZ * time,
      );
      splinter.scale.set(
        fragment.scale,
        fragment.scale * (1.8 + (index % 3) * 0.35),
        fragment.scale * 0.55,
      );
      splinter.visible = elapsed < 1.35;
    });

    const positions = dustRef.current?.geometry.attributes.position as
      THREE.BufferAttribute | undefined;
    if (positions) {
      for (let index = 0; index < dustVelocity.length; index += 1) {
        const time = Math.min(elapsed, 1.5);
        positions.setXYZ(
          index,
          dustPositions[index * 3] + dustVelocity[index].x * time,
          dustPositions[index * 3 + 1] +
            dustVelocity[index].y * time -
            0.78 * time * time,
          dustPositions[index * 3 + 2] + dustVelocity[index].z * time,
        );
      }
      positions.needsUpdate = true;
    }
    dustMaterial.opacity = Math.max(0, 0.76 - elapsed * 0.55);
    board.current.scale.setScalar(
      1 +
        Math.sin(clock.elapsedTime * 34) * Math.max(0, 1 - elapsed * 2) * 0.012,
    );
  });

  return (
    <>
      <hemisphereLight args={["#ffe9cc", "#321a0e", 1.8]} />
      <directionalLight
        position={[-4, 6, 9]}
        intensity={3.8}
        color="#ffe2bd"
        castShadow
      />
      <pointLight position={[5, -2, 5]} intensity={12} color="#d27335" />
      <mesh position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[boardWidth * 2, boardHeight * 2]} />
        <shadowMaterial transparent opacity={0.3} />
      </mesh>
      <group ref={board}>
        <group ref={leftPiece}>
          <mesh
            geometry={leftGeometry}
            material={[materials.face, materials.edge]}
            castShadow
            receiveShadow
          />
        </group>
        <group ref={rightPiece}>
          <mesh
            geometry={rightGeometry}
            material={[materials.face, materials.edge]}
            castShadow
            receiveShadow
          />
        </group>
      </group>
      {splinters.map((splinter, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            splinterRefs.current[index] = mesh;
          }}
          geometry={splinterGeometry}
          material={splinterMaterial}
          position={[splinter.x, splinter.y, splinter.z]}
          scale={[splinter.scale, splinter.scale * 2.4, splinter.scale * 0.55]}
          visible={false}
          castShadow
        />
      ))}
      <points ref={dustRef} geometry={dustGeometry} visible={brokenAt !== null}>
        <primitive object={dustMaterial} attach="material" />
      </points>
    </>
  );
}

interface BreakingBoardSceneProps {
  brokenAt: number | null;
  eventSource: React.RefObject<HTMLElement | null>;
}

export function BreakingBoardScene({
  brokenAt,
  eventSource,
}: BreakingBoardSceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ fov: 36, position: [0, 0, 10] }}
      eventSource={eventSource}
      shadows
      gl={{ alpha: true, antialias: true }}
      className="breaking-board-intro__canvas"
    >
      <Board brokenAt={brokenAt} />
    </Canvas>
  );
}
