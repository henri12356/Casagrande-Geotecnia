"use client";

import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  PanInfo,
  Transition,
  Variants,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

// ─────────────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────────────

const AUTOPLAY_DELAY = 7000;

type Slide = {
  id: number;
  eyebrow?: string;
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

const slidesData: Slide[] = [
  {
    id: 1,
    eyebrow: "CASAGRANDE GEOTECNIA Y CONCRETO",
    title: "BIENVENIDO A CASAGRANDE",
    subtitle:
      "Líderes en ingeniería geotécnica con equipos certificados por INACAL y PIZUAR. Ofrecemos soluciones con precisión, confiabilidad y excelencia técnica en cada proyecto.",
    imageSrc: "/hero01.webp",
    buttonText: "Descargar nuestro brochure",
    buttonLink: "/BROCHURE_CASAGRANDE_ GEOTECNIA_2026.pdf",
    showContent: true,
    imageFit: "cover",
    imagePosition: "center",
  },
  {
   id: 3,
   eyebrow: "ANÁLISIS, PRECISIÓN Y CONFIABILIDAD",
   title: "LABORATORIO DE SUELOS",
   subtitle:
     "Realizamos ensayos físicos, mecánicos y químicos para determinar las propiedades del suelo, brindando resultados confiables para el diseño, control y seguridad de cada proyecto.",
   imageSrc: "/hero03.webp",
   buttonText: "Conoce nuestro laboratorio",
   buttonLink: "/servicios/laboratorio-de-suelos",
   showContent: true,
   imageFit: "cover",
   imagePosition: "center",
 },
  {
    id: 2,
    eyebrow: "INGENIERÍA SIN MARGEN DE ERROR",
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

// ─────────────────────────────────────────────
// ANIMACIONES
// ─────────────────────────────────────────────

const imageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "8%" : "-8%",
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    } as Transition,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-6%" : "6%",
    opacity: 0,
    scale: 1.02,
    transition: {
      type: "tween",
      duration: 0.55,
      ease: [0.4, 0, 1, 1],
    } as Transition,
  }),
};

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    x: -28,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delayChildren: 0.18,
      staggerChildren: 0.12,
      ease: [0.22, 1, 0.36, 1],
    } as Transition,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    } as Transition,
  },
};

// ─────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────

