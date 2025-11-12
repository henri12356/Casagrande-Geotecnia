"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// No necesitas Button si los filtros están comentados
// import { Button } from '@/components/ui/button'

interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  especificaciones: string[];
}

const equiposData: Equipo[] = [
  {
    id: 1,
    nombre: "Equipo Triaxial",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo para ensayos triaxiales UU, CU y CD que determina parámetros de resistencia al corte del suelo bajo condiciones controladas de esfuerzo y drenaje",
    imagen: "/equipos/triaxial.webp",
    especificaciones: [
      "Capacidad: 50 kN",
      "Presión confinante: hasta 2000 kPa",
      "Control digital de esfuerzos",
      "Norma ASTM D4767 / NTP 339.166",
    ],
  },
  {
    id: 2,
    nombre: "Horno de Secado",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Horno eléctrico de precisión para determinación de contenido de humedad y secado de muestras de suelo a temperatura controlada",
    imagen: "/equipos/Horno.webp",
    especificaciones: [
      "Temperatura: 110°C ± 5°C",
      "Capacidad: 200 litros",
      "Control digital de temperatura",
      "Norma ASTM D2216 / NTP 339.127",
    ],
  },
  {
    id: 3,
    nombre: "Consolidómetro",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo de consolidación unidimensional para determinar propiedades de compresibilidad y velocidad de consolidación de suelos saturados",
    imagen: "/equipos/consolidometro.webp",
    especificaciones: [
      "6 celdas simultáneas",
      "Rango de carga: 1-2500 kPa",
      "Deformímetros digitales 0.001mm",
      "Norma ASTM D2435 / NTP 339.154",
    ],
  },
  {
    id: 4,
    nombre: "Equipo Corte Directo",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Máquina de corte directo para determinación de ángulo de fricción interna y cohesión del suelo mediante aplicación de esfuerzos normales y tangenciales",
    imagen: "/equipos/cortedirecto.webp",
    especificaciones: [
      "Carga normal: hasta 10 kN",
      "Velocidad deformación: 0.01-10 mm/min",
      "Deformación horizontal: 15 mm",
      "Norma ASTM D3080 / NTP 339.171",
    ],
  },
  {
    id: 5,
    nombre: "Equipo de Compresión",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Prensa de compresión no confinada para determinar resistencia a la compresión simple de suelos cohesivos y cilindros de concreto",
    imagen: "/equipos/compresion.webp",
    especificaciones: [
      "Capacidad: 100 kN (10 toneladas)",
      "Control de velocidad variable",
      "Medición digital de carga",
      "Norma ASTM D2166 / NTP 339.167",
    ],
  },
  {
    id: 6,
    nombre: "Máquina de Abrasión Los Ángeles",
    categoria: "Laboratorio de Suelos",
    descripcion:
      "Equipo para ensayo de abrasión Los Ángeles que evalúa la resistencia al desgaste de agregados gruesos por impacto y fricción",
    imagen: "/equipos/abrazion.webp",
    especificaciones: [
      "Velocidad: 30-33 rpm",
      "500 revoluciones estándar",
      "Incluye esferas de acero",
      "Norma ASTM C131 / NTP 400.019",
    ],
  },
];

const categorias = ["Todos", "Laboratorio de Suelos"];

