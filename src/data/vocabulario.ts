import { conteo } from "./vocabulario/conteo";
import { defensasYGolpes } from "./vocabulario/defensas-y-golpes";
import { dojangYEtiqueta } from "./vocabulario/dojang-y-etiqueta";
import { ordenes } from "./vocabulario/ordenes";
import { patadas } from "./vocabulario/patadas";
import { posiciones } from "./vocabulario/posiciones";
import type { ITermino } from "@/interfaces/ITermino";

export const categorias = [
  "Todos",
  "Órdenes",
  "Posiciones",
  "Patadas",
  "Defensas y golpes",
  "Conteo coreano",
  "Dojang y etiqueta",
];

export const terminos: ITermino[] = [
  ...ordenes,
  ...posiciones,
  ...patadas,
  ...defensasYGolpes,
  ...conteo,
  ...dojangYEtiqueta,
];

export function getTermino(slug: string): ITermino | undefined {
  return terminos.find((termino) => termino.slug === slug);
}
