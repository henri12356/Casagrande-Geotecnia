"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// Servicios basados en el informe
const servicios = [
  {
    slug: "geologia",
    titulo: "Geológia",
    descripcion:
      "Caracterización del terreno, cartografía geológica, identificación de fallas, riesgos sísmicos y evaluación de materiales naturales para proyectos de ingeniería.",
    imagen: "/Ensayos-en-Suelos02.png",
  },
  {
    slug: "geotecnia",
    titulo: " Geotecnia",
    descripcion:
      "Investigación del subsuelo, análisis de cimentaciones, estabilidad de taludes, diseño de muros de contención, túneles y presas para obras seguras y sostenibles.",
    imagen: "/Perforacion01.png",
  },
  {
    slug: "geofisica",
    titulo: "Geofísica",
    descripcion:
      "Aplicación de métodos sísmicos, eléctricos y electromagnéticos para explorar el subsuelo y obtener información precisa de estructuras geológicas y geotécnicas.",
    imagen: "/Ensayos-Sísmicos.png",
  },
  {
    slug: "geomecanica",
    titulo: "Geomecánica",
    descripcion:
      "Evaluación del comportamiento de rocas y macizos rocosos mediante ensayos in situ y modelamiento numérico para garantizar estabilidad estructural.",
    imagen: "/Ensayos-en-Concreto03.png",
  },
  {
    slug: "hidrogeologia",
    titulo: "Hidrología e Hidrogeología",
    descripcion:
      "Análisis de aguas subterráneas, interacción con suelos y estructuras, estudios de recarga y calidad hídrica para proyectos de infraestructura y minería.",
    imagen: "/Hidrogeológicos-Especializados02.jpg",
  },
  {
    slug: "laboratorio-de-suelo",
    titulo: "Laboratorio Geotecnico",
    descripcion:
      "Ensayos especializados en suelos, rocas, concreto, asfalto y agua, aplicando normas nacionales e internacionales para garantizar la calidad de materiales.",
    imagen: "/laboratorio-de-ensayos.png",
  },
  {
    slug: "ensayo-de-campo",
    titulo: "Ensayos de Campo",
    descripcion:
      "Pruebas geotécnicas y geofísicas en terreno como SPT, CPT, densidades y permeabilidad, obteniendo información directa y confiable del subsuelo.",
    imagen: "/Ensayos-de-Penetración.png",
  },
  {
    slug: "control-de-calidad",
    titulo: "Control de Calidad en Obras",
    descripcion:
      "Supervisión y aseguramiento de la calidad en obras civiles mediante CQC y CQA, verificando materiales, procesos constructivos y cumplimiento normativo.",
    imagen: "/control-de-calidad.jpeg",
  },
  {
    slug: "evaluacion-estructural",
    titulo: "Evaluación Estructural",
    descripcion:
      "Análisis técnico de edificaciones y estructuras existentes para determinar su capacidad portante, nivel de deterioro y necesidad de refuerzo estructural, garantizando seguridad y cumplimiento normativo.",
    imagen: "/evaluacion-estructural.webp",
  },
  {
    slug: "mecanica-de-suelos",
    titulo: "Mecánica de Suelos",
    descripcion:
      "Determinación de las propiedades físicas y mecánicas del suelo mediante ensayos in situ y de laboratorio, asegurando la estabilidad y diseño adecuado de cimentaciones.",
    imagen: "/estudio-mecanico-suelos.webp",
  },
];

const Servicios = () => {
  // const youtubeVideoId = "dQw4w9WgXcQ"; // Reemplazar por video real

  return (
    <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
      {/* --- Título --- */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl lg:text-4xl font-bold text-center mb-12 text-[#1b4772]"
      >
        Nuestros Servicios
      </motion.h1>

      {/* --- Grid de servicios --- */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio, index) => (
          <motion.div
            key={servicio.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link href={`/servicios/${servicio.slug}`} passHref>
              <Card className="relative shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden group h-80">
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
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

      {/* --- Video corporativo --- */}
      {/* <div className="mt-16 md:mt-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-center mb-8 text-[#1b4772] "
        >
          Mira Nuestro Video Corporativo
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-3xl shadow-2xl"
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div> */}

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
            <div className="">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1b4772] mb-6">
                Contáctanos
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-lg">
                  <FaPhoneAlt className="text-[#1b4772] w-5 h-5 mr-4" />
                  +51 945 513 323
                </p>
                <p className="flex items-center text-[12px] md:text-lg">
                  <FaEnvelope className="text-[#1b4772] w-5 h-5 mr-4" />
                  comercial@casagrandegeotecnia.com.pe
                </p>
                <p className="flex items-center text-lg">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="border-t md:border-t-0 md:border-l   border-gray-200 pt-8 md:pl-16 md:pt-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Solicita un Servicio
              </h3>
              <div className="space-y-4  ">
                {/* Botón WhatsApp Cotización */}
                <a
                  href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="md:w-full cursor-pointer bg-[#1b4772] hover:bg-[#1a242f] text-white py-6 text-lg rounded-xl shadow-lg">
                    Solicitar cotización
                  </Button>
                </a>

                {/* Botón WhatsApp Visita Técnica */}
              </div>
              <div className="pt-2 ">
                <a
                  href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="md:w-full cursor-pointer  border-[#1b4772] text-[#1b4772] hover:bg-gray-100 py-6 text-lg rounded-xl"
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
