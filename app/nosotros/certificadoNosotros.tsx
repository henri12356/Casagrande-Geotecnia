"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type CertItem = {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
};

const certificados: CertItem[] = [
  {
    id: 1,
    imageSrc: "/certificadodecalidad.webp",
    title: "ISO 9001:2015 – Sistema de Gestión de Calidad",
    subtitle: "Precisión y confiabilidad en cada proyecto",
    description:
      "Garantiza que todos nuestros procesos técnicos, desde los estudios geotécnicos hasta el control de calidad y la supervisión de obras, se ejecuten bajo estándares documentados y controlados, asegurando precisión, trazabilidad y confiabilidad en cada proyecto.",
    services: [
      "Estudios geotécnicos y geológicos confiables",
      "Control de calidad de materiales en laboratorio y en obra",
      "Supervisión y recomendaciones técnicas para cimentaciones, pavimentos y estructuras",
    ],
  },
  {
    id: 2,
    imageSrc: "/certificadoanbiental.webp",
    title: "ISO 14001:2015 – Sistema de Gestión Ambiental",
    subtitle: "Responsabilidad y sostenibilidad",
    description:
      "Asegura que los estudios de suelo, perforaciones, manejo de residuos y demás actividades se realicen cuidando el medio ambiente y cumpliendo regulaciones ambientales.",
    services: [
      "Gestión ambiental en proyectos de construcción.",
      "Monitoreo y control de impacto ambiental.",
      "Promoción de sostenibilidad en todas las operaciones.",
    ],
  },
  {
    id: 3,
    imageSrc: "/certificadoantisoborno.webp",
    title: "ISO 37001:2016 – Sistema de Gestión Antisoborno",
    subtitle: "Transparencia y ética en cada proyecto",
    description:
      "Establece normas para prevenir, detectar y gestionar riesgos de soborno y corrupción dentro de la empresa, asegurando transparencia en contratos, adquisiciones y supervisiones.",
    services: [
      "Gestión transparente de contratos y adquisiciones.",
      "Prevención de conflictos de interés en obras públicas y privadas.",
      "Fortalecimiento de la reputación ética de la empresa.",
    ],
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CarouselCertificados() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = certificados.length;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (i: number) => {
    if (i === index) return;

    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      className="overflow-hidden px-4 py-5 font-sans sm:px-6 md:py-40 lg:px-8"
      aria-label="Carrusel de certificaciones"
    >
      <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl">
        <motion.div
          className="relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_event, { offset, velocity }) => {
            const swipe = offset.x * velocity.x;

            if (swipe < -4000) next();
            else if (swipe > 4000) prev();
          }}
        >
          <AnimatePresence
            mode="popLayout"
            initial={false}
            custom={direction}
          >
            <motion.div
              key={certificados[index].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "spring",
                  stiffness: 320,
                  damping: 34,
                },
                opacity: {
                  duration: 0.4,
                },
                scale: {
                  duration: 0.4,
                },
              }}
              className="flex flex-col-reverse items-center gap-6 md:flex-row"
              aria-live="polite"
            >
              {/* Texto */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="w-full text-center lg:w-1/2 lg:text-left"
              >
                <motion.div
                  variants={itemVariants}
                  className="mb-2 text-sm font-semibold tracking-wide text-[#C9A66B]"
                >
                  EMPRESA CERTIFICADA
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="mb-3 text-2xl font-black text-[#182C45] lg:text-3xl"
                >
                  {certificados[index].title}
                  <br />

                  <span className="text-xl font-bold text-[#C9A66B] lg:text-2xl">
                    {certificados[index].subtitle}
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="mb-4 leading-relaxed text-slate-600"
                >
                  {certificados[index].description}
                </motion.p>

                <motion.ul
                  variants={contentVariants}
                  className="mb-6 space-y-2 pl-4 text-left text-[#182C45] lg:pl-0"
                >
                  {certificados[index].services.map((service, serviceIndex) => (
                    <motion.li
                      key={serviceIndex}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <motion.span
                        aria-hidden
                        whileHover={{ scale: 1.2 }}
                        className="mr-2 text-[#C9A66B]"
                      >
                        ✔
                      </motion.span>

                      <span>{service}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants}>
                  <Link
                    href="https://www.iafcertsearch.org/certified-entity/nIQz372OiZZnlhjFuOw0YUjA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="cursor-pointer rounded-lg bg-[#182C45] px-14 py-7 text-[16px] font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A66B]"
                      aria-label={`Abrir certificado: ${certificados[index].title}`}
                    >
                      {certificados[index].id === 4
                        ? "Ver más"
                        : "Ver certificado"}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Imagen */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  rotate: direction > 0 ? 1.5 : -1.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-6 flex w-full justify-center lg:mb-0 lg:w-1/2"
              >
                <Link
                  href="https://www.iafcertsearch.org/certified-entity/nIQz372OiZZnlhjFuOw0YUjA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir detalle del certificado actual en IAF CertSearch"
                  className="group"
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Image
                      src={certificados[index].imageSrc}
                      alt={`Certificado: ${certificados[index].title}`}
                      width={460}
                      height={320}
                      sizes="(max-width: 1024px) 90vw, 460px"
                      loading="lazy"
                      className="rounded-lg object-contain shadow-md transition-shadow duration-300 group-hover:shadow-xl"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Botones de navegación */}
        <div className="absolute left-[-60px] top-1/2 hidden -translate-y-1/2 lg:block">
          <motion.button
            aria-label="Anterior"
            onClick={prev}
            whileHover={{
              scale: 1.08,
              x: -2,
            }}
            whileTap={{ scale: 0.94 }}
            className="cursor-pointer rounded-full bg-[#182C45] p-2 text-white shadow transition-colors duration-300 hover:bg-[#C9A66B]"
          >
            <ChevronLeft size={24} />
          </motion.button>
        </div>

        <div className="absolute right-[10px] top-1/2 hidden -translate-y-1/2 lg:block">
          <motion.button
            aria-label="Siguiente"
            onClick={next}
            whileHover={{
              scale: 1.08,
              x: 2,
            }}
            whileTap={{ scale: 0.94 }}
            className="cursor-pointer rounded-full bg-[#182C45] p-2 text-white shadow transition-colors duration-300 hover:bg-[#C9A66B]"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Indicadores */}
        <div className="mt-6 flex justify-center space-x-2">
          {certificados.map((item, i) => (
            <motion.button
              key={item.id}
              aria-label={`Ir a la diapositiva ${i + 1}: ${item.title}`}
              onClick={() => goToSlide(i)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className={`hidden h-2 w-2 cursor-pointer rounded-full p-2 transition-all duration-300 md:block ${
                i === index
                  ? "w-6 bg-[#182C45]"
                  : "bg-[#C9A66B]/60 hover:bg-[#C9A66B]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}