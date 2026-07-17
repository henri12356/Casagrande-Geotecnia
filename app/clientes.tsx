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
    name: "Universidad Tecnológica del Perú",
    logo: "/logos/logo-utp.png",
  },
  {
    name: "Municipalidad de Megantoni",
    logo: "/logos/logo-megatoni.png",
  },
  {
    name: "plazaVea",
    logo: "/logos/logo-plazavea.png",
  },
  {
    name: "Grupo 5 SAC Constructora Inmobiliaria",
    logo: "/logos/logo-grupo5.png",
  },
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
    logo: "/logos/logo07.webp",
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
    name: "Municipalidad provincial de la Mar",
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
    name: "Gobierno regional de Ayacucho",
    logo: "/logos/ayacucho.webp",
  },
];

const marqueeItems = [...companies, ...companies];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type CompanyLogoProps = {
  name: string;
  logo: string;
  index: number;
};

function CompanyLogo({
  name,
  logo,
  index,
}: CompanyLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 16,
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
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 8) * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.025,
            }
      }
      className="
        group mx-3 flex h-[150px] w-[150px] shrink-0
        cursor-pointer flex-col items-center justify-center
        px-3 py-3
        sm:mx-5 sm:h-[165px] sm:w-[175px]
      "
    >
      <div
        className="
          relative flex h-20 w-full items-center justify-center
          sm:h-24
        "
      >
        <Image
          src={logo}
          alt={`Logo de ${name}`}
          fill
          priority={index < 4}
          sizes="(max-width: 640px) 118px, 144px"
          className="
            object-contain
            transition-transform duration-500 ease-out
            group-hover:scale-[1.06]
          "
        />
      </div>

      <p
        className="
          mt-3 line-clamp-2 min-h-9 max-w-[142px]
          text-center text-[11px] font-medium leading-[1.35]
          text-[#182C45]
          sm:text-xs
        "
      >
        {name}
      </p>
    </motion.article>
  );
}

export default function Trusted() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="trusted-title"
      className={cn(
        "relative w-full overflow-hidden bg-white py-12",
        "text-[#182C45] sm:py-14 lg:py-20"
      )}
    >
      <motion.div
        variants={sectionVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="
          relative z-10 mx-auto mb-10 max-w-3xl
          px-5 text-center
          sm:mb-12 sm:px-6
        "
      >
        <motion.h2
          id="trusted-title"
          variants={itemVariants}
          className="
            text-3xl font-extrabold leading-tight
            tracking-[-0.025em] text-[#182C45]
            sm:text-4xl lg:text-[2.75rem]
          "
        >
          Nuestros clientes
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-4 h-0.5 w-14 bg-[#C9A66B]"
        />

        <motion.p
          variants={itemVariants}
          className="
            mx-auto mt-5 max-w-2xl
            text-sm leading-7 text-slate-600
            sm:text-base sm:leading-8
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
                y: 22,
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
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative z-10 w-full
          overflow-hidden
          [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
          sm:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          sm:[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        "
      >
        <Marquee
          pauseOnHover
          className="
            [--duration:85s]
            gap-2 py-3
            sm:gap-4 sm:py-5
          "
        >
          {marqueeItems.map((company, index) => (
            <CompanyLogo
              key={`${company.name}-${index}`}
              name={company.name}
              logo={company.logo}
              index={index}
            />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}