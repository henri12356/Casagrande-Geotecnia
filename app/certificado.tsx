"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const certificados = [
  {
    id: 1,
    imageSrc: "/certificado01.png",
    title: "ISO 9001 – Sistema de Gestión de Calidad",
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
    imageSrc: "/certificado02.png",
    title: "ISO 37001 – Sistema de Gestión Antisoborno",
    subtitle: "Transparencia y ética en cada proyecto",
    description:
      "Establece normas para prevenir, detectar y gestionar riesgos de soborno y corrupción dentro de la empresa, asegurando transparencia en contratos, adquisiciones y supervisiones.",
    services: [
      "Gestión transparente de contratos y adquisiciones.",
      "Prevención de conflictos de interés en obras públicas y privadas.",
      "Fortalecimiento de la reputación ética de la empresa.",
    ],
  },
  {
    id: 3,
    imageSrc: "/certificado02.png",
    title: "ISO 14001 – Sistema de Gestión Ambiental",
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
    id: 4,
    imageSrc: "/certificado01.png",
    title: "LABORATORIO DE ENSAYO ACREDITADO",
    subtitle: "ISO/IEC 17025:2017 – INACAL",
    description:
      "Nuestro laboratorio realiza ensayos en suelos, rocas, concretos, asfaltos y agua con estándares internacionales, garantizando precisión y confiabilidad en los resultados.",
    services: [
      "Ensayos de penetración, densidad y permeabilidad en campo.",
      "Análisis de suelos, rocas y concretos en laboratorio.",
      "Control de calidad de materiales para construcción.",
    ],
  },
];

export default function CarouselCertificados() {
  const [index, setIndex] = useState(0);
  const total = certificados.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={certificados[index].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x * velocity.x;
              if (swipe < -1000) next();
              else if (swipe > 1000) prev();
            }}
            className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
          >
            {/* Texto */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="text-sm font-semibold text-[#1b4772] mb-2">
                EMPRESA CERTIFICADA
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1b4772] mb-3">
                {certificados[index].title}
                <br />
                <span className="text-xl lg:text-2xl font-bold text-[#1b4772]">
                  {certificados[index].subtitle}
                </span>
              </h2>
              <p className="text-gray-600 mb-3">
                {certificados[index].description}
              </p>
              <ul className="text-left text-gray-700 space-y-1 mb-4 pl-4 lg:pl-0">
                {certificados[index].services.map((s, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    {s}
                  </li>
                ))}
              </ul>
              <Button className="bg-[#1b4772] hover:bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md">
                {certificados[index].id === 4 ? "Ver Alcance" : "CONOCER MÁS"}
              </Button>
            </div>

            {/* Imagen */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src={certificados[index].imageSrc}
                alt={certificados[index].title}
                width={350}
                height={250}
                className="rounded-lg shadow-md object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación solo en desktop */}
        <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2  md:left-[-60px]">
          <button
            onClick={prev}
            className="bg-[#1b4772] hover:bg-gray-900 text-white p-2 rounded-full shadow"
          >
            ◀
          </button>
        </div>
        <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 right-2">
          <button
            onClick={next}
            className="bg-[#1b4772] hover:bg-gray-900 text-white p-2 rounded-full shadow"
          >
            ▶
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {certificados.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#1b4772]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
