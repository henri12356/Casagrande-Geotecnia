"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";

const hitos = [
  {
    fecha: "Dic 2020",
    descripcion:
      "Fundación de Casagrande Geotecnia e inicio de operaciones en estudios geotécnicos, geología aplicada, control de calidad y ensayos de laboratorio.",
  },
  {
    fecha: "Jul 2021",
    descripcion:
      "Implementación del Sistema de Gestión Integrado y obtención de las certificaciones ISO 9001, ISO 14001 e ISO 37001.",
  },
  {
    fecha: "Ago 2022",
    descripcion:
      "Ampliación de la infraestructura técnica mediante nuevos equipos de campo y laboratorio, fortaleciendo la capacidad operativa.",
  },
  {
    fecha: "May 2023",
    descripcion:
      "Calibración de equipos por Pinzuar, proveedor acreditado ante INACAL bajo la norma ISO/IEC 17025.",
  },
  {
    fecha: "Nov 2024",
    descripcion:
      "Ampliación de los servicios de laboratorio y optimización de procesos orientados a la mejora continua.",
  },
  {
    fecha: "Oct 2025",
    descripcion:
      "Modernización del laboratorio, incorporación de tecnología avanzada y consolidación del equipo profesional.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Trayectoria = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-14 lg:flex-row lg:gap-20">
          {/* Columna izquierda: título e imagen */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -24,
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
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-1 flex-col items-center lg:items-start"
          >
            <div className="mb-4 flex items-center gap-3">

              <h2 className="text-center text-3xl font-black tracking-[-0.03em] text-[#182C45] md:text-4xl lg:text-left">
                Nuestra línea de tiempo
              </h2>
            </div>

            <p className="mb-8 text-center text-base text-slate-500 md:text-lg lg:text-left">
              Un recorrido por nuestra historia y evolución.
            </p>

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
              className="relative aspect-square w-full max-w-xl overflow-hidden rounded-3xl"
            >
              <Image
                src="/conctacto.webp"
                alt="Historia de Casagrande Geotecnia"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain "
              />

              
            </motion.div>
          </motion.div>

          {/* Columna derecha: línea de tiempo */}
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.15 }}
            className="relative w-full flex-1 lg:pt-10"
          >
            <div className="absolute bottom-4 left-[7px] top-4 w-px bg-[#182C45]/15 lg:left-[7px]" />

            <div className="space-y-8">
              {hitos.map((hito, index) => (
                <motion.div
                  key={`${hito.fecha}-${index}`}
                  variants={itemVariants}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 4,
                        }
                  }
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="relative flex items-start"
                >
                  <span className="relative z-10 mt-2 h-4 w-4 shrink-0 rounded-full border-[3px] border-slate-50 bg-[#C9A66B] shadow-[0_0_0_1px_rgba(24,44,69,0.18)]" />

                  <div className="pl-5">
                    <p className="text-lg font-extrabold text-[#182C45]">
                      {hito.fecha}
                    </p>

                    <p className="mt-1 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
                      {hito.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Trayectoria;