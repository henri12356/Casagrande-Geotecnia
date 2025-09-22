"use client";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

// Definición de las empresas con sus logos
const companies = [
  { name: "Cámara de Comercio de Lima", logo: "/logo01.png" },
  { name: "Partner Estratégico", logo: "/logo05.png" },
  { name: "Organización Internacional", logo: "/logo04.png" },
  { name: "Asociación de Negocios", logo: "/logo03.png" },
  { name: "Instituto Certificador", logo: "/logo02.png" },
];

// Duplicamos el array para crear un efecto de transición continua
const marqueeItems = [...companies, ...companies, ...companies];

// Componente para el logo de la empresa (diseño limpio)
const CompanyLogo = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <motion.div
      className="mx-4 flex flex-col items-center justify-center p-2"
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <Image
          priority
          fill
          src={logo}
          alt={`${name} logo`}
          className="object-contain transition-all duration-300 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
        />
      </div>
      <p className="text-xs text-center text-gray-600 mt-1 max-w-[100px] leading-tight hidden md:block">
        {name}
      </p>
    </motion.div>
  );
};

const Trusted = () => {
  // Animación para el título y el párrafo - CORREGIDO
  // Definimos las transiciones por separado para evitar errores de TypeScript
  const textTransition = {
    duration: 0.7,
    ease: "easeOut" as const, // Forzamos el tipo para TypeScript
    staggerChildren: 0.15,
  };

  const itemTransition = {
    duration: 0.5,
    ease: "easeOut" as const, // Forzamos el tipo para TypeScript
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: textTransition,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: itemTransition,
    },
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden py-12 md:py-16 relative",
        "bg-white text-[#006394]"
      )}
    >
      {/* Sección de contenido superior */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
            variants={itemVariants}
          >
             <span className="text-3xl lg:text-5xl font-bold text-[#2c3e50] mb-4">
            Nuestros Socios
          </span>
          </motion.h2>
          {/* <motion.p
            className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Colaboramos con líderes del sector para ofrecerte la educación más
            vanguardista y relevante para tu crecimiento profesional.
          </motion.p> */}
        </motion.div>
      </div>

      {/* Contenedor de la marquesina - SOLO UNA LÍNEA */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <Marquee className="[--duration:40s] gap-6" pauseOnHover={false}>
          {marqueeItems.map((company, idx) => (
            <CompanyLogo key={`company-${company.name}-${idx}`} {...company} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Trusted;