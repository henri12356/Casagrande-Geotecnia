"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  FileCheck2,
  FileDown,
} from "lucide-react";

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
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Brochure = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#182C45] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
        className="
          mx-auto flex max-w-7xl flex-col
          items-center justify-between gap-8
          md:flex-row md:gap-10
        "
      >
        {/* Texto */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl text-center md:text-left"
        >
          <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-0.5 w-10 bg-[#C9A66B]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A66B] sm:text-sm">
              Documentación corporativa
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-4xl">
            Descarga nuestros documentos
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base md:mx-0">
            Accede a nuestra experiencia, proyectos destacados y documentación
            de calidad en ingeniería geotécnica.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          variants={itemVariants}
          className="
            flex w-full flex-col gap-3
            sm:w-auto sm:flex-row sm:gap-4
          "
        >
          <motion.a
            href="/BROCHURE_CASAGRANDE_ GEOTECNIA_2026.pdf"
            download="Curriculum-Corporativo.pdf"
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
            className="
              group inline-flex min-h-12 w-full items-center
              justify-center gap-3 rounded-lg
              bg-[#C9A66B] px-6 py-3
              text-sm font-bold text-[#182C45]
              shadow-[0_10px_26px_rgba(0,0,0,0.18)]
              transition-colors duration-300
              hover:bg-white
              sm:w-auto sm:min-w-[165px] sm:text-base
            "
          >
            <FileDown
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5"
            />

            Ver brochure
          </motion.a>

          <motion.a
            href="/calidad"
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
            className="
              group inline-flex min-h-12 w-full items-center
              justify-center gap-3 rounded-lg
              border border-white/40 bg-white
              px-6 py-3 text-sm font-bold text-[#182C45]
              shadow-[0_10px_26px_rgba(0,0,0,0.14)]
              transition-all duration-300
              hover:border-[#C9A66B]
              hover:bg-transparent hover:text-white
              sm:w-auto sm:min-w-[190px] sm:text-base
            "
          >
            <FileCheck2
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            />

            Documento de calidad
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Brochure;