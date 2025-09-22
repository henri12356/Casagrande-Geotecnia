"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// --- Contador animado ---
const CountingNumber: React.FC<{
  value: number;
  suffix?: string;
  start: boolean;
}> = ({ value, suffix = "", start }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (node && start) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          node.textContent = Math.round(v).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [value, start, suffix]);
  return <span ref={nodeRef}>0{suffix}</span>;
};

// --- Tipado ---
interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  cliente: string;
  obra: string;
  trabajo: string;
  categoria: string;
  detalles: { objetivo: string; metodologia: string; resultados: string[] };
  numerosClave: { label: string; value: number; suffix?: string }[];
  fases: { titulo: string; descripcion: string }[];
  testimonio?: { autor: string; cargo: string; mensaje: string };
  galeria: string[];
}

interface Props {
  proyecto: Proyecto;
}

export default function ProyectoPage({ proyecto }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, amount: 0.3 });

  const openModal = (i: number) => {
    setSelectedImage(proyecto.galeria[i]);
    setIndex(i);
  };



  return (
    <div className="bg-[#f8f9fa] text-[#111827] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[55vh] lg:h-[70vh]">
        <Image
          src={proyecto.imagen}
          alt={proyecto.titulo}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b4772]/70 to-[#1b4772]/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {proyecto.titulo}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg md:text-xl text-gray-200"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {proyecto.descripcion}
          </motion.p>
          <span className="mt-4 px-4 py-2 rounded-full text-sm bg-[#1b4772]/20 font-semibold text-white backdrop-blur-sm border border-white">
            {proyecto.categoria}
          </span>
        </div>
      </div>

      {/* Métricas */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b4772] tracking-tight">
            Métricas del Proyecto
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Indicadores clave que reflejan el alcance y resultados obtenidos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {proyecto.numerosClave.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-[#1b4772] mb-3">
                <CountingNumber
                  value={s.value}
                  suffix={s.suffix}
                  start={inView}
                />
              </p>
              <span className="block text-base font-semibold text-gray-800">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info cliente */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-[#1b4772] mb-1">
              Cliente
            </h3>
            <p className="text-lg font-medium">{proyecto.cliente}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-[#1b4772] mb-1">
              Obra
            </h3>
            <p className="text-lg font-medium">{proyecto.obra}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-[#1b4772] mb-1">
              Trabajo
            </h3>
            <p className="text-lg font-medium">{proyecto.trabajo}</p>
          </div>
        </div>

        {/* Detalles */}
        <div className="mt-12 bg-white rounded-2xl border border-[#e5e7eb] shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#1b4772] mb-6">
            Detalles del Proyecto
          </h2>
          <ul className="space-y-6">
            <li>
              <b>Objetivo:</b> {proyecto.detalles.objetivo}
            </li>
            <li>
              <b>Metodología:</b> {proyecto.detalles.metodologia}
            </li>
            <li>
              <b className="flex gap-2 items-center text-[#1b4772]">
                <CheckCircle className="w-5 h-5" /> Resultados:
              </b>
              <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
                {proyecto.detalles.resultados.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* Cronograma */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1b4772] mb-10 text-center">
            Fases del Proyecto
          </h2>
          <div className="space-y-8">
            {proyecto.fases.map((fase, i) => (
              <motion.div
                key={i}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#1b4772] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{fase.titulo}</h3>
                  <p className="text-gray-600">{fase.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonio */}
      {proyecto.testimonio && (
        <section className="bg-[#1b4772] py-20 text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <MessageSquare className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <p className="text-lg italic mb-6">{proyecto.testimonio.mensaje}</p>
            <h4 className="font-bold">{proyecto.testimonio.autor}</h4>
            <span className="text-sm opacity-80">
              {proyecto.testimonio.cargo}
            </span>
          </div>
        </section>
      )}

      {/* Galería */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#1b4772] mb-6">Galería</h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full relative"
        >
          <CarouselContent>
            {proyecto.galeria.map((img, i) => (
              <CarouselItem
                key={i}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-md"
                  onClick={() => openModal(i)}
                >
                  <Image
                    src={img}
                    alt={`${proyecto.titulo} - Imagen ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Botones de navegación con diseño circular, visibles solo en md+ */}
          <CarouselPrevious className="hidden md:flex items-center cursor-pointer justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1b4772]/80 hover:bg-[#1b4772]/100 rounded-full shadow-lg text-white transition">
            <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="hidden md:flex cursor-pointer items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1b4772]/80 hover:bg-[#1b4772]/100 rounded-full shadow-lg text-white transition">
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Imagen */}
              <Image
                src={proyecto.galeria[index]}
                alt={`Imagen ${index + 1}`}
                width={1600}
                height={1000}
                className="rounded-lg object-contain max-h-[80vh] w-full"
              />

              {/* Botón cerrar */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center  text-white font-black rounded-full shadow-lg  transition text-4xl cursor-pointer z-20"
              >
                &times;
              </button>

              {/* Botón anterior */}
              <button
                onClick={() =>
                  setIndex(
                    (prev) =>
                      (prev - 1 + proyecto.galeria.length) %
                      proyecto.galeria.length
                  )
                }
                className="hidden md:flex absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-[#1b4772]/80 hover:bg-[#1b4772]/100 text-white rounded-full shadow-lg transition z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Botón siguiente */}
              <button
                onClick={() =>
                  setIndex((prev) => (prev + 1) % proyecto.galeria.length)
                }
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer items-center justify-center bg-[#1b4772]/80 hover:bg-[#1b4772]/100 text-white rounded-full shadow-lg transition z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicador de número de imagen */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                {index + 1} / {proyecto.galeria.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-[#1b4772] to-[#2c3e50] text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Quieres un proyecto como este?
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Contáctanos y llevemos tu idea al siguiente nivel.
        </p>
        <a
          href="/contacto"
          className="px-6 py-3 bg-white text-[#1b4772] font-bold rounded-full shadow-md hover:shadow-lg transition"
        >
          Contáctanos
        </a>
      </section>

      <Footer />
    </div>
  );
}
