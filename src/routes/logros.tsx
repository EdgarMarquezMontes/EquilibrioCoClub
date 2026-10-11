import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/logros")({
  head: () => ({
    meta: [
      { title: createPageTitle("Logros") },
      {
        name: "description",
        content:
          "Palmarés editable de la Fundación Deportiva Equilibrio: medallas, títulos y ascensos de grado de alumnos y maestros.",
      },
      {
        property: "og:title",
        content: "Logros de Alumnos y Maestros | Equilibrio",
      },
      {
        property: "og:description",
        content: "Medallas, títulos y ascensos de la Fundación Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logros,
});

type Logro = {
  id: string;
  anio: string;
  titulo: string;
  persona: string;
  categoria: string;
  detalle: string;
};

const iniciales: Logro[] = [
  {
    id: "1",
    anio: "2024",
    titulo: "Oro — Campeonato Nacional Interligas",
    persona: "Valentina Ruiz",
    categoria: "Alumno",
    detalle: "Categoría juvenil -49 kg, kyorugi. Selección Bogotá.",
  },
  {
    id: "2",
    anio: "2024",
    titulo: "Plata — Open Panamericano de Poomsae",
    persona: "Mtra. Laura Catalina Mejía",
    categoria: "Maestro",
    detalle: "Poomsae individual sénior, forma reconocida Koryo.",
  },
  {
    id: "3",
    anio: "2023",
    titulo: "Ascenso a 5º Dan Kukkiwon",
    persona: "Mtro. Andrés Felipe Rojas",
    categoria: "Maestro",
    detalle: "Examen certificado en Seúl, Corea del Sur.",
  },
  {
    id: "4",
    anio: "2023",
    titulo: "Bronce — Juegos Departamentales",
    persona: "Samuel Ortiz",
    categoria: "Alumno",
    detalle: "Categoría infantil -37 kg, primer podio nacional.",
  },
];

const KEY = "equilibrio_logros";

function Logros() {
  const [logros, setLogros] = useState<Logro[]>(iniciales);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<Omit<Logro, "id">>({
    anio: "",
    titulo: "",
    persona: "",
    categoria: "Alumno",
    detalle: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setLogros(JSON.parse(raw) as Logro[]);
      } catch {}
    }
  }, []);

  const guardar = (next: Logro[]) => {
    setLogros(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const agregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    guardar([{ ...form, id: crypto.randomUUID() }, ...logros]);
    setForm({
      anio: "",
      titulo: "",
      persona: "",
      categoria: "Alumno",
      detalle: "",
    });
  };

  const actualizar = (id: string, campo: keyof Logro, valor: string) =>
    guardar(logros.map((l) => (l.id === id ? { ...l, [campo]: valor } : l)));

  const eliminar = (id: string) => guardar(logros.filter((l) => l.id !== id));

  const restaurar = () => {
    localStorage.removeItem(KEY);
    setLogros(iniciales);
  };

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <p className="eyebrow reveal">Palmarés</p>
      <h1 className="reveal mt-4 text-5xl uppercase leading-[0.95]">
        Logros de <span className="text-primary">alumnos y maestros</span>
      </h1>
      <p className="reveal mt-5 max-w-2xl text-muted-foreground">
        Cada medalla es la consecuencia de miles de repeticiones. Puedes editar,
        agregar o eliminar logros; los cambios se guardan en este navegador.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => setEditando((v) => !v)}
          className="border border-primary px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {editando ? "Terminar edición" : "Editar logros"}
        </button>
        {editando && (
          <button
            onClick={restaurar}
            className="border border-border px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Restaurar ejemplo
          </button>
        )}
      </div>

      {editando && (
        <form
          onSubmit={agregar}
          className="reveal mt-8 grid gap-3 border border-border bg-card/60 p-6 sm:grid-cols-2"
        >
          <h2 className="text-2xl uppercase sm:col-span-2">Nuevo logro</h2>
          <input
            className="border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            placeholder="Año"
            value={form.anio}
            onChange={(e) => setForm({ ...form, anio: e.target.value })}
          />
          <select
            className="border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option>Alumno</option>
            <option>Maestro</option>
            <option>Fundación</option>
          </select>
          <input
            className="border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary sm:col-span-2"
            placeholder="Título del logro"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
          <input
            className="border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            placeholder="Nombre"
            value={form.persona}
            onChange={(e) => setForm({ ...form, persona: e.target.value })}
          />
          <input
            className="border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
            placeholder="Detalle"
            value={form.detalle}
            onChange={(e) => setForm({ ...form, detalle: e.target.value })}
          />
          <button
            type="submit"
            className="border border-primary bg-primary px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-primary-foreground sm:col-span-2"
          >
            Agregar logro
          </button>
        </form>
      )}

      <div className="mt-12 space-y-px bg-border">
        {logros.map((l) => (
          <article
            key={l.id}
            className="group grid gap-4 bg-background p-6 transition-colors duration-300 hover:bg-card sm:grid-cols-[90px_1fr_auto]"
          >
            <p className="font-display text-3xl text-primary">{l.anio}</p>
            <div>
              {editando ? (
                <div className="grid gap-2">
                  <input
                    className="border border-border bg-card px-3 py-1 text-sm"
                    value={l.titulo}
                    onChange={(e) => actualizar(l.id, "titulo", e.target.value)}
                  />
                  <input
                    className="border border-border bg-card px-3 py-1 text-sm"
                    value={l.persona}
                    onChange={(e) =>
                      actualizar(l.id, "persona", e.target.value)
                    }
                  />
                  <input
                    className="border border-border bg-card px-3 py-1 text-sm"
                    value={l.detalle}
                    onChange={(e) =>
                      actualizar(l.id, "detalle", e.target.value)
                    }
                  />
                  <input
                    className="w-24 border border-border bg-card px-3 py-1 text-sm"
                    value={l.anio}
                    onChange={(e) => actualizar(l.id, "anio", e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl uppercase">{l.titulo}</h2>
                  <p className="mt-1 text-sm text-primary">{l.persona}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {l.detalle}
                  </p>
                </>
              )}
            </div>
            <div className="flex items-start gap-3">
              <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {l.categoria}
              </span>
              {editando && (
                <button
                  onClick={() => eliminar(l.id)}
                  className="border border-destructive px-3 py-1 text-xs uppercase tracking-[0.15em] text-destructive"
                >
                  Eliminar
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
