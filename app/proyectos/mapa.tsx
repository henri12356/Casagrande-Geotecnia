"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

interface Proyecto {
  id: number;
  provincia: string;
  nombre: string;
  descripcion: string;
  estado: string;
  inversion: string;
  x: number;
  y: number;
  imagen: string;
  url: string;
}

interface MapOffset {
  top: number;
  left: number;
  height: number;
  width: number;
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    provincia: "Ayacucho",
    nombre: "Universidad Nacional de San Cristóbal de Huamanga",
    descripcion:
      "Mejoramiento de los servicios de formación profesional de Ingeniería Agrícola",
    estado: "En desarrollo",
    inversion: "S/66M",
    x: 55,
    y: 78,
    imagen: "/proyectos/unsch-geotecnia/unsch-geotecnia.webp",
    url: "/proyectos/unsch-geotecnia",
  },
  {
    id: 2,
    provincia: "Piura",
    nombre: "Servicio de agua para riego del canal Tablaza",
    descripcion:
      "Mejoramiento de los servicios de formación profesional de Ingeniería Agrícola",
    estado: "Completado",
    inversion: "S/88M",
    x: 12,
    y: 28,
    imagen:
      "/proyectos/proyecto-hidrologia-tablaza/proyecto-hidrologia-tablaza01.webp",
    url: "/proyectos/rehabilitacion-canal-tablaza",
  },
];

const estados = [
  "Completado",
  "En construcción",
  "Operativo",
  "En desarrollo",
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-emerald-600 text-white";
    case "En construcción":
      return "bg-[#C9A66B] text-[#182C45]";
    case "Operativo":
      return "bg-sky-600 text-white";
    case "En desarrollo":
      return "bg-[#182C45] text-white";
    default:
      return "bg-slate-500 text-white";
  }
};

const getMarkerClasses = (estado: string) => {
  switch (estado) {
    case "Completado":
      return {
        dot: "bg-emerald-600",
        pulse: "bg-emerald-500/30",
      };
    case "En construcción":
      return {
        dot: "bg-[#C9A66B]",
        pulse: "bg-[#C9A66B]/35",
      };
    case "Operativo":
      return {
        dot: "bg-sky-600",
        pulse: "bg-sky-500/30",
      };
    case "En desarrollo":
      return {
        dot: "bg-[#182C45]",
        pulse: "bg-[#C9A66B]/35",
      };
    default:
      return {
        dot: "bg-slate-500",
        pulse: "bg-slate-400/30",
      };
  }
};

