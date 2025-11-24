"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// --- Servicios ---
const servicios = [
  {
    slug: "geotecnia",
    titulo: " Geotecnia",
    descripcion:
      "Investigación del subsuelo, análisis de cimentaciones, estabilidad de taludes, diseño de muros de contención, túneles y presas para obras seguras y sostenibles.",
    imagen: "/servicios/geotecnia.webp",
  },
  {
    slug: "geofisica",
    titulo: "Geofísica",
    descripcion:
      "Aplicación de métodos sísmicos, eléctricos y electromagnéticos para explorar el subsuelo y obtener información precisa de estructuras geológicas y geotécnicas.",
    imagen: "/servicios/geofisica.webp",
  },
  {
    slug: "control-de-calidad",
    titulo: "Peligro sísmico",
    descripcion:
      "Pruebas geotécnicas y geofísicas en terreno como SPT, CPT, densidades y permeabilidad, obteniendo información directa y confiable del subsuelo.",
    imagen: "/servicios/campo.webp",
  },
  {
    slug: "geologia",
    titulo: "Geología y geomecánica",
    descripcion:
      "Caracterización del terreno, cartografía geológica, identificación de fallas, riesgos sísmicos y evaluación de materiales naturales para proyectos de ingeniería.",
    imagen: "/servicios/geologia.webp",
  },
  {
    slug: "hidrogeologia",
    titulo: "Hidrología e hidrogeología",
    descripcion:
      "Análisis de aguas subterráneas, interacción con suelos y estructuras, estudios de recarga y calidad hídrica para proyectos de infraestructura y minería.",
    imagen: "/servicios/hidrologia.webp",
  },
  {
    slug: "laboratorio-de-suelos",
    titulo: "Laboratorio de materiales",
    descripcion:
      "Ensayos especializados en suelos, rocas, concreto, asfalto y agua, aplicando normas nacionales e internacionales para garantizar la calidad de materiales.",
    imagen: "/servicios/laboratorio.webp",
  },
  {
    slug: "ensayo-de-campo",
    titulo: "Control de calidad y ensayos de campo",
    descripcion:
      "Evaluación del comportamiento de rocas y macizos rocosos mediante ensayos in situ y modelamiento numérico para garantizar estabilidad estructural.",
    imagen: "/servicios/geomecanica.webp",
  },
 
  {
    slug: "evaluacion-estructural",
    titulo: "Evaluación Estructural",
    descripcion:
      "Análisis técnico de edificaciones y estructuras existentes para determinar su capacidad portante, nivel de deterioro y necesidad de refuerzo estructural, garantizando seguridad y cumplimiento normativo.",
    imagen: "/servicios/evaluacion.webp",
  },
];

const Servicios = () => {
  return (
    <section className="py-10 px-4 md:px-6 max-w-7xl mx-auto">
      {/* --- Título --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pt-6 pb-10 text-center"
      >
        <p className="text-[15px] pb-2 md:text-xl text-gray-600 tracking-wide max-w-7xl mx-auto pt-4">
          Más de{" "}
          <span className="font-semibold text-[#182C45]">
            130 ensayos de calidad
          </span>{" "}
          respaldan nuestra precisión técnica y compromiso con la ingeniería
          geotécnica moderna.
        </p>
        <div className="border-t border-[#182C45]/20 "></div>
      </motion.div>

      {/* --- Grid de servicios --- */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio, index) => (
          <motion.div
            key={servicio.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link
              href={
                servicio.slug === "laboratorio-de-suelos"
                  ? "/laboratorio/laboratorio-de-suelos" // 👈 AQUÍ EL CAMBIO
                  : `/servicios/${servicio.slug}`
              }
              passHref
            >
              <Card className="relative shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden group h-80">
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {servicio.titulo}
                  </h3>
                  <p className="text-white text-sm mb-4">
                    {servicio.descripcion}
                  </p>
                  <Button className="w-1/2 md:w-1/3 bg-[#182C45] hover:bg-[#1b4772] text-white cursor-pointer">
                    Ver más
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* --- Sección de contacto --- */}
      <div className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 rounded-3xl p-6 md:p-12 border border-gray-200 shadow-xl "
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Columna Izquierda */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1b4772] mb-6">
                Contáctanos
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-lg">
                  <FaPhoneAlt className="text-[#1b4772] w-5 h-5 mr-4" />
                  +51 945 513 323
                </p>
                <p className="flex items-center max-sm:text-[10px] md:text-lg">
                  <FaEnvelope className="text-[#1b4772] w-5 h-5 mr-4" />
                  comercial@casagrandegeotecnia.com.pe
                </p>
                <p className="flex items-center text-lg">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                  Lun-Sab: 8:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pl-16 md:pt-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Solicita un Servicio
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="md:w-full cursor-pointer bg-[#1b4772] hover:bg-[#1a242f] text-white py-6 text-lg rounded-xl shadow-lg">
                    Solicitar cotización
                  </Button>
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="md:w-full cursor-pointer border-[#1b4772] text-[#1b4772] hover:bg-gray-100 py-6 text-lg rounded-xl"
                  >
                    Agendar visita técnica
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Servicios;
