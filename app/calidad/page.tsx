"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "../footer";
import Navbar from "../navbar";

// ====== CERTIFICADO PRINCIPAL (HERO) ======
const certificadoHero = {
  titulo: "Calibración y verificación de equipos — Pizuar (INACAL)",
  archivo: "/certificadoinacal.webp",
  fecha: "2024",
  categoria: "Equipos",
  imagenPreview: "/certificadoinacal.webp",
};

// ====== DEMÁS CERTIFICADOS ======
type Cert = {
  id: number;
  titulo: string;
  archivo: string;
  fecha: string;
  categoria: string;
  imagenPreview: string;
};

const certificadosData: Cert[] = [
  {
    id: 2,
    titulo: "Alcance 11-LAC-004",
    archivo: "/Alcance11-LAC-004.pdf",
    fecha: "",
    categoria: "",
    imagenPreview: "/Alcance11-LAC-004.webp",
  },
  {
    id: 3,
    titulo: "Alcance Perú LC-079",
    archivo: "/AlcancePerúLC-079.pdf",
    fecha: "2024",
    categoria: "Procedimientos",
    imagenPreview: "/AlcancePerúLC-079.webp",
  },
  {
    id: 4,
    titulo: "Constancia producto CO22.01258",
    archivo: "/ConstanciaproductoCO22.01258.pdf",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/ConstanciaproductoCO22.01258.webp",
  },
  {
    id: 5,
    titulo: "Certificado producto CO22.01258",
    archivo: "/CertificadoproductoCO22.01258.pdf",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/CertificadoproductoCO22.01258.webp",
  },
  {
    id: 6,
    titulo: "Certificado producto CO22.01258",
    archivo: "/CertificadoISO9001-CO22.08421.webp",
    fecha: "2024",
    categoria: "Personal",
    imagenPreview: "/CertificadoproductoCO22.01258.webp",
  },
];

// ====== COMPONENTE PRINCIPAL ======
const CertificadosPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");

  const categorias = useMemo(() => {
    const set = new Set<string>(["Todos"]);
    certificadosData.forEach((c) => c.categoria && set.add(c.categoria));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, []);

  const certificadosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") return certificadosData;
    return certificadosData.filter(
      (cert) => cert.categoria === categoriaActiva
    );
  }, [categoriaActiva]);

  const handleVerCertificado = (archivo: string) => {
    window.open(archivo, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-28 md:pt-56 pb-16 max-w-7xl mx-auto ">
        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-[1] text-center text-4xl md:text-6xl font-extrabold text-[#182C45] leading-tight"
        >
          Alianza técnica Casagrande × Pizuar
        </motion.h1>

        {/* Subtexto */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative z-[1] mt-3 text-center text-[15px] md:text-base text-gray-700  mx-auto"
        >
          Equipos <strong>calibrados y verificados</strong> por proveedor
          acreditado
          <strong> INACAL</strong>, garantizando{" "}
          <strong>precisión y trazabilidad</strong> en cada ensayo geotécnico.
        </motion.p>

        <div className="relative z-[1] container mx-auto px-4 max-w-7xl mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* IZQUIERDA: logos + botón */}
            {/* IZQUIERDA: logos + botón */}
            <div className="flex flex-col items-center justify-center text-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4 sm:px-6"
              >
                <Image
                  src="/logocasagrande.svg"
                  alt="Casagrande Geotecnia"
                  width={220}
                  height={60}
                  className="h-14 w-auto mb-3 sm:mb-0"
                  priority
                />
                <span className="text-4xl sm:text-5xl font-black text-[#182C45] leading-none">
                  +
                </span>
                <Image
                  src="/logopinzuar.webp"
                  alt="Pizuar (INACAL)"
                  width={220}
                  height={60}
                  className="h-14 w-auto mt-3 sm:mt-0"
                />
              </motion.div>

              {/* Badges técnicos */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px]">
                <span className="rounded-full border border-[#182C45]/30 text-[#182C45] px-3 py-1">
                  Trazabilidad INACAL
                </span>
                <span className="rounded-full border border-gray-200 text-gray-700 px-3 py-1">
                  Normas ASTM
                </span>
                <span className="rounded-full border border-gray-200 text-gray-700 px-3 py-1">
                  Resultados repetibles
                </span>
              </div>

              {/* Nota */}
              <p className="mt-3 text-[11px] text-gray-500 italic max-w-xl mx-auto px-3">
                Nota: Casagrande no posee acreditación INACAL corporativa; la
                evidencia corresponde a la calibración/verificación de equipos
                realizada por Pizuar (acreditado por INACAL).
              </p>

              {/* Botón: Ver nuestros equipos */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 w-full flex justify-center"
              >
                <a
                  href="/equipos"
                  className="inline-block bg-[#182C45] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-md hover:bg-[#0f2036] transition-all duration-300 hover:shadow-lg"
                >
                  Ver nuestros equipos
                </a>
              </motion.div>
            </div>

            {/* DERECHA: imagen de certificado */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <div
                onClick={() => handleVerCertificado(certificadoHero.archivo)}
                className="relative aspect-[4/3] w-full rounded-3xl border border-gray-200 overflow-hidden shadow-2xl cursor-pointer group"
                title="Ver documento"
              >
                {/* Imagen */}
                <Image
                  src={certificadoHero.imagenPreview}
                  alt={certificadoHero.titulo}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* CTA */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-[#182C45]/85 px-4 py-2 rounded-lg text-sm transition-opacity">
                    Ver documento
                  </span>
                </div>
              </div>

              {/* Título pequeño */}
              <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold text-[#182C45] line-clamp-1">
                  {certificadoHero.titulo}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICADOS RESTANTES ===== */}
      <section className="bg-gray-50 py-14 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#182C45]">
              Nuestros Certificados
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Selecciona una categoría.
            </p>
          </motion.div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border transition ${
                  categoriaActiva === cat
                    ? "bg-[#182C45] text-white border-[#182C45]"
                    : "text-[#182C45] border-[#182C45] hover:bg-[#182C45]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificadosFiltrados.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleVerCertificado(cert.archivo)}
                className="relative group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cert.imagenPreview}
                    alt={cert.titulo}
                    fill
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-[#182C45]/80 px-4 py-2 rounded-lg text-sm transition-all">
                      Ver documento
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 text-[#182C45] px-2 py-1 rounded-full text-[11px] font-semibold">
                    {cert.categoria}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-[#182C45] px-2 py-1 rounded text-[11px] font-semibold">
                    {cert.fecha}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-[#182C45] font-semibold text-sm md:text-base line-clamp-2">
                    {cert.titulo}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {certificadosFiltrados.length === 0 && (
            <div className="text-center text-gray-500 py-16 text-lg">
              No se encontraron certificados en esta categoría.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificadosPage;
