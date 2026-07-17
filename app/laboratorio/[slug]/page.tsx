"use client";

import laboratorioData from "@/app/data/laboratorio.json";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import NotFoundPage from "@/app/not-found";
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
import {
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import LaboratorioNav from "../ServicioNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

interface CategoriaLaboratorio {
  titulo: string;
  descripcion: string;
  ensayos: string[];
  imagenes: string[];
}

interface Laboratorio {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  titulo01?: string;
  subtitulo01?: string;
  categorias?: CategoriaLaboratorio[];
  numeros?: Stat[];
}

interface ImagenModal {
  abierto: boolean;
  src: string;
  titulo: string;
  imagenes: string[];
  indiceActual: number;
}

/* =========================
   HERO DEL LABORATORIO
========================= */

function HeroLaboratorio({
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
              className="max-w-4xl text-white"
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

              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 md:text-lg md:leading-8">
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
                    href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios%20de%20laboratorio."
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
      </div>
    </section>
  );
}

/* =========================
   CONTADOR
========================= */

const CountingNumber = ({
  value,
  duration = 3,
  suffix = "",
  start = false,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node || !start) return;

    const controller = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
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
   NÚMEROS
========================= */

const Numeros = ({ stats }: { stats: Stat[] }) => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
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

  const statVariants: Variants = {
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
    <section className="py-12 md:py-16">
      <motion.div
        ref={containerRef}
        variants={sectionVariants}
        initial={reduceMotion ? false : "hidden"}
        animate={
          reduceMotion
            ? undefined
            : isInView
              ? "visible"
              : "hidden"
        }
        className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={statVariants}
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
            className="relative flex min-h-[170px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#182C45] p-5 shadow-[0_14px_34px_rgba(24,44,69,0.16)] md:p-6"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-[#C9A66B]" />

            <div className="text-4xl font-black text-[#C9A66B] sm:text-5xl md:text-6xl">
              <CountingNumber
                value={stat.value}
                suffix={stat.suffix}
                duration={3}
                start={isInView}
              />
            </div>

            <div className="my-4 h-px w-10 bg-white/20" />

            <p className="text-xs font-bold uppercase leading-5 tracking-[0.08em] text-white/90 sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* =========================
   PÁGINA DEL LABORATORIO
========================= */

const LaboratorioPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const reduceMotion = useReducedMotion();

  const servicio = (laboratorioData as Laboratorio[]).find(
    (item) => item.slug === slug
  );

  const [imagenModal, setImagenModal] = useState<ImagenModal>({
    abierto: false,
    src: "",
    titulo: "",
    imagenes: [],
    indiceActual: 0,
  });

  const abrirModal = (
    src: string,
    titulo: string,
    imagenes: string[]
  ) => {
    const indiceActual = Math.max(imagenes.indexOf(src), 0);

    setImagenModal({
      abierto: true,
      src,
      titulo,
      imagenes,
      indiceActual,
    });
  };

  const cerrarModal = () => {
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

      const indiceActual =
        (prev.indiceActual + 1) % prev.imagenes.length;

      return {
        ...prev,
        indiceActual,
        src: prev.imagenes[indiceActual],
      };
    });
  };

  const anteriorImagen = () => {
    setImagenModal((prev) => {
      if (!prev.imagenes.length) return prev;

      const indiceActual =
        (prev.indiceActual - 1 + prev.imagenes.length) %
        prev.imagenes.length;

      return {
        ...prev,
        indiceActual,
        src: prev.imagenes[indiceActual],
      };
    });
  };

  useEffect(() => {
    if (!imagenModal.abierto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cerrarModal();
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
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagenModal.abierto, imagenModal.imagenes.length]);

  if (!servicio) return <NotFoundPage />;

  return (
    <>
      <Navbar />

      <HeroLaboratorio
        titulo={servicio.titulo}
        descripcion={servicio.descripcion}
        imagen={servicio.imagen}
      />

      <LaboratorioNav />

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
                    Galería de imágenes
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
                          abrirModal(
                            categoria.imagenes[0],
                            categoria.titulo,
                            categoria.imagenes
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

                          <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/70 via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 bg-[#182C45]/82 p-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#C9A66B] group-hover:text-[#182C45]">
                          Imagen principal — clic para ampliar
                        </div>
                      </motion.button>
                    )}

                    {categoria.imagenes.length > 1 && (
                      <div className="grid grid-cols-3 gap-2.5">
                        {categoria.imagenes
                          .slice(1)
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
                                abrirModal(
                                  imagen,
                                  categoria.titulo,
                                  categoria.imagenes
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
          className="mb-16 rounded-3xl bg-[#182C45]/[0.035] p-6 md:p-10"
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

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              En <strong className="text-[#182C45]">Casagrande</strong>{" "}
              garantizamos la precisión de cada ensayo. Nuestros{" "}
              <strong className="text-[#182C45]">
                equipos de campo y laboratorio
              </strong>{" "}
              son suministrados y calibrados por{" "}
              <strong className="text-[#182C45]">Pinzuar</strong>,
              proveedor acreditado ante{" "}
              <strong className="text-[#182C45]">INACAL</strong>{" "}
              bajo la norma{" "}
              <strong className="text-[#182C45]">
                ISO/IEC 17025
              </strong>
              .
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                  "Equipos de campo y laboratorio suministrados y calibrados por Pinzuar, proveedor acreditado ante INACAL.",
                  "Certificados con trazabilidad conforme a la norma ISO/IEC 17025:2017.",
                  "Control de vigencia, número de certificado y verificación interna periódica.",
                  "Registro digital y físico de calibraciones y mantenimiento preventivo.",
                  "Verificación previa a cada campaña o ensayo para garantizar resultados exactos.",
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
                  "ISO 9001:2015 – Sistema de Gestión de la Calidad.",
                  "ISO 14001:2015 – Sistema de Gestión Ambiental.",
                  "ISO 37001:2016 – Sistema de Gestión Antisoborno.",
                  "Procedimientos técnicos normalizados MTC, ASTM y NTP.",
                  "Seguimiento de indicadores y auditorías internas.",
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

          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "+130 proyectos ejecutados",
              "Ensayos en suelos, rocas, concreto y asfalto",
              "Equipos calibrados por Pinzuar con respaldo de INACAL",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#C9A66B]/45 bg-[#C9A66B]/10 px-4 py-2 text-sm font-semibold text-[#182C45]"
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

              <h3 className="mb-7 text-2xl font-extrabold text-white md:text-3xl">
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

              <h3 className="mb-7 text-2xl font-extrabold text-white md:text-3xl">
                Solicita un Servicio
              </h3>

              <div className="space-y-4">
                <Button
                  asChild
                  className="h-14 w-full rounded-xl bg-[#C9A66B] px-6 text-base font-extrabold text-[#182C45] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-lg"
                >
                  <a
                    href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios%20de%20laboratorio."
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
                    href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica%20para%20laboratorio."
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
            onClick={cerrarModal}
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
                onClick={cerrarModal}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#182C45]"
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

export default LaboratorioPage;