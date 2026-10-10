import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function HomeClosingSection() {
  return (
    <section
      className="home-closing relative isolate overflow-hidden"
      data-home-scene="aurora"
    >
      <div className="home-closing__orbit" aria-hidden="true" />
      <div className="absolute inset-0 ink-grid opacity-20" aria-hidden />
      <div className="relative mx-auto flex min-h-[36rem] max-w-[90rem] flex-col items-center justify-center gap-8 px-6 py-24 text-center sm:min-h-[42rem] sm:px-8 lg:px-10">
        <div className="relative z-10">
          <p className="eyebrow">09 — El camino continúa</p>
          <h2 className="home-closing__title mt-8 uppercase">
            <span>Practicar. Respetar.</span>
            <span>Volver a empezar.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            La excelencia no es un momento: es la forma en que elegimos repetir
            cada movimiento.
          </p>
        </div>
        <Link
          to="/fundacion"
          className="relative z-10 inline-flex w-fit items-center gap-3 border border-primary px-6 py-4 font-display text-sm uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Conoce la Fundación
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
