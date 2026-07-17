"use client";

import { Separator } from "@/components/ui/separator";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronUp } from "react-icons/fa";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTiktokLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

const connectLinks = [
  {
    title: "Atención al cliente",
    links: [
      {
        name: "962 835 652",
        href: "https://api.whatsapp.com/send?phone=51962835652&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios.",
      },
      {
        name: "945 513 323",
        href: "https://api.whatsapp.com/send?phone=51945513323&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios.",
      },
      {
        name: "comercial@casagrandegeotecnia.com.pe",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=comercial@casagrandegeotecnia.com.pe&su=Consulta%20sobre%20servicios",
      },
      {
        name: "Sede Lima – Jr. Santa Carolina 513, Palao - S.M.P - Lima",
        href: "https://maps.app.goo.gl/d5gJNMX8ZyHvmnyS8",
      },
      {
        name: "Sede Ayacucho – Jirón Quinua 570, Ayacucho 05003",
        href: "https://maps.app.goo.gl/ZLD7hVDrudfbnSTd6",
      },
    ],
  },
];

const productLinks = [
  { name: "Inicio", href: "/" },
  { name: "Quiénes Somos", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  {
    name: "Laboratorio de Ensayos",
    href: "/servicios/laboratorio-de-suelo",
  },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Blog Técnico", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
];

const socialLinks = [
  {
    icon: PiFacebookLogo,
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA",
  },
  {
    icon: PiInstagramLogo,
    name: "Instagram",
    href: "https://www.instagram.com/casagrandegeotecnia/",
  },
  {
    icon: PiTiktokLogo,
    name: "TikTok",
    href: "https://www.tiktok.com/@casagrandegeotecnia?lang=es-419",
  },
  {
    icon: PiLinkedinLogo,
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
  },
  {
    icon: PiYoutubeLogo,
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCIuOx9lfSBKoJ5QsRlQjA7Q",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Footer = () => {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700 max-md:pb-20">
      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.12 }}
        className="container mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 2xl:max-w-[1500px]"
      >
        {/* Logo y botón superior */}

        {/* Contenido principal */}
        <div className="flex flex-col items-center justify-between gap-6    md:flex-row">
          <motion.div
            variants={logoVariants}
            className="w-full md:w-auto"
          >
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="group relative mx-auto block h-16 w-full max-w-[270px] md:mx-0 md:h-[72px] md:w-[270px]"
            >
              <Image
                src="/logocasagrande.svg"
                alt="Logo de Casagrande Geotecnia"
                fill
                sizes="270px"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                priority
              />
            </Link>
          </motion.div>

          <motion.button
            variants={sectionVariants}
            type="button"
            onClick={scrollToTop}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#182C45] transition-colors duration-300 hover:border-[#C9A66B] hover:text-[#C9A66B]"
            aria-label="Volver arriba"
          >
            Volver arriba
            <FaChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-">
          {/* Certificaciones */}
          <motion.section
            variants={sectionVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#182C45] sm:text-lg">
                Nuestras Certificaciones
              </h2>
              <span className="mt-2 block h-0.5 w-10 bg-[#C9A66B]" />
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative aspect-[4/3] w-full max-w-[250px]"
            >
              <Image
                src="/certicados.png"
                alt="Certificaciones"
                fill
                sizes="250px"
                className="object-contain"
              />
            </motion.div>
          </motion.section>

          {/* Contacto */}
          <motion.section variants={sectionVariants}>
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#182C45] sm:text-lg">
                Contáctanos
              </h2>
              <span className="mt-2 block h-0.5 w-10 bg-[#C9A66B]" />
            </div>

            <nav>
              {connectLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-sm font-semibold text-slate-600">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        whileInView={
                          reduceMotion
                            ? undefined
                            : { opacity: 1, x: 0 }
                        }
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          target={
                            link.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="group flex items-start gap-2.5 text-[13px] leading-5 text-slate-600 transition-colors duration-300 hover:text-[#C9A66B] md:text-sm"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#182C45] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#C9A66B]" />

                          <span className="break-words">
                            {link.name}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </motion.section>

          {/* Enlaces */}
          <motion.section variants={sectionVariants}>
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#182C45] sm:text-lg">
                Proyectos
              </h2>
              <span className="mt-2 block h-0.5 w-10 bg-[#C9A66B]" />
            </div>

            <nav aria-label="Enlaces principales">
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    whileInView={
                      reduceMotion
                        ? undefined
                        : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.045,
                    }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2.5 text-sm text-slate-600 transition-colors duration-300 hover:text-[#C9A66B]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#182C45] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#C9A66B]" />

                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A66B] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.section>

          {/* Descripción y redes */}
          <motion.section
            variants={sectionVariants}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#182C45] sm:text-lg">
                Casagrande Geotecnia
              </h2>
              <span className="mt-2 block h-0.5 w-10 bg-[#C9A66B]" />
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Más de 6 años asegurando estabilidad y eficiencia en proyectos de
              ingeniería
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.div
                    key={social.name}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={
                      reduceMotion
                        ? undefined
                        : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -4, scale: 1.05 }
                    }
                    whileTap={
                      reduceMotion ? undefined : { scale: 0.94 }
                    }
                  >
                    <Link
                      href={social.href}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-[#182C45] transition-colors duration-300 hover:border-[#C9A66B] hover:bg-[#C9A66B] hover:text-white"
                    >
                      <Icon className="h-[21px] w-[21px]" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>

        <Separator className="bg-slate-200" />

        {/* Copyright */}
        <motion.div
          variants={sectionVariants}
          className="flex flex-col items-center justify-between gap-4 pt-6 text-center md:flex-row md:text-left"
        >
          <p className="text-xs leading-5 text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Casagrande Geotecnia. Todos los
            derechos reservados.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href="/terminos"
              className="text-xs text-slate-500 transition-colors duration-300 hover:text-[#C9A66B] sm:text-sm"
            >
              Términos de servicio
            </Link>

            <span className="hidden text-slate-300 sm:inline">|</span>

            <Link
              href="/politica"
              className="text-xs text-slate-500 transition-colors duration-300 hover:text-[#C9A66B] sm:text-sm"
            >
              Política de privacidad
            </Link>
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;