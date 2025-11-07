"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    subtitle: "Calidad y confiabilidad en nuestros servicios",
    description:
      "Garantiza que todos los estudios, ensayos de laboratorio y supervisión de obras se realicen con procedimientos estandarizados, minimizando errores y asegurando confiabilidad en los informes técnicos.",
    services: [
      "Estudios geotécnicos y geológicos confiables.",
      "Control de calidad de materiales en laboratorio y en obra.",
      "Supervisión y recomendaciones técnicas para cimentaciones, pavimentos y estructuras.",
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
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Soporte con teclado (flechas)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Variantes para animación más suave
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    })
  };

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 font-sans md:py-40 py-5 overflow-hidden"
      aria-label="Carrusel de certificaciones"
    >
      <div className="2xl:max-w-7xl max-w-6xl mx-auto relative">
        {/* Contenedor para el área de drag */}
        <motion.div
          className="relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x * velocity.x;
            if (swipe < -4000) next();
            else if (swipe > 4000) prev();
          }}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={certificados[index].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 40 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="flex flex-col-reverse md:flex-row items-center gap-6"
              aria-live="polite"
            >
              {/* Texto */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="text-sm font-semibold text-[#182C45] mb-2 tracking-wide">
                  EMPRESA CERTIFICADA
                </div>

                <h2 className="text-2xl lg:text-3xl font-black text-[#182C45] mb-3">
                  {certificados[index].title}
                  <br />
                  <span className="text-xl lg:text-2xl font-bold text-[#182C45]">
                    {certificados[index].subtitle}
                  </span>
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {certificados[index].description}
                </p>

                <ul className="text-left text-[#182C45] space-y-2 mb-6 pl-4 lg:pl-0">
                  {certificados[index].services.map((s, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" aria-hidden>
                        ✔
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

            

                <Link
                  href="https://www.iafcertsearch.org/certified-entity/nIQz372OiZZnlhjFuOw0YUjA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-[#182C45] hover:bg-gray-900 text-white px-14 py-7 text-[16px] font-bold rounded-lg shadow-md cursor-pointer"
                    aria-label={`Abrir certificado: ${certificados[index].title}`}
                  >
                    {certificados[index].id === 4 ? "Ver más" : "Ver certificado"}
                  </Button>
                </Link>
              </div>

              {/* Imagen */}
              <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
                <Link
                  href="https://www.iafcertsearch.org/certified-entity/nIQz372OiZZnlhjFuOw0YUjA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir detalle del certificado actual en IAF CertSearch"
                >
                  <Image
                    src={certificados[index].imageSrc}
                    alt={`Certificado: ${certificados[index].title}`}
                    width={460}
                    height={320}
                    sizes="(max-width: 1024px) 90vw, 460px"
                    loading="lazy"
                    className="rounded-lg shadow-md object-contain"
                  />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Botones de navegación */}
        <div className="absolute top-1/2 left-[-60px] -translate-y-1/2 max-lg:hidden">
          <button
            aria-label="Anterior"
            onClick={prev}
            className="bg-[#182C45] hover:bg-gray-900 text-white p-2 rounded-full shadow transition cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-1/2 right-[10px] -translate-y-1/2 max-lg:hidden">
          <button
            aria-label="Siguiente"
            onClick={next}
            className="bg-[#182C45] hover:bg-gray-900 text-white p-2 rounded-full shadow transition cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {certificados.map((item, i) => (
            <button
              key={item.id}
              aria-label={`Ir a la diapositiva ${i + 1}: ${item.title}`}
              onClick={() => goToSlide(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 p-2 max-md:hidden cursor-pointer ${
                i === index ? "w-6 bg-[#182C45]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}