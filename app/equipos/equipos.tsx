"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  especificaciones: string[];
}

const equiposData: Equipo[] = [
  {
    id: 1,
    nombre: "Equipo Triaxial",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo para ensayos triaxiales UU, CU y CD que determina parámetros de resistencia al corte del suelo bajo condiciones controladas de esfuerzo y drenaje.",
    imagen: "/equipos/triaxial.webp",
    especificaciones: [
      "Capacidad: 50 kN",
      "Presión confinante: hasta 2000 kPa",
      "Control digital de esfuerzos",
      "Norma ASTM D4767 / NTP 339.166",
    ],
  },
  {
    id: 2,
    nombre: "Horno de Secado",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Horno eléctrico de precisión para determinar el contenido de humedad y realizar el secado controlado de muestras de suelo.",
    imagen: "/equipos/Horno.webp",
    especificaciones: [
      "Temperatura: 110 °C ± 5 °C",
      "Capacidad: 200 litros",
      "Control digital de temperatura",
      "Norma ASTM D2216 / NTP 339.127",
    ],
  },
  {
    id: 3,
    nombre: "Consolidómetro",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo de consolidación unidimensional para determinar la compresibilidad y velocidad de consolidación de suelos saturados.",
    imagen: "/equipos/consolidometro.webp",
    especificaciones: [
      "6 celdas simultáneas",
      "Rango de carga: 1-2500 kPa",
      "Deformímetros digitales de 0.001 mm",
      "Norma ASTM D2435 / NTP 339.154",
    ],
  },
  {
    id: 4,
    nombre: "Equipo de Corte Directo",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo para determinar el ángulo de fricción interna y la cohesión del suelo mediante esfuerzos normales y tangenciales.",
    imagen: "/equipos/cortedirecto.webp",
    especificaciones: [
      "Carga normal: hasta 10 kN",
      "Velocidad de deformación: 0.01-10 mm/min",
      "Deformación horizontal: 15 mm",
      "Norma ASTM D3080 / NTP 339.171",
    ],
  },
  {
    id: 5,
    nombre: "Equipo de Compresión",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Prensa para determinar la resistencia a la compresión simple de suelos cohesivos y cilindros de concreto.",
    imagen: "/equipos/compresion.webp",
    especificaciones: [
      "Capacidad: 100 kN (10 toneladas)",
      "Control de velocidad variable",
      "Medición digital de carga",
      "Norma ASTM D2166 / NTP 339.167",
    ],
  },
  {
    id: 6,
    nombre: "Máquina de Abrasión Los Ángeles",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo que evalúa la resistencia al desgaste de agregados gruesos mediante impacto y fricción.",
    imagen: "/equipos/abrazion.webp",
    especificaciones: [
      "Velocidad: 30-33 rpm",
      "500 revoluciones estándar",
      "Incluye esferas de acero",
      "Norma ASTM C131 / NTP 400.019",
    ],
  },
];

