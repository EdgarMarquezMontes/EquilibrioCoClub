import { useMemo } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  chamberOf,
  constrain,
  KICKS,
  lerpR,
  samplePose,
} from "./techniqueMotion";
import {
  JOINTS,
  neutral,
  poseFor,
  type JointName,
  type Pose,
} from "./techniquePoses";

export type RigTargets = {
  root: RefObject<THREE.Object3D | null>;
  joints: Partial<Record<JointName, THREE.Object3D | null>>;
  feet: (THREE.Object3D | null)[];
};

/** Drives a rig every frame with damped interpolation and floor contact (no ground penetration). */
export function useTechniqueRig(
  technique: string,
  getTargets: () => RigTargets,
) {
  const target = useMemo(() => constrain(poseFor(technique)), [technique]);
  const chamber = useMemo(
    () => chamberOf(constrain(neutral), target),
    [target],
  );
  const state = useMemo(
    () => ({
      ground: null as number | null,
      y: 0,
      tmp: new THREE.Vector3(),
      cur: null as Required<Pose> | null,
    }),
    [technique],
  );
  useFrame(({ clock }, raw) => {
    const dt = Math.min(raw, 0.05);
    const t = getTargets();
    const root = t.root.current;
    if (!root) return;
    const goal = samplePose(target, chamber, clock.elapsedTime, technique);
    const k = 1 - Math.exp(-(KICKS.has(technique) ? 15 : 11) * dt);
    if (!state.cur) state.cur = constrain(neutral);
    const cur = state.cur;
    const next = {} as Required<Pose>;
    next.root = lerpR(cur.root, goal.root, k);
    next.lift = cur.lift + (goal.lift - cur.lift) * k;
    for (const j of JOINTS) next[j] = lerpR(cur[j], goal[j], k);
    state.cur = next;
    for (const j of JOINTS) {
      const obj = t.joints[j];
      if (!obj) continue;
      const v = next[j];
      obj.rotation.set(v[0], v[1], v[2]);
    }
    root.rotation.set(next.root[0], next.root[1], next.root[2]);
    // floor contact: lowest foot stays on the rest ground height; positive lift = jump
    root.position.y = 0;
    root.updateMatrixWorld(true);
    let low = Infinity;
    for (const f of t.feet)
      if (f) {
        f.getWorldPosition(state.tmp);
        low = Math.min(low, state.tmp.y);
      }
    if (!Number.isFinite(low)) return;
    if (state.ground === null) state.ground = low;
    const jump = Math.max(0, next.lift);
    const y = state.ground - low + jump;
    state.y += (y - state.y) * (1 - Math.exp(-20 * dt));
    root.position.y = state.y;
  });
}
