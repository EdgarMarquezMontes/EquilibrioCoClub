import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type PointerEventHandler,
  type RefObject,
} from "react";
import type { PunchSurfaceImpact } from "@/components/intro/PunchBagDeformation";

export interface PunchImpact extends PunchSurfaceImpact {
  variation: number;
  size: number;
  sound: string;
  romanizedSound: string;
  kind: "punch" | "kick";
}

interface PunchSound {
  korean: string;
  romanized: string;
}

interface PointerPosition {
  x: number;
  y: number;
}

interface PunchInteraction {
  impacts: PunchImpact[];
  cursorRef: RefObject<HTMLDivElement | null>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerLeave: PointerEventHandler<HTMLDivElement>;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  removeImpact: (impactId: number) => void;
}

const punchSounds: PunchSound[] = [
  { korean: "퍽!", romanized: "PUM" },
  { korean: "팡!", romanized: "PAM" },
  { korean: "쿵!", romanized: "BOOM" },
  { korean: "탁!", romanized: "TAC" },
  { korean: "펑!", romanized: "¡PUM!" },
  { korean: "짝!", romanized: "¡PAF!" },
];

const MAX_VISIBLE_IMPACTS = 16;

export function usePunchInteraction(): PunchInteraction {
  const [impacts, setImpacts] = useState<PunchImpact[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const nextImpactId = useRef(0);
  const resetTimeout = useRef<number | undefined>(undefined);
  const animationFrame = useRef<number | undefined>(undefined);
  const previousSound = useRef(-1);
  const pointerPosition = useRef<PointerPosition>({ x: 0, y: 0 });

  useEffect(
    () => () => {
      window.clearTimeout(resetTimeout.current);
      if (animationFrame.current !== undefined) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    },
    [],
  );

  const onPointerMove = useCallback<PointerEventHandler<HTMLDivElement>>(
    (event) => {
      pointerPosition.current = { x: event.clientX, y: event.clientY };
      if (!event.currentTarget.classList.contains("has-site-punch-cursor")) {
        event.currentTarget.classList.add("has-site-punch-cursor");
      }
      const cursor = cursorRef.current;
      if (!cursor) return;
      if (animationFrame.current !== undefined) return;

      animationFrame.current = window.requestAnimationFrame(() => {
        const position = pointerPosition.current;
        cursor.classList.add("site-punch-cursor--visible");
        cursor.style.left = `${position.x}px`;
        cursor.style.top = `${position.y}px`;
        animationFrame.current = undefined;
      });
    },
    [],
  );

  const onPointerLeave = useCallback<PointerEventHandler<HTMLDivElement>>(
    (event) => {
      cursorRef.current?.classList.remove("site-punch-cursor--visible");
      event.currentTarget.classList.remove("has-site-punch-cursor");
      if (animationFrame.current !== undefined) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = undefined;
      }
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        event.button !== 0 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const cursor = cursorRef.current;
      const kind: PunchImpact["kind"] =
        Math.random() < 0.5 ? "punch" : "kick";
      cursor?.classList.remove(
        "site-punch-cursor--punching",
        "site-punch-cursor--kicking",
      );
      if (cursor) {
        void cursor.offsetWidth;
        cursor.classList.add(
          kind === "punch"
            ? "site-punch-cursor--punching"
            : "site-punch-cursor--kicking",
        );
      }

      window.clearTimeout(resetTimeout.current);
      resetTimeout.current = window.setTimeout(() => {
        cursorRef.current?.classList.remove(
          "site-punch-cursor--punching",
          "site-punch-cursor--kicking",
        );
      }, 480);

      const soundIndex = chooseSoundIndex(previousSound.current);
      previousSound.current = soundIndex;
      const sound = punchSounds[soundIndex];
      const impact: PunchImpact = {
        id: nextImpactId.current++,
        x: event.clientX,
        y: event.clientY,
        timestamp: performance.now(),
        radius: 68 + Math.random() * 64,
        depth: 0.11 + Math.random() * 0.11,
        variation: Math.floor(Math.random() * 6),
        size: 140 + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
        ellipticity: 0.68 + Math.random() * 0.7,
        sound: sound.korean,
        romanizedSound: sound.romanized,
        kind,
      };
      setImpacts((current) => [
        ...current.slice(-(MAX_VISIBLE_IMPACTS - 1)),
        impact,
      ]);
    },
    [],
  );

  const removeImpact = useCallback((impactId: number) => {
    setImpacts((current) => current.filter(({ id }) => id !== impactId));
  }, []);

  return {
    impacts,
    cursorRef,
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    removeImpact,
  };
}

function chooseSoundIndex(previousIndex: number): number {
  if (punchSounds.length < 2) return 0;
  const nextIndex = Math.floor(Math.random() * punchSounds.length);
  return nextIndex === previousIndex
    ? (nextIndex + 1) % punchSounds.length
    : nextIndex;
}
