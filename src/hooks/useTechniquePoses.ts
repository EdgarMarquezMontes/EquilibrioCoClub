export type Rotation = [number, number, number];
export type Pose = {
  root?: Rotation;
  lift?: number;
  leftArm?: Rotation;
  leftForearm?: Rotation;
  rightArm?: Rotation;
  rightForearm?: Rotation;
  leftLeg?: Rotation;
  leftShin?: Rotation;
  rightLeg?: Rotation;
  rightShin?: Rotation;
};

const rad = (value: number) => (value * Math.PI) / 180;
const r = (x = 0, y = 0, z = 0): Rotation => [rad(x), rad(y), rad(z)];
export const neutral: Required<Pose> = {
  root: r(),
  lift: 0,
  leftArm: r(0, 0, 6),
  leftForearm: r(),
  rightArm: r(0, 0, -6),
  rightForearm: r(),
  leftLeg: r(),
  leftShin: r(),
  rightLeg: r(),
  rightShin: r(),
};

function merge(pose: Pose): Required<Pose> {
  return { ...neutral, ...pose };
}

export const COUNT_TERMS = [
  "hana",
  "dul",
  "set",
  "net",
  "daseot",
  "yeoseot",
  "ilgop",
  "yeodeol",
  "ahop",
  "yeol",
];

