import { ArrowUpRight } from "lucide-react";
import { kicks } from "@/data/kicks";

export function KicksSection() {
  return (
    <section
      id="tecnicas"
      data-home-scene="dojo"
      className="border-y border-border bg-card/40"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <p className="eyebrow">05 — Técnica de piernas</p>
        <h2 className="mt-3 text-4xl uppercase">Patadas esenciales</h2>
        <div className="kick-perspective mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kicks.map((kick, index) => (
            <article
              key={kick.name}
              className="kick-card group relative min-h-72 overflow-hidden border border-border bg-background p-6"
              data-kick-index={index}
            >
              <div
                className="kick-depth absolute -right-6 -top-5 font-display text-8xl text-primary/10"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative flex h-full flex-col">
                <p className="text-3xl text-primary">{kick.hangul}</p>
                <h3 className="mt-4 text-2xl uppercase">{kick.name}</h3>
                <p className="mt-1 text-xs uppercase text-primary">
                  {kick.translation}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {kick.description}
                </p>
                <div className="mt-auto flex items-end justify-between pt-6">
                  <span className="border border-border px-2 py-1 font-display text-[10px] uppercase text-muted-foreground">
                    {kick.level}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
