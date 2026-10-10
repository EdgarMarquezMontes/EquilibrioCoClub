import { useEffect, useState } from "react";

type SceneColors = {
  background: string;
  foreground: string;
  primary: string;
  border: string;
};

const fallback: SceneColors = {
  background: "rgb(20 20 23)",
  foreground: "rgb(245 245 245)",
  primary: "rgb(220 38 38)",
  border: "rgb(74 74 80)",
};

function readColors(): SceneColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    background:
      styles.getPropertyValue("--scene-background").trim() ||
      fallback.background,
    foreground:
      styles.getPropertyValue("--scene-foreground").trim() ||
      fallback.foreground,
    primary:
      styles.getPropertyValue("--scene-primary").trim() || fallback.primary,
    border: styles.getPropertyValue("--scene-border").trim() || fallback.border,
  };
}

export function useSceneColors() {
  const [colors, setColors] = useState<SceneColors>(fallback);

  useEffect(() => {
    const update = () => setColors(readColors());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
