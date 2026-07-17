"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const valores = [
  "Calidad",
  "Compromiso",
  "Innovación",
  "Formación",
  "Trabajo en equipo",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
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

const imageLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Valores = () => {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="bg-white px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* VISIÓN Y MISIÓN */}
          <div className="mb-16 grid grid-cols-1 items-center gap-10 md:mb-24 md:py-10 lg:grid-cols-2 lg:gap-20">
            {/* Texto */}
            <motion.div
              className="order-2 lg:order-1"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-3xl font-black tracking-[-0.02em] text-[#182C45]">
                    VISIÓN
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  Contribuir al desarrollo sostenible de la construcción
                  mediante estudios técnicos confiables, soluciones innovadoras
                  y altos estándares de calidad.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-3xl font-black tracking-[-0.02em] text-[#182C45]">
                    MISIÓN
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  Brindar servicios integrales de geología, geotecnia,
                  laboratorio y supervisión con eficiencia, precisión y
                  confiabilidad.
                </p>
              </motion.div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              className="order-1 w-full lg:order-2"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={imageRightVariants}
            >
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
                className="relative h-56 w-full overflow-hidden rounded-2xl md:h-80 lg:h-96"
              >
                <Image
                  src="/valores.webp"
                  alt="Empresa Casagrande Geotecnia"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />

              </motion.div>
            </motion.div>
          </div>

          {/* CALIDAD Y SEGURIDAD */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Imagen */}
            <motion.div
              className="w-full"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={imageLeftVariants}
            >
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
                className="relative h-56 w-full overflow-hidden rounded-2xl md:h-80 lg:h-96"
              >
                <Image
                  src="/valores01.webp"
                  alt="Equipo de trabajo Casagrande"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />

              </motion.div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-3xl font-black tracking-[-0.02em] text-[#182C45]">
                    CALIDAD
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  Trabajamos con precisión, mejora continua y cumplimiento de
                  normas técnicas en cada estudio, ensayo y supervisión.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-3xl font-black tracking-[-0.02em] text-[#182C45]">
                    SEGURIDAD
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  Priorizamos la seguridad laboral y ambiental, reduciendo
                  riesgos y promoviendo prácticas responsables en cada
                  operación.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
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
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <span className="mb-3 block h-0.5 w-10 bg-[#C9A66B]" />

            <h2 className="whitespace-nowrap text-2xl font-black tracking-[-0.02em] text-[#182C45] lg:text-3xl xl:text-4xl">
              Nuestros Valores
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4 lg:justify-end">
            {valores.map((valor, index) => (
              <motion.div
                key={valor}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
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
                transition={{
                  duration: 0.42,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                className="flex items-center gap-2 whitespace-nowrap font-semibold text-[#182C45]"
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-[#C9A66B]" />

                <span className="text-base xl:text-lg">
                  {valor}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Valores;