export function poseFor(id: string): Required<Pose> {
  const count = COUNT_TERMS.indexOf(id) + 1;
  if (count)
    return merge({
      lift: -0.12,
      leftArm: r(18, 0, 52),
      leftForearm: r(0, 0, 82),
      rightArm: r(18, 0, -52),
      rightForearm: r(0, 0, -82),
      leftLeg: r(0, 0, 18),
      rightLeg: r(0, 0, -18),
    });
  const poses: Record<string, Pose> = {
    charyeot: {
      leftArm: r(0, 0, 5),
      rightArm: r(0, 0, -5),
      leftLeg: r(),
      rightLeg: r(),
    },
    "kyeong-nye": {
      root: r(45, 0, 0),
      leftArm: r(0, 0, 5),
      rightArm: r(0, 0, -5),
    },
    junbi: {
      lift: -0.18,
      leftArm: r(18, 0, 52),
      leftForearm: r(0, 0, 82),
      rightArm: r(18, 0, -52),
      rightForearm: r(0, 0, -82),
      leftLeg: r(0, 0, 18),
      rightLeg: r(0, 0, -18),
    },
    sijak: {
      root: r(0, -18, -5),
      leftArm: r(-10, 0, 68),
      leftForearm: r(0, 0, 60),
      rightArm: r(0, -70, -72),
      rightForearm: r(),
      leftLeg: r(0, 0, 30),
      rightLeg: r(0, 0, -34),
    },
    geuman: {
      leftArm: r(0, -15, 88),
      leftForearm: r(),
      rightArm: r(0, 15, -88),
      rightForearm: r(),
    },
    baro: {
      lift: -0.18,
      leftArm: r(18, 0, 52),
      leftForearm: r(0, 0, 82),
      rightArm: r(18, 0, -52),
      rightForearm: r(0, 0, -82),
      leftLeg: r(0, 0, 18),
      rightLeg: r(0, 0, -18),
    },
    swieo: {
      leftArm: r(10, 55, 22),
      leftForearm: r(0, 0, 105),
      rightArm: r(10, -55, -22),
      rightForearm: r(0, 0, -105),
      leftLeg: r(0, 0, 14),
      rightLeg: r(0, 0, -14),
    },
    dora: { root: r(0, 180, 0), leftArm: r(0, 0, 34), rightArm: r(0, 0, -34) },
    kyesok: {
      root: r(0, -28, -4),
      leftArm: r(-12, 0, 58),
      leftForearm: r(0, 0, 80),
      rightArm: r(-65, 0, -42),
      rightForearm: r(0, 0, -55),
      leftLeg: r(0, 0, 25),
      rightLeg: r(0, 0, -28),
    },
    kalyeo: {
      leftArm: r(0, 0, 88),
      rightArm: r(-35, 0, -40),
      leftLeg: r(0, 0, 26),
      rightLeg: r(0, 0, -30),
    },
    "juchum-seogi": {
      lift: -0.4,
      leftLeg: r(0, 0, 42),
      leftShin: r(0, 0, -34),
      rightLeg: r(0, 0, -42),
      rightShin: r(0, 0, 34),
    },
    "ap-seogi": {
      root: r(0, -12, 0),
      leftLeg: r(-20, 0, 12),
      rightLeg: r(28, 0, -10),
      rightShin: r(-22, 0, 0),
    },
    "ap-kubi": {
      lift: -0.28,
      leftLeg: r(-38, 0, 18),
      leftShin: r(42, 0, -12),
      rightLeg: r(28, 0, -15),
    },
    "dwit-kubi": {
      lift: -0.3,
      root: r(0, 42, 0),
      leftLeg: r(-12, 0, 22),
      rightLeg: r(38, 0, -24),
      rightShin: r(-45, 0, 18),
    },
    "moa-seogi": {
      leftLeg: r(0, 0, 1),
      rightLeg: r(0, 0, -1),
      leftArm: r(0, 0, 8),
      rightArm: r(0, 0, -8),
    },
    "beom-seogi": {
      lift: -0.2,
      root: r(0, 28, 0),
      leftLeg: r(-10, 0, 10),
      leftShin: r(38, 0, 0),
      rightLeg: r(30, 0, -18),
      rightShin: r(-52, 0, 8),
    },
    "hakdari-seogi": {
      lift: 0.18,
      leftLeg: r(0, 0, 4),
      rightLeg: r(-15, 20, -72),
      rightShin: r(0, 0, 98),
      leftArm: r(0, 0, 70),
      rightArm: r(0, 0, -70),
    },
    "ap-chagi": {
      root: r(-7, 0, 0),
      rightLeg: r(-93, 0, -3),
      rightShin: r(4, 0, 0),
      leftArm: r(-18, 0, 56),
      leftForearm: r(0, 0, 72),
      rightArm: r(-12, 0, -48),
      rightForearm: r(0, 0, -68),
    },
    "dollyo-chagi": {
      root: r(-10, -88, -9),
      rightLeg: r(-18, 26, -102),
      rightShin: r(5, 0, 0),
      leftArm: r(-15, 0, 72),
      leftForearm: r(0, 0, 58),
      rightArm: r(-8, 0, -48),
      rightForearm: r(0, 0, -62),
    },
    "yeop-chagi": {
      root: r(12, -92, -18),
      rightLeg: r(-4, 8, -112),
      rightShin: r(3, 0, 0),
      leftArm: r(-12, 0, 82),
      leftForearm: r(0, 0, 55),
      rightArm: r(-10, 0, -70),
      rightForearm: r(0, 0, -58),
    },
    "dwit-chagi": {
      root: r(-10, 178, 0),
      rightLeg: r(82, 5, -8),
      rightShin: r(4, 0, 0),
      leftArm: r(-12, 0, 48),
      leftForearm: r(0, 0, 70),
      rightArm: r(-12, 0, -48),
      rightForearm: r(0, 0, -70),
    },
    "naeryeo-chagi": {
      root: r(-12, 0, 0),
      rightLeg: r(-154, 0, -6),
      rightShin: r(2, 0, 0),
      leftArm: r(-12, 0, 64),
      leftForearm: r(0, 0, 62),
      rightArm: r(-12, 0, -64),
      rightForearm: r(0, 0, -62),
    },
    "huryeo-chagi": {
      root: r(-10, -102, -12),
      rightLeg: r(-12, 34, -116),
      rightShin: r(8, 0, 0),
      leftArm: r(-12, 0, 72),
      leftForearm: r(0, 0, 62),
      rightArm: r(-10, 0, -54),
      rightForearm: r(0, 0, -66),
    },
    "twio-chagi": {
      lift: 0.85,
      root: r(-10, -18, 0),
      leftLeg: r(-55, 0, 26),
      leftShin: r(95, 0, 0),
      rightLeg: r(-105, 0, -20),
      rightShin: r(45, 0, 0),
    },
    "mireo-chagi": {
      root: r(-12, 0, 0),
      rightLeg: r(-82, 0, -4),
      rightShin: r(8, 0, 0),
      leftArm: r(-12, 0, 58),
      leftForearm: r(0, 0, 68),
      rightArm: r(-12, 0, -58),
      rightForearm: r(0, 0, -68),
    },
    "arae-makki": {
      root: r(0, -15, 0),
      leftArm: r(12, 0, 62),
      leftForearm: r(0, 0, 72),
      rightArm: r(0, 0, -18),
      rightForearm: r(0, 0, -100),
    },
    "momtong-makki": {
      leftArm: r(-15, 0, 78),
      leftForearm: r(0, 0, -72),
      rightArm: r(0, 0, -25),
      rightForearm: r(0, 0, -82),
    },
    "eolgul-makki": {
      leftArm: r(-35, 0, 145),
      leftForearm: r(0, 0, -72),
      rightArm: r(0, 0, -18),
      rightForearm: r(0, 0, -92),
    },
    "hansonnal-makki": {
      root: r(0, -25, 0),
      leftArm: r(-20, -30, 82),
      leftForearm: r(0, 0, -42),
      rightArm: r(-15, 0, -48),
      rightForearm: r(0, 0, -72),
    },
    jireugi: {
      root: r(0, -18, -4),
      leftArm: r(0, 0, 18),
      leftForearm: r(0, 0, 105),
      rightArm: r(-82, 0, -88),
      rightForearm: r(),
    },
    chigi: {
      root: r(0, 24, 4),
      rightArm: r(-15, 20, -130),
      rightForearm: r(0, 0, 38),
      leftArm: r(0, 0, 45),
    },
    chireugi: {
      root: r(0, -12, 0),
      rightArm: r(-88, 0, -86),
      rightForearm: r(),
      leftArm: r(0, 0, 20),
      leftForearm: r(0, 0, 100),
    },
    dojang: { root: r(0, 45, 0), leftArm: r(0, 0, 8), rightArm: r(0, 0, -8) },
    dobok: {
      leftArm: r(0, 0, 88),
      rightArm: r(0, 0, -88),
      leftForearm: r(),
      rightForearm: r(),
    },
    ti: {
      leftArm: r(35, 0, 55),
      leftForearm: r(0, 0, 95),
      rightArm: r(35, 0, -55),
      rightForearm: r(0, 0, -95),
    },
    sabeomnim: {
      leftArm: r(28, 36, 12),
      leftForearm: r(0, 0, 105),
      rightArm: r(28, -36, -12),
      rightForearm: r(0, 0, -105),
    },
    kwanjangnim: {
      leftArm: r(32, 42, 12),
      leftForearm: r(0, 0, 110),
      rightArm: r(32, -42, -12),
      rightForearm: r(0, 0, -110),
    },
    poomsae: {
      root: r(0, -38, -5),
      leftArm: r(0, 0, 82),
      rightArm: r(-70, 0, -75),
      leftLeg: r(0, 0, 30),
      rightLeg: r(0, 0, -34),
    },
    kyorugi: {
      root: r(0, -60, -6),
      leftArm: r(-42, 0, 55),
      leftForearm: r(0, 0, 72),
      rightArm: r(-55, 0, -50),
      rightForearm: r(0, 0, -68),
      leftLeg: r(-18, 0, 16),
      rightLeg: r(26, 0, -18),
    },
    kyokpa: {
      root: r(12, -92, -18),
      rightLeg: r(-4, 8, -112),
      rightShin: r(3, 0, 0),
      leftArm: r(-12, 0, 82),
      leftForearm: r(0, 0, 55),
      rightArm: r(-10, 0, -70),
      rightForearm: r(0, 0, -58),
    },
    kamsahamnida: {
      root: r(12, 0, 0),
      leftArm: r(18, -10, 48),
      leftForearm: r(0, 0, 105),
      rightArm: r(18, 10, -48),
      rightForearm: r(0, 0, -105),
    },
  };
  return merge(
    poses[id] ?? {
      root: r(0, 12, 0),
      leftArm: r(0, 0, 55),
      rightArm: r(0, 0, -55),
    },
  );
}

export type JointName = Exclude<keyof Pose, "root" | "lift">;
export const JOINTS: JointName[] = [
  "leftArm",
  "leftForearm",
  "rightArm",
  "rightForearm",
  "leftLeg",
  "leftShin",
  "rightLeg",
  "rightShin",
];
