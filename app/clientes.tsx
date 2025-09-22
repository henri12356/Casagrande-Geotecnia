'use client';
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
// CAMBIO: Se elimina useState porque ya no es necesario
// import { useState } from "react"; 

// Logos de empresas (sin cambios)
const companies = [
  { name: "Municipalidad Distrital Andrés Avelino Cáceres", logo: "/logos/logo-andres-avelino.webp" },
  { name: "Prider Ayacucho GRA", logo: "/logos/logo-prider.webp" },
  { name: "Municipalidad Provincial de Huamanga", logo: "/logos/logo-mucipalidad-huamanga.webp" },
  { name: "Constructora ECP Ingenieros", logo: "/logos/logo-constructora-ECP.webp" },
  { name: "Geomecánica Latinoamericana", logo: "/logos/logo-geomecanica.webp" },
  { name: "Compañía Crow", logo: "/logos/logo-compañia-crow.webp" },
  { name: "Mafy Ingenieros Contratistas", logo: "/logos/logo-ingenieros-contratistas.webp" },
  { name: "Tractores eirl ", logo: "/logos/logo-tractores.webp" },
  { name: "JC Camila Inversiones EIRL", logo: "/logos/logo-jc-inversiones.webp" },
];

const marqueeItems = [...companies, ...companies, ...companies];

// CAMBIO: Se eliminan las props onMouseEnter y onMouseLeave para simplificar
const CompanyLogo = ({ name, logo }: { name:string; logo:string; }) => {
  return (
    <motion.div
      // CAMBIO 2: Se añade la clase 'force-gpu' para mejorar la fluidez
      className="mx-4 flex flex-col items-center justify-center p-2 duration-300 cursor-pointer force-gpu" 
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center cursor-pointer">
        <Image
          priority
          fill
          src={logo}
          alt={`${name} logo`}
          className="object-contain transition-all duration-300"
          // Añadimos tamaños para optimizar la carga de la imagen
          sizes="(max-width: 768px) 80px, 96px"
        />
      </div>
      <p className="text-xs text-center text-[#1b4772] mt-1 max-w-[100px] leading-tight">
        {name}
      </p>
    </motion.div>
  );
};

const Trusted = () => {
  // CAMBIO: Se eliminan el estado y las funciones handleMouseEnter/Leave
  // const [isPaused, setIsPaused] = useState(false);
  
  const textTransition = { duration: 0.7, ease: "easeOut" as const, staggerChildren: 0.15 };
  const itemTransition = { duration: 0.5, ease: "easeOut" as const };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: textTransition },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: itemTransition },
  };

  return (
    <div className={cn("w-full overflow-hidden py-8 md:pt-16 relative", "bg-white text-[#1b4772]")}>
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
            Nuestros{" "}
            <span className="text-[#1b4772] font-bold">Socios Estratégicos</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Colaboramos con líderes del sector para ofrecer soluciones confiables y de calidad
            que respalden tu crecimiento y profesionalismo.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* CAMBIO 1: Se aumenta la duración para que sea más lento */}
        {/* CAMBIO 3: Se usa 'pauseOnHover={true}' directamente */}
        <Marquee className="[--duration:80s] gap-6" pauseOnHover={true}>
          {marqueeItems.map((company, idx) => (
            // CAMBIO: Se eliminan las props que ya no se usan
            <CompanyLogo 
              key={`company-${company.name}-${idx}`} 
              {...company} 
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Trusted;