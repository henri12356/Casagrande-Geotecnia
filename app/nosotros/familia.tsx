"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { FaAward } from "react-icons/fa";

const imageSrc = "/nosotros.webp";

const certifications = [
  "ISO 9001:2015 – Sistema de Gestión de la Calidad",
  "ISO 37001:2016 – Sistema de Gestión Antisoborno",
  "ISO 14001:2015 – Sistema de Gestión Ambiental",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Sobrenosotros = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-4 py-14 font-sans sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Imagen */}
          <motion.div
            variants={imageVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            className="relative order-1 w-full"
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                    }
              }
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(24,44,69,0.14)]"
            >
              <div className="relative aspect-[4/4] w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt="Equipo de Casagrande Geotecnia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Texto */}
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 w-full"
          >
            <motion.div
              variants={itemVariants}
              className="mb-4 flex items-center gap-3"
            >
            
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-3xl font-black leading-tight tracking-[-0.03em] text-[#182C45] sm:text-4xl lg:text-5xl"
            >
              Casagrande Geotecnia
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-5"
            >
              <strong className="font-bold text-[#182C45]">
                Casagrande Geotecnia
              </strong>{" "}
              es una empresa peruana de ingeniería y construcción,
              especializada en{" "}
              <strong className="font-bold text-[#182C45]">
                estudios técnicos, control de calidad y servicios geotécnicos
                integrales
              </strong>{" "}
              para obras de infraestructura, edificaciones y proyectos públicos
              y privados en todo el país.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
            >
              Con más de{" "}
              <strong className="font-bold text-[#182C45]">
                6 años de experiencia
              </strong>{" "}
              y más de{" "}
              <strong className="font-bold text-[#182C45]">
                130 ensayos de calidad realizados
              </strong>
              , garantizamos resultados precisos, trazables y confiables en cada
              proyecto.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
            >
              Nuestros equipos, adquiridos a{" "}
              <strong className="font-bold text-[#182C45]">Pinzuar</strong>,
              proveedor acreditado por{" "}
              <strong className="font-bold text-[#182C45]">INACAL</strong>,
              cuentan con certificaciones y calibraciones oficiales que
              respaldan la precisión de cada medición.
            </motion.p>

            {/* Certificaciones */}
            <motion.div
              variants={containerVariants}
              className="mt-7 space-y-4"
            >
              {certifications.map((certification) => (
                <motion.div
                  key={certification}
                  variants={itemVariants}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 4,
                        }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="group flex items-start gap-3"
                >
                  <FaAward className="mt-0.5 shrink-0 text-2xl text-[#C9A66B] transition-transform duration-300 group-hover:scale-110" />

                  <p className="text-sm leading-6 text-[#182C45] sm:text-base">
                    <span className="font-bold">
                      {certification}
                    </span>
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Botón */}
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <motion.a
                href="/BROCHURE_CASAGRANDE_ GEOTECNIA_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#182C45] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(24,44,69,0.18)] transition-colors duration-300 hover:bg-[#C9A66B] sm:min-h-14 sm:px-8 sm:text-base"
              >
                Descargar nuestro brochure
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sobrenosotros;