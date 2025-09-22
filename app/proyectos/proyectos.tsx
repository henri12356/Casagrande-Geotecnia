"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import proyectos from "@/app/data/proyectos.json";

const ProyectosPage = () => {
  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r bg-[#1b4772] rounded-lg px-6 py-3 mb-4 shadow-md">
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Portafolio
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#1b4772]  mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto">
            Descubre nuestra trayectoria y experiencia en proyectos de ingeniería
            geotécnica a nivel nacional.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <Link
              key={proyecto.slug}
              href={`/proyectos/${proyecto.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Imagen */}
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b4b52]/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-[#1b4b52] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {proyecto.categoria}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center w-full">
                      <span className="inline-block bg-white text-[#1b4b52] px-6 py-2 rounded-full font-semibold shadow">
                        Ver Detalles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-3 group-hover:text-[#1b4b52] transition-colors duration-300">
                    {proyecto.titulo}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#1b4b52] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        <strong className="font-semibold">Cliente:</strong> {proyecto.cliente}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#1b4b52] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">
                        <strong className="font-semibold">Obra:</strong> {proyecto.obra}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center text-[#1b4b52] font-semibold text-sm group-hover:text-[#2c3e50] transition-colors duration-300">
                    Ver proyecto completo
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      
    </div>
  );
};

export default ProyectosPage;
