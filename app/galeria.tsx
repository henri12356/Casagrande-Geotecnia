"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const serviciosData = [
  {
    id: 1,
    imageSrc: "/servicios/geologia.webp",
    title: "Servicios de Geología",
    description:
      "Análisis detallado del terreno, elaboración de cartografía geológica y evaluación de peligros naturales, proporcionando información confiable para la toma de decisiones de diseño y planificación de obras.",
    href: "/servicios/geologia",
  },
  {
    id: 2,
    imageSrc: "/servicios/geotecnia.webp",
    title: "Estudios Geotécnicos",
    description:
      "Estudios de cimentaciones, muros de contención, túneles y estabilidad de taludes para proyectos seguros.",
    href: "/servicios/geotecnia",
  },
  {
    id: 3,
    imageSrc: "/servicios/laboratorio.webp",
    title: "Laboratorio de Suelos",
    description:
      "Ensayos en campo y laboratorio de suelos, rocas, concreto, asfalto y agua para garantizar calidad de materiales.",
    href: "/servicios/laboratorio-de-suelo",
  },
  {
    id: 4,
    imageSrc: "/servicios/geofisica.webp",
    title: "Estudios Geofísicos",
    description:
      "Exploración del subsuelo mediante ensayos sísmicos, geoeléctricos y métodos no invasivos para identificar zonas críticas.",
    href: "/servicios/geofisica",
  },
  {
    id: 5,
    imageSrc: "/servicios/hidrologia.webp",
    title: "Estudios Hidrológicos e Hidrogeológicos",
    description:
      "Estudio y monitoreo del agua subterránea, interacción con suelos y estructuras, garantizando seguridad hídrica.",
    href: "/servicios/hidrogeologia",
  },
  {
    id: 6,
    imageSrc: "/servicios/geomecanica.webp",
    title: "Estudios Geomecánicos",
    description:
      "Análisis de estabilidad de rocas, taludes y túneles con modelos numéricos y ensayos in situ.",
    href: "/servicios/geomecanica",
  },
  {
    id: 7,
    imageSrc: "/servicios/mecanica.webp",
    title: "Estudio de Mecánica de Suelos",
    description:
      "Análisis de aguas subterráneas, interacción con suelos y estructuras, estudios de recarga y calidad hídrica para proyectos de infraestructura y minería.",
    href: "/servicios/mecanica-de-suelos",
  },
  {
    id: 8,
    imageSrc:"/evaluacion/evalucion01.webp",
    title: "Evaluación Estructural",
    description:
      "Análisis técnico de edificaciones y estructuras existentes para determinar su capacidad portante, nivel de deterioro y necesidad de refuerzo estructural, garantizando seguridad y cumplimiento normativo.",
    href: "/servicios/evaluacion-estructural",
  },
];

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const headingItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Galeria = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white px-4 py-14 font-sans sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          variants={headingVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-10 max-w-4xl text-center sm:mb-12"
        >
          <motion.h2
            variants={headingItemVariants}
            className="text-3xl font-black tracking-[-0.025em] text-[#182C45] sm:text-4xl lg:text-[2.75rem]"
          >
            Portafolio de Servicios
          </motion.h2>

          <motion.div
            variants={headingItemVariants}
            className="mx-auto mt-4 h-0.5 w-14 bg-[#C9A66B]"
          />

          <motion.p
            variants={headingItemVariants}
            className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg"
          >
            Ofrecemos soluciones integrales en ingeniería geotécnica, ensayos
            de laboratorio y control de calidad, orientadas a garantizar
            seguridad, cumplimiento normativo y confiabilidad técnica en cada
            proyecto.
          </motion.p>
        </motion.div>

        {/* Carrusel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {serviciosData.map((servicio, index) => (
              <CarouselItem
                key={servicio.id}
                className="basis-[88%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <motion.article
                  variants={cardVariants}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: Math.min(index, 5) * 0.06,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -8,
                        }
                  }
                  className="group h-full"
                >
                  <Link
                    href={servicio.href}
                    aria-label={`Ver detalles de ${servicio.title}`}
                    className="flex h-full min-h-[510px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(24,44,69,0.08)] transition-all duration-300 hover:border-[#C9A66B]/60 hover:shadow-[0_18px_45px_rgba(24,44,69,0.14)]"
                  >
                    {/* Imagen */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={servicio.imageSrc}
                        alt={servicio.title}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/55 via-[#182C45]/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                      <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#C9A66B] transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-bold leading-snug text-[#182C45] sm:text-xl">
                        {servicio.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                        {servicio.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-bold text-[#182C45] transition-colors duration-300 group-hover:text-[#C9A66B]">
                          Ver detalles
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#182C45] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#C9A66B]">
                          <FaArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controles */}
          <CarouselPrevious className="left-[-18px] hidden h-11 w-11 cursor-pointer rounded-full border-none bg-[#182C45] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#C9A66B] hover:text-white lg:flex xl:left-[-56px]" />

          <CarouselNext className="right-[-18px] hidden h-11 w-11 cursor-pointer rounded-full border-none bg-[#182C45] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#C9A66B] hover:text-white lg:flex xl:right-[-56px]" />
        </Carousel>
      </div>
    </section>
  );
};

export default Galeria;