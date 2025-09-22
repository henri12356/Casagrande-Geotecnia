'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- DATOS DE LOS PROYECTOS ---
const proyectosData = [
  {
    id: 1,
    imageSrc: "/hero01.jpg",
    title: "GEDFAL",
    subtitle: "CBR INSTITUTO PUERTA CRUEL PRUEBA 05",
    fullTitle: "Puerto del Callao",
    fullSubtitle: "CBR in-situ plataforma"
  },
  {
    id: 2,
    imageSrc: "/hero03.jpg",
    title: "Defensa Ribereña",
    subtitle: "Muestreo De Roca En Cantera"
  },
  {
    id: 3,
    imageSrc: "/hero02.jpg",
    title: "Tecsur Set Unacém",
    subtitle: "Estudio de suelos"
  },
  {
    id: 4,
    imageSrc: "/hero04.jpg",
    title: "Mega Puerto de Chancay",
    subtitle: "Accesos y Muros Jersey"
  },
];

const Proyectos = () => {
  return (
    <section className="bg-[#2c3e50] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Encabezado minimalista */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-3"
          >
            Galería de Proyectos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 text-sm mb-6"
          >
            Historias de éxito y dedicación en cada proyecto
          </motion.p>
        </div>

        {/* Grid de proyectos - diseño limpio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {proyectosData.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white/5 rounded-lg overflow-hidden border border-gray-700/30 hover:border-teal-400/40 transition-all duration-200 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={proyecto.imageSrc}
                  alt={proyecto.title}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Badge solo para proyecto destacado */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Destacado
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white text-base mb-1 group-hover:text-teal-400 transition-colors">
                  {proyecto.title}
                </h3>
                <p className="text-gray-400 text-xs mb-2">
                  {proyecto.subtitle}
                </p>
                
                {/* Info adicional solo para el primer proyecto */}
                {index === 0 && proyecto.fullTitle && (
                  <div className="mt-2 pt-2 border-t border-gray-700/40">
                    <h4 className="font-medium text-teal-400 text-xs mb-1">
                      {proyecto.fullTitle}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {proyecto.fullSubtitle}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Llamado a la acción simple */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white hover:bg-[#98b2cd] text-[#2c3e50] px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Contáctanos
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default Proyectos;