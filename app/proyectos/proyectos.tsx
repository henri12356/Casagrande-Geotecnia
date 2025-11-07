"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import proyectos from "@/app/data/proyectos.json";

type Proyecto = {
  slug: string;
  titulo: string;
  cliente?: string;
  obra?: string;
  categoria?: string;
  imagen: string;
  descripcion?: string;
};

export default function ProyectosPage() {
  const searchParams = useSearchParams();
  const categoriaQP = (searchParams.get("categoria") || "").trim();

  const categorias = useMemo(() => {
    const set = new Set<string>();
    (proyectos as Proyecto[]).forEach((p) => p.categoria && set.add(p.categoria.trim()));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, []);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    (proyectos as Proyecto[]).forEach((p) => {
      const cat = (p.categoria || "").trim();
      if (!cat) return;
      m.set(cat, (m.get(cat) || 0) + 1);
    });
    return m;
  }, []);

  const listaFiltrada = useMemo(() => {
    if (!categoriaQP) return proyectos as Proyecto[];
    return (proyectos as Proyecto[]).filter(
      (p) => (p.categoria || "").trim().toLowerCase() === categoriaQP.toLowerCase()
    );
  }, [categoriaQP]);

  const titulo = categoriaQP ? `Proyectos – ${categoriaQP}` : "Nuestros Proyectos";

  return (
    <div className="">
      {/* Hero */}
      <section className="py-16 pt-28 md:pt-56 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <div className="inline-block bg-[#1b4772] rounded-lg px-6 py-3 mb-4 shadow-md">
            <span className="text-white text-sm font-semibold uppercase tracking-wider">Portafolio</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#1b4772]  mb-4">{titulo}</h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto">
            Descubre nuestra trayectoria y experiencia en proyectos de ingeniería geotécnica a nivel nacional.
          </p>
        </motion.div>

        {/* Chips de categorías */}
        <div className="mb-10 flex flex-wrap items-center gap-2 justify-center">
          <Link
            href="/proyectos"
            className={`px-4 py-2 rounded-full border text-sm transition
              ${!categoriaQP ? "bg-[#1b4772] text-white border-[#1b4772]" : "text-[#1b4772] border-[#1b4772] hover:bg-[#1b4772]/10"}`}
          >
            Todas ({(proyectos as Proyecto[]).length})
          </Link>

          {categorias.map((cat) => (
            <Link
              key={cat}
              href={`/proyectos?categoria=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full border text-sm transition
                ${categoriaQP.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#1b4772] text-white border-[#1b4772]"
                  : "text-[#1b4772] border-[#1b4772] hover:bg-[#1b4772]/10"}`}
            >
              {cat} {counts.get(cat) ? `(${counts.get(cat)})` : ""}
            </Link>
          ))}
        </div>

        {/* Grid de proyectos */}
        {listaFiltrada.length === 0 ? (
          <div className="text-center text-gray-600 py-16">
            No encontramos proyectos en <strong>{categoriaQP}</strong>.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaFiltrada.map((proyecto: Proyecto, index: number) => (
              <Link
                key={proyecto.slug}
                href={`/proyectos/${proyecto.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white block"
              >
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.06 }}>
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
                    <div className="absolute top-4 left-4">
                      {proyecto.categoria && (
                        <span className="bg-white/90 text-[#1B4772] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {proyecto.categoria}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center w-full">
                        <span className="inline-block bg-white text-[#1B4772] px-6 py-2 rounded-full font-semibold shadow">
                          Ver Detalles
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1B4772] mb-3 group-hover:text-[#1B4772] transition-colors duration-300">
                      {proyecto.titulo}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {proyecto.cliente && (
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-[#1B4772] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">
                            <strong className="font-semibold">Cliente:</strong> {proyecto.cliente}
                          </span>
                        </div>
                      )}
                      {proyecto.obra && (
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-[#1B4772] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">
                            <strong className="font-semibold">Obra:</strong> {proyecto.obra}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center text-[#1B4772] font-semibold text-sm">
                      Ver proyecto completo
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
