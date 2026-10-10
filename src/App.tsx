import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  PunchBagDeformation,
  type PunchSurfaceImpact,
} from "@/components/intro/PunchBagDeformation";
import { RouteExperience } from "@/components/taekwondo/RouteExperience";

const BreakingBoardIntro = lazy(() =>
  import("@/components/intro/BreakingBoardIntro").then((module) => ({
    default: module.BreakingBoardIntro,
  })),
);

interface AppProps {
  queryClient: QueryClient;
  children: ReactNode;
}

interface PunchImpact extends PunchSurfaceImpact {
  variation: number;
  size: number;
  sound: string;
  romanizedSound: string;
  kind: "punch" | "kick";
}

const punchSounds = [
  { korean: "퍽!", romanized: "PUM" },
  { korean: "팡!", romanized: "PAM" },
  { korean: "쿵!", romanized: "BOOM" },
  { korean: "탁!", romanized: "TAC" },
  { korean: "펑!", romanized: "¡PUM!" },
  { korean: "짝!", romanized: "¡PAF!" },
];

export function App({ queryClient, children }: AppProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const [punchImpacts, setPunchImpacts] = useState<PunchImpact[]>([]);
  const punchCursor = useRef<HTMLDivElement>(null);
  const nextPunchId = useRef(0);
  const punchResetTimeout = useRef<number | undefined>(undefined);
  const previousPunchSound = useRef(-1);

  useEffect(() => {
    return () => window.clearTimeout(punchResetTimeout.current);
  }, []);

  function trackPunchPointer(event: PointerEvent<HTMLDivElement>) {
    const cursor = punchCursor.current;
    if (!cursor) return;

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("site-punch-cursor--visible");
    event.currentTarget.classList.add("has-site-punch-cursor");
  }

  function punchScreen(event: PointerEvent<HTMLDivElement>) {
    if (
      event.button !== 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cursor = punchCursor.current;
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
    window.clearTimeout(punchResetTimeout.current);
    punchResetTimeout.current = window.setTimeout(() => {
      cursor?.classList.remove(
        "site-punch-cursor--punching",
        "site-punch-cursor--kicking",
      );
    }, 480);

    let soundIndex = Math.floor(Math.random() * (punchSounds.length - 1));
    if (soundIndex >= previousPunchSound.current) soundIndex += 1;
    previousPunchSound.current = soundIndex;
    const sound = punchSounds[soundIndex];
    const impact = {
      id: nextPunchId.current++,
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
    setPunchImpacts((impacts) => [...impacts, impact]);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div
          className={[
            "app-content",
            showIntro && "app-content--intro",
            isBreaking && "app-content--revealing",
          ]
            .filter(Boolean)
            .join(" ")}
          inert={showIntro}
          onPointerMove={trackPunchPointer}
          onPointerLeave={(event) => {
            punchCursor.current?.classList.remove(
              "site-punch-cursor--visible",
            );
            event.currentTarget.classList.remove("has-site-punch-cursor");
          }}
          onPointerDown={punchScreen}
        >
          <SiteNav />
          <main>
            <RouteExperience>{children}</RouteExperience>
          </main>
          <SiteFooter />
        </div>
          {!showIntro && (
          <>
          {punchImpacts.length > 0 && (
            <PunchBagDeformation impacts={punchImpacts} />
          )}
          <div
            ref={punchCursor}
            className="site-punch-cursor"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 128 112"
              className="site-punch-cursor__hand"
              focusable="false"
            >
              <g className="site-punch-cursor__foot">
                <path
                  d="M21 103 45 48q6-14 20-12l27-14q10-5 18 1l4 4q4 6-3 11L96 52l17-3q8-1 10 5 2 6-6 10l-17 8 13 2q7 1 6 7-1 6-8 7l-24 1q-17 0-31-9l-14 28z"
                  fill="#f2dfc1"
                  stroke="#4a2d1b"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <path
                  d="m52 55 11 5m-16 4 11 5m-17 4 10 5"
                  fill="none"
                  stroke="#a4754c"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </g>
              <g className="site-punch-cursor__open-hand">
                <path
                  d="m31 107 7-30q2-9 11-8l2-35q0-7 6-7t6 7v29l2-42q1-7 7-7t6 7v43l3-33q1-7 7-6t5 8l-2 37 6-20q2-7 8-5t3 10l-9 34q-5 20-24 21l-27 2z"
                  fill="#f2dfc1"
                  stroke="#4a2d1b"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <path
                  d="m45 75 9 3m-8 7 9 3m5-34v10m13-11v11m13-9-1 10"
                  fill="none"
                  stroke="#a4754c"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </g>
              <g className="site-punch-cursor__fist">
                <path
                  d="m31 107 7-29q2-9 11-9h4l1-15q0-7 6-7t6 7v8l2-16q1-7 7-7t6 7v13l3-10q1-7 7-5t5 8l-1 12q5-6 10-2 4 3 1 10l-10 24q-7 16-23 17l-26 1z"
                  fill="#f2dfc1"
                  stroke="#4a2d1b"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
                <path
                  d="m52 56 12 1m2-1 12 1m2-2 11 2m-43 16 13 3"
                  fill="none"
                  stroke="#a4754c"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </g>
            </svg>
          </div>
          {punchImpacts.map((impact) => (
            <span
              key={impact.id}
              className={`site-punch-impact site-punch-impact--${impact.variation} site-punch-impact--${impact.kind}`}
              style={
                {
                  left: impact.x,
                  top: impact.y,
                  "--impact-size": `${impact.size}px`,
                } as CSSProperties
              }
              aria-hidden="true"
              onAnimationEnd={() =>
                setPunchImpacts((impacts) =>
                  impacts.filter(({ id }) => id !== impact.id),
                )
              }
            >
              <span className="site-punch-impact__sound">{impact.sound}</span>
              <span className="site-punch-impact__romanized">
                {impact.romanizedSound}
              </span>
            </span>
          ))}
          </>
        )}
        {showIntro && (
          <Suspense
            fallback={
              <div className="breaking-board-intro breaking-board-intro__loading">
                Preparando el dojang…
              </div>
            }
          >
            <BreakingBoardIntro
              onBreak={() => setIsBreaking(true)}
              onEnter={() => setShowIntro(false)}
            />
          </Suspense>
        )}
    </QueryClientProvider>
  );
}
