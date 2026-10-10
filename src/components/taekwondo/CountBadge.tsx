import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { extensionAt } from "@/hooks/techniqueMotion";
import { COUNT_TERMS } from "@/hooks/techniquePoses";

const HANGUL = [
  "하나",
  "둘",
  "셋",
  "넷",
  "다섯",
  "여섯",
  "일곱",
  "여덟",
  "아홉",
  "열",
];

/** Number that pops out of the hand while the arm is extended in the counting terms. */
export function CountBadge({
  technique,
  position = [0, -0.15, 0],
}: {
  technique: string;
  position?: [number, number, number];
}) {
  const idx = COUNT_TERMS.indexOf(technique);
  const material = useRef<THREE.SpriteMaterial>(null);
  const sprite = useRef<THREE.Sprite>(null);
  const texture = useMemo(() => {
    if (idx < 0 || typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "rgba(18,18,21,.9)";
    ctx.fillRect(4, 4, 248, 152);
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 7;
    ctx.strokeRect(4, 4, 248, 152);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ef4444";
    ctx.font = "700 72px sans-serif";
    ctx.fillText(String(idx + 1), 82, 80);
    ctx.fillStyle = "#f4f4f5";
    ctx.font = "600 38px sans-serif";
    ctx.fillText(HANGUL[idx] ?? "", 176, 82);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return result;
  }, [idx]);
  useFrame(({ clock }) => {
    const e = extensionAt(clock.elapsedTime);
    if (material.current) material.current.opacity = e;
    if (sprite.current)
      sprite.current.scale.set(
        1.05 * (0.6 + 0.4 * e),
        0.66 * (0.6 + 0.4 * e),
        1,
      );
  });
  if (idx < 0 || !texture) return null;
  return (
    <sprite ref={sprite} position={position} scale={[0.65, 0.4, 1]}>
      <spriteMaterial
        ref={material}
        map={texture}
        transparent
        depthTest={false}
        toneMapped={false}
      />
    </sprite>
  );
}