const Equipos = () => {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(
    null
  );
  const [imagenActual, setImagenActual] = useState(0);

  const equiposFiltrados =
    filtroCategoria === "Todos"
      ? equiposData
      : equiposData.filter((equipo) => equipo.categoria === filtroCategoria);

  const abrirModal = (equipo: Equipo, index: number) => {
    setEquipoSeleccionado(equipo);
    setImagenActual(index);
  };

  const cerrarModal = () => {
    setEquipoSeleccionado(null);
  };

  const navegarImagen = (direccion: "prev" | "next") => {
    const equiposActuales = equiposFiltrados;
    if (direccion === "next") {
      const nuevoIndex = (imagenActual + 1) % equiposActuales.length;
      setImagenActual(nuevoIndex);
      setEquipoSeleccionado(equiposActuales[nuevoIndex]);
    } else {
      const nuevoIndex =
        imagenActual === 0 ? equiposActuales.length - 1 : imagenActual - 1;
      setImagenActual(nuevoIndex);
      setEquipoSeleccionado(equiposActuales[nuevoIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-14 md:pt-44">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#182C45] mb-4">
            Nuestros Equipos
            Geotécnicos
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Contamos con equipos de última generación para garantizar resultados
            precisos y confiables en todos nuestros servicios geotécnicos
          </p>
        </motion.div>

        {/* Filtros (comentados, por si quieres volver a activarlos) */}
        {/*
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              variant={filtroCategoria === categoria ? "default" : "outline"}
              className={`
                transition-all duration-300 
                ${filtroCategoria === categoria 
                  ? 'bg-[#182C45] hover:bg-blue-700 text-white shadow-lg scale-105' 
                  : 'hover:bg-blue-50 hover:border-blue-300'
                }
              `}
            >
              {categoria}
            </Button>
          ))}
        </motion.div>
        */}

        {/* Grid de Equipos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6"
        >
          <AnimatePresence mode="popLayout">
            {equiposFiltrados.map((equipo, index) => (
              <motion.div
                key={equipo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                
               
                  className="group cursor-pointer overflow-hidden transition-all duration-300 border-2 border-transparent  bg-transparent shadow-none"
                  onClick={() => abrirModal(equipo, index)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden ">
                      <Image
                        src={equipo.imagen}
                        alt={equipo.nombre}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-lg" // Añadido rounded-t-lg
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#182C45]/70 via-[#182C45]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm text-center">
                            Click para ampliar
                          </p>
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-[#182C45] text-white">
                        {equipo.categoria}
                      </Badge>
                    </div>
                    {/* ================================================================== */}
                    {/* CAMBIO 2: Fondo oscuro para el texto para que contraste bien con   */}
                    {/* el fondo de la página. Se usa un degradado oscuro y padding.       */}
                    {/* Añadido 'rounded-b-lg' para que coincida con la imagen.           */}
                    {/* ================================================================== */}
                    <div className="p-4 bg-gradient-to-t  text-[#182C45] rounded-b-lg">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">
                        {equipo.nombre}
                      </h3>
                      <p className="text-sm text-[#182C45] line-clamp-2">
                        {equipo.descripcion}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {equipoSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={cerrarModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón Cerrar */}
                <button
                  onClick={cerrarModal}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all hover:scale-110"
                >
                  <X className="w-6 h-6 text-slate-900" />
                </button>

                {/* Botones Navegación */}
                <button
                  onClick={() => navegarImagen("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>
                <button
                  onClick={() => navegarImagen("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Imagen */}
                  <div className="relative aspect-video md:aspect-auto md:min-h-[500px] bg-slate-900">
                    <Image
                      src={equipoSeleccionado.imagen}
                      alt={equipoSeleccionado.nombre}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Información */}
                  <div className="p-8 flex flex-col justify-between max-h-[80vh] md:max-h-none md:min-h-[500px] overflow-y-auto">
                    <div>
                      <Badge className="mb-4 bg-[#182C45] text-white">
                        {equipoSeleccionado.categoria}
                      </Badge>
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        {equipoSeleccionado.nombre}
                      </h2>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {equipoSeleccionado.descripcion}
                      </p>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900 text-lg mb-3">
                          Especificaciones Técnicas
                        </h3>
                        {equipoSeleccionado.especificaciones.map(
                          (spec, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#182C45] mt-2 flex-shrink-0" />
                              <p className="text-slate-700">{spec}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-500 text-center">
                        {imagenActual + 1} / {equiposFiltrados.length}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje sin resultados */}
        {equiposFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-600 text-lg">
              No se encontraron equipos en esta categoría
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Equipos;