const MapaProyectos = () => {
  const reduceMotion = useReducedMotion();

  const [activeProject, setActiveProject] =
    useState<Proyecto | null>(null);
  const [hoveredProject, setHoveredProject] =
    useState<Proyecto | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);

  const [mapOffset, setMapOffset] = useState<MapOffset>({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  const calculateMapBounds = useCallback(() => {
    const container = mapContainerRef.current;
    const image = mapImageRef.current;

    if (!container || !image) return;

    const containerRect = container.getBoundingClientRect();
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    if (
      !containerRect.width ||
      !containerRect.height ||
      !naturalWidth ||
      !naturalHeight
    ) {
      return;
    }

    const imageRatio = naturalWidth / naturalHeight;
    const containerRatio =
      containerRect.width / containerRect.height;

    if (imageRatio > containerRatio) {
      const width = containerRect.width;
      const height = width / imageRatio;

      setMapOffset({
        top: (containerRect.height - height) / 2,
        left: 0,
        width,
        height,
      });
    } else {
      const height = containerRect.height;
      const width = height * imageRatio;

      setMapOffset({
        top: 0,
        left: (containerRect.width - width) / 2,
        width,
        height,
      });
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);

      if (mediaQuery.matches) {
        setActiveProject(null);
      } else {
        setHoveredProject(null);
      }
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;

    if (!container) return;

    const resizeObserver = new ResizeObserver(calculateMapBounds);

    resizeObserver.observe(container);
    calculateMapBounds();

    return () => resizeObserver.disconnect();
  }, [calculateMapBounds]);

  const handleMarkerClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    proyecto: Proyecto
  ) => {
    if (!isDesktop) {
      event.preventDefault();

      setActiveProject((current) =>
        current?.id === proyecto.id ? null : proyecto
      );
    }
  };

  const getTooltipPosition = (proyecto: Proyecto) => {
    const vertical =
      proyecto.y > 72 ? "bottom-full mb-4" : "top-full mt-4";

    let horizontal = "left-1/2 -translate-x-1/2";

    if (proyecto.x < 20) horizontal = "left-0";
    if (proyecto.x > 80) horizontal = "right-0";

    return `${vertical} ${horizontal}`;
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div
        className="
          mx-auto flex w-full max-w-7xl flex-col
          gap-10 lg:flex-row lg:items-center lg:gap-14
        "
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -28,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full lg:w-[34%]"
        >
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-0.5 w-10 bg-[#C9A66B]" />

            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.18em] text-[#C9A66B]
                sm:text-sm
              "
            >
              Portafolio corporativo
            </p>
          </div>

          <h1
            className="
              text-center text-3xl font-black
              leading-tight tracking-[-0.03em]
              text-[#182C45]
              sm:text-4xl lg:text-left lg:text-5xl
            "
          >
            Nuestros Proyectos a Nivel Nacional
          </h1>

          <motion.div
            whileHover={
              reduceMotion ? undefined : { y: -4 }
            }
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              mt-7 border-l-4 border-[#C9A66B]
              bg-slate-50 px-5 py-5
            "
          >
            <p className="text-sm font-semibold text-slate-600">
              Proyectos Totales
            </p>

            <p className="mt-1 text-3xl font-black text-[#182C45] sm:text-4xl">
              +152 Proyectos
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.985,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          viewport={{ once: true, amount: 0.18 }}
          transition={{
            duration: 0.75,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative h-[420px] w-full
            sm:h-[520px]
            lg:h-[650px] lg:w-[66%]
          "
        >
          <div
            ref={mapContainerRef}
            className="relative h-full w-full"
          >
            <Image
              ref={mapImageRef}
              src="/mapa.svg"
              alt="Mapa del Perú con ubicación de proyectos"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              onLoad={calculateMapBounds}
              className="object-contain opacity-95"
            />

            <div className="absolute inset-0 z-10">
              {proyectos.map((proyecto, index) => {
                const colors = getMarkerClasses(proyecto.estado);
                const highlighted =
                  activeProject?.id === proyecto.id ||
                  hoveredProject?.id === proyecto.id;

                return (
                  <Link
                    key={proyecto.id}
                    href={proyecto.url}
                    aria-label={`Ver proyecto ${proyecto.nombre}`}
                    className="
                      absolute flex h-11 w-11
                      -translate-x-1/2 -translate-y-1/2
                      items-center justify-center
                    "
                    style={{
                      left:
                        mapOffset.left +
                        (proyecto.x / 100) * mapOffset.width,
                      top:
                        mapOffset.top +
                        (proyecto.y / 100) * mapOffset.height,
                    }}
                    onMouseEnter={() => {
                      if (isDesktop) {
                        setHoveredProject(proyecto);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isDesktop) {
                        setHoveredProject(null);
                      }
                    }}
                    onFocus={() => {
                      if (isDesktop) {
                        setHoveredProject(proyecto);
                      }
                    }}
                    onBlur={() => {
                      if (isDesktop) {
                        setHoveredProject(null);
                      }
                    }}
                    onClick={(event) =>
                      handleMarkerClick(event, proyecto)
                    }
                  >
                    <motion.span
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 0,
                            }
                      }
                      whileInView={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              scale: 1,
                            }
                      }
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.25 + index * 0.12,
                      }}
                      className="
                        relative flex h-10 w-10
                        items-center justify-center
                      "
                    >
                      {!reduceMotion && (
                        <motion.span
                          className={`absolute h-8 w-8 rounded-full ${colors.pulse}`}
                          animate={{
                            scale: [0.85, 1.45],
                            opacity: [0.8, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: index * 0.3,
                          }}
                        />
                      )}

                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -3, 0],
                              }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.18,
                        }}
                        className={`
                          relative h-3.5 w-3.5 rounded-full
                          border-2 border-white
                          shadow-[0_4px_12px_rgba(24,44,69,0.35)]
                          transition-transform duration-300
                          ${colors.dot}
                          ${highlighted ? "scale-150" : "hover:scale-125"}
                        `}
                      />
                    </motion.span>
                  </Link>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 z-20">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left:
                      mapOffset.left +
                      (proyecto.x / 100) * mapOffset.width,
                    top:
                      mapOffset.top +
                      (proyecto.y / 100) * mapOffset.height,
                  }}
                >
                  <AnimatePresence>
                    {isDesktop &&
                      hoveredProject?.id === proyecto.id && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.94,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`
                            pointer-events-auto absolute
                            w-64 overflow-hidden rounded-xl
                            border border-slate-200 bg-white
                            shadow-[0_18px_50px_rgba(24,44,69,0.2)]
                            ${getTooltipPosition(proyecto)}
                          `}
                        >
                          <Link
                            href={proyecto.url}
                            className="group block"
                          >
                            <div className="relative h-36 overflow-hidden">
                              <Image
                                src={proyecto.imagen}
                                alt={proyecto.nombre}
                                fill
                                sizes="256px"
                                className="
                                  object-cover
                                  transition-transform duration-500
                                  group-hover:scale-105
                                "
                              />

                              <div
                                className="
                                  absolute inset-0
                                  bg-gradient-to-t
                                  from-[#182C45]/40 to-transparent
                                "
                              />
                            </div>

                            <div className="p-4">
                              <span
                                className="
                                  block text-base font-bold
                                  leading-snug text-[#182C45]
                                  transition-colors
                                  group-hover:text-[#C9A66B]
                                "
                              >
                                {proyecto.nombre}
                              </span>

                              <span
                                className="
                                  mt-1 block text-xs font-semibold
                                  uppercase tracking-[0.12em]
                                  text-slate-500
                                "
                              >
                                {proyecto.provincia}
                              </span>

                              <div
                                className="
                                  mt-3 flex items-end justify-between
                                  gap-4 border-t border-slate-100 pt-3
                                "
                              >
                                <div>
                                  <span className="block text-xs text-slate-500">
                                    Inversión
                                  </span>

                                  <span className="text-lg font-black text-[#182C45]">
                                    {proyecto.inversion}
                                  </span>
                                </div>

                                <span
                                  className={`
                                    rounded-full px-2.5 py-1
                                    text-xs font-semibold
                                    ${getEstadoColor(proyecto.estado)}
                                  `}
                                >
                                  {proyecto.estado}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 15,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.35,
              }}
              className="
                absolute right-2 top-2 z-30 hidden
                rounded-xl border border-slate-200
                bg-white/95 p-3.5 text-xs
                shadow-md backdrop-blur-sm
                lg:block
              "
            >
              <h2
                className="
                  mb-2 border-b border-slate-100
                  pb-2 font-bold text-[#182C45]
                "
              >
                Leyenda de Estado
              </h2>

              <div className="space-y-2">
                {estados.map((estado) => {
                  const colors = getMarkerClasses(estado);

                  return (
                    <div
                      key={estado}
                      className="flex items-center"
                    >
                      <span
                        className={`
                          mr-2 h-2.5 w-2.5 rounded-full
                          ${colors.dot}
                        `}
                      />

                      <span className="text-slate-600">
                        {estado}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar detalles del proyecto"
              onClick={() => setActiveProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-0 z-40
                bg-[#182C45]/40 backdrop-blur-[2px]
                lg:hidden
              "
            />

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      y: "100%",
                    }
              }
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="
                fixed inset-x-0 bottom-0 z-50
                max-h-[78vh] overflow-y-auto
                rounded-t-3xl bg-white p-5
                shadow-[0_-18px_50px_rgba(24,44,69,0.25)]
                lg:hidden
              "
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-300" />

              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold leading-tight text-[#182C45]">
                  {activeProject.nombre}
                </h2>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Cerrar detalles del proyecto"
                  className="
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-full
                    bg-slate-100 text-xl text-slate-600
                    transition-colors
                    hover:bg-[#182C45] hover:text-white
                  "
                >
                  ×
                </button>
              </div>

              <div className="relative mb-4 h-44 overflow-hidden rounded-xl">
                <Image
                  src={activeProject.imagen}
                  alt={activeProject.nombre}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {activeProject.descripcion}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <span
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.1em] text-slate-500
                    "
                  >
                    Provincia
                  </span>

                  <span className="mt-1 block text-sm font-bold text-[#182C45]">
                    {activeProject.provincia}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.1em] text-slate-500
                    "
                  >
                    Estado
                  </span>

                  <span
                    className={`
                      mt-1 inline-flex rounded-full
                      px-2.5 py-1 text-xs font-semibold
                      ${getEstadoColor(activeProject.estado)}
                    `}
                  >
                    {activeProject.estado}
                  </span>
                </div>

                <div className="col-span-2">
                  <span
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.1em] text-slate-500
                    "
                  >
                    Inversión estimada
                  </span>

                  <span className="mt-1 block text-xl font-black text-[#182C45]">
                    {activeProject.inversion}
                  </span>
                </div>

                <Link
                  href={activeProject.url}
                  className="
                    col-span-2 mt-1 inline-flex min-h-12
                    items-center justify-center rounded-lg
                    bg-[#182C45] px-6 py-3
                    text-sm font-bold text-white
                    transition-colors duration-300
                    hover:bg-[#C9A66B]
                    hover:text-[#182C45]
                  "
                >
                  Ver Proyecto
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapaProyectos;