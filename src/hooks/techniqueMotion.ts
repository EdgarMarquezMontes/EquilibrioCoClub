import {
  COUNT_TERMS,
  JOINTS,
  neutral,
  poseFor,
  type Pose,
  type Rotation,
} from "./techniquePoses";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ss = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const lerpR = (a: Rotation, b: Rotation, t: number): Rotation => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const flexOf = (v: Rotation) => Math.abs(v[0]) + Math.abs(v[2]);

/** Anatomical limits: hinge joints, no limb passing through torso or the other leg. */
export function constrain(p: Required<Pose>): Required<Pose> {
  const out = { ...p } as Required<Pose>;
  for (const side of ["left", "right"] as const) {
    const s = side === "left" ? 1 : -1;
    const arm = out[`${side}Arm`];
    const forward = ss(0.45, 1.1, Math.abs(arm[0]));
    const minAbd = 0.14 * (1 - forward);
    // arm raised forward (punch/strike): keep it on the centre line instead of swinging sideways
    const z =
      arm[2] *
      (1 -
        0.8 * ss(1.1, 1.4, Math.abs(arm[0])) * ss(1.1, 1.6, Math.abs(arm[2])));
    out[`${side}Arm`] = [
      clamp(arm[0], -3.1, 0.9),
      clamp(arm[1], -1.4, 1.4),
      s > 0 ? Math.max(z, minAbd) : Math.min(z, -minAbd),
    ];
    out[`${side}Forearm`] = [
      -clamp(flexOf(out[`${side}Forearm`]), 0.05, 2.45),
      0,
      0,
    ];
    const leg = out[`${side}Leg`];
    const pitched = ss(0.35, 0.8, Math.abs(leg[0]));
    const minLeg = 0.05 * (1 - pitched);
    out[`${side}Leg`] = [
      clamp(leg[0], -2.6, 1.0),
      clamp(leg[1], -0.9, 0.9),
      s > 0 ? Math.max(leg[2], minLeg) : Math.min(leg[2], -minLeg),
    ];
    out[`${side}Shin`] = [clamp(flexOf(out[`${side}Shin`]), 0, 2.5), 0, 0];
  }
  return out;
}

/** Intermediate "chamber" pose: knees/elbows load up before an extended kick or strike. */
export function chamberOf(
  n: Required<Pose>,
  t: Required<Pose>,
): Required<Pose> {
  const c = {} as Required<Pose>;
  c.root = lerpR(n.root, t.root, 0.6);
  c.lift = t.lift > 0 ? t.lift * 0.25 : t.lift * 0.7;
  for (const j of JOINTS) c[j] = lerpR(n[j], t[j], 0.55);
  for (const side of ["left", "right"] as const) {
    const leg = t[`${side}Leg`];
    const kick = ss(0.7, 1.4, Math.abs(leg[0]) + Math.abs(leg[2]) * 0.9);
    if (kick > 0) {
      c[`${side}Leg`] = [
        Math.min(leg[0], -1.4) * kick + c[`${side}Leg`][0] * (1 - kick),
        leg[1] * 0.6,
        leg[2] * 0.55,
      ];
      c[`${side}Shin`] = [Math.max(flexOf(t[`${side}Shin`]), 2.1 * kick), 0, 0];
    }
    const arm = t[`${side}Arm`];
    const strike =
      ss(0.8, 1.4, Math.abs(arm[0]) + Math.abs(arm[2]) * 0.5) *
      ss(0.9, 0.2, flexOf(t[`${side}Forearm`]));
    if (strike > 0)
      c[`${side}Forearm`] = [
        0,
        0,
        2 * strike + flexOf(c[`${side}Forearm`]) * (1 - strike),
      ];
  }
  return c;
}

