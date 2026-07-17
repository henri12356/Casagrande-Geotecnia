"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

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

const sedes = [
  {
    nombre: "Sede Lima",
    enlace:
      "https://www.google.com/maps/place/Plaza+2+de+Mayo,+Av.+Alfonso+Ugarte+595,+Bre%C3%B1a+5001",
    mapa:
      "https://www.google.com/maps?q=-12.0474336,-77.0424062&z=17&output=embed",
    direccion: "Jr. Santa Carolina 513, Palao - S.M.P - Lima",
    tituloMapa: "Ubicación Lima - Casagrande Geotecnia",
  },
  {
    nombre: "Sede Ayacucho",
    enlace: "https://maps.app.goo.gl/ZLD7hVDrudfbnSTd6",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d803.9765567853118!2d-74.22131504820005!3d-13.15595629108529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91127d8bfa4ecc4d%3A0x69dc04eda5da9649!2sCasagrande%20Consultor%C3%ADa%20y%20Construcci%C3%B3n!5e0!3m2!1ses!2spe!4v1756942919228!5m2!1ses!2spe",
    direccion: "Jr. Quinua 570, Ayacucho – Perú",
    tituloMapa: "Ubicación Ayacucho - Casagrande Geotecnia",
  },
];

const Mapa = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      {/* Título */}
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
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.58,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-12 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-0.5 w-10 bg-[#C9A66B]" />
          <MapPin className="h-5 w-5 text-[#C9A66B]" />
          <span className="h-0.5 w-10 bg-[#C9A66B]" />
        </div>

        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#182C45] md:text-5xl">
          Encuéntranos
        </h2>

        <p className="mt-3 text-base text-slate-600">
          Contamos con presencia en Ayacucho y Lima.
        </p>
      </motion.div>

      {/* Contenedor mapas */}
      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2"
      >
        {sedes.map((sede) => (
          <motion.article
            key={sede.nombre}
            variants={itemVariants}
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
            className="w-full"
          >
            <h3 className="mb-4 text-center text-2xl font-extrabold text-[#182C45]">
              {sede.nombre}
            </h3>

            <a
              href={sede.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-[#182C45]/10 bg-white shadow-[0_16px_40px_rgba(24,44,69,0.12)] transition-all duration-300 hover:border-[#C9A66B]/60 hover:shadow-[0_22px_50px_rgba(24,44,69,0.18)]"
              aria-label={`Abrir ${sede.nombre} en Google Maps`}
            >
              <div className="relative">
                <iframe
                  src={sede.mapa}
                  width="100%"
                  height="420"
                  style={{
                    border: 0,
                    pointerEvents: "none",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={sede.tituloMapa}
                  className="w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-[#182C45]/0 transition-colors duration-300 group-hover:bg-[#182C45]/10" />

                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-[#182C45]/90 px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  Ver en Google Maps
                  <ExternalLink className="h-4 w-4" />
                </span>

                <span className="absolute inset-x-0 bottom-0 h-1 bg-[#C9A66B]" />
              </div>
            </a>

            <div className="mt-4 flex items-start justify-center gap-2 text-center text-sm text-slate-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A66B]" />
              <p>{sede.direccion}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Mapa;