import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

const BreakingBoardScene = lazy(() =>
  import("./BreakingBoardScene").then((module) => ({
    default: module.BreakingBoardScene,
  })),
);

interface BreakingBoardIntroProps {
  onBreak: () => void;
  onEnter: () => void;
}

export function BreakingBoardIntro({
  onBreak,
  onEnter,
}: BreakingBoardIntroProps) {
  const [brokenAt, setBrokenAt] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const introRef = useRef<HTMLElement>(null);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timeout.current);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function breakBoard() {
    if (brokenAt !== null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onEnter();
      return;
    }

    setBrokenAt(performance.now());
    onBreak();
    timeout.current = window.setTimeout(onEnter, 1700);
  }

  function trackPointer(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
    event.currentTarget.classList.add("has-pointer");
  }

  return (
    <section
      ref={introRef}
      className={`breaking-board-intro${brokenAt === null ? "" : " is-breaking"}`}
      aria-label="Entrada al sitio Equilibrio"
      onPointerMove={trackPointer}
      onPointerLeave={(event) =>
        event.currentTarget.classList.remove("has-pointer")
      }
    >
      <div className="breaking-board-intro__scene" aria-hidden="true">
        {isClient ? (
          <Suspense
            fallback={
              <span className="breaking-board-intro__loading">
                Preparando el dojang…
              </span>
            }
          >
            <BreakingBoardScene brokenAt={brokenAt} eventSource={introRef} />
          </Suspense>
        ) : (
          <span className="breaking-board-intro__loading">
            Preparando el dojang…
          </span>
        )}
      </div>
      <button
        type="button"
        className="breaking-board-intro__trigger"
        onClick={breakBoard}
        disabled={brokenAt !== null}
        aria-label="Romper la tabla para entrar al sitio"
      />
      <div className="breaking-board-intro__pointer" aria-hidden="true">
        <svg
          viewBox="0 0 128 112"
          className="breaking-board-intro__foot"
          focusable="false"
        >
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
        </svg>
      </div>

      <p className="breaking-board-intro__instruction" aria-live="polite">
        {brokenAt === null
          ? "Haz clic o presiona Enter para romper la tabla"
          : "Bienvenido a Equilibrio"}
      </p>

      <button
        type="button"
        className="breaking-board-intro__skip"
        onClick={onEnter}
      >
        Continuar sin romper
      </button>
    </section>
  );
}
