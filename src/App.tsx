import { lazy, Suspense, useState, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { PunchInteractionLayer } from "@/features/punch-interaction/components/PunchInteractionLayer";
import { usePunchInteraction } from "@/features/punch-interaction/hooks/usePunchInteraction";
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

export function App({ queryClient, children }: AppProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isBreaking, setIsBreaking] = useState(false);
  const punchInteraction = usePunchInteraction();
  const contentClassName = [
    "app-content",
    showIntro && "app-content--intro",
    isBreaking && "app-content--revealing",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={contentClassName}
        inert={showIntro}
        onPointerMove={punchInteraction.onPointerMove}
        onPointerLeave={punchInteraction.onPointerLeave}
        onPointerDown={punchInteraction.onPointerDown}
      >
        <SiteNav />
        <main>
          <RouteExperience>{children}</RouteExperience>
        </main>
        <SiteFooter />
      </div>
      {!showIntro && (
        <PunchInteractionLayer
          impacts={punchInteraction.impacts}
          cursorRef={punchInteraction.cursorRef}
          onImpactEnd={punchInteraction.removeImpact}
        />
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
