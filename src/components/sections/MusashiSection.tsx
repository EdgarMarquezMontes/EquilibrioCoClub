import type { CSSProperties } from "react";

const laws = [
  "Acepta todo exactamente tal como es.",
  "No busques el placer por sí mismo.",
  "No dependas de un sentimiento parcial.",
  "Piensa ligeramente de ti y profundamente del mundo.",
  "Mantente libre del deseo durante toda tu vida.",
  "No te arrepientas de lo que has hecho.",
  "Nunca seas celoso.",
  "Nunca te entristezcas por una separación.",
  "El resentimiento y la queja no tienen lugar en el Camino.",
  "No te dejes guiar por el deseo amoroso o la lujuria.",
  "No tengas preferencias en ninguna cosa.",
  "Sé indiferente al lugar donde vives.",
  "No persigas el sabor de la buena comida.",
  "No te aferres a posesiones que ya no necesitas.",
  "No actúes siguiendo creencias habituales.",
  "No colecciones armas ni practiques más allá de lo útil.",
  "No temas a la muerte.",
  "No busques acumular bienes para la vejez.",
  "Respeta a Buda y a los dioses sin contar con su ayuda.",
  "Puedes abandonar tu cuerpo, pero preserva tu honor.",
  "Nunca te apartes del Camino.",
];

export function MusashiSection() {
  return (
    <section
      id="dokkodo"
      data-home-scene="aurora"
      className="musashi-section relative isolate overflow-hidden border-y border-border"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <header className="musashi-heading">
          <p className="eyebrow">07 — Filosofía · Miyamoto Musashi</p>
          <div className="musashi-heading__title">
            <h2>Dokkōdō</h2>
            <p>El camino que se sigue solo</p>
          </div>
          <p className="musashi-heading__intro">
            En sus últimos días, el espadachín Miyamoto Musashi redactó estos
            21 preceptos de sobriedad, autonomía y disciplina. Esta versión
            ofrece una traducción libre para la reflexión; no sustituye el
            contexto histórico de sus distintas traducciones.
          </p>
        </header>
        <ol
          className="musashi-laws mt-12 grid border-y border-border sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Los 21 preceptos del Dokkōdō"
        >
          {laws.map((law, index) => (
            <li
              key={law}
              className="ley-musashi group relative min-h-28 overflow-hidden border-b border-border/70 px-4 py-5 pl-14 sm:px-5 sm:pl-14"
              data-scroll-reveal="true"
              style={{ "--law-delay": `${index * 55}ms` } as CSSProperties}
            >
              <span className="ley-musashi__number absolute left-1 top-5 font-display text-sm text-primary sm:left-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ley-musashi__text relative z-10 text-sm leading-relaxed text-foreground">
                {law}
              </span>
              <span className="ley-musashi__slash" aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="musashi-footnote mt-5 text-xs text-muted-foreground">
          Traducción libre del Dokkōdō · 21 reflexiones sobre el camino y la
          disciplina.
        </p>
      </div>
    </section>
  );
}
