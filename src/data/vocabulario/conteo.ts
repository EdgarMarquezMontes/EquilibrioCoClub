import type { ITermino } from "@/interfaces/ITermino";

const pasosDelConteo = [
  "El conteo lo dirige el maestro y lo repite el grupo en voz alta.",
  "Se grita con fuerza desde el abdomen, no desde la garganta.",
  "Se cuenta del uno al diez y se reinicia; para exámenes se exige de memoria.",
];

const numeros = [
  { slug: "hana", hangul: "하나", romanizacion: "Hana", significado: "Uno" },
  { slug: "dul", hangul: "둘", romanizacion: "Dul", significado: "Dos" },
  { slug: "set", hangul: "셋", romanizacion: "Set", significado: "Tres" },
  { slug: "net", hangul: "넷", romanizacion: "Net", significado: "Cuatro" },
  {
    slug: "daseot",
    hangul: "다섯",
    romanizacion: "Daseot",
    significado: "Cinco",
  },
  {
    slug: "yeoseot",
    hangul: "여섯",
    romanizacion: "Yeoseot",
    significado: "Seis",
  },
  {
    slug: "ilgop",
    hangul: "일곱",
    romanizacion: "Ilgop",
    significado: "Siete",
  },
  {
    slug: "yeodeol",
    hangul: "여덟",
    romanizacion: "Yeodeol",
    significado: "Ocho",
  },
  { slug: "ahop", hangul: "아홉", romanizacion: "Ahop", significado: "Nueve" },
  { slug: "yeol", hangul: "열", romanizacion: "Yeol", significado: "Diez" },
];

export const conteo: ITermino[] = numeros.map(
  ({ slug, hangul, romanizacion, significado }) => ({
    slug,
    hangul,
    romanizacion,
    significado,
    categoria: "Conteo coreano",
    descripcion: `${romanizacion} significa "${significado.toLowerCase()}" en el conteo nativo coreano, el que se usa en el dojang para marcar repeticiones y series de técnicas.`,
    pasos: pasosDelConteo,
  }),
);
