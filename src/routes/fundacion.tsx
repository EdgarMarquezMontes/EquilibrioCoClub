import { createFileRoute } from "@tanstack/react-router";
import dojang from "@/assets/dojang.jpg";
import maestro1 from "@/assets/maestro-1.jpg";
import maestro2 from "@/assets/maestro-2.jpg";
import maestro3 from "@/assets/maestro-3.jpg";
import maestro4 from "@/assets/maestro-4.jpg";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/fundacion")({
  head: () => ({
    meta: [
      { title: createPageTitle("Fundación") },
      {
        name: "description",
        content:
          "Conoce la Fundación Deportiva Equilibrio de Colombia: su misión, su historia y el cuerpo de maestros con rangos, estudios y contacto.",
      },
      {
        property: "og:title",
        content: "La Fundación y sus Maestros | Equilibrio",
      },
      {
        property: "og:description",
        content:
          "Misión, valores y cuerpo técnico de la Fundación Deportiva Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fundacion,
});

const maestros = [
  {
    nombre: "Mtro. Andrés Felipe Rojas",
    foto: maestro1,
    rango: "5º Dan · Kukkiwon",
    rol: "Director técnico",
    descripcion:
      "Fundador del programa competitivo de Equilibrio. Trabaja el kyorugi moderno con énfasis en lectura táctica y preparación mental.",
    estudios: [
      "Licenciado en Educación Física — Universidad Pedagógica Nacional",
      "Entrenador Nivel III — Federación Colombiana de Taekwondo",
      "Certificación de árbitro nacional WT",
    ],
    email: "andres.rojas@fundacionequilibrio.co",
    tel: "+57 300 111 2233",
  },
  {
    nombre: "Mtra. Laura Catalina Mejía",
    foto: maestro2,
    rango: "4º Dan · Kukkiwon",
    rol: "Directora de poomsae",
    descripcion:
      "Especialista en formas reconocidas y libres. Dirige la escuela infantil y el proceso de exámenes de grado.",
    estudios: [
      "Profesional en Ciencias del Deporte — Universidad de Ciencias Aplicadas",
      "Seminario internacional de Poomsae — Kukkiwon, Seúl",
      "Diplomado en pedagogía infantil deportiva",
    ],
    email: "laura.mejia@fundacionequilibrio.co",
    tel: "+57 301 222 3344",
  },
  {
    nombre: "Mtro. Julián Esteban Cárdenas",
    foto: maestro3,
    rango: "3er Dan · Kukkiwon",
    rol: "Preparación física",
    descripcion:
      "Responsable del acondicionamiento, prevención de lesiones y periodización para atletas de selección departamental.",
    estudios: [
      "Fisioterapeuta — Universidad Nacional de Colombia",
      "Especialización en entrenamiento deportivo",
      "Certificación en primeros auxilios deportivos",
    ],
    email: "julian.cardenas@fundacionequilibrio.co",
    tel: "+57 302 333 4455",
  },
  {
    nombre: "Mtra. Sofía Alejandra Torres",
    foto: maestro4,
    rango: "2º Dan · Kukkiwon",
    rol: "Cultura coreana y arbitraje",
    descripcion:
      "Enseña terminología coreana, etiqueta del dojang y protocolo de competencia. Árbitro regional en activo.",
    estudios: [
      "Licenciada en Lenguas Modernas",
      "Curso de coreano básico — Centro Cultural Coreano en Colombia",
      "Curso de arbitraje regional WT",
    ],
    email: "sofia.torres@fundacionequilibrio.co",
    tel: "+57 304 444 5566",
  },
];

function Fundacion() {
  return (
    <div>
      <section className="relative border-b border-border">
        <img
          src={dojang}
          alt="Estudiantes de la fundación saludando en el dojang"
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        <div className="relative mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <p className="eyebrow reveal">Colombia · Desde 2009</p>
          <h1 className="reveal mt-5 max-w-4xl text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            Fundación Deportiva <span className="text-primary">Equilibrio</span>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-muted-foreground">
            Formamos personas antes que atletas. Usamos el Taekwondo como
            herramienta social, educativa y competitiva para niños, jóvenes y
            adultos de nuestras comunidades.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            [
              "Misión",
              "Formar seres humanos disciplinados y solidarios a través de la práctica seria del Taekwondo, con acceso para todos los estratos.",
            ],
            [
              "Visión",
              "Ser referente nacional en formación técnica y humana, llevando atletas a selección Colombia y maestros a la docencia.",
            ],
            [
              "Valores",
              "Cortesía, integridad, perseverancia, autocontrol y espíritu indomable — no como lema, sino como conducta diaria.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="bg-background p-8">
              <h2 className="text-2xl uppercase text-primary">{t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
          <p className="eyebrow">Cuerpo técnico</p>
          <h2 className="mt-3 text-4xl uppercase">Nuestros maestros</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Datos de referencia — edítalos con la información real de la
            fundación.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {maestros.map((m) => (
              <article
                key={m.nombre}
                className="group border border-border bg-background p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={m.foto}
                      alt={`Retrato de ${m.nombre}`}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
                    />
                    <div>
                      <h3 className="text-2xl uppercase">{m.nombre}</h3>
                      <p className="mt-1 font-display text-sm uppercase tracking-[0.2em] text-primary">
                        {m.rango}
                      </p>
                    </div>
                  </div>
                  <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {m.rol}
                  </span>
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  {m.descripcion}
                </p>

                <p className="eyebrow mt-6">Estudios</p>
                <ul className="mt-3 space-y-2">
                  {m.estudios.map((e) => (
                    <li
                      key={e}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 block h-px w-5 shrink-0 bg-primary" />
                      {e}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-5 text-sm">
                  <a
                    href={`mailto:${m.email}`}
                    className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {m.email}
                  </a>
                  <a
                    href={`tel:${m.tel.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {m.tel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
