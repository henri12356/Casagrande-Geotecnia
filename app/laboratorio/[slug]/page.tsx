/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/servicios/[slug]/page.tsx
"use client";
import React, { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, animate, Variants } from "framer-motion";
import laboratorioData from "@/app/data/laboratorio.json";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import NotFoundPage from "@/app/not-found";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ServicioNav from "../ServicioNav";

/* ========= NUEVO HERO (mobile-first) ========= */
function HeroServicio({
  titulo,
  descripcion,
  imagen,
}: {
  titulo: string;
  descripcion: string;
  imagen: string;
}) {
  return (
    <section className="relative md:pt-36 pt-10">
      <div className="relative h-[56vh] min-h-[450px] md:h-80 lg:h-96 w-full overflow-hidden bg-[#1b4772]">
        <Image src={imagen} alt={titulo} fill priority className="object-cover" />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(27,71,114,0.85),rgba(27,71,114,0.60)_35%,rgba(27,71,114,0.15)_70%,transparent_100%)]" />

        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="w-full px-4 max-w-7xl mx-auto pb-6 md:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl p-4 md:p-0 md:rounded-none md:border-0 text-white"
            >
              <h1 className="text-2xl leading-tight md:text-6xl font-bold">{titulo}</h1>

              <p
                className="mt-2 md:mt-3 text-sm md:text-lg text-white overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {descripcion}
              </p>

              <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
                <Link
                  href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[#1b4772] font-semibold px-4 py-2 text-sm md:text-base shadow-sm hover:shadow transition"
                >
                  Solicitar cotización
                </Link>
                <Link
                  href="#contenido"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 text-white px-4 py-2 text-sm md:text-base hover:bg-white/10 transition"
                >
                  Ver detalles
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-2 md:hidden flex justify-center">
          <div className="h-1 w-12 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
/* ========= FIN NUEVO HERO ========= */

interface PageProps {
  params: Promise<{ slug: string }>; // 👈 importante: Promise aquí
}


interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

/* ====== contador ====== */
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

/* ====== sección de números ====== */
const Numeros: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.3 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const statCardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 18 },
    },
  };

  return (
    <section className="md:py-20  max-md:pt-10 lg:px-6 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
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
            <div className="md:text-6xl text-5xl  font-extrabold mb-1 bg-linear-to-r from-blue-200 to-white bg-clip-text text-transparent">
              <CountingNumber value={stat.value} suffix={stat.suffix} duration={6} start={isInViewContainer} />
            </div>
            <p className="text-sm sm:text-base text-white uppercase tracking-wide font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ServicioPage = ({ params }: PageProps) => {
  const { slug } = use(params); // 👈 desenvuelve la Promise
  const servicio = (laboratorioData as any[]).find((s) => s.slug === slug); // 👈 NO pisamos el import

  const [imagenModal, setImagenModal] = useState({
    abierto: false,
    src: "",
    titulo: "",
    imagenes: [] as string[],
    indiceActual: 0,
  });

  if (!servicio) return <NotFoundPage />;

  const abrirModalImagen = (src: string, titulo: string, categoriaIndex?: number) => {
    let imagenes: string[] = [];
    let indiceActual = 0;

    if (categoriaIndex !== undefined && servicio.categorias) {
      imagenes = servicio.categorias[categoriaIndex].imagenes;
      indiceActual = imagenes.indexOf(src);
    } else {
      imagenes = [src];
    }

    setImagenModal({ abierto: true, src, titulo, imagenes, indiceActual });
  };

  const cerrarModalImagen = () => {
    setImagenModal({ abierto: false, src: "", titulo: "", imagenes: [], indiceActual: 0 });
  };

  const siguienteImagen = () => {
    setImagenModal((prev) => {
      const nuevoIndice = (prev.indiceActual + 1) % prev.imagenes.length;
      return { ...prev, indiceActual: nuevoIndice, src: prev.imagenes[nuevoIndice] };
    });
  };

  const anteriorImagen = () => {
    setImagenModal((prev) => {
      const nuevoIndice = (prev.indiceActual - 1 + prev.imagenes.length) % prev.imagenes.length;
      return { ...prev, indiceActual: nuevoIndice, src: prev.imagenes[nuevoIndice] };
    });
  };

  return (
    <>
      <Navbar />

      <HeroServicio
        titulo={servicio.titulo}
        descripcion={servicio.descripcion}
        imagen={servicio.imagen}
      />

      <ServicioNav />

      {/* CONTENIDO PRINCIPAL */}
      <div id="contenido" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Categorías */}
        <div className="space-y-12 mb-16">
          {servicio.categorias?.map((categoria: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Texto */}
                <div>
                  <h3 className="text-xl font-bold text-[#1b4772] mb-4 border-b-2 border-[#1b4772] pb-2">
                    {categoria.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{categoria.descripcion}</p>
                  <ul className="space-y-2">
                    {categoria.ensayos.map((ensayo: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#1b4772] rounded-full mt-2 mr-3 shrink-0"></span>
                        <span className="text-gray-700">{ensayo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Galería */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1b4772] mb-4">Galería</h4>
                  <div className="space-y-4">
                    {categoria.imagenes.length > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-gray-300"
                        onClick={() => abrirModalImagen(categoria.imagenes[0], categoria.titulo, index)}
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={categoria.imagenes[0]}
                            alt={`${categoria.titulo} - Imagen principal`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#1b4772] bg-opacity-60 text-white p-2 text-center text-sm">
                          Imagen principal - Click para ampliar
                        </div>
                      </motion.div>
                    )}

                    {categoria.imagenes.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {categoria.imagenes.slice(1, 4).map((imagen: string, imgIndex: number) => (
                          <motion.div
                            key={imgIndex + 1}
                            whileHover={{ scale: 1.05 }}
                            className="relative group cursor-pointer rounded-md overflow-hidden border border-gray-200"
                            onClick={() => abrirModalImagen(imagen, categoria.titulo, index)}
                          >
                            <div className="aspect-square relative">
                              <Image
                                src={imagen}
                                alt={`${categoria.titulo} - Imagen ${imgIndex + 2}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
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

        {/* Bloque de certificaciones + números */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl p-6 md:p-10 mb-12 text-[#182C45]"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#182C45]">
            CALIBRACIÓN CERTIFICADA E ISO
          </h3>
          <p className="text-center text-sm md:text-base text-[#182C45] mb-8">
            En <strong>Casagrande</strong> garantizamos la precisión de cada ensayo. Nuestras{" "}
            <strong>máquinas y equipos están calibrados</strong> por <strong>Pizuar</strong>, laboratorio{" "}
            <strong>acreditado por INACAL</strong> bajo la norma <strong>ISO/IEC 17025</strong>. Esto asegura una{" "}
            <strong>trazabilidad metrológica</strong> completa y resultados{" "}
            <strong>confiables, verificables y certificados.</strong>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
              <div className="font-semibold text-lg mb-3 text-[#182C45]">
                Trazabilidad Metrológica (INACAL)
              </div>
              <ul className="space-y-2 text-[#182C45] text-sm md:text-base leading-relaxed">
                <li>
                  <strong>Equipos de campo y laboratorio</strong> calibrados por <strong>Pizuar</strong>, laboratorio
                  acreditado ante <strong>INACAL</strong>.
                </li>
                <li>
                  Certificados con trazabilidad según la norma <strong>ISO/IEC 17025</strong>.
                </li>
                <li>
                  Control de <strong>vigencia</strong>, número de certificado y verificación interna periódica.
                </li>
                <li>Registro digital y físico de calibraciones y mantenimiento preventivo.</li>
                <li>Verificación previa a cada campaña o ensayo para garantizar la exactitud.</li>
              </ul>
            </div>

            <div className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
              <div className="font-semibold text-lg mb-3 text-[#182C45]">Sistema de Gestión Integrado</div>
              <ul className="space-y-2 text-[#182C45] text-sm md:text-base leading-relaxed">
                <li>
                  <strong>ISO 9001:2015</strong> – Calidad: procesos estandarizados y mejora continua.
                </li>
                <li>
                  <strong>ISO 14001:2015</strong> – Ambiental: compromiso con la sostenibilidad.
                </li>
                <li>
                  <strong>ISO 37001:2016</strong> – Antisoborno: ética, transparencia y control contractual.
                </li>
                <li>Procedimientos normalizados (MTC, ASTM, NTP) para campo, laboratorio e informes.</li>
                <li>Seguimiento de indicadores y auditorías internas de calidad y cumplimiento.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-[#182C45]/5 border border-[#182C45]/10 text-[#182C45]">
              +130 ensayos (suelos, rocas, concreto y asfalto)
            </span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-[#182C45]/5 border border-[#182C45]/10 text-[#182C45]">
              Equipos calibrados por Pizuar (laboratorio acreditado por INACAL)
            </span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-[#182C45]/5 border border-[#182C45]/10 text-[#182C45]">
              Resultados precisos y verificables
            </span>
          </div>

          {servicio.numeros && <Numeros stats={servicio.numeros as Stat[]} />}
        </motion.div>

        {/* Contacto */}
        <div className=" ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-50 rounded-3xl p-6 md:p-12 border border-gray-200 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1b4772] mb-6">Contáctanos</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-lg">
                    <FaPhoneAlt className="text-[#1b4772] w-5 h-5 mr-4" />
                    +51 945 513 323
                  </p>
                  <p className="flex items-center text-[10px] md:text-lg">
                    <FaEnvelope className="text-[#1b4772] w-5 h-5 mr-4" />
                    comercial@casagrandegeotecnia.com.pe
                  </p>
                  <p className="flex items-center text-lg">
                    <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                    Lun-Vie: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pl-16 md:pt-0">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Solicita un Servicio</h3>
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
      </div>

      {/* Modal imágenes */}
      {imagenModal.abierto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={cerrarModalImagen}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModalImagen}
              className="absolute -top-14 right-0 text-white cursor-pointer hover:text-blue-300 transition-colors z-10 bg-black/60 hover:bg-black/80 rounded-full p-2 backdrop-blur-md"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="relative w-full h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imagenModal.src}
                alt={imagenModal.titulo}
                fill
                className="object-contain"
              />

              {imagenModal.imagenes.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      anteriorImagen();
                    }}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200"
                    aria-label="Anterior imagen"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      siguienteImagen();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm tracking-wide">
                    {imagenModal.indiceActual + 1} / {imagenModal.imagenes.length}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-white font-semibold text-lg">{imagenModal.titulo}</h4>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default ServicioPage;
