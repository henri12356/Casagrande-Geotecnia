'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const containerTransition = { staggerChildren: 0.2 } as const;
const itemTransition = { duration: 0.6, ease: "easeOut" as const };
const imageTransition = { duration: 0.8, ease: "easeOut" as const };

const Valores = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: containerTransition },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: itemTransition },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: imageTransition },
  };

  const valores = [
    "Integridad",
    "Compromiso",
    "Responsabilidad",
    "Respeto",
    "Transparencia",
  ];

  return (
    <>
      <div className="bg-white md:py-16 py-6 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          {/* Contenedor Visión y Misión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-20 md:py-10 lg:gap-20 items-center mb-16 md:mb-24">
            {/* Texto */}
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2 className="text-3xl font-bold text-[#1b4772] mb-4" variants={itemVariants}>
                VISIÓN
              </motion.h2>
              <motion.p className="text-gray-700 mb-8 text-lg leading-relaxed" variants={itemVariants}>
                Contribuir al desarrollo sostenible del sector de la construcción a nivel nacional, garantizando la seguridad y calidad en cada obra mediante estudios técnicos confiables y soluciones innovadoras.
              </motion.p>

              <motion.h2 className="text-3xl font-bold text-[#1b4772] mb-4" variants={itemVariants}>
                MISIÓN
              </motion.h2>
              <motion.p className="text-gray-700 text-lg leading-relaxed" variants={itemVariants}>
                Ser un referente nacional en consultoría de ingeniería civil, ofreciendo servicios integrales de geología, geotecnia, laboratorio y supervisión de obras, priorizando la innovación, eficiencia y confiabilidad.
              </motion.p>
            </motion.div>

            {/* Imagen */}
            <motion.div
              className="order-1 lg:order-2 w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <motion.div
                className="relative w-full h-56 md:h-80 lg:h-96 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/hero04.jpg"
                  alt="Equipo Casagrande"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Contenedor Calidad y Seguridad */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-20 lg:gap-20 items-center">
            {/* Imagen */}
            <motion.div
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <motion.div
                className="relative w-full h-56 md:h-80 lg:h-96 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/hero03.jpg"
                  alt="Supervisión de obra"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2 className="text-3xl font-bold text-[#1b4772] mb-4" variants={itemVariants}>
                CALIDAD
              </motion.h2>
              <motion.p className="text-gray-700 mb-8 text-lg leading-relaxed" variants={itemVariants}>
                Nos comprometemos con la mejora continua, la precisión y el cumplimiento de normas y estándares internacionales en todos nuestros estudios, ensayos y supervisiones de obra.
              </motion.p>

              <motion.h2 className="text-3xl font-bold text-[#1b4772] mb-4" variants={itemVariants}>
                SEGURIDAD
              </motion.h2>
              <motion.p className="text-gray-700 text-lg leading-relaxed" variants={itemVariants}>
                Priorizamos la seguridad laboral y ambiental en todas nuestras operaciones, implementando prácticas sostenibles y minimizando riesgos para nuestros colaboradores y el entorno.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Valores */}
      <section className="py-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center justify-around gap-10"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1b4772] whitespace-nowrap mb-6 lg:mb-0">
            Nuestros Valores
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {valores.map((valor, i) => (
              <motion.div
                key={valor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 font-semibold text-[#1b4772] text-lg whitespace-nowrap"
              >
                <CheckCircle className="text-[#1b4772] w-5 h-5" />
                <span className="text-xl">{valor}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Valores;
