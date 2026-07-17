"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";

const companies = [
  {
    name: "Municipalidad Distrital Andrés Avelino Cáceres",
    logo: "/logos/logo-andres-avelino.webp",
  },
  {
    name: "Prider Ayacucho GRA",
    logo: "/logos/logo-prider.webp",
  },
  {
    name: "Municipalidad Provincial de Huamanga",
    logo: "/logos/logo-mucipalidad-huamanga.webp",
  },
  {
    name: "Constructora ECP Ingenieros",
    logo: "/logos/logo-constructora-ECP.webp",
  },
  {
    name: "JC Camila Inversiones EIRL",
    logo: "/logos/logo-jc-inversiones.webp",
  },
  {
    name: "Universidad Nacional de San Cristóbal de Huamanga",
    logo: "/logo07.webp",
  },
  {
    name: "PRONIS",
    logo: "/logos/logopronis.webp",
  },
  {
    name: "Programa Subsectorial de Irrigaciones",
    logo: "/logos/logopsi.webp",
  },
  {
    name: "Municipalidad Provincial de La Mar",
    logo: "/logos/lamar.webp",
  },
  {
    name: "SUNAT",
    logo: "/logos/sunat.webp",
  },
  {
    name: "Municipalidad Metropolitana de Lima",
    logo: "/logos/municipalidadelima.webp",
  },
  {
    name: "Contraloría General de la República",
    logo: "/logos/logo-cgr.webp",
  },
  {
    name: "Municipalidad Distrital de Sacsamarca",
    logo: "/logos/sacamarca.webp",
  },
  {
    name: "Gobierno Regional de Ayacucho",
    logo: "/logos/ayacucho.webp",
  },
];

const marqueeItems = [...companies, ...companies, ...companies];

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type CompanyLogoProps = {
  name: string;
  logo: string;
  priority?: boolean;
};

const CompanyLogo = ({
  name,
  logo,
  priority = false,
}: CompanyLogoProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.04,
            }
      }
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        mx-4 flex w-[132px] shrink-0 cursor-pointer
        flex-col items-center justify-start
        py-2 sm:mx-5 sm:w-[148px]
      "
    >
      <div
        className="
          relative flex h-24 w-24 items-center justify-center
          sm:h-28 sm:w-28
        "
      >
        <Image
          fill
          src={logo}
          alt={`Logo de ${name}`}
          priority={priority}
          sizes="(max-width: 640px) 96px, 112px"
          className="
            object-contain
            opacity-90
            transition-all duration-300
            group-hover:opacity-100
          "
        />
      </div>

      <p
        className="
          mt-3 max-w-[132px] text-center
          text-xs font-semibold leading-4
          text-[#182C45]/80
          transition-colors duration-300
          sm:max-w-[148px]
        "
      >
        {name}
      </p>
    </motion.div>
  );
};

const Trusted = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-white",
        "py-12 md:py-16"
      )}
    >
      <motion.div
        variants={headerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 mx-auto mb-10 max-w-3xl px-4 text-center"
      >
        <motion.div
          variants={headerItemVariants}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-0.5 w-10 bg-[#C9A66B]" />

          <span
            className="
              text-xs font-bold uppercase
              tracking-[0.18em] text-[#C9A66B]
              sm:text-sm
            "
          >
            Confían en nosotros
          </span>

          <span className="h-0.5 w-10 bg-[#C9A66B]" />
        </motion.div>

        <motion.h2
          variants={headerItemVariants}
          className="
            text-3xl font-black leading-tight
            tracking-[-0.03em] text-[#182C45]
            sm:text-4xl
          "
        >
          Nuestros Clientes
        </motion.h2>

        <motion.p
          variants={headerItemVariants}
          className="
            mx-auto mt-4 max-w-2xl
            text-sm leading-7 text-slate-600
            sm:text-base md:text-lg md:leading-8
          "
        >
          Trabajamos de la mano con nuestros clientes, asegurando
          profesionalismo y confiabilidad en cada proyecto.
        </motion.p>
      </motion.div>

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative z-10 flex w-full flex-col items-center
          [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
        "
      >
        <Marquee
          className="[--duration:85s] [--gap:0rem]"
          pauseOnHover
        >
          {marqueeItems.map((company, index) => (
            <CompanyLogo
              key={`${company.name}-${index}`}
              {...company}
              priority={index < 4}
            />
          ))}
        </Marquee>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mx-auto mt-10 h-px max-w-7xl origin-center
          bg-gradient-to-r from-transparent
          via-[#C9A66B]/60 to-transparent
        "
      />
    </section>
  );
};

export default Trusted;