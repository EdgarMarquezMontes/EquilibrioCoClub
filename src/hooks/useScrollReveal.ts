import { useEffect } from "react";

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-scroll-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    const timer = window.setTimeout(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main section, main [data-scroll-reveal]",
        ),
      );
      nodes.forEach((node) => {
        node.setAttribute("data-scroll-reveal", "true");
        observer.observe(node);
      });
    }, 180);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
}
