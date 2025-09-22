'use client';
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// --- SLIDE CON NUEVO TEXTO PROFESIONAL ---
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
    title: "Aseguramiento de calidad y confiabilidad de resultados",
    subtitle: "",
    imageSrc: "/hero01.jpg",
    buttonText: "",
    buttonLink: "/servicios",
    buttonIcon: null,
  },
];

// --- Variantes de Animación ---
const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.7, ease: [0.56, 0.03, 0.12, 1.04] } },
  exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0, transition: { type: "tween", duration: 0.7, ease: [0.56, 0.03, 0.12, 1.04] } }),
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HeroServicios() {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = Math.abs(page % slidesData.length);
  const activeSlide = slidesData[slideIndex];

  const paginate = useCallback((newDirection: number) => setPage(([currentPage]) => [currentPage + newDirection, newDirection]), []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 70000);
    return () => clearInterval(interval);
  }, [paginate]);

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeConfidenceThreshold = 10000;
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  return (
    <main className="relative flex h-[70vh] md:h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black px-2">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image src={activeSlide.imageSrc} alt={activeSlide.title} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/50" />
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
            className="absolute w-full max-w-2xl"
          >
            <motion.div
              className="flex flex-col items-center space-y-4 text-center lg:items-start lg:space-y-5 lg:text-left"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-snug"
              >
                {activeSlide.title}
              </motion.h1>

              {activeSlide.buttonText && activeSlide.buttonLink && (
                <motion.div variants={itemVariants}>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 rounded-lg bg-[#2c3e50] md:px-8 md:py-3 text-sm md:text-base font-bold text-white shadow-lg transition-transform duration-300 hover:bg-[#1b2a3b] hover:scale-105 active:scale-95"
                  >
                    <Link href={activeSlide.buttonLink} className="flex items-center gap-2">
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

      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center space-x-2 md:bottom-8">
        {slidesData.map((_slide, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === slideIndex ? "md:w-6 bg-[#2c3e50]" : "bg-gray-400"}`}
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
