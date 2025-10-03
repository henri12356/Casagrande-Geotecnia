/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Proyecto {
  id: number;
  provincia: string;
  nombre: string;
  descripcion: string;
  estado: string;
  inversion: string;
  x: number;
  y: number;
  imagen: string;
  url: string;
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    provincia: "Lima",
    nombre: "Centro Comercial Lima Norte",
    descripcion: "Desarrollo de complejo comercial de 50,000 m²",
    estado: "Completado",
    inversion: "$25M",
    x: 40,
    y: 65,
    imagen: "/hero01.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 2,
    provincia: "Ayacucho",
    nombre: "Parque Industrial Arequipa",
    descripcion: "Zona industrial moderna",
    estado: "En construcción",
    inversion: "$40M",
    x: 56,
    y: 75,
    imagen: "/hero02.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 3,
    provincia: "Junin",
    nombre: "Puerto Logístico Norte",
    descripcion: "Terminal portuario y centro logístico",
    estado: "Operativo",
    inversion: "$60M",
    x: 50,
    y: 62,
    imagen: "/proyecto3.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 4,
    provincia: "Ica",
    nombre: "Hotel Boutique Ica",
    descripcion: "Hotel de lujo con vista al valle sagrado",
    estado: "Completado",
    inversion: "$15M",
    x: 45,
    y: 80,
    imagen: "/hero01.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 5,
    provincia: "Piura",
    nombre: "Planta Solar Piura",
    descripcion: "Parque de energía solar de 100MW",
    estado: "En desarrollo",
    inversion: "$80M",
    x: 14,
    y: 28,
    imagen: "/proyecto5.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 6,
    provincia: "Loreto",
    nombre: "Centro de Investigación Amazónica",
    descripcion: "Laboratorio de biodiversidad y conservación",
    estado: "Completado",
    inversion: "$12M",
    x: 50,
    y: 20,
    imagen: "/hero01.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 7,
    provincia: "Tacna",
    nombre: "Terminal Terrestre Tacna",
    descripcion: "Moderna terminal de transporte interprovincial",
    estado: "Operativo",
    inversion: "$8M",
    x: 84,
    y: 97,
    imagen: "/proyecto7.webp",
    url: "/proyectos/Aeropuerto",
  },
  {
    id: 8,
    provincia: "Puno",
    nombre: "Mall Chiclayo Plaza",
    descripcion: "Centro comercial regional con cines y restaurantes",
    estado: "En construcción",
    inversion: "$30M",
    x: 84,
    y: 80,
    imagen: "/hero01.webp",
    url: "/proyectos/Aeropuerto",
  },
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-emerald-600 text-white";
    case "En construcción":
      return "bg-amber-500 text-gray-900";
    case "Operativo":
      return "bg-sky-600 text-white";
    case "En desarrollo":
      return "bg-indigo-600 text-white";
    default:
      return "bg-gray-400 text-gray-800";
  }
};

const getMarkerColorClass = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-emerald-600 ring-4 ring-emerald-300";
    case "En construcción":
      return "bg-amber-500 ring-4 ring-amber-300";
    case "Operativo":
      return "bg-sky-600 ring-4 ring-sky-300";
    case "En desarrollo":
      return "bg-indigo-600 ring-4 ring-indigo-300";
    default:
      return "bg-gray-500 ring-4 ring-gray-300";
  }
};

