"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ExternalLink,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Footer from "../footer";
import Navbar from "../navbar";

type Certificado = {
  id: number;
  titulo: string;
  archivo: string;
  fecha: string;
  categoria: string;
  imagenPreview: string;
};

const certificadoHero = {
  titulo: "Calibración y verificación de equipos — Pinzuar (INACAL)",
  archivo: "/certificadoinacal.webp",
  fecha: "2024",
  categoria: "Equipos",
  imagenPreview: "/certificadoinacal.webp",
};

const certificadosData: Certificado[] = [
  {
    id: 2,
    titulo: "Alcance 11-LAC-004",
    archivo: "/Alcance11-LAC-004.pdf",
    fecha: "",
    categoria: "",
    imagenPreview: "/Alcance11-LAC-004.webp",
  },
  {
    id: 3,
    titulo: "Alcance Perú LC-079",
    archivo: "/AlcancePerúLC-079.pdf",
    fecha: "2024",
    categoria: "Procedimientos",
    imagenPreview: "/AlcancePerúLC-079.webp",
  },
  {
    id: 4,
    titulo: "Constancia producto CO22.01258",
    archivo: "/ConstanciaproductoCO22.01258.pdf",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/ConstanciaproductoCO22.01258.webp",
  },
  {
    id: 5,
    titulo: "Certificado producto CO22.01258",
    archivo: "/CertificadoproductoCO22.01258.pdf",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/CertificadoproductoCO22.01258.webp",
  },
  {
    id: 6,
    titulo: "Certificado producto CO22.01258",
    archivo: "/CertificadoISO9001-CO22.08421.webp",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/CertificadoproductoCO22.01258.webp",
  },
];

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const CertificadosPage = () => {
  const reduceMotion = useReducedMotion();
  const [categoriaActiva, setCategoriaActiva] =
    useState<string>("Todos");

  const categorias = useMemo(() => {
    const categoriasUnicas = Array.from(
      new Set(
        certificadosData
          .map((certificado) => certificado.categoria.trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "es"));

    return ["Todos", ...categoriasUnicas];
  }, []);

  const certificadosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") {
      return certificadosData;
    }

    return certificadosData.filter(
      (certificado) =>
        certificado.categoria === categoriaActiva
    );
  }, [categoriaActiva]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-56 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            variants={headerItemVariants}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-0.5 w-10 bg-[#C9A66B]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A66B] sm:text-sm">
              Precisión y trazabilidad
            </span>

            <span className="h-0.5 w-10 bg-[#C9A66B]" />
          </motion.div>

          <motion.h1
            variants={headerItemVariants}
            className="text-4xl font-black leading-tight tracking-[-0.035em] text-[#182C45] md:text-6xl"
          >
            Alianza técnica Casagrande × Pinzuar
          </motion.h1>

          <motion.p
            variants={headerItemVariants}
            className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base md:leading-8"
          >
            Equipos calibrados y verificados por un proveedor acreditado
            ante INACAL, respaldando la precisión y trazabilidad de nuestros
            ensayos geotécnicos.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ALIANZA Y DATOS */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -28,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.68,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex w-full flex-col items-center text-center"
          >
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
              <Image
                src="/logocasagrande.svg"
                alt="Casagrande Geotecnia"
                width={220}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />

              <span className="text-4xl font-black leading-none text-[#C9A66B] sm:text-5xl">
                +
              </span>

              <Image
                src="/logopinzuar.webp"
                alt="Pinzuar"
                width={220}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {[
                "Trazabilidad INACAL",
                "Normas ASTM",
                "Resultados verificables",
              ].map((etiqueta) => (
                <span
                  key={etiqueta}
                  className="rounded-full border border-[#C9A66B]/45 bg-[#C9A66B]/10 px-3 py-1.5 text-xs font-semibold text-[#182C45]"
                >
                  {etiqueta}
                </span>
              ))}
            </div>

            <div className="mt-6 flex max-w-xl items-start gap-3 border-l-2 border-[#C9A66B] bg-[#182C45]/[0.035] px-4 py-3 text-left">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A66B]" />

              <p className="text-xs leading-5 text-slate-600">
                Casagrande no posee acreditación INACAL corporativa. La
                evidencia corresponde a la calibración y verificación de
                equipos realizada por Pinzuar, proveedor acreditado ante
                INACAL.
              </p>
            </div>

            <motion.a
              href="/equipos"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              whileTap={{ scale: 0.97 }}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#182C45] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(24,44,69,0.16)] transition-colors duration-300 hover:bg-[#C9A66B] hover:text-[#182C45] md:text-base"
            >
              Ver nuestros equipos
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* CERTIFICADO PRINCIPAL */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.68,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            <motion.a
              href={certificadoHero.archivo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              className="group block"
              aria-label={`Ver ${certificadoHero.titulo}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#182C45]/10 bg-slate-50 shadow-[0_18px_50px_rgba(24,44,69,0.14)]">
                <Image
                  src={certificadoHero.imagenPreview}
                  alt={certificadoHero.titulo}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-lg bg-[#C9A66B] px-4 py-2 text-sm font-bold text-[#182C45] opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  Ver documento
                  <ExternalLink className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-sm font-bold text-[#182C45] sm:text-base">
                  {certificadoHero.titulo}
                </h2>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICADOS */}
      <section className="border-t border-[#182C45]/10 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-9 text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-[#C9A66B]" />
              <FileCheck2 className="h-5 w-5 text-[#C9A66B]" />
              <span className="h-0.5 w-8 bg-[#C9A66B]" />
            </div>

            <h2 className="text-2xl font-black text-[#182C45] md:text-3xl">
              Nuestros Certificados
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Selecciona una categoría para consultar la documentación.
            </p>
          </motion.div>

          {/* FILTROS */}
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {categorias.map((categoria) => {
              const active = categoriaActiva === categoria;

              return (
                <motion.button
                  key={categoria}
                  type="button"
                  onClick={() => setCategoriaActiva(categoria)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 md:text-sm ${
                    active
                      ? "border-[#182C45] bg-[#182C45] text-white shadow-[0_8px_18px_rgba(24,44,69,0.15)]"
                      : "border-[#182C45]/20 bg-white text-[#182C45] hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
                  }`}
                >
                  {categoria}
                </motion.button>
              );
            })}
          </div>

          {/* GRID */}
          <AnimatePresence mode="wait">
            {certificadosFiltrados.length > 0 ? (
              <motion.div
                key={categoriaActiva}
                variants={gridVariants}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 10,
                      }
                }
                className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
              >
                {certificadosFiltrados.map((certificado) => (
                  <motion.article
                    key={certificado.id}
                    variants={cardVariants}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    transition={{
                      duration: 0.28,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={certificado.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                      aria-label={`Ver ${certificado.titulo}`}
                    >
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white shadow-[0_10px_30px_rgba(24,44,69,0.08)] transition-all duration-400 group-hover:border-[#C9A66B]/60 group-hover:shadow-[0_18px_44px_rgba(24,44,69,0.15)]">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                          <Image
                            src={certificado.imagenPreview}
                            alt={certificado.titulo}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                          />

                          <div className="absolute inset-0 flex items-center justify-center bg-[#182C45]/0 transition-colors duration-400 group-hover:bg-[#182C45]/45">
                            <span className="inline-flex translate-y-3 items-center gap-2 rounded-lg bg-[#C9A66B] px-4 py-2 text-sm font-bold text-[#182C45] opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                              Ver documento
                              <ExternalLink className="h-4 w-4" />
                            </span>
                          </div>

                          {certificado.categoria && (
                            <span className="absolute left-3 top-3 rounded-full bg-[#182C45]/90 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                              {certificado.categoria}
                            </span>
                          )}

                          {certificado.fecha && (
                            <span className="absolute bottom-3 right-3 rounded-md bg-[#C9A66B] px-2.5 py-1 text-[11px] font-bold text-[#182C45]">
                              {certificado.fecha}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-1 items-center justify-center p-4 text-center">
                          <h3 className="line-clamp-2 text-sm font-bold leading-6 text-[#182C45] transition-colors duration-300 group-hover:text-[#C9A66B] md:text-base">
                            {certificado.titulo}
                          </h3>
                        </div>

                        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#C9A66B] transition-transform duration-500 group-hover:scale-x-100" />
                      </div>
                    </a>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="sin-resultados"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="rounded-2xl border border-[#182C45]/10 bg-white px-6 py-14 text-center text-slate-500"
              >
                No se encontraron certificados en esta categoría.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CertificadosPage;