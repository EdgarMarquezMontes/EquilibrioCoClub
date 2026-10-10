export interface IKick {
  name: string;
  hangul: string;
  translation: string;
  description: string;
  level: "Fundamental" | "Intermedia" | "Avanzada";
}

export interface ITechniqueVisualProps {
  label: string;
  compact?: boolean;
  category?: string;
  technique?: string;
}
