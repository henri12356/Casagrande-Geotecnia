/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/laboratorio/[slug]/page.tsx

"use client";

import laboratorioData from "@/app/data/laboratorio.json";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import NotFoundPage from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { animate, motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { FaClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import ServicioNav from "../ServicioNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

/* HERO */
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
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <h1 className="text-2xl md:text-6xl font-bold leading-tight">
                {titulo}
              </h1>

              <p className="mt-3 text-sm md:text-lg max-w-3xl">
                {descripcion}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios%20de%20laboratorio."
                  target="_blank"
                  className="bg-white text-[#1b4772] px-4 py-2 rounded-xl font-semibold"
                >
                  Solicitar cotización
                </Link>

                <Link
                  href="#contenido"
                  className="border border-white/50 px-4 py-2 rounded-xl"
                >
                  Ver detalles
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CONTADOR */
const CountingNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}> = ({ value, duration = 3, suffix = "", start = false }) => {
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

/* SECCIÓN NÚMEROS */
const Numeros: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3,
  });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15 },
    },
  };

  const statVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150 },
    },
  };

  return (
    <section className="py-16">
      <motion.div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="p-6 bg-[#1b4772] rounded-2xl shadow-lg flex flex-col items-center justify-center"
            variants={statVariants}
          >
            <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              <CountingNumber value={stat.value} suffix={stat.suffix} start={isInView} />
            </div>

            <p className="text-white uppercase text-sm tracking-wide mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const LaboratorioPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const servicio = (laboratorioData as any[]).find((s) => s.slug === slug);

  const [imagenModal, setImagenModal] = useState({
    abierto: false,
    src: "",
    titulo: "",
  });

  if (!servicio) return <NotFoundPage />;

  const abrirModal = (src: string, titulo: string) => {
    setImagenModal({ abierto: true, src, titulo });
  };

  const cerrarModal = () => {
    setImagenModal({ abierto: false, src: "", titulo: "" });
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

      <div id="contenido" className="max-w-7xl mx-auto px-4 py-12">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 shadow-sm border mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1b4772] mb-4">
            {servicio.titulo01 || servicio.titulo}
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            {servicio.subtitulo01 || servicio.descripcion}
          </p>
        </motion.div>

        {/* CATEGORIAS - AHORA CON MÚLTIPLES IMÁGENES */}
        <div className="space-y-12 mb-16">
          {servicio.categorias?.map((categoria: any, index: number) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1b4772] mb-4 border-b-2 border-[#1b4772] pb-2">
                    {categoria.titulo}
                  </h3>

                  <p className="text-gray-600 mb-4">{categoria.descripcion}</p>

                  <ul className="space-y-2">
                    {categoria.ensayos.map((ensayo: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#1b4772] font-bold mr-2">•</span>
                        <span className="text-gray-700">{ensayo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GALERÍA DE MÚLTIPLES IMÁGENES */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1b4772] mb-4">Galería de imágenes</h4>
                  
                  {/* Primera imagen destacada */}
                  {categoria.imagenes.length > 0 && (
                    <div 
                      className="mb-4 cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#1b4772] transition-all"
                      onClick={() => abrirModal(categoria.imagenes[0], categoria.titulo)}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={categoria.imagenes[0]}
                          alt={`${categoria.titulo} - Principal`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Grid de imágenes secundarias */}
                  {categoria.imagenes.length > 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {categoria.imagenes.slice(1).map((img: string, imgIdx: number) => (
                        <div
                          key={imgIdx}
                          className="relative aspect-square cursor-pointer rounded-md overflow-hidden border border-gray-200 hover:border-[#1b4772] transition-all"
                          onClick={() => abrirModal(img, categoria.titulo)}
                        >
                          <Image
                            src={img}
                            alt={`${categoria.titulo} - ${imgIdx + 2}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CERTIFICACIONES - MEJORADO CON DISEÑO DE SERVICIOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#182C45]">
            CALIBRACIÓN CERTIFICADA E ISO
          </h3>
          
          <p className="text-center text-sm md:text-base text-[#182C45] mb-8 max-w-3xl mx-auto">
            En <strong>Casagrande</strong> garantizamos la precisión de cada ensayo. Nuestras{" "}
            <strong>máquinas y equipos están calibrados</strong> por <strong>Pinzuar</strong>, laboratorio{" "}
            <strong>acreditado por INACAL</strong> bajo la norma <strong>ISO/IEC 17025</strong>. Esto asegura una{" "}
            <strong>trazabilidad metrológica</strong> completa y resultados <strong>confiables, verificables y certificados.</strong>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Trazabilidad Metrológica */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-lg mb-4 text-[#182C45] border-b border-[#1b4772]/20 pb-2">
                Trazabilidad Metrológica (INACAL)
              </h4>
              <ul className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span><strong>Equipos de campo y laboratorio</strong> suministrados y calibrados por <strong>Pinzuar</strong>, proveedor con certificación acreditada ante <strong>INACAL</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Certificados con trazabilidad conforme a la norma <strong>ISO/IEC 17025:2017</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Control de <strong>vigencia</strong>, número de certificado y verificación interna periódica.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Registro digital y físico de calibraciones y mantenimiento preventivo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Verificación previa a cada campaña o ensayo para garantizar la exactitud de los resultados.</span>
                </li>
              </ul>
            </div>

            {/* Sistema de Gestión */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-lg mb-4 text-[#182C45] border-b border-[#1b4772]/20 pb-2">
                Sistema de Gestión Integrado
              </h4>
              <ul className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span><strong>ISO 9001:2015</strong> – Sistema de Gestión de la Calidad: procesos estandarizados y mejora continua.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span><strong>ISO 14001:2015</strong> – Sistema de Gestión Ambiental: compromiso con la sostenibilidad.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span><strong>ISO 37001:2016</strong> – Sistema de Gestión Antisoborno: ética y transparencia.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Procedimientos técnicos normalizados (MTC, ASTM, NTP).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1b4772] font-bold mr-2">•</span>
                  <span>Seguimiento de indicadores y auditorías internas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tags informativos */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 bg-[#182C45]/5 border border-[#182C45]/10 rounded-full text-sm text-[#182C45]">
              +130 proyectos ejecutados
            </span>
            <span className="px-4 py-2 bg-[#182C45]/5 border border-[#182C45]/10 rounded-full text-sm text-[#182C45]">
              Ensayos en suelos, rocas, concreto y asfalto
            </span>
            <span className="px-4 py-2 bg-[#182C45]/5 border border-[#182C45]/10 rounded-full text-sm text-[#182C45]">
              Equipos calibrados por Pinzuar (INACAL)
            </span>
          </div>

          {/* NUMEROS */}
          {servicio.numeros && <Numeros stats={servicio.numeros} />}
        </motion.div>

        {/* CONTACTO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1b4772] mb-6">
                Contáctanos
              </h3>

              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <FaPhoneAlt className="text-[#1b4772] w-5 h-5 mr-4" />
                  +51 945 513 323
                </p>

                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="text-[#1b4772] w-5 h-5 mr-4" />
                  comercial@casagrandegeotecnia.com.pe
                </p>

                <p className="flex items-center text-gray-700">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>

                <p className="flex items-center text-gray-700">
                  <FaClock className="text-[#1b4772] w-5 h-5 mr-4" />
                  Sáb: 8:30 AM - 2:00 PM
                </p>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-300 pt-8 md:pl-12 md:pt-0">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Solicita un Servicio
              </h3>

              <div className="space-y-4">
                <Link
                  href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios%20de%20laboratorio."
                  target="_blank"
                >
                  <Button className="w-full bg-[#1b4772] hover:bg-[#1a3a5e] text-white py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl">
                    Solicitar cotización
                  </Button>
                </Link>

                <Link
                  href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica%20para%20laboratorio."
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#1b4772] text-[#1b4772] hover:bg-[#1b4772] hover:text-white py-6 text-lg rounded-xl transition-all"
                  >
                    Agendar visita técnica
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE IMAGEN */}
      {imagenModal.abierto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={cerrarModal}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModal}
              className="absolute -top-12 right-0 text-white hover:text-[#1b4772] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full h-[80vh]">
              <Image
                src={imagenModal.src}
                alt={imagenModal.titulo}
                fill
                className="object-contain"
              />
            </div>
            
            <p className="text-white text-center mt-4 text-lg">
              {imagenModal.titulo}
            </p>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default LaboratorioPage;