const CYCLE = 3.6;
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeOutBack = (x: number) => {
  const c = 1.25;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
const STATIC_TERMS = new Set([
  ...COUNT_TERMS,
  "charyeot",
  "swieo",
  "juchum-seogi",
  "ap-seogi",
  "ap-kubi",
  "dwit-kubi",
  "moa-seogi",
  "beom-seogi",
  "hakdari-seogi",
  "dojang",
  "dobok",
  "ti",
  "sabeomnim",
  "kwanjangnim",
  "kamsahamnida",
]);
export const KICKS = new Set([
  "ap-chagi",
  "dollyo-chagi",
  "yeop-chagi",
  "dwit-chagi",
  "naeryeo-chagi",
  "huryeo-chagi",
  "twio-chagi",
  "mireo-chagi",
  "kyokpa",
]);

/** 0 → 1 while the technique is fully executed (used for the counting number on the hand). */
export function extensionAt(time: number) {
  const p = (time % CYCLE) / CYCLE;
  return ss(0.28, 0.36, p) * (1 - ss(0.9, 0.98, p));
}

/** Samples the full motion: rest → chamber → execution (with slight overshoot) → hold → return. */
export function samplePose(
  target: Required<Pose>,
  chamber: Required<Pose>,
  time: number,
  technique = "",
): Required<Pose> {
  const p = (time % CYCLE) / CYCLE;
  let a: Required<Pose>, b: Required<Pose>, k: number;
  if (STATIC_TERMS.has(technique)) {
    if (p < 0.08) {
      a = neutral;
      b = neutral;
      k = 0;
    } else if (p < 0.3) {
      a = neutral;
      b = target;
      k = easeInOut((p - 0.08) / 0.22);
    } else if (p < 0.92) {
      a = target;
      b = target;
      k = 1;
    } else {
      a = target;
      b = neutral;
      k = easeInOut((p - 0.92) / 0.08);
    }
  } else if (KICKS.has(technique)) {
    if (p < 0.1) {
      a = neutral;
      b = neutral;
      k = 0;
    } else if (p < 0.34) {
      a = neutral;
      b = chamber;
      k = easeInOut((p - 0.1) / 0.24);
    } else if (p < 0.5) {
      a = chamber;
      b = target;
      k = easeOutBack((p - 0.34) / 0.16);
    } else if (p < 0.61) {
      a = target;
      b = target;
      k = 1;
    } else if (p < 0.76) {
      a = target;
      b = chamber;
      k = easeInOut((p - 0.61) / 0.15);
    } else {
      a = chamber;
      b = neutral;
      k = easeInOut((p - 0.76) / 0.24);
    }
  } else {
    if (p < 0.12) {
      a = neutral;
      b = neutral;
      k = 0;
    } else if (p < 0.38) {
      a = neutral;
      b = chamber;
      k = easeInOut((p - 0.12) / 0.26);
    } else if (p < 0.56) {
      a = chamber;
      b = target;
      k = easeOutBack((p - 0.38) / 0.18);
    } else if (p < 0.73) {
      a = target;
      b = target;
      k = 1;
    } else {
      a = target;
      b = neutral;
      k = easeInOut((p - 0.73) / 0.27);
    }
  }
  const out = {} as Required<Pose>;
  out.root = lerpR(a.root, b.root, k);
  out.lift = a.lift + (b.lift - a.lift) * Math.min(k, 1);
  for (const j of JOINTS) out[j] = lerpR(a[j], b[j], k);
  const breathe =
    Math.sin(time * 2.2) * (STATIC_TERMS.has(technique) ? 0.012 : 0.02);
  // secondary motion: weight shift and gentle torso sway keep the figure alive between phases
  const sway = Math.sin(time * 1.3) * (STATIC_TERMS.has(technique) ? 0.35 : 1);
  out.root = [
    out.root[0] + Math.sin(time * 2.2) * 0.012,
    out.root[1] + Math.sin(time * 0.9) * 0.035,
    out.root[2] + sway * 0.018,
  ];
  out.leftLeg = [
    out.leftLeg[0],
    out.leftLeg[1],
    out.leftLeg[2] + Math.max(0, sway) * 0.03,
  ];
  out.rightLeg = [
    out.rightLeg[0],
    out.rightLeg[1],
    out.rightLeg[2] - Math.max(0, -sway) * 0.03,
  ];
  out.leftArm = [out.leftArm[0], out.leftArm[1], out.leftArm[2] + breathe];
  out.rightArm = [out.rightArm[0], out.rightArm[1], out.rightArm[2] - breathe];
  return constrain(out);
}
