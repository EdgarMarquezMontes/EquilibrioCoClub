import type { ITermino } from "@/interfaces/ITermino";

export const ordenes: ITermino[] = [
  {
    slug: "charyeot",
    hangul: "차렷",
    romanizacion: "Charyeot",
    significado: "Atención / firmes",
    categoria: "Órdenes",
    descripcion:
      "Es la primera orden formal de toda clase, examen o combate. Marca el paso de la conversación al trabajo: el cuerpo se alinea, la mirada se fija al frente y la mente entra al dojang.",
    pasos: [
      "Pies juntos, talones en contacto y puntas ligeramente abiertas.",
      "Piernas extendidas sin bloquear la rodilla, cadera neutra.",
      "Brazos relajados a los costados, manos en puño suave.",
      "Mirada al frente, mandíbula relajada, respiración por la nariz.",
    ],
  },
  {
    slug: "kyeong-nye",
    hangul: "경례",
    romanizacion: "Kyeong-nye",
    significado: "Saludo (reverencia)",
    categoria: "Órdenes",
    descripcion:
      "El saludo es la manifestación física de la cortesía (Ye Ui). Se saluda a la bandera, al maestro, al compañero y al dojang: nunca es un gesto vacío, es un reconocimiento.",
    pasos: [
      "Se ejecuta siempre desde Charyeot.",
      "Inclinar el tronco unos 30° desde la cadera, espalda recta.",
      "La mirada baja con el cuerpo (no se mira al frente por respeto).",
      "Mantener un segundo y volver a la vertical con control.",
    ],
  },
  {
    slug: "junbi",
    hangul: "준비",
    romanizacion: "Junbi",
    significado: "Preparados",
    categoria: "Órdenes",
    descripcion:
      "Posición de listo previa a cualquier técnica o poomsae. El cuerpo ya está cargado y solo espera la orden de comienzo.",
    pasos: [
      "Pie izquierdo abre al ancho de hombros.",
      "Puños cerrados frente al abdomen, a un puño de distancia del cuerpo.",
      "Codos ligeramente separados, hombros bajos.",
      "Peso repartido al 50% en ambas piernas.",
    ],
  },
  {
    slug: "sijak",
    hangul: "시작",
    romanizacion: "Sijak",
    significado: "Comenzar",
    categoria: "Órdenes",
    descripcion:
      "Orden de inicio. En poomsae marca el primer movimiento; en kyorugi, el arranque del asalto tras el saludo.",
    pasos: [
      "Esperar la orden completa, nunca anticiparse.",
      "Iniciar con exhalación corta.",
      "Primer movimiento con intención plena, no de prueba.",
    ],
  },
  {
    slug: "geuman",
    hangul: "그만",
    romanizacion: "Geuman",
    significado: "Alto / terminar",
    categoria: "Órdenes",
    descripcion:
      "Orden de detención inmediata. Es una orden de seguridad: se obedece sin discutir y sin completar la técnica en curso.",
    pasos: [
      "Detener el movimiento al instante.",
      "Bajar las manos y separarse del compañero.",
      "Volver a Junbi y esperar.",
    ],
  },
  {
    slug: "baro",
    hangul: "바로",
    romanizacion: "Baro",
    significado: "Volver a la posición inicial",
    categoria: "Órdenes",
    descripcion:
      "Indica retornar al punto de partida, normalmente Junbi o Charyeot, cerrando la secuencia trabajada.",
    pasos: [
      "Recoger el pie adelantado hacia el centro.",
      "Manos al abdomen o a los costados.",
      "Recuperar la respiración sin romper la postura.",
    ],
  },
  {
    slug: "swieo",
    hangul: "쉬어",
    romanizacion: "Swieo",
    significado: "Descanso",
    categoria: "Órdenes",
    descripcion:
      "Descanso formal dentro del dojang. Es un descanso disciplinado: se puede respirar y aflojar, pero no se pierde la actitud.",
    pasos: [
      "Pie izquierdo abre al ancho de hombros.",
      "Manos a la espalda, una sobre la otra.",
      "No hablar salvo autorización.",
    ],
  },
  {
    slug: "dora",
    hangul: "돌아",
    romanizacion: "Dora",
    significado: "Girar",
    categoria: "Órdenes",
    descripcion:
      "Orden de giro, usada para cambiar de frente en formaciones y en trabajos por líneas.",
    pasos: [
      "Girar por el lado indicado (izquierda por defecto).",
      "Pivotar sobre la planta, no sobre el talón.",
      "Terminar en la misma posición de partida, mirando al nuevo frente.",
    ],
  },
  {
    slug: "kyesok",
    hangul: "계속",
    romanizacion: "Kyesok",
    significado: "Continuar",
    categoria: "Órdenes",
    descripcion:
      "Reanuda la acción tras una pausa (Kalyeo) sin necesidad de volver a saludar.",
    pasos: ["Retomar la guardia.", "Reanudar solo al escuchar la orden."],
  },
  {
    slug: "kalyeo",
    hangul: "갈려",
    romanizacion: "Kalyeo",
    significado: "Separarse (combate)",
    categoria: "Órdenes",
    descripcion:
      "Orden arbitral de separación en kyorugi. Detiene el intercambio para corregir, amonestar o reordenar el combate.",
    pasos: [
      "Separarse un paso atrás.",
      "Bajar las manos y mirar al árbitro.",
      "No atacar después de la orden: es falta.",
    ],
  },
];
