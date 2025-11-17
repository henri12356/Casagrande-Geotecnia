"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const serviciosData = [
  {
    id: 1,
    imageSrc: "/servicios/geologia.webp",
    title: "Servicios de Geología",
    description:
      "Análisis del terreno y su historia natural, estudios de riesgos, cartografía y supervisión de zonas críticas.",
    href: "/servicios/geologia",
  },
  {
    id: 2,
    imageSrc: "/servicios/geotecnia.webp",
    title: " Estudios Geotécnicos",
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
    imageSrc: "/servicios/evaluacion.webp",
    title: "Evaluación Estructural",
    description:
      "Análisis técnico de edificaciones y estructuras existentes para determinar su capacidad portante, nivel de deterioro y necesidad de refuerzo estructural, garantizando seguridad y cumplimiento normativo.",
    href: "/servicios/evaluacion-estructural",
  },
];

const Galeria = () => {
  return (
    <section className="py-6 pt-16 px-4  font-sans">
      <div className="max-w-7xl mx-auto relative">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-[#182C45] mb-4"
          >
            Portafolio de Servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-black"
          >
            Servicios especializados en ingeniería geotécnica, laboratorio y
            control de calidad.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-[#182C45] mx-auto mt-4"
          />
        </div>

        {/* Carousel de servicios */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {serviciosData.map((servicio, index) => (
              <CarouselItem
                key={servicio.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 p-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col h-full bg-white cursor-pointer rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
                >
                  <Link
                    href={servicio.href}
                    aria-label="Ver Servicio "
                    className="flex flex-col h-full"
                  >
                    {/* Imagen */}
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={servicio.imageSrc}
                        alt={servicio.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 
                          (max-width: 1200px) 50vw, 
                          25vw"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Texto */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-semibold text-[#182C45] mb-3 text-lg">
                        {servicio.title}
                      </h3>
                      <p className="text-black text-sm mb-6 flex-1">
                        {servicio.description}
                      </p>
                      <p 
                      aria-label="Ver detalles del servicio" 
                      className="mt-auto flex items-center cursor-pointer text-[#182C45] font-bold text-sm hover:text-gray-900 transition-colors"
                      
                      >
                        Ver detalles <FaArrowRight className="ml-2" />
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controles */}
          <CarouselPrevious className="  left-[-50px] h-10 w-10 bg-[#182C45] text-white hover:text-white hover:bg-black rounded-full shadow-md max-lg:hidden cursor-pointer" />
          <CarouselNext className="right-[-30px] h-10 w-10 bg-[#182C45] text-white hover:bg-gray-900 hover:text-white rounded-full shadow-md max-lg:hidden cursor-pointer" />
        </Carousel>
      </div>
    </section>
  );
};

export default Galeria;
