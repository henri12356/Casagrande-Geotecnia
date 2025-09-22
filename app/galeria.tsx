"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const serviciosData = [
  {
    id: 1,
    imageSrc: "/hero01.jpg",
    title: "Implementación de Laboratorio en Obra",
    description:
      "Ofrecemos servicios especializados de laboratorio en sitio para control de calidad durante la construcción, garantizando precisión en cada ensayo y supervisión técnica de las obras.",
  },
  {
    id: 2,
    imageSrc: "/hero02.jpg",
    title: "Estudios Geotécnicos",
    description:
      "Realizamos análisis completos del suelo y roca para cimentaciones, pavimentos y estructuras, utilizando técnicas de sondaje y ensayos de laboratorio acreditados.",
  },
  {
    id: 3,
    imageSrc: "/hero03.jpg",
    title: "Control de Calidad en Obras Civiles",
    description:
      "Supervisamos y aseguramos la calidad en todos los procesos constructivos, incluyendo ensayos de laboratorio y de campo para materiales de construcción.",
  },
  {
    id: 4,
    imageSrc: "/hero04.jpg",
    title: "Consultoría Especializada",
    description:
      "Brindamos asesoría técnica especializada en geotecnia, geofísica, pavimentos, concreto y medio ambiente, garantizando cumplimiento de normas internacionales.",
  },
];

const Galeria = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Portafolio de Servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700"
          >
            Servicios especializados en ingeniería geotécnica, laboratorio y
            control de calidad.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-[#2c3e50] mx-auto mt-4"
          />
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {serviciosData.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={servicio.imageSrc}
                  alt={servicio.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#2c3e50] mb-3 text-lg">
                  {servicio.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {servicio.description}
                </p>

                <Link href="/servicios" className="">
                  <button className="flex items-center cursor-pointer text-[#2c3e50] font-medium text-sm hover:text-gray-900 transition-colors">
                    Ver detalles <FaArrowRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Servicio destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white rounded-xl p-8 border border-gray-200 shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#2c3e50] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">95%</span>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Implementación de Laboratorio en Obra
              </h3>
              <p className="text-gray-700 mb-4">
                Nuestro servicio principal con el más alto índice de
                satisfacción de clientes. Contamos con experiencia en más de 200
                proyectos, asegurando confiabilidad y calidad en cada estudio y
                ensayo.
              </p>
              <button className="bg-[#2c3e50] hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Solicitar cotización
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Galeria;
