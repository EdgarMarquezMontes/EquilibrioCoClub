import type { CSSProperties, RefObject } from "react";
import { PunchBagDeformation } from "@/components/intro/PunchBagDeformation";
import type { PunchImpact } from "@/features/punch-interaction/hooks/usePunchInteraction";

interface PunchInteractionLayerProps {
  impacts: PunchImpact[];
  cursorRef: RefObject<HTMLDivElement | null>;
  onImpactEnd: (impactId: number) => void;
}

export function PunchInteractionLayer({
  impacts,
  cursorRef,
  onImpactEnd,
}: PunchInteractionLayerProps) {
  return (
    <>
      {impacts.length > 0 && <PunchBagDeformation impacts={impacts} />}
      <div ref={cursorRef} className="site-punch-cursor" aria-hidden="true">
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
      {impacts.map((impact) => (
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
          onAnimationEnd={() => onImpactEnd(impact.id)}
        >
          <span className="site-punch-impact__sound">{impact.sound}</span>
          <span className="site-punch-impact__romanized">
            {impact.romanizedSound}
          </span>
        </span>
      ))}
    </>
  );
}
