import type { IKick } from "@/interfaces/ITaekwondo";

export const kicks: IKick[] = [
  {
    name: "Ap Chagi",
    hangul: "앞차기",
    translation: "Patada frontal",
    description:
      "Ataque lineal con la bola del pie, elevando primero la rodilla y extendiendo hacia el objetivo.",
    level: "Fundamental",
  },
  {
    name: "Dollyo Chagi",
    hangul: "돌려차기",
    translation: "Patada circular",
    description:
      "Giro de cadera y pivote del pie de apoyo para impactar lateralmente con el empeine.",
    level: "Intermedia",
  },
  {
    name: "Yeop Chagi",
    hangul: "옆차기",
    translation: "Patada lateral",
    description:
      "Empuje potente con el talón, cadera alineada y pierna de apoyo completamente pivotada.",
    level: "Intermedia",
  },
  {
    name: "Dwi Chagi",
    hangul: "뒤차기",
    translation: "Patada hacia atrás",
    description:
      "Ataque directo de espalda que combina giro, mirada al objetivo y extensión explosiva del talón.",
    level: "Avanzada",
  },
];
