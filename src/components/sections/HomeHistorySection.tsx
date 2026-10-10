const milestones = [
  {
    year: "1955",
    title: "Un nombre compartido",
    description:
      "Se adopta oficialmente el nombre Taekwondo para reunir distintas escuelas coreanas bajo una identidad común.",
  },
  {
    year: "1972",
    title: "Kukkiwon",
    description:
      "Se inaugura en Seúl el centro mundial de Taekwondo, referente para la formación y certificación de grados.",
  },
  {
    year: "1973",
    title: "Una comunidad mundial",
    description:
      "Se celebra el primer Campeonato Mundial en Seúl y se funda la federación internacional que hoy conocemos como World Taekwondo.",
  },
  {
    year: "1988",
    title: "Escenario olímpico",
    description:
      "El Taekwondo aparece como deporte de demostración en los Juegos Olímpicos de Seúl.",
  },
  {
    year: "2000",
    title: "Deporte olímpico",
    description:
      "Debuta como deporte con medallas en los Juegos Olímpicos de Sídney.",
  },
];

export function HomeHistorySection() {
  return (
    <section
      id="historia"
      data-home-scene="history"
      className="relative isolate overflow-hidden border-y border-border bg-card/40"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <p className="eyebrow">01 — Historia</p>
        <div className="mt-3 grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-end">
          <h2 className="home-scroll-title text-4xl uppercase sm:text-5xl">
            De los dojangs al escenario mundial
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Un recorrido por hitos que dieron forma al Taekwondo moderno, desde
            la adopción de su nombre hasta su lugar en los Juegos Olímpicos.
          </p>
        </div>
        <ol className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {milestones.map((milestone) => (
            <li
              key={milestone.year}
              className="home-milestone min-h-52 bg-background/90 p-5 sm:p-6"
              data-scroll-reveal="true"
            >
              <p className="font-display text-3xl text-primary">
                {milestone.year}
              </p>
              <h3 className="mt-5 text-lg uppercase">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
