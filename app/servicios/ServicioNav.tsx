"use client";

import {
  ActivitySquare,
  Building2,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Hammer,
  Layers,
  MapPin,
  Mountain,
  MountainSnow,
  ShieldCheck,
  Waves,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

interface NavItem {
  slug: string;
  titulo: string;
  icon: React.ReactNode;
  link?: string;
}

const serviciosNav: NavItem[] = [
  {
    slug: "geologia",
    titulo: "Estudios de Geología",
    icon: <Mountain className="w-4 h-4" />,
  },
  {
    slug: "geotecnia",
    titulo: "Estudios de Geotecnia",
    icon: <Hammer className="w-4 h-4" />,
  },
  {
    slug: "laboratorio-de-suelos",
    titulo: "Laboratorio de materiales",
    icon: <FlaskConical className="w-4 h-4" />,
    link: "/laboratorio/laboratorio-de-suelos",
  },
  {
    slug: "geofisica",
    titulo: "Estudios de Geofísica",
    icon: <ActivitySquare className="w-4 h-4" />,
  },
  {
    slug: "hidrogeologia",
    titulo: "Hidrología e Hidrogeología",
    icon: <Waves className="w-4 h-4" />,
  },
  {
    slug: "geomecanica",
    titulo: "Estudios de Geomecánica",
    icon: <MountainSnow className="w-4 h-4" />,
  },
  {
    slug: "ensayo-de-campo",
    titulo: "Ensayos de Campo",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    slug: "mecanica-de-suelos",
    titulo: "Mecánica de Suelos",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    slug: "control-de-calidad",
    titulo: "Control de Calidad en Obras",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    slug: "evaluacion-estructural",
    titulo: "Evaluación Estructural",
    icon: <Building2 className="w-4 h-4" />,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ServicioNav = () => {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const getHref = (item: NavItem) =>
    item.link || `/servicios/${item.slug}`;

  const isActive = (item: NavItem) => {
    if (item.link) return pathname === item.link;

    return (
      pathname === `/servicios/${item.slug}` ||
      pathname?.startsWith(`/servicios/${item.slug}/`)
    );
  };

  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current;

    if (!el) return;

    const amount = Math.min(280, el.clientWidth * 0.8);

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#264E7D]/[0.035] to-[#C9A66B]/[0.08] border-b border-[#264E7D]/15 -mt-1 relative z-10 py-7">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h3
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
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
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-xs md:text-sm text-[#264E7D] font-bold mb-4 md:mb-6 uppercase tracking-wider text-center"
        >
          Explorar Nuestros Servicios Especializados
        </motion.h3>

        {/* MOBILE */}
        <div className="relative md:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#FBF8F2] to-transparent" />

          <motion.button
            type="button"
            onClick={() => scrollBy("left")}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.06,
                  }
            }
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-1 top-full -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 border border-[#264E7D]/15 shadow-sm text-[#264E7D] hover:bg-[#C9A66B] hover:border-[#C9A66B]"
            aria-label="Ver servicios anteriores"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => scrollBy("right")}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.06,
                  }
            }
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-1 top-full -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 border border-[#264E7D]/15 shadow-sm text-[#264E7D] hover:bg-[#C9A66B] hover:border-[#C9A66B]"
            aria-label="Ver más servicios"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <motion.div
            ref={trackRef}
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            className="
              flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1
              [--cas-azul:#264E7D] [--cas-dorado:#C9A66B]
              [-webkit-overflow-scrolling:touch]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {serviciosNav.map((s) => {
              const active = isActive(s);

              return (
                <motion.div
                  key={s.slug}
                  variants={itemVariants}
                  whileTap={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  className="snap-start shrink-0 w-[250px]"
                >
                  <Link
                    href={getHref(s)}
                    aria-current={active ? "page" : undefined}
                    className={`
                      group relative block
                      rounded-2xl px-3 py-3
                      border bg-white
                      w-[250px]
                      transition-all duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B] focus-visible:ring-offset-2
                      ${
                        active
                          ? "text-white border-[#264E7D] shadow-md"
                          : "text-[#264E7D] border-[#264E7D]/15"
                      }
                    `}
                    style={{
                      background: active
                        ? "linear-gradient(135deg, #264E7D 0%, #243E5B 100%)"
                        : undefined,
                    }}
                  >
                    <span
                      className={`${
                        active
                          ? "hidden"
                          : "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-300"
                      }`}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(201,166,107,0.10), rgba(24,44,69,0.06))",
                      }}
                    />

                    <div className="relative z-[1] flex items-center gap-3">
                      <motion.div
                        animate={
                          active && !reduceMotion
                            ? {
                                scale: [1, 1.08, 1],
                              }
                            : undefined
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 ${
                          active
                            ? "bg-[#C9A66B]"
                            : "bg-[#264E7D]/10 group-active:bg-[#C9A66B]/25"
                        }`}
                      >
                        <span
                          className={
                            active
                              ? "text-[#264E7D]"
                              : "text-[#264E7D]"
                          }
                        >
                          {s.icon}
                        </span>
                      </motion.div>

                      <span
                        className={`text-[13px] font-semibold leading-snug ${
                          active
                            ? "text-white"
                            : "text-[#264E7D]"
                        }`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {s.titulo}
                      </span>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        scaleX: active ? 1 : 0,
                        opacity: active ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute -bottom-2 left-4 right-4 h-1 rounded-full bg-[#C9A66B] origin-center"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* DESKTOP */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 [--cas-azul:#264E7D] [--cas-dorado:#C9A66B]"
        >
          {serviciosNav.map((s) => {
            const active = isActive(s);

            return (
              <motion.div
                key={s.slug}
                variants={itemVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Link
                  href={getHref(s)}
                  aria-current={active ? "page" : undefined}
                  className={`
                    group relative block rounded-2xl px-4 py-5 transition-all duration-300
                    border bg-white hover:shadow-md
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B] focus-visible:ring-offset-2
                    ${
                      active
                        ? "text-white border-[#264E7D] shadow-md"
                        : "text-[#264E7D] border-[#264E7D]/15 hover:border-[#C9A66B]"
                    }
                  `}
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #264E7D 0%, #243E5B 100%)"
                      : undefined,
                  }}
                >
                  <span
                    className={`${
                      active
                        ? "hidden"
                        : "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }`}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,166,107,0.10), rgba(24,44,69,0.06))",
                    }}
                  />

                  <div className="relative z-[1] flex items-center gap-3">
                    <motion.div
                      animate={
                        active && !reduceMotion
                          ? {
                              scale: [1, 1.08, 1],
                            }
                          : undefined
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`${
                        active
                          ? "bg-[#C9A66B]"
                          : "bg-[#264E7D]/10 group-hover:bg-[#C9A66B]/25"
                      } w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300`}
                    >
                      <span
                        className={
                          active
                            ? "text-[#264E7D]"
                            : "text-[#264E7D]"
                        }
                      >
                        {s.icon}
                      </span>
                    </motion.div>

                    <span
                      className={`text-sm font-semibold leading-snug ${
                        active
                          ? "text-white"
                          : "text-[#264E7D]"
                      }`}
                    >
                      {s.titulo}
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: active ? 1 : 0,
                      opacity: active ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-2 left-4 right-4 h-1 rounded-full bg-[#C9A66B] origin-center"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicioNav;