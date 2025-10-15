"use client";

import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
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
    title: "Comunicate con nosotros",
    subtitle:
      "Nuestra prioridad es la calidad y la formalidad en cada proyecto. Nos comprometemos con la excelencia y la mejora continua.",
    imageSrc: "/hero.png",
    buttonText: "Ver Brouchure",
    buttonLink: "/",
  },
];

// --- Variantes de Animación ---
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

export default function HeroContacto() {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = Math.abs(page % slidesData.length);
  const activeSlide = slidesData[slideIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 70000);
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
    <main className="relative flex h-[70vh] md:h-[70vh] w-full items-center justify-center overflow-hidden bg-black">
      {/* Fondo con imagen */}
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
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4772]/90 via-[#1b4772]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido centrado */}
      <div className="relative z-20 flex h-full w-full max-w-5xl items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-36">
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
            className="w-full"
          >
            <motion.div
              className="flex flex-col items-center justify-center text-center space-y-6"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg"
              >
                {activeSlide.title}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-base font-medium leading-relaxed text-gray-200 sm:text-lg lg:text-xl drop-shadow-md"
              >
                {activeSlide.subtitle}
              </motion.p>

             
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores */}
      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center space-x-2 md:bottom-8">
        {slidesData.map((_slide, index) => (
          <button
          aria-label="Ir a la diapositiva 1"
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 p-2 cursor-pointer max-md:hidden ${
              index === slideIndex ? "w-6 bg-[#1b4772]" : "bg-gray-400"
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
