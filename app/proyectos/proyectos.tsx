"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import proyectos from "@/app/data/proyectos.json";

type Proyecto = {
  slug: string;
  titulo: string;
  cliente?: string;
  obra?: string;
  categoria?: string;
  imagen: string;
  descripcion?: string;
};

const BRAND = {
  navy: "#182C45",
  gold: "#C9A66B",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProyectosContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  const categoriaQP = (searchParams.get("categoria") || "").trim();

  const categorias = useMemo(() => {
    const categoriasSet = new Set<string>();

    (proyectos as Proyecto[]).forEach((proyecto) => {
      const categoria = proyecto.categoria?.trim();

      if (categoria) {
        categoriasSet.add(categoria);
      }
    });

    return Array.from(categoriasSet).sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, []);

  const counts = useMemo(() => {
    const contador = new Map<string, number>();

    (proyectos as Proyecto[]).forEach((proyecto) => {
      const categoria = proyecto.categoria?.trim();

      if (!categoria) return;

      contador.set(categoria, (contador.get(categoria) || 0) + 1);
    });

    return contador;
  }, []);

  const listaFiltrada = useMemo(() => {
    if (!categoriaQP) {
      return proyectos as Proyecto[];
    }

    return (proyectos as Proyecto[]).filter(
      (proyecto) =>
        proyecto.categoria?.trim().toLowerCase() ===
        categoriaQP.toLowerCase()
    );
  }, [categoriaQP]);

  const titulo = categoriaQP
    ? `Proyectos – ${categoriaQP}`
    : "Nuestros Proyectos";

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pt-44 lg:px-8 lg:pb-24 lg:pt-52">
        {/* ENCABEZADO */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-12 max-w-4xl text-center lg:mb-14"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-0.5 w-10 bg-[#C9A66B]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A66B] sm:text-sm">
              Experiencia comprobada
            </span>

            <span className="h-0.5 w-10 bg-[#C9A66B]" />
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-[-0.035em] text-[#182C45] sm:text-5xl lg:text-7xl">
            {titulo}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Descubre nuestra trayectoria y experiencia en proyectos de
            ingeniería geotécnica desarrollados a nivel nacional.
          </p>
        </motion.div>

        {/* CATEGORÍAS */}
        <motion.nav
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-label="Categorías de proyectos"
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          <Link
            href="/proyectos"
            className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${
              !categoriaQP
                ? "border-[#182C45] bg-[#182C45] text-white shadow-[0_8px_20px_rgba(24,44,69,0.16)]"
                : "border-[#182C45]/25 bg-white text-[#182C45] hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
            }`}
          >
            Todas ({(proyectos as Proyecto[]).length})
          </Link>

          {categorias.map((categoria) => {
            const active =
              categoriaQP.toLowerCase() === categoria.toLowerCase();

            return (
              <Link
                key={categoria}
                href={`/proyectos?categoria=${encodeURIComponent(categoria)}`}
                className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  active
                    ? "border-[#182C45] bg-[#182C45] text-white shadow-[0_8px_20px_rgba(24,44,69,0.16)]"
                    : "border-[#182C45]/25 bg-white text-[#182C45] hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
                }`}
              >
                {categoria}
                {counts.get(categoria)
                  ? ` (${counts.get(categoria)})`
                  : ""}
              </Link>
            );
          })}
        </motion.nav>

        {/* RESULTADOS */}
        <AnimatePresence mode="wait">
          {listaFiltrada.length === 0 ? (
            <motion.div
              key="sin-resultados"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-[#182C45]/10 bg-slate-50 px-6 py-14 text-center"
            >
              <p className="text-base text-slate-600 sm:text-lg">
                No encontramos proyectos en{" "}
                <strong className="text-[#182C45]">
                  {categoriaQP}
                </strong>
                .
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={categoriaQP || "todos"}
              variants={containerVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {listaFiltrada.map((proyecto, index) => (
                <motion.article
                  key={proyecto.slug}
                  variants={cardVariants}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -8,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <Link
                    href={`/proyectos/${proyecto.slug}`}
                    aria-label={`Ver proyecto ${proyecto.titulo}`}
                    className="group block h-full"
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white shadow-[0_12px_34px_rgba(24,44,69,0.09)] transition-all duration-500 group-hover:border-[#C9A66B]/65 group-hover:shadow-[0_22px_52px_rgba(24,44,69,0.16)]">
                      {/* IMAGEN */}
                      <div className="relative h-64 overflow-hidden lg:h-72">
                        <Image
                          src={proyecto.imagen}
                          alt={proyecto.titulo}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/75 via-[#182C45]/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

                        {proyecto.categoria && (
                          <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#182C45]/88 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                            {proyecto.categoria}
                          </span>
                        )}

                        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="inline-flex rounded-full bg-[#C9A66B] px-5 py-2 text-sm font-bold text-[#182C45] shadow-lg">
                            Ver detalles
                          </span>
                        </div>
                      </div>

                      {/* INFORMACIÓN */}
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="mb-4 h-0.5 w-10 bg-[#C9A66B] transition-all duration-500 group-hover:w-16" />

                        <h2 className="text-xl font-extrabold leading-snug text-[#182C45] transition-colors duration-300 group-hover:text-[#C9A66B]">
                          {proyecto.titulo}
                        </h2>

                        <div className="mt-4 flex-1 space-y-3">
                          {proyecto.cliente && (
                            <div className="flex items-start gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A66B]" />

                              <p className="text-sm leading-6 text-slate-600">
                                <strong className="font-bold text-[#182C45]">
                                  Cliente:
                                </strong>{" "}
                                {proyecto.cliente}
                              </p>
                            </div>
                          )}

                          {proyecto.obra && (
                            <div className="flex items-start gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A66B]" />

                              <p className="text-sm leading-6 text-slate-600">
                                <strong className="font-bold text-[#182C45]">
                                  Obra:
                                </strong>{" "}
                                {proyecto.obra}
                              </p>
                            </div>
                          )}
                        </div>

                        <span className="mt-6 inline-flex items-center text-sm font-bold text-[#182C45] transition-colors duration-300 group-hover:text-[#C9A66B]">
                          Ver proyecto completo

                          <svg
                            aria-hidden="true"
                            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>

                      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#C9A66B] transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default function ProyectosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[420px] items-center justify-center bg-white px-4 pt-28 text-center text-slate-600">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#182C45]/20 border-t-[#C9A66B]" />

            <span className="text-sm font-semibold">
              Cargando proyectos…
            </span>
          </motion.div>
        </div>
      }
    >
      <ProyectosContent />
    </Suspense>
  );
}