export default function HeroCarousel() {
  const [[activeIndex, direction], setActiveSlide] = useState<
    [number, number]
  >([0, 1]);

  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slidesData[activeIndex];
  const showContent = activeSlide.showContent !== false;

  const paginate = useCallback((newDirection: number) => {
    setActiveSlide(([currentIndex]) => {
      const nextIndex =
        (currentIndex + newDirection + slidesData.length) %
        slidesData.length;

      return [nextIndex, newDirection];
    });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      setActiveSlide([
        index,
        index > activeIndex ? 1 : -1,
      ]);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      paginate(1);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused, paginate]);

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const passedDistance = Math.abs(offset.x) > 70;
    const passedVelocity = Math.abs(velocity.x) > 450;

    if (!passedDistance && !passedVelocity) return;

    if (offset.x < 0 || velocity.x < -450) {
      paginate(1);
    } else {
      paginate(-1);
    }
  };

  return (
    <section
      aria-label="Presentación de Casagrande Geotecnia"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="
        relative isolate
        h-[calc(100svh-64px)] min-h-[720px] max-h-[900px]
        w-full overflow-hidden bg-[#182C45]
        sm:h-[calc(100svh-72px)] sm:min-h-[760px]
        lg:min-h-[680px]
      "
    >
      {/* Fondo corporativo */}
      <div className="pointer-events-none absolute inset-0 bg-[#182C45]" />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-24 bottom-0
          h-72 w-72 rounded-full border border-white/10
          sm:h-96 sm:w-96
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[12%] top-[15%]
          hidden h-28 w-28 rounded-full border border-[#C9A66B]/25
          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:52px_52px]
        "
      />

      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={activeSlide.id}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          className="absolute inset-0 touch-pan-y"
        >
          {/* Imagen */}
          <div
            className="
              absolute inset-x-0 top-0 h-[43%] overflow-hidden
              [clip-path:polygon(0_0,100%_0,100%_88%,82%_100%,0_92%)]
              sm:h-[47%]
              lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[57%]
              lg:[clip-path:polygon(16%_0,100%_0,100%_100%,5%_100%,0_70%,10%_56%,0_43%)]
            "
          >
            <Image
              src={activeSlide.imageSrc}
              alt={activeSlide.title || "Casagrande Geotecnia"}
              fill
              priority={activeIndex === 0}
              quality={95}
              sizes="(min-width: 1024px) 57vw, 100vw"
              className={
                activeSlide.imageFit === "contain"
                  ? "object-contain"
                  : "object-cover"
              }
              style={{
                objectPosition:
                  activeSlide.imagePosition || "center",
              }}
            />

            <div
              aria-hidden="true"
              className="
                absolute inset-0
                bg-gradient-to-t from-[#182C45]/55 via-transparent to-black/5
                lg:bg-gradient-to-r lg:from-[#182C45]/45 lg:via-transparent lg:to-black/5
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute inset-x-0 bottom-0 h-px bg-white/20
                lg:inset-y-0 lg:left-0 lg:h-full lg:w-px
              "
            />
          </div>

          {/* Contenido */}
          {showContent && (
            <div
              className="
                relative z-20 mx-auto grid h-full w-full max-w-[1600px]
                grid-rows-[43%_1fr] px-5
                sm:grid-rows-[47%_1fr] sm:px-8
                lg:grid-cols-[48%_52%] lg:grid-rows-1
                lg:px-12 xl:px-16 2xl:px-20
              "
            >
              <div
                className="
                  row-start-2 flex items-center pb-24 pt-7
                  sm:pb-28 sm:pt-9
                  lg:col-start-1 lg:row-start-1
                  lg:pb-0 lg:pr-12 lg:pt-0
                "
              >
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full max-w-[650px]"
                >
                  {activeSlide.eyebrow && (
                    <motion.div
                      variants={itemVariants}
                      className="mb-4 flex items-center gap-3 sm:mb-5"
                    >
                      <span className="h-[2px] w-10 bg-[#C9A66B] sm:w-12" />

                      <p className="text-[11px] font-bold uppercase tracking-[0.19em] text-[#C9A66B] sm:text-xs">
                        {activeSlide.eyebrow}
                      </p>
                    </motion.div>
                  )}

                  {activeSlide.title && (
                    <motion.h1
                      variants={itemVariants}
                      className="
                        max-w-2xl text-[2.25rem] font-extrabold
                        leading-[1.03] tracking-[-0.035em] text-white
                        sm:text-5xl
                        lg:text-[3.6rem]
                        xl:text-[4.2rem]
                      "
                    >
                      {activeSlide.title}
                    </motion.h1>
                  )}

                  {activeSlide.subtitle && (
                    <motion.p
                      variants={itemVariants}
                      className="
                        mt-5 max-w-xl text-sm font-normal
                        leading-6 text-slate-200
                        sm:mt-6 sm:text-base sm:leading-7
                        lg:text-lg lg:leading-8
                      "
                    >
                      {activeSlide.subtitle}
                    </motion.p>
                  )}

                  {activeSlide.buttonText &&
                    activeSlide.buttonLink && (
                      <motion.div
                        variants={itemVariants}
                        className="
                          mt-6 flex flex-col items-start gap-4
                          sm:mt-8 sm:flex-row sm:items-center
                        "
                      >
                        <Button
                          asChild
                          size="lg"
                          className="
                            group h-12 rounded-none
                            bg-[#C9A66B] px-6
                            text-sm font-bold text-[#182C45]
                            shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                            transition-all duration-300
                            hover:-translate-y-0.5 hover:bg-white
                            hover:text-[#182C45]
                            sm:h-14 sm:px-8
                          "
                        >
                          <Link
                            href={activeSlide.buttonLink}
                            className="flex items-center gap-3"
                          >
                            {activeSlide.buttonIcon}

                            <span>{activeSlide.buttonText}</span>

                            <ArrowRight
                              aria-hidden="true"
                              className="
                                h-4 w-4 transition-transform
                                duration-300 group-hover:translate-x-1
                              "
                            />
                          </Link>
                        </Button>

                        <div className="hidden items-center gap-5 text-xs font-medium text-white/60 sm:flex">
                          <span>Precisión técnica</span>
                          <span className="h-1 w-1 rounded-full bg-[#C9A66B]" />
                          <span>Resultados confiables</span>
                        </div>
                      </motion.div>
                    )}
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Flecha anterior */}
      <button
        type="button"
        onClick={() => paginate(-1)}
        aria-label="Mostrar diapositiva anterior"
        className="
          absolute left-3 top-[21%] z-40
          flex h-11 w-11 -translate-y-1/2 items-center justify-center
          border border-white/25 bg-[#182C45]/75 text-white
          shadow-lg backdrop-blur-md transition-all duration-300
          hover:border-[#C9A66B] hover:bg-[#C9A66B]
          hover:text-[#182C45]
          sm:left-5 sm:top-[23%] sm:h-12 sm:w-12
          lg:left-6 lg:top-1/2 lg:h-14 lg:w-14
        "
      >
        <ChevronLeft
          aria-hidden="true"
          className="h-6 w-6"
          strokeWidth={1.8}
        />
      </button>

      {/* Flecha siguiente */}
      <button
        type="button"
        onClick={() => paginate(1)}
        aria-label="Mostrar siguiente diapositiva"
        className="
          absolute right-3 top-[21%] z-40
          flex h-11 w-11 -translate-y-1/2 items-center justify-center
          border border-white/25 bg-[#182C45]/75 text-white
          shadow-lg backdrop-blur-md transition-all duration-300
          hover:border-[#C9A66B] hover:bg-[#C9A66B]
          hover:text-[#182C45]
          sm:right-5 sm:top-[23%] sm:h-12 sm:w-12
          lg:right-6 lg:top-1/2 lg:h-14 lg:w-14
        "
      >
        <ChevronRight
          aria-hidden="true"
          className="h-6 w-6"
          strokeWidth={1.8}
        />
      </button>

      {/* Navegación inferior */}
      <div
        className="
          absolute bottom-7 left-1/2 z-40
          flex -translate-x-1/2 items-center gap-4
          sm:bottom-9
          lg:bottom-10 lg:left-12 lg:translate-x-0
          xl:left-16 2xl:left-20
        "
      >
        <span className="min-w-6 text-xs font-bold text-white">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-2">
          {slidesData.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir a la diapositiva ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToSlide(index)}
                className={`
                  relative h-[3px] overflow-hidden
                  bg-white/25 transition-all duration-300
                  ${isActive ? "w-14 sm:w-16" : "w-7 sm:w-8"}
                `}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[#C9A66B]" />
                )}
              </button>
            );
          })}
        </div>

        <span className="min-w-6 text-xs font-medium text-white/50">
          {String(slidesData.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}