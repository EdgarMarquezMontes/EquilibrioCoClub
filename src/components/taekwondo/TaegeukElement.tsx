import { cn } from "@/lib/utils";

const elementNames = [
  "cielo",
  "lago",
  "fuego",
  "trueno",
  "viento",
  "agua",
  "montana",
  "tierra",
] as const;

export function TaegeukElement({
  index,
  compact = false,
}: {
  index: number;
  compact?: boolean;
}) {
  const element = elementNames[index - 1] ?? "cielo";
  const label =
    element === "montana"
      ? "Montaña"
      : `${element.charAt(0).toUpperCase()}${element.slice(1)}`;

  return (
    <div
      className={cn(
        "taegeuk-element",
        `taegeuk-element--${element}`,
        compact && "taegeuk-element--compact",
      )}
      role="img"
      aria-label={`Ilustración coreana: ${label}`}
    >
      <svg className="taegeuk-ink" viewBox="0 0 180 180" aria-hidden="true">
        <path
          className="ink-frame"
          d="M23 28C48 16 133 17 157 31M18 148c38 17 105 14 146-3"
        />
        {element === "cielo" && (
          <>
            <circle cx="90" cy="86" r="24" />
            <path d="M90 25v28M90 119v31M30 86h31M119 86h31M47 43l20 20M113 109l22 22M133 42l-20 21M67 109l-22 22" />
          </>
        )}
        {element === "lago" && (
          <>
            <path d="M25 84c23-24 45 24 68 0s45 24 67 0M20 107c25-24 48 24 72 0s46 24 68 0M34 130c20-17 38 17 58 0s37 17 55 0" />
            <path d="M55 59c11-18 58-25 73 1" />
          </>
        )}
        {element === "fuego" && (
          <>
            <path d="M89 150c-39-15-39-52-8-76 4 18 14 21 17 5 4-20-9-33 10-53 2 22 27 31 30 61 4 35-18 56-49 63Z" />
            <path d="M91 136c-19-12-14-30 1-43 0 14 12 16 15 3 13 20 4 35-16 40Z" />
          </>
        )}
        {element === "trueno" && (
          <>
            <path d="M28 49c32-20 95-20 124 4M39 67c24-13 77-13 101 2" />
            <path d="m99 55-34 52h28l-13 47 46-65H98l18-34Z" />
          </>
        )}
        {element === "viento" && (
          <>
            <path d="M21 62c39 0 45-25 76-18 17 4 16 24 1 27-12 3-20-6-15-15M20 91h119c27 0 26-30 8-33-12-2-19 5-17 14M26 120h78c23 0 25 25 8 31-12 4-20-5-16-14" />
          </>
        )}
        {element === "agua" && (
          <>
            <path d="M25 122c20-5 26-18 30-37 6-29 22-47 40-63 2 27 20 37 31 56 22 38-1 74-36 75-31 1-49-20-40-44" />
            <path d="M48 123c25-28 50 25 79-6" />
          </>
        )}
        {element === "montana" && (
          <>
            <path d="m18 145 44-71 19 27 29-63 52 107Z" />
            <path d="m94 72 16-34 18 35-17-7Z" />
            <path d="M29 145c36-14 78-15 130 0" />
          </>
        )}
        {element === "tierra" && (
          <>
            <path d="M25 136c18-38 29-71 65-102 36 31 47 64 65 102" />
            <path d="M35 120h110M45 96h90M58 72h64M90 36v103M57 73c8 19 9 39 4 62M123 73c-8 19-9 39-4 62" />
          </>
        )}
      </svg>
      {!compact && <span className="taegeuk-caption">{label}</span>}
    </div>
  );
}
