"use client";

import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  Variants,
  Transition,
  PanInfo,
} from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// --- TIPADO DE LOS SLIDES ---
type Slide = {
  id: number;
  title?: string;
  subtitle?: string;
  imageSrc: string;
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: ReactNode;
  showContent?: boolean;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
};

// --- DATOS DE LOS SLIDES ---
const slidesData: Slide[] = [
  {
    id: 4,
    imageSrc: "/hero04.webp",
    showContent: false, // SIN TEXTO Y SIN BOTÓN
    imageFit: "contain", // La imagen se adapta sin cortarse
    imagePosition: "center",
  },
  {
    id: 1,
    title: "BIENVENIDO A CASAGRANDE",
    subtitle:
      "Líderes en ingeniería geotécnica con equipos certificados por INACAL y PIZUAR. Ofrecemos soluciones con precisión, confiabilidad y excelencia técnica en cada proyecto.",
    imageSrc: "/hero01.webp",
    buttonText: "Descargar Nuestro Brochure",
    buttonLink: "/BROCHURE_CASAGRANDE_ GEOTECNIA_2026.pdf",
    showContent: true,
    imageFit: "cover",
    imagePosition: "center",
  },
  {
    id: 2,
    title: "SERVICIOS GEOTÉCNICOS",
    subtitle:
      "Ofrecemos servicios de alta precisión y calidad, respaldados por tecnología avanzada y personal especializado, garantizando resultados confiables para cada obra.",
    imageSrc: "/hero02.webp",
    buttonText: "Conoce nuestros servicios",
    buttonLink: "/servicios",
    showContent: true,
    imageFit: "cover",
    imagePosition: "center",
  },
];

// --- VARIANTES DE ANIMACIÓN ---
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
  initial: {
    opacity: 0,
    y: 20,
  },
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
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    } as Transition,
  },
};

export default function HeroCarousel() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const slideIndex =
    ((page % slidesData.length) + slidesData.length) % slidesData.length;

  const activeSlide = slidesData[slideIndex];

  const showContent = activeSlide.showContent !== false;

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
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
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
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#182C45] px-2">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={activeSlide.imageSrc}
            alt={activeSlide.title || "Casagrande Geotecnia"}
            fill
            quality={90}
            priority={slideIndex === 0}
            sizes="100vw"
            className={
              activeSlide.imageFit === "contain"
                ? "object-contain"
                : "object-cover"
            }
            style={{
              objectPosition: activeSlide.imagePosition || "center",
            }}
          />

          {showContent && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#182C45]/75 via-[#182C45]/45 to-transparent" />
          )}
        </motion.div>
      </AnimatePresence>

      {showContent && (
        <div className="relative z-20 flex h-full w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:justify-start lg:px-8">
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
              className="absolute w-full max-w-4xl pt-10 md:pt-36"
            >
              <motion.div
                className="flex flex-col items-center space-y-4 text-center lg:items-start lg:space-y-5 lg:text-left"
                variants={contentVariants}
                initial="initial"
                animate="animate"
              >
                {activeSlide.title && (
                  <motion.h2
                    variants={itemVariants}
                    className="cursor-pointer text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-7xl"
                  >
                    {activeSlide.title}
                  </motion.h2>
                )}

                {activeSlide.subtitle && (
                  <motion.p
                    variants={itemVariants}
                    className="max-w-3xl text-base font-medium leading-relaxed text-white drop-shadow-md sm:text-lg lg:text-xl"
                  >
                    {activeSlide.subtitle}
                  </motion.p>
                )}

                {activeSlide.buttonText && activeSlide.buttonLink && (
                  <motion.div variants={itemVariants}>
                    <Button
                      asChild
                      size="lg"
                      className="mt-4 rounded-lg bg-white px-8 py-6 text-base font-bold text-[#182C45] shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#C9A66B] active:scale-95"
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
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center space-x-2 md:bottom-8">
        {slidesData.map((_slide, index) => (
          <button
            key={index}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            className={`h-2 w-2 cursor-pointer rounded-full p-2 transition-all duration-300 ${
              index === slideIndex ? "w-6 bg-[#C9A66B]" : "bg-gray-400"
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