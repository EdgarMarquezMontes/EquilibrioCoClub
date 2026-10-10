import { lazy, Suspense, useEffect, useState } from "react";

const HomeScene3d = lazy(() => import("./HomeScene3d"));

export type HomeSceneMode = "dojo" | "history" | "world" | "aurora";

export function HomeAtmosphere() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const appContent = document.querySelector<HTMLElement>(".app-content");
    if (!appContent || !appContent.hasAttribute("inert")) {
      setIsReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (!appContent.isConnected || appContent.hasAttribute("inert")) return;
      setIsReady(true);
      observer.disconnect();
    });
    observer.observe(appContent, {
      attributes: true,
      attributeFilter: ["inert"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-atmosphere" aria-hidden="true">
      {isReady && (
        <Suspense fallback={null}>
          <HomeScene3d />
        </Suspense>
      )}
    </div>
  );
}
