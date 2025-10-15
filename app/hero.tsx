"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// --- DATOS DE LOS SLIDES ---
const slidesData: {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  buttonText: string;
  buttonLink: string;
  buttonIcon?: ReactNode;
}[] = [
  {
    id: 1,
    title: "BIENVENIDO A CASAGRANDE",
    subtitle: "Acreditados ante el INACAL con ISO/IEC 17025:2017",
    imageSrc: "/hero.png",
    buttonText: "Descargar Nuestro Brochure",
    buttonLink: "tel:989900609",
  },
  {
    id: 2,
    title: "ESTUDIOS GEOTÉCNICOS Y DE SUELO",
    subtitle:
      "Garantizamos la seguridad y estabilidad de tu proyecto con análisis precisos de suelo, rocas, agua y materiales.",
    imageSrc: "/heroprincipal.jpg",
    buttonText: "Conoce nuestros servicios",
    buttonLink: "/servicios",
  },
  {
    id: 3,
    title: "CONSULTORÍA EN CIMENTACIONES Y TALUDES",
    subtitle:
      "Diseños recomendados para cimentaciones, muros de contención y pavimentos, asegurando la correcta ejecución de la obra.",
    imageSrc: "/Perforacion.png",
    buttonText: "Ver Proyectos",
    buttonLink: "/proyectos",
  },
  // {
  //   id: 4,
  //   title: "LABORATORIO Y CONTROL DE CALIDAD",
  //   subtitle:
  //     "Pruebas en campo y laboratorio de suelos, rocas, concreto, asfalto y agua para garantizar resultados confiables.",
  //   imageSrc: "/hero04.webp",
  //   buttonText: "Más Información",
  //   buttonLink: "/nosotros",
  // },
];

// --- Variantes de Animación (Completamente tipadas) ---
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.7,
      ease: [0.56, 0.03, 0.12, 1.04] as const,
    } as Transition,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.7,
      ease: [0.56, 0.03, 0.12, 1.04] as const,
    } as Transition,
  }),
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      delayChildren: 0.3,
    } as Transition,
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 } as Transition,
  },
};

export default function HeroCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = Math.abs(page % slidesData.length);
  const activeSlide = slidesData[slideIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(interval);
  }, [paginate]);

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeConfidenceThreshold = 10000;
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-2">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={activeSlide.imageSrc}
            alt={activeSlide.title}
            quality={75} // compresión
            loading="lazy"
            fill
            className="object-cover object-center"
            
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#182C45] " />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex h-full w-full max-w-7xl items-center justify-center px-4 lg:justify-start sm:px-6 lg:px-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="absolute w-full max-w-2xl md:pt-36 pt-10"
          >
            <motion.div
              className="flex flex-col items-center space-y-4 text-center lg:items-start lg:space-y-5 lg:text-left"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg cursor-pointer"
              >
                {activeSlide.title}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base font-medium leading-relaxed text-gray-200 sm:text-lg lg:text-xl drop-shadow-md"
              >
                {activeSlide.subtitle}
              </motion.p>

              <motion.div variants={itemVariants}>
                <Button
                  asChild
                  size="lg"
                  className="mt-4 rounded-lg bg-white px-8 py-6 text-base font-bold text-[#182C45] shadow-lg transition-transform duration-300 hover:bg-[#a2babd] hover:scale-105 active:scale-95"
                >
                  <Link
                    href={activeSlide.buttonLink}
                    className="flex items-center gap-2"
                  >
                    {activeSlide.buttonIcon}
                    {activeSlide.buttonText}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center space-x-2 md:bottom-8">
        {slidesData.map((_slide, index) => (
          <button
            aria-label="Ir a la diapositiva 1"
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 p-2 cursor-pointer   ${
              index === slideIndex ? "w-6 bg-[#182C45]" : "bg-gray-400"
            }`}
            onClick={() => {
              const newDirection = index > slideIndex ? 1 : -1;
              setPage([index, newDirection]);
            }}
          />
        ))}
      </div>
    </main>
  );
}
