import { useLocation } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function RouteExperience({ children }: { children: React.ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  useScrollReveal(pathname);

  return (
    <div className="route-experience" data-route={pathname}>
      <span
        className="route-experience__stroke route-experience__stroke--one"
        aria-hidden="true"
      />
      <span
        className="route-experience__stroke route-experience__stroke--two"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
