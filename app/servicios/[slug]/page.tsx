"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, animate, Variants } from "framer-motion";
import servicios from "@/app/data/servicios.json";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import ServicioNav from "@/app/servicios/ServicioNav";
import NotFoundPage from "@/app/not-found";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

// Componente para animar el conteo de un número
const CountingNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}> = ({ value, duration = 2, suffix = "", start = false }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node && start) {
      const controller = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          node.textContent = Math.round(latest).toLocaleString() + suffix;
        },
      });
      return () => controller.stop();
    }
  }, [value, duration, suffix, start]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

// Componente de la sección de números
const Numeros: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, {
    once: true,
    amount: 0.3,
  });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const statCardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
      },
    },
  };

  return (
    <section className="py-20 sm:py-28 px-6 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate={isInViewContainer ? "visible" : "hidden"}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="flex flex-col items-center justify-center p-6 bg-[#1b4772] rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            variants={statCardVariants}
          >
            <div className="text-6xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              <CountingNumber
                value={stat.value}
                suffix={stat.suffix}
                duration={2}
                start={isInViewContainer}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-200 uppercase tracking-wide font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ServicioPage = ({ params }: PageProps) => {
  const { slug } = React.use(params);
  const servicio = servicios.find((s) => s.slug === slug);
  const [imagenModal, setImagenModal] = useState({
    abierto: false,
    src: "",
    titulo: "",
    imagenes: [] as string[],
    indiceActual: 0,
  });

  if (!servicio) return <NotFoundPage />;

  const abrirModalImagen = (
    src: string,
    titulo: string,
    categoriaIndex?: number
  ) => {
    let imagenes: string[] = [];
    let indiceActual = 0;

    // Si se proporciona el índice de categoría, obtener todas las imágenes de esa categoría
    if (categoriaIndex !== undefined && servicio.categorias) {
      imagenes = servicio.categorias[categoriaIndex].imagenes;
      indiceActual = imagenes.indexOf(src);
    } else {
      // Si no, usar solo la imagen actual
      imagenes = [src];
    }

    setImagenModal({
      abierto: true,
      src,
      titulo,
      imagenes,
      indiceActual,
    });
  };

  const cerrarModalImagen = () => {
    setImagenModal({
      abierto: false,
      src: "",
      titulo: "",
      imagenes: [],
      indiceActual: 0,
    });
  };

  const siguienteImagen = () => {
    setImagenModal((prev) => {
      const nuevoIndice = (prev.indiceActual + 1) % prev.imagenes.length;
      return {
        ...prev,
        indiceActual: nuevoIndice,
        src: prev.imagenes[nuevoIndice],
      };
    });
  };

  const anteriorImagen = () => {
    setImagenModal((prev) => {
      const nuevoIndice =
        (prev.indiceActual - 1 + prev.imagenes.length) % prev.imagenes.length;
      return {
        ...prev,
        indiceActual: nuevoIndice,
        src: prev.imagenes[nuevoIndice],
      };
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-[#1b4772] pt-12 md:pt-20">
        <div className="relative h-64 md:h-80">
          <Image
            src={servicio.imagen}
            alt={servicio.titulo}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {servicio.titulo}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg max-w-3xl text-gray-100"
            >
              {servicio.descripcion}
            </motion.p>
          </div>
        </div>
      </div>

      <ServicioNav />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b4772] mb-4">
            {servicio.titulo01 || servicio.titulo}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {servicio.subtitulo01 || servicio.descripcion}
          </p>
        </motion.div>

        {/* Grid de categorías de ensayos */}
        <div className="space-y-12 mb-16">
          {servicio.categorias?.map((categoria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contenido textual */}
                <div>
                  <h3 className="text-xl font-bold text-[#1b4772] mb-4 border-b-2 border-[#1b4772] pb-2">
                    {categoria.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{categoria.descripcion}</p>
                  <ul className="space-y-2">
                    {categoria.ensayos.map((ensayo, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#1b4772] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{ensayo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Galería de imágenes - MEJORADA */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1b4772] mb-4">
                    Galería
                  </h4>
                  <div className="space-y-4">
                    {/* Imagen principal grande */}
                    {categoria.imagenes.length > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-gray-300"
                        onClick={() =>
                          abrirModalImagen(
                            categoria.imagenes[0],
                            categoria.titulo,
                            index
                          )
                        }
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={categoria.imagenes[0]}
                            alt={`${categoria.titulo} - Imagen principal`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback para imagen que no carga
                              e.currentTarget.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRo IGQ9Ik0yMDAgMTUwTDE1MCAxMDBIMjUwTDIwMCAxNTBaIiBmaWxsPSIjOTlBQUJDIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QzczODAiPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K";
                            }}
                          />
                        </div>
                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#1b4772]  bg-opacity-60 text-white p-2 text-center text-sm">
                          Imagen principal - Click para ampliar
                        </div>
                      </motion.div>
                    )}

                    {/* Miniaturas de las otras imágenes */}
                    {categoria.imagenes.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {categoria.imagenes
                          .slice(1, 4)
                          .map((imagen, imgIndex) => (
                            <motion.div
                              key={imgIndex + 1}
                              whileHover={{ scale: 1.05 }}
                              className="relative group cursor-pointer rounded-md overflow-hidden border border-gray-200"
                              onClick={() =>
                                abrirModalImagen(
                                  imagen,
                                  categoria.titulo,
                                  index
                                )
                              }
                            >
                              <div className="aspect-square relative">
                                <Image
                                  src={imagen}
                                  alt={`${categoria.titulo} - Imagen ${
                                    imgIndex + 2
                                  }`}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA1MEwzNy41IDM3LjVINjIuNUw1MCA1MFoiIGZpbGw9IiM5OUFBQkMiLz4KPC9zdmc+Cg==";
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- SECCIÓN DE NÚMEROS AÑADIDA AQUÍ --- */}

        {/* Sección de acreditación INACAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-blue-50 rounded-lg p-8 border border-blue-200 mb-12"
        >
          <h3 className="text-2xl font-bold text-[#1b4772] text-center mb-6">
            ACREDITACIONES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm text-center"
              >
                <div className="text-[#1b4772] font-bold text-lg mb-2">
                  ACREDITADO ANTE INACAL
                </div>
                <div className="text-sm text-gray-600">
                  Normas internacionales ISO/IEC 17025
                </div>
              </div>
            ))}
          </div>
          {servicio.numeros && <Numeros stats={servicio.numeros}  />}
        </motion.div>

        {/* Información de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contacto */}
            <div>
              <h3 className="text-2xl font-bold text-[#1b4772] mb-6 border-b pb-2 border-gray-100">
                Contáctanos
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <FaPhoneAlt className="text-[#1b4772] w-5 h-5 mr-3" />
                  +1 (234) 567-8900
                </p>
                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="text-[#1b4772] w-5 h-5 mr-3" />
                  info@laboratorio.com
                </p>
                <p className="flex items-center text-gray-700">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-3" />
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Solicitar servicio */}
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

      {/* Modal para imágenes - MEJORADO con navegación */}
      {imagenModal.abierto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={cerrarModalImagen}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModalImagen}
              className="absolute -top-12 right-0 text-white cursor-pointer hover:text-blue-300 transition-colors z-10 bg-blue-600 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <Image
                  src={imagenModal.src}
                  alt={imagenModal.titulo}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwTDMwMCAyMDBINTAwTDQwMCAzMDBaIiBmaWxsPSIjOTlBQUJDIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2QzczODAiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K";
                  }}
                />

                {/* Botones de navegación */}
                {imagenModal.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        anteriorImagen();
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        siguienteImagen();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicador de posición */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {imagenModal.indiceActual + 1} /{" "}
                      {imagenModal.imagenes.length}
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 bg-[#1b4772]">
                <h4 className="text-white font-semibold text-center text-lg">
                  {imagenModal.titulo}
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default ServicioPage;
