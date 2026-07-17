"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const BRAND = {
  navy: "#182C45",
  gold: "#C9A66B",
};

const servicios = [
  {
    slug: "geologia",
    titulo: "Geología",
    descripcion:
      "Cartografía geológica, evaluación geodinámica y exploración de campo bajo control técnico, proporcionando información confiable sobre la composición, estructura y riesgos del terreno.",
    imagen: "/servicios/geologia.webp",
  },
  {
    slug: "geotecnia",
    titulo: "Geotecnia",
    descripcion:
      "Investigación del subsuelo, análisis de cimentaciones, estabilidad de taludes, diseño de muros de contención, túneles y presas para obras seguras y sostenibles.",
    imagen: "/servicios/geotecnia.webp",
  },
  {
    slug: "geofisica",
    titulo: "Geofísica",
    descripcion:
      "Aplicación de métodos sísmicos, eléctricos y electromagnéticos para explorar el subsuelo y obtener información precisa de estructuras geológicas y geotécnicas.",
    imagen: "/geofisica/geofisica06.webp",
  },
  {
    slug: "geomecanica",
    titulo: "Geomecánica",
    descripcion:
      "Evaluación del macizo rocoso, estabilidad y sostenimiento para taludes, túneles y excavaciones subterráneas.",
    imagen: "/geomecanica/geomecanica01.webp",
  },
  {
    slug: "ensayo-de-campo",
    titulo: "Ensayos de campo",
    descripcion:
      "Pruebas técnicas ejecutadas directamente en obra para el control de calidad, exploración del subsuelo y verificación de diseño geotécnico.",
    imagen: "/campo/campo05.webp",
  },
  {
    slug: "mecanica-de-suelos",
    titulo: "Mecánica de suelos",
    descripcion:
      "Determinamos con precisión las propiedades del terreno para cimentaciones seguras, pavimentos duraderos y obras de infraestructura confiables.",
    imagen: "/mecanica/mecanica01.webp",
  },
  {
    slug: "evaluacion-estructural",
    titulo: "Evaluación estructural",
    descripcion:
      "Análisis técnico de edificaciones y estructuras existentes para determinar su capacidad portante, nivel de deterioro y necesidad de refuerzo estructural.",
    imagen: "/evaluacion/evalucion01.webp",
  },
  {
    slug: "hidrogeologia",
    titulo: "Hidrología e hidrogeología",
    descripcion:
      "Análisis de aguas subterráneas, interacción con suelos y estructuras, estudios de recarga y calidad hídrica para proyectos de infraestructura y minería.",
    imagen: "/servicios/hidrologia.webp",
  },
  {
    slug: "laboratorio-de-suelos",
    titulo: "Laboratorio de materiales",
    descripcion:
      "Ensayos especializados en suelos, rocas, concreto, asfalto y agua, aplicando normas nacionales e internacionales para garantizar la calidad de materiales.",
    imagen: "/servicios/laboratorio.webp",
    link: "/laboratorio/laboratorio-de-suelos",
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Servicios = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* INTRODUCCIÓN */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-12 max-w-5xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-10 bg-[#C9A66B]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A66B] sm:text-sm">
              Servicios especializados
            </span>

            <span className="h-0.5 w-10 bg-[#C9A66B]" />
          </div>

          <p className="text-[15px] leading-7 text-slate-600 sm:text-base md:text-xl md:leading-8">
            Más de{" "}
            <span className="font-extrabold text-[#182C45]">
              130 ensayos de calidad
            </span>{" "}
            respaldan nuestra precisión técnica y compromiso con la ingeniería
            geotécnica moderna.
          </p>
        </motion.div>

        {/* GRID DE SERVICIOS */}
        <motion.div
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.08 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.slug}
              variants={cardVariants}
              whileHover={
                reduceMotion ? undefined : { y: -8 }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Link
                href={servicio.link || `/servicios/${servicio.slug}`}
                aria-label={`Ver servicio de ${servicio.titulo}`}
                className="block h-full"
              >
                <Card className="group relative h-[380px] overflow-hidden rounded-2xl border-0 bg-[#182C45] p-0 shadow-[0_14px_36px_rgba(24,44,69,0.12)] transition-all duration-500 hover:shadow-[0_22px_55px_rgba(24,44,69,0.22)] sm:h-[400px] lg:h-[420px]">
                  <Image
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.065]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#182C45] via-[#182C45]/68 to-[#182C45]/5" />

                  <div className="absolute inset-x-0 bottom-0 flex min-h-[245px] flex-col justify-end p-5 sm:p-6">
                    <div className="mb-3 h-0.5 w-10 bg-[#C9A66B] transition-all duration-500 group-hover:w-16" />

                    <h3 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                      {servicio.titulo}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/82">
                      {servicio.descripcion}
                    </p>

                    <div className="mt-5">
                      <Button
                        type="button"
                        className="h-10 cursor-pointer min-w-[116px] rounded-lg bg-[#C9A66B] px-5 text-sm font-extrabold text-[#182C45] shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white hover "
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#C9A66B] transition-transform duration-500 group-hover:scale-x-100" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CONTACTO */}
        <div className="pt-16 md:pt-24">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-3xl border border-[#182C45]/10  shadow-[0_24px_60px_rgba(24,44,69,0.2)]"
          >
            <div className="grid md:grid-cols-2">
              {/* INFORMACIÓN */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="mb-6 h-0.5 w-12 bg-[#C9A66B]" />

                <h3 className="mb-7 text-2xl font-extrabold text-[#182C45] lg:text-3xl">
                  Contáctanos
                </h3>

                <div className="space-y-5">
                  <a
                    href="tel:+51945513323"
                    className="group flex items-center gap-4 text-base text-[#182C45] transition-colors hover:text-[#C9A66B] sm:text-lg"
                  >
                    <FaPhoneAlt className="h-5 w-5 shrink-0 text-[#C9A66B] transition-transform duration-300 group-hover:scale-110" />
                    <span>+51 945 513 323</span>
                  </a>

                  <a
                    href="mailto:comercial@casagrandegeotecnia.com.pe"
                    className="group flex items-start gap-4 text-base text-[#182C45] transition-colors hover:text-[#C9A66B] sm:text-lg"
                  >
                    <FaEnvelope className="mt-1 h-5 w-5 shrink-0 text-[#C9A66B] transition-transform duration-300 group-hover:scale-110" />

                    <span className="break-all sm:break-normal">
                      comercial@casagrandegeotecnia.com.pe
                    </span>
                  </a>

                  <p className="flex items-center gap-4 text-base text-[#182C45] sm:text-lg">
                    <FaClock className="h-5 w-5 shrink-0 text-[#C9A66B]" />
                    <span>Lun - Vie: 8:00 AM - 6:00 PM</span>
                  </p>

                  <p className="flex items-center gap-4 text-base text-[#182C45] sm:text-lg">
                    <FaClock className="h-5 w-5 shrink-0 text-[#C9A66B]" />
                    <span>Sáb: 8:30 AM – 2:00 PM</span>
                  </p>
                </div>
              </div>

              {/* ACCIONES */}
              <div className="border-t border-white/10 bg-white/[0.045] p-6 sm:p-8 md:border-l md:border-t-0 md:p-10 lg:p-12">
                <div className="mb-6 h-0.5 w-12 bg-[#C9A66B]" />

                <h3 className="mb-7 text-2xl font-extrabold text-[#182C45] lg:text-3xl">
                  Solicita un Servicio
                </h3>

                <div className="space-y-4">
                  <Button
                    asChild
                    className="h-14 w-full rounded-xl bg-[#C9A66B] px-6 text-base font-extrabold text-[#182C45] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:text-lg"
                  >
                    <a
                      href="https://wa.me/51945513323?text=Hola,%20quiero%20solicitar%20una%20cotización%20de%20sus%20servicios."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Solicitar cotización
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-14 w-full rounded-xl border-[#182C45] bg-transparent px-6 text-base font-extrabold text-[#182C45] transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-[#182C45] hover:text-white sm:text-lg"
                  >
                    <a
                      href="https://wa.me/51945513323?text=Hola,%20quisiera%20agendar%20una%20visita%20técnica."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Agendar visita técnica
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;