const MapaProyectos = () => {
  const [activeProject, setActiveProject] = useState<Proyecto | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Proyecto | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const [mapOffset, setMapOffset] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  const calculateMapBounds = () => {
    if (mapImageRef.current) {
      const parentRect =
        mapImageRef.current.parentElement!.getBoundingClientRect();
      const naturalRatio = 1.3;
      let calculatedHeight = parentRect.width * naturalRatio;

      if (calculatedHeight > parentRect.height) {
        calculatedHeight = parentRect.height;
        const calculatedWidth = parentRect.height / naturalRatio;
        setMapOffset({
          top: 0,
          left: (parentRect.width - calculatedWidth) / 2,
          height: calculatedHeight,
          width: calculatedWidth,
        });
      } else {
        setMapOffset({
          top: (parentRect.height - calculatedHeight) / 2,
          left: 0,
          height: calculatedHeight,
          width: parentRect.width,
        });
      }
    }
  };

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      calculateMapBounds();

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        calculateMapBounds();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleMarkerInteraction = (proyecto: Proyecto) => {
    if (windowWidth < 1024) {
      setActiveProject(activeProject?.id === proyecto.id ? null : proyecto);
    }
  };

  const handleMarkerMouseEnter = (proyecto: Proyecto) => {
    if (windowWidth >= 1024) {
      setHoveredProject(proyecto);
    }
  };

  const getTooltipPosition = (proyecto: Proyecto) => {
    let verticalClass = "";
    let horizontalClass = "";

    if (proyecto.y < 25) verticalClass = "top-full mt-3";
    else if (proyecto.y > 75) verticalClass = "bottom-full mb-3";
    else verticalClass = "top-full mt-3";

    if (proyecto.x < 20) horizontalClass = "left-0";
    else if (proyecto.x > 80) horizontalClass = "right-0";
    else horizontalClass = "left-1/2 transform -translate-x-1/2";

    return `${verticalClass} ${horizontalClass}`;
  };

  return (
    <div className="font-sans py-12 px-4 sm:px-6 lg:px-8 md:pt-56 pt-2">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8 lg:gap-12">
        <div className="lg:w-1/3 flex flex-col justify-start pt-4">
          <p className="text-xl font-semibold text-[#182C45] uppercase tracking-wider mb-2">
            Portfolio Corporativo
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Proyectos de Alto Impacto en Perú
          </h1>
          <p className="text-slate-950 text-lg border-l-4 border-[#182C45] pl-4 italic">
            Visualización geoespacial de nuestras inversiones estratégicas y
            desarrollos finalizados y en curso a nivel nacional.
          </p>
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md border-t-4 border-gray-200">
            <p className="text-sm font-medium text-slate-950">
              Proyectos Totales
            </p>
            <p className="text-4xl font-black text-[#182C45] mt-1">
              + 152 Proyectos
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 relative h-[320px] lg:h-[550px] rounded-2xl">
          <div className="relative w-full h-full">
            <img
              ref={mapImageRef}
              src="/mapa.svg"
              alt="Mapa de Perú"
              className="absolute inset-0 w-full h-full object-contain opacity-90"
            />

            <div className="absolute inset-0 z-10">
              {proyectos.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  href={proyecto.url}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 block cursor-pointer"
                  style={{
                    left: mapOffset.left + (proyecto.x / 100) * mapOffset.width,
                    top: mapOffset.top + (proyecto.y / 100) * mapOffset.height,
                  }}
                  onMouseEnter={() => handleMarkerMouseEnter(proyecto)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={(e) => {
                    if (windowWidth < 1024) {
                      e.preventDefault();
                      handleMarkerInteraction(proyecto);
                    }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div
                      role="button"
                      aria-label={`Ver proyecto ${proyecto.nombre} en ${proyecto.provincia}`}
                      className={`w-3 h-3 rounded-full shadow-lg hover:scale-150 transition-transform ${getMarkerColorClass(
                        proyecto.estado
                      )} ${
                        activeProject?.id === proyecto.id ? "scale-[1.5]" : ""
                      }`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                        <span className="sr-only">Ir al proyecto {proyecto.nombre} en {proyecto.provincia}</span>

                  </div>
                </Link>
              ))}
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: mapOffset.left + (proyecto.x / 100) * mapOffset.width,
                    top: mapOffset.top + (proyecto.y / 100) * mapOffset.height,
                  }}
                >
                  <AnimatePresence>
                    {isClient &&
                      windowWidth >= 1024 &&
                      hoveredProject?.id === proyecto.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute rounded-xl shadow-2xl bg-white w-60 overflow-hidden text-sm border border-gray-100 pointer-events-auto ${getTooltipPosition(
                            proyecto
                          )}`}
                        >
                          <Link
                            href={proyecto.url}
                            className="block hover:opacity-90 transition-opacity"
                          >
                            <img
                              src={proyecto.imagen}
                              alt={proyecto.nombre}
                              className="w-full h-32 object-cover"
                            />
                          </Link>
                          <div className="p-3">
                            <Link
                              href={proyecto.url}
                              className="hover:text-sky-600 transition-colors"
                            >
                              <span className="font-bold text-gray-900 text-base mb-1 block">
                                {proyecto.nombre}
                              </span>
                            </Link>
                            <div className="text-gray-500 text-xs uppercase font-medium">
                              {proyecto.provincia}
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">
                                  Inversión
                                </span>
                                <span className="font-bold text-lg text-emerald-700">
                                  {proyecto.inversion}
                                </span>
                              </div>
                              <span
                                className={`text-xs font-semibold py-1 px-2 rounded-full ${getEstadoColor(
                                  proyecto.estado
                                )}`}
                              >
                                {proyecto.estado}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-200 z-30 hidden lg:block">
              <h2 className="font-bold text-gray-800 mb-2 border-b pb-1">
                Leyenda de Estado
              </h2>
              <div className="space-y-1">
                {[
                  "Completado",
                  "En construcción",
                  "Operativo",
                  "En desarrollo",
                ].map((estado) => (
                  <div key={estado} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        getMarkerColorClass(estado).split(" ")[0]
                      }`}
                    ></div>
                    <span className="text-gray-600">{estado}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 p-4 max-h-[50vh] overflow-y-auto lg:hidden shadow-2xl"
              >
                <div className="flex justify-between items-start border-b pb-3 mb-3">
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">
                    {activeProject.nombre}
                  </h2>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-gray-500 hover:text-gray-800 p-1"
                    aria-label="Cerrar detalles del proyecto"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <img
                  src={activeProject.imagen}
                  alt={activeProject.nombre}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />

                <div className="flex flex-col space-y-2">
                  <p className="text-gray-600 text-xs italic">
                    {activeProject.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-medium">
                        Provincia
                      </span>
                      <span className="font-bold text-sm text-gray-800">
                        {activeProject.provincia}
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 uppercase font-medium">
                        Estado
                      </span>
                      <span
                        className={`text-sm font-semibold py-1 px-2 rounded-full ${getEstadoColor(
                          activeProject.estado
                        )}`}
                      >
                        {activeProject.estado}
                      </span>
                    </div>

                    <Link
                      href={activeProject.url}
                      className="col-span-2 w-52 text-center bg-[#182C45] text-white font-semibold py-2 rounded-lg shadow hover:bg-sky-700 transition-colors"
                    >
                      Ver Proyecto
                    </Link>

                    <div className="col-span-2 flex flex-col pt-2">
                      <span className="text-xs text-gray-500 uppercase font-medium">
                        Inversión Estimada
                      </span>
                      <span className="font-bold text-xl text-emerald-700">
                        {activeProject.inversion}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MapaProyectos;
