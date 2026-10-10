import { galeria } from "@/data/home";

export function HomeCultureSection() {
  return (
    <section
      id="cultura"
      data-home-scene="dojo"
      className="home-culture mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <header className="home-culture__heading">
        <p className="eyebrow">06 — Cultura</p>
        <h2 className="mt-3 text-4xl uppercase sm:text-5xl">
          El dojang, en fragmentos.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Entrenamiento, técnica y comunidad: distintas miradas sobre un mismo
          camino.
        </p>
      </header>
      <div className="home-gallery mt-10 grid">
        {galeria.map((image, index) => (
          <figure
            key={index}
            className={`home-gallery__item home-gallery__item--${index + 1} group relative overflow-hidden border border-border`}
            data-scroll-reveal="true"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={1200}
              height={900}
              className="home-gallery__image absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700"
            />
            <figcaption className="home-gallery__caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/95 via-background/55 to-transparent p-4 pt-12 font-display text-xs uppercase tracking-[0.16em] sm:p-5 sm:pt-16">
              <span>{image.cap}</span>
              <span className="home-gallery__index text-[0.65rem] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
