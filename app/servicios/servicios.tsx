'use client';

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
    titulo: "Geología",
    descripcion:
      "Análisis del terreno y su historia natural, estudios de riesgos, cartografía y supervisión de zonas críticas.",
    imagen: "/hero05.jpg",
  },
  {
    slug: "geotecnia",
    titulo: "Geotecnia",
    descripcion:
      "Estudios de cimentaciones, muros de contención, túneles y estabilidad de taludes para proyectos seguros.",
    imagen: "/hero06.jpg",
  },
  {
    slug: "laboratorio-geotecnico",
    titulo: "Laboratorio Geotécnico",
    descripcion:
      "Ensayos en campo y laboratorio de suelos, rocas, concreto, asfalto y agua para garantizar calidad de materiales.",
    imagen: "/hero04.jpg",
  },
  {
    slug: "geofisica",
    titulo: "Geofísica",
    descripcion:
      "Exploración del subsuelo mediante ensayos sísmicos, geoeléctricos y métodos no invasivos para identificar zonas críticas.",
    imagen: "/hero03.jpg",
  },
  {
    slug: "geomecanica",
    titulo: "Geomecánica",
    descripcion:
      "Análisis de estabilidad de rocas, taludes y túneles con modelos numéricos y ensayos in situ.",
    imagen: "/hero02.jpg",
  },
  {
    slug: "hidrogeologia",
    titulo: "Hidrogeología",
    descripcion:
      "Estudio y monitoreo del agua subterránea, interacción con suelos y estructuras, garantizando seguridad hídrica.",
    imagen: "/hero01.jpg",
  },
];

const Servicios = () => {
  const youtubeVideoId = "dQw4w9WgXcQ"; // Reemplazar por video real

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
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    {servicio.descripcion}
                  </p>
                  <Button className="w-full md:w-1/2 bg-[#1b4772] hover:bg-[#1a242f] text-white cursor-pointer">
                    Ver más
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* --- Video corporativo --- */}
      <div className="mt-16 md:mt-24">
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
      </div>

      {/* --- Sección de contacto --- */}
      <div className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 rounded-3xl p-6 md:p-12 border border-gray-200 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#1b4772]  mb-6">
                Contáctanos
              </h3>
              <div className="space-y-4">
                <p className="flex items-center   text-lg">
                  <FaPhoneAlt className="text-[#1b4772]  w-5 h-5 mr-4" />
                  +51 945 513 323
                </p>
                <p className="flex items-center   text-lg">
                  <FaEnvelope className="text-[#1b4772]  w-5 h-5 mr-4" />
                  comercial@casagrandegeotecnia.com.pe
                </p>
                <p className="flex items-center  text-lg">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pl-16 md:pt-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Solicita un Servicio
              </h3>
              <div className="space-y-4">
                <Button className="w-full bg-[#1b4772] hover:bg-[#1a242f] text-white py-6 text-lg rounded-xl shadow-lg">
                  Solicitar cotización
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#1b4772]  text-[#1b4772]  hover:bg-gray-100 py-6 text-lg rounded-xl"
                >
                  Agendar visita técnica
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Servicios;