const gridVariants: Variants = {
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

const Equipos = () => {
  const reduceMotion = useReducedMotion();

  const [equipoSeleccionado, setEquipoSeleccionado] =
    useState<Equipo | null>(null);

  const [imagenActual, setImagenActual] = useState(0);

  const abrirModal = (
    equipo: Equipo,
    index: number
  ) => {
    setEquipoSeleccionado(equipo);
    setImagenActual(index);
  };

  const cerrarModal = useCallback(() => {
    setEquipoSeleccionado(null);
  }, []);

  const navegarImagen = useCallback(
    (direccion: "prev" | "next") => {
      setImagenActual((indiceAnterior) => {
        const nuevoIndice =
          direccion === "next"
            ? (indiceAnterior + 1) % equiposData.length
            : (indiceAnterior - 1 + equiposData.length) %
              equiposData.length;

        setEquipoSeleccionado(equiposData[nuevoIndice]);

        return nuevoIndice;
      });
    },
    []
  );

  useEffect(() => {
    if (!equipoSeleccionado) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const controlarTeclado = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        cerrarModal();
      }

      if (event.key === "ArrowRight") {
        navegarImagen("next");
      }

      if (event.key === "ArrowLeft") {
        navegarImagen("prev");
      }
    };

    window.addEventListener(
      "keydown",
      controlarTeclado
    );

    return () => {
      document.body.style.overflow =
        overflowAnterior;

      window.removeEventListener(
        "keydown",
        controlarTeclado
      );
    };
  }, [
    equipoSeleccionado,
    cerrarModal,
    navegarImagen,
  ]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#182C45]/[0.04] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-14 md:pt-44">
        {/* Header */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: -18,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.58,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-10 bg-[#C9A66B]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A66B] sm:text-sm">
              Tecnología especializada
            </span>
            <span className="h-0.5 w-10 bg-[#C9A66B]" />
          </div>

          <h1 className="text-4xl font-black tracking-[-0.035em] text-[#182C45] md:text-6xl">
            Nuestros Equipos Geotécnicos
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Equipamiento especializado para obtener
            resultados precisos, confiables y
            técnicamente verificables.
          </p>
        </motion.div>

        {/* Grid de equipos */}
        <motion.div
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {equiposData.map((equipo, index) => (
            <motion.div
              key={equipo.id}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                    }
              }
              transition={{
                duration: 0.26,
                ease: "easeOut",
              }}
            >
              <Card
                onClick={() =>
                  abrirModal(equipo, index)
                }
                className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white shadow-[0_10px_30px_rgba(24,44,69,0.08)] transition-all duration-300 hover:border-[#C9A66B]/60 hover:shadow-[0_18px_45px_rgba(24,44,69,0.15)]"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <Image
                      src={equipo.imagen}
                      alt={equipo.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#182C45]/0 transition-colors duration-300 group-hover:bg-[#182C45]/55">
                      <div className="translate-y-3 text-center text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ZoomIn className="mx-auto mb-2 h-7 w-7" />

                        <p className="text-sm font-semibold">
                          Ver detalles
                        </p>
                      </div>
                    </div>

                    <Badge className="absolute right-3 top-3 border-none bg-[#182C45]/90 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#C9A66B] group-hover:text-[#182C45]">
                      {equipo.categoria}
                    </Badge>
                  </div>

                  <div className="relative p-5">
                    <h2 className="mb-2 line-clamp-1 text-lg font-extrabold text-[#182C45]">
                      {equipo.nombre}
                    </h2>

                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                      {equipo.descripcion}
                    </p>

                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#C9A66B] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {equipoSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={cerrarModal}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/95 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={equipoSeleccionado.nombre}
            >
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.95,
                        y: 18,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  y: 12,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                {/* Cerrar */}
                <button
                  type="button"
                  onClick={cerrarModal}
                  aria-label="Cerrar detalles del equipo"
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#182C45]/85 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#C9A66B] hover:text-[#182C45]"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navegación */}
                <button
                  type="button"
                  onClick={() =>
                    navegarImagen("prev")
                  }
                  aria-label="Equipo anterior"
                  className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#182C45]/80 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#C9A66B] hover:text-[#182C45]"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarImagen("next")
                  }
                  aria-label="Siguiente equipo"
                  className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#182C45]/80 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#C9A66B] hover:text-[#182C45]"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="grid gap-0 md:grid-cols-2">
                  {/* Imagen */}
                  <div className="relative aspect-video bg-slate-950 md:aspect-auto md:min-h-[500px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={equipoSeleccionado.id}
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
                        transition={{
                          duration: 0.22,
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={
                            equipoSeleccionado.imagen
                          }
                          alt={
                            equipoSeleccionado.nombre
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <span className="absolute inset-x-0 bottom-0 h-1 bg-[#C9A66B]" />
                  </div>

                  {/* Información */}
                  <div className="flex max-h-[80vh] min-h-[500px] flex-col justify-between overflow-y-auto p-7 md:max-h-none md:p-8">
                    <div>
                      <Badge className="mb-4 border-none bg-[#182C45] text-white">
                        {
                          equipoSeleccionado.categoria
                        }
                      </Badge>

                      <h2 className="mb-4 text-2xl font-black tracking-[-0.025em] text-[#182C45] md:text-3xl">
                        {
                          equipoSeleccionado.nombre
                        }
                      </h2>

                      <p className="mb-6 leading-7 text-slate-600">
                        {
                          equipoSeleccionado.descripcion
                        }
                      </p>

                      <div>
                        <h3 className="mb-4 text-lg font-extrabold text-[#182C45]">
                          Especificaciones técnicas
                        </h3>

                        <div className="space-y-3">
                          {equipoSeleccionado.especificaciones.map(
                            (especificacion) => (
                              <div
                                key={especificacion}
                                className="flex items-start gap-3"
                              >
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A66B]" />

                                <p className="text-sm leading-6 text-slate-700">
                                  {especificacion}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-5">
                      <p className="text-center text-sm font-semibold text-slate-500">
                        {imagenActual + 1} /{" "}
                        {equiposData.length}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Equipos;