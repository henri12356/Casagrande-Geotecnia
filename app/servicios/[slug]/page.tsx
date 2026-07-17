"use client";

import servicios from "@/app/data/servicios.json";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import NotFoundPage from "@/app/not-found";
import ServicioNav from "@/app/servicios/ServicioNav";
import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

/* =========================
   HERO DEL SERVICIO
========================= */

function HeroServicio({
  titulo,
  descripcion,
  imagen,
}: {
  titulo: string;
  descripcion: string;
  imagen: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-10 md:pt-36">
      <div className="relative h-[56vh] min-h-[450px] w-full overflow-hidden bg-[#182C45] md:h-80 lg:h-96">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 1.06,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={imagen}
            alt={titulo}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(24,44,69,0.94),rgba(24,44,69,0.66)_38%,rgba(24,44,69,0.24)_72%,rgba(24,44,69,0.12)_100%)]" />

        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="mx-auto w-full max-w-7xl px-4 pb-7 sm:px-6 md:pb-0 lg:px-8">
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
                duration: 0.72,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl rounded-2xl p-4 text-white md:rounded-none md:p-0"
            >
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4 h-0.5 w-14 origin-left bg-[#C9A66B]"
              />

              <h1 className="text-2xl font-extrabold leading-tight tracking-[-0.025em] text-white md:text-6xl">
                {titulo}
              </h1>

              <p
                className="mt-3 max-w-3xl overflow-hidden text-sm leading-6 text-white/90 md:text-lg md:leading-8"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {descripcion}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#C9A66B] px-4 py-2 text-sm font-bold text-[#182C45] shadow-md transition-colors duration-300 hover:bg-white md:text-base"
                  >
                    Solicitar cotización
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="#contenido"
                    className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45] md:text-base"
                  >
                    Ver detalles
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#C9A66B]"
        />

        <div className="absolute inset-x-0 bottom-3 flex justify-center md:hidden">
          <div className="h-1 w-12 rounded-full bg-white/35" />
        </div>
      </div>
    </section>
  );
}

/* =========================
   TIPOS
========================= */

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

/* =========================
   CONTADOR
========================= */

const CountingNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}> = ({
  value,
  duration = 2,
  suffix = "",
  start = false,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node || !start) return;

    const controller = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent =
          Math.round(latest).toLocaleString("es-PE") + suffix;
      },
    });

    return () => controller.stop();
  }, [value, duration, suffix, start]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

/* =========================
   SECCIÓN DE NÚMEROS
========================= */

const Numeros: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const isInViewContainer = useInView(containerRef, {
    once: true,
    amount: 0.25,
  });

  const sectionVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const statCardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-10 md:py-16 lg:px-6">
      <motion.div
        ref={containerRef}
        variants={sectionVariants}
        initial={reduceMotion ? false : "hidden"}
        animate={
          reduceMotion
            ? undefined
            : isInViewContainer
              ? "visible"
              : "hidden"
        }
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 text-center sm:grid-cols-2 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={statCardVariants}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -5,
                  }
            }
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#182C45] p-6 shadow-[0_14px_34px_rgba(24,44,69,0.16)]"
          >
            <span className="absolute inset-x-0 bottom-0 h-1 bg-[#C9A66B]" />

            <div className="mb-1 text-5xl font-black text-[#C9A66B] md:text-6xl">
              <CountingNumber
                value={stat.value}
                suffix={stat.suffix}
                duration={3}
                start={isInViewContainer}
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90 sm:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* =========================
   PÁGINA DEL SERVICIO
========================= */

const ServicioPage = ({ params }: PageProps) => {
  const { slug } = React.use(params);
  const servicio = servicios.find((item) => item.slug === slug);
  const reduceMotion = useReducedMotion();

  const [imagenModal, setImagenModal] = useState({
    abierto: false,
    src: "",
    titulo: "",
    imagenes: [] as string[],
    indiceActual: 0,
  });

  const abrirModalImagen = (
    src: string,
    titulo: string,
    categoriaIndex?: number
  ) => {
    let imagenes: string[] = [];
    let indiceActual = 0;

    if (
      categoriaIndex !== undefined &&
      servicio?.categorias
    ) {
      imagenes =
        servicio.categorias[categoriaIndex].imagenes;
      indiceActual = imagenes.indexOf(src);
    } else {
      imagenes = [src];
    }

    setImagenModal({
      abierto: true,
      src,
      titulo,
      imagenes,
      indiceActual,
    });
  };

  const cerrarModalImagen = () => {
    setImagenModal({
      abierto: false,
      src: "",
      titulo: "",
      imagenes: [],
      indiceActual: 0,
    });
  };

  const siguienteImagen = () => {
    setImagenModal((prev) => {
      if (!prev.imagenes.length) return prev;

      const nuevoIndice =
        (prev.indiceActual + 1) % prev.imagenes.length;

      return {
        ...prev,
        indiceActual: nuevoIndice,
        src: prev.imagenes[nuevoIndice],
      };
    });
  };

  const anteriorImagen = () => {
    setImagenModal((prev) => {
      if (!prev.imagenes.length) return prev;

      const nuevoIndice =
        (prev.indiceActual - 1 + prev.imagenes.length) %
        prev.imagenes.length;

      return {
        ...prev,
        indiceActual: nuevoIndice,
        src: prev.imagenes[nuevoIndice],
      };
    });
  };

  useEffect(() => {
    if (!imagenModal.abierto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cerrarModalImagen();
      }

      if (
        event.key === "ArrowRight" &&
        imagenModal.imagenes.length > 1
      ) {
        siguienteImagen();
      }

      if (
        event.key === "ArrowLeft" &&
        imagenModal.imagenes.length > 1
      ) {
        anteriorImagen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagenModal.abierto, imagenModal.imagenes.length]);

  if (!servicio) return <NotFoundPage />;

  return (
    <>
      <Navbar />

      <HeroServicio
        titulo={servicio.titulo}
        descripcion={servicio.descripcion}
        imagen={servicio.imagen}
      />

      <ServicioNav />

      <main
        id="contenido"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
      >
        {/* INTRODUCCIÓN */}
        <motion.section
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white p-6 shadow-[0_12px_34px_rgba(24,44,69,0.08)] sm:p-8"
        >
          <div className="mb-4 h-0.5 w-12 bg-[#C9A66B]" />

          <h2 className="mb-4 text-2xl font-extrabold text-[#182C45] md:text-3xl">
            {servicio.titulo01 || servicio.titulo}
          </h2>

          <p className="text-base leading-8 text-slate-600 md:text-lg">
            {servicio.subtitulo01 || servicio.descripcion}
          </p>
        </motion.section>

        {/* CATEGORÍAS */}
        <div className="mb-16 space-y-10">
          {servicio.categorias?.map((categoria, index) => (
            <motion.section
              key={`${categoria.titulo}-${index}`}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
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
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.62,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white p-5 shadow-[0_12px_34px_rgba(24,44,69,0.07)] sm:p-6"
            >
              <div className="grid gap-8 md:grid-cols-2">
                {/* TEXTO */}
                <div>
                  <div className="mb-4 flex items-center gap-3 border-b border-[#182C45]/10 pb-3">
                    <span className="h-0.5 w-8 shrink-0 bg-[#C9A66B]" />

                    <h3 className="text-xl font-extrabold text-[#182C45]">
                      {categoria.titulo}
                    </h3>
                  </div>

                  <p className="mb-5 leading-7 text-slate-600">
                    {categoria.descripcion}
                  </p>

                  <ul className="space-y-3">
                    {categoria.ensayos.map((ensayo, idx) => (
                      <li
                        key={`${ensayo}-${idx}`}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A66B]" />

                        <span className="leading-6 text-slate-700">
                          {ensayo}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GALERÍA */}
                <div>
                  <h4 className="mb-4 text-lg font-bold text-[#182C45]">
                    Galería
                  </h4>

                  <div className="space-y-4">
                    {categoria.imagenes.length > 0 && (
                      <motion.button
                        type="button"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -3,
                              }
                        }
                        whileTap={{ scale: 0.99 }}
                        onClick={() =>
                          abrirModalImagen(
                            categoria.imagenes[0],
                            categoria.titulo,
                            index
                          )
                        }
                        className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-[#182C45]/15 bg-slate-100 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
                        aria-label={`Ampliar imagen principal de ${categoria.titulo}`}
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={categoria.imagenes[0]}
                            alt={`${categoria.titulo} - Imagen principal`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/75 via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 bg-[#182C45]/82 p-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#C9A66B] group-hover:text-[#182C45]">
                          Imagen principal — clic para ampliar
                        </div>
                      </motion.button>
                    )}

                    {categoria.imagenes.length > 1 && (
                      <div className="grid grid-cols-3 gap-2.5">
                        {categoria.imagenes
                          .slice(1, 4)
                          .map((imagen, imgIndex) => (
                            <motion.button
                              type="button"
                              key={`${imagen}-${imgIndex}`}
                              whileHover={
                                reduceMotion
                                  ? undefined
                                  : {
                                      y: -3,
                                    }
                              }
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                abrirModalImagen(
                                  imagen,
                                  categoria.titulo,
                                  index
                                )
                              }
                              className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#182C45]/12 bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
                              aria-label={`Ampliar imagen ${imgIndex + 2} de ${categoria.titulo}`}
                            >
                              <div className="relative aspect-square">
                                <Image
                                  src={imagen}
                                  alt={`${categoria.titulo} - Imagen ${imgIndex + 2}`}
                                  fill
                                  sizes="(max-width: 768px) 33vw, 16vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-[#182C45]/0 transition-colors duration-300 group-hover:bg-[#182C45]/15" />
                              </div>
                            </motion.button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* CERTIFICACIONES */}
        <motion.section
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
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
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 rounded-3xl bg-[#182C45]/[0.035] p-6 text-[#182C45] md:p-10"
        >
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-[#C9A66B]" />
              <BadgeCheck className="h-6 w-6 text-[#C9A66B]" />
              <span className="h-0.5 w-10 bg-[#C9A66B]" />
            </div>

            <h3 className="text-2xl font-black text-[#182C45] md:text-3xl">
              CALIBRACIÓN CERTIFICADA E ISO
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              En <strong className="text-[#182C45]">Casagrande</strong>{" "}
              garantizamos la precisión de cada ensayo. Nuestros{" "}
              <strong className="text-[#182C45]">
                equipos de campo y laboratorio
              </strong>{" "}
              son calibrados por{" "}
              <strong className="text-[#182C45]">Pinzuar</strong>,
              proveedor acreditado ante{" "}
              <strong className="text-[#182C45]">INACAL</strong>{" "}
              bajo la norma{" "}
              <strong className="text-[#182C45]">
                ISO/IEC 17025
              </strong>
              . Esto respalda una trazabilidad metrológica completa y
              resultados confiables, verificables y certificados.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              className="rounded-2xl border border-[#182C45]/10 bg-white p-6 shadow-[0_10px_28px_rgba(24,44,69,0.07)]"
            >
              <div className="mb-4 h-0.5 w-10 bg-[#C9A66B]" />

              <h4 className="mb-4 text-lg font-extrabold text-[#182C45]">
                Trazabilidad Metrológica (INACAL)
              </h4>

              <ul className="space-y-3 text-sm leading-7 text-slate-600 md:text-base">
                {[
                  "Equipos de campo y laboratorio calibrados por Pinzuar, laboratorio acreditado ante INACAL.",
                  "Certificados con trazabilidad según la norma ISO/IEC 17025.",
                  "Control de vigencia, número de certificado y verificación interna periódica.",
                  "Registro digital y físico de calibraciones y mantenimiento preventivo.",
                  "Verificación previa a cada campaña o ensayo para garantizar la exactitud.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#C9A66B]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              className="rounded-2xl border border-[#182C45]/10 bg-white p-6 shadow-[0_10px_28px_rgba(24,44,69,0.07)]"
            >
              <div className="mb-4 h-0.5 w-10 bg-[#C9A66B]" />

              <h4 className="mb-4 text-lg font-extrabold text-[#182C45]">
                Sistema de Gestión Integrado
              </h4>

              <ul className="space-y-3 text-sm leading-7 text-slate-600 md:text-base">
                {[
                  "ISO 9001:2015 – Calidad: procesos estandarizados y mejora continua.",
                  "ISO 14001:2015 – Ambiental: compromiso con la sostenibilidad.",
                  "ISO 37001:2016 – Antisoborno: ética, transparencia y control contractual.",
                  "Procedimientos normalizados MTC, ASTM y NTP para campo, laboratorio e informes.",
                  "Seguimiento de indicadores y auditorías internas de calidad y cumplimiento.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#C9A66B]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {[
              "+130 ensayos de calidad en suelos, rocas, concreto y asfalto",
              "Equipos calibrados por Pinzuar con respaldo de INACAL",
              "Resultados precisos y verificables",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#C9A66B]/45 bg-[#C9A66B]/10 px-3 py-1.5 text-xs font-semibold text-[#182C45] md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {servicio.numeros && (
            <Numeros stats={servicio.numeros} />
          )}
        </motion.section>

        {/* CONTACTO */}
        <motion.section
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden rounded-3xl bg-[#182C45] shadow-[0_22px_55px_rgba(24,44,69,0.2)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-5 h-0.5 w-12 bg-[#C9A66B]" />

              <h3 className="mb-7 text-2xl font-extrabold text-white lg:text-3xl">
                Contáctanos
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+51945513323"
                  className="group flex items-center gap-4 text-base text-white/85 transition-colors hover:text-[#C9A66B] sm:text-lg"
                >
                  <FaPhoneAlt className="h-5 w-5 shrink-0 text-[#C9A66B] transition-transform duration-300 group-hover:scale-110" />
                  <span>+51 945 513 323</span>
                </a>

                <a
                  href="mailto:comercial@casagrandegeotecnia.com.pe"
                  className="group flex items-start gap-4 text-base text-white/85 transition-colors hover:text-[#C9A66B] sm:text-lg"
                >
                  <FaEnvelope className="mt-1 h-5 w-5 shrink-0 text-[#C9A66B] transition-transform duration-300 group-hover:scale-110" />

                  <span className="break-all sm:break-normal">
                    comercial@casagrandegeotecnia.com.pe
                  </span>
                </a>

                <p className="flex items-center gap-4 text-base text-white/85 sm:text-lg">
                  <FaClock className="h-5 w-5 shrink-0 text-[#C9A66B]" />
                  <span>Lun - Vie: 8:00 AM - 6:00 PM</span>
                </p>

                <p className="flex items-center gap-4 text-base text-white/85 sm:text-lg">
                  <FaClock className="h-5 w-5 shrink-0 text-[#C9A66B]" />
                  <span>Sáb: 8:30 AM - 2:00 PM</span>
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.045] p-6 sm:p-8 md:border-l md:border-t-0 md:p-12">
              <div className="mb-5 h-0.5 w-12 bg-[#C9A66B]" />

              <h3 className="mb-7 text-2xl font-extrabold text-white lg:text-3xl">
                Solicita un Servicio
              </h3>

              <div className="space-y-4">
                <Button
                  asChild
                  className="h-14 w-full rounded-xl bg-[#C9A66B] px-6 text-base font-extrabold text-[#182C45] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-lg"
                >
                  <a
                    href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar cotización
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 w-full rounded-xl border-white/45 bg-transparent px-6 text-base font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#182C45] sm:text-lg"
                >
                  <a
                    href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar visita técnica
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* MODAL DE IMÁGENES */}
      <AnimatePresence>
        {imagenModal.abierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#08111C]/95 p-4 backdrop-blur-sm"
            onClick={cerrarModalImagen}
            role="dialog"
            aria-modal="true"
            aria-label={imagenModal.titulo}
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.94,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex max-h-[92vh] w-full max-w-7xl flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={cerrarModalImagen}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
                aria-label="Cerrar galería"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative h-[78vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imagenModal.src}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.985,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.99,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={imagenModal.src}
                      alt={imagenModal.titulo}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {imagenModal.imagenes.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        anteriorImagen();
                      }}
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#182C45]/75 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        siguienteImagen();
                      }}
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#182C45]/75 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#182C45]/80 px-4 py-1.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm">
                      {imagenModal.indiceActual + 1} /{" "}
                      {imagenModal.imagenes.length}
                    </div>
                  </>
                )}
              </div>

              <h4 className="mt-4 text-center text-lg font-semibold text-white">
                {imagenModal.titulo}
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default ServicioPage;