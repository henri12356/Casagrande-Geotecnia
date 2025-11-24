// src/app/servicios/ServicioNav.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  slug: string;
  titulo: string;
  icon: React.ReactNode;
}

const serviciosNav: NavItem[] = [
  { slug: "laboratorio-de-suelos", titulo: "Laboratorio de Suelos", icon: <FlaskConical className="w-4 h-4" /> },
  { slug: "laboratorio-de-rocas", titulo: "Laboratorio de Rocas", icon: <FlaskConical className="w-4 h-4" /> },
  { slug: "laboratorio-de-concreto", titulo: "Laboratorio de Concreto", icon: <FlaskConical className="w-4 h-4" /> },
  { slug: "laboratorio-de-pavimentos", titulo: "Laboratorio de Pavimentos", icon: <FlaskConical className="w-4 h-4" /> },
  { slug: "laboratorio-quimico", titulo: "Laboratorio Químico", icon: <FlaskConical className="w-4 h-4" /> },
  { slug: "laboratorio-complementario", titulo: "Laboratorio Complementario", icon: <FlaskConical className="w-4 h-4" /> },
];

const ServicioNav = () => {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isActive = (slug: string) =>
    pathname === `/servicios/${slug}` || pathname?.startsWith(`/servicios/${slug}/`);

  // --- MOBILE ONLY: scroll helpers ---
  const scrollBy = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(280, el.clientWidth * 0.8); // paso cómodo en móvil
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-linear-to-r from-gray-50 to-blue-50 border-b border-gray-200 -mt-1 relative z-10 py-7">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xs md:text-sm text-[#1b4772] font-bold mb-4 md:mb-6 uppercase tracking-wider text-center">
          Explorar Nuestros Servicios Especializados
        </h3>

        {/* MOBILE: carrusel horizontal con snap + fade + botones */}
        <div className="relative md:hidden">
          {/* Fades laterales */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-blue-50 to-transparent" />

          {/* Botones prev/next */}
          <button
            type="button"
            aria-label="Desplazar a la izquierda"
            onClick={() => scrollBy("left")}
            className="absolute left-1 top-full -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border border-gray-200 shadow-sm text-[#1b4772] active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Desplazar a la derecha"
            onClick={() => scrollBy("right")}
            className="absolute right-1 top-full  -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border border-gray-200 shadow-sm text-[#1b4772] active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Track scrolleable */}
          <div
            ref={trackRef}
            className="
              flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1
              [--cas-azul:#1b4772] [--cas-azul-2:#2c5282]
              [-webkit-overflow-scrolling:touch]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {serviciosNav.map((s) => {
              const active = isActive(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={`/laboratorio/${s.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`
                    group relative snap-start shrink-0
                    rounded-2xl px-3 py-3
                    border bg-white
                    w-[250px]  /* ancho cómodo para texto largo */
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4772] focus-visible:ring-offset-2
                    ${
                      active
                        ? "text-white border-transparent"
                        : "text-[#1b4772] border-gray-200"
                    }
                  `}
                  style={{
                    background: active
                      ? "linear-gradient(135deg, var(--cas-azul) 0%, var(--cas-azul-2) 100%)"
                      : undefined,
                  }}
                >
                  {/* halo sutil al hover (no invasivo en móvil) */}
                  <span
                    className={`${active ? "hidden" : "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity"}`}
                    style={{
                      background:
                        "conic-gradient(from 180deg at 50% 50%, rgba(27,71,114,0.10), rgba(44,82,130,0.10), rgba(27,71,114,0.10))",
                    }}
                  />

                  <div className="relative z-1 flex items-center gap-3">
                    <div
                      className={`
                        flex items-center justify-center w-9 h-9 rounded-full
                        ${active ? "bg-white/20" : "bg-[#1b4772]/10"}
                      `}
                    >
                      <span className={active ? "text-white" : "text-[#1b4772]"}>{s.icon}</span>
                    </div>

                    {/* Título: mejor truncado para 2 líneas sin plugin */}
                    <span
                      className={`
                        text-[13px] font-semibold leading-snug
                        ${active ? "text-white" : "text-[#1b4772]"}
                        wrap-break-word
                      `}
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {s.titulo}
                    </span>
                  </div>

                  {/* Indicador inferior */}
                  <div
                    className={`
                      absolute -bottom-2 left-4 right-4 h-1 rounded-full
                      ${active ? "bg-white/70" : "bg-transparent"}
                    `}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* DESKTOP/TABLET (sin cambios visuales): grid original */}
        <div
          className="
            hidden md:grid
            md:grid-cols-2 lg:grid-cols-5 md:gap-4
            [--cas-azul:#1b4772] [--cas-azul-2:#2c5282]
          "
        >
          {serviciosNav.map((s) => {
            const active = isActive(s.slug);
            return (
              <Link
                key={s.slug}
                href={`/laboratorio/${s.slug}`}
                aria-current={active ? "page" : undefined}
                className={`
                  group relative rounded-2xl px-4 py-5 transition-all duration-300
                  border bg-white hover:shadow-md
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4772] focus-visible:ring-offset-2
                  ${
                    active
                      ? "text-white border-transparent"
                      : "text-[#1b4772] border-gray-200 hover:border-[#1b4772]"
                  }
                `}
                style={{
                  background: active
                    ? "linear-gradient(135deg, var(--cas-azul) 0%, var(--cas-azul-2) 100%)"
                    : undefined,
                }}
              >
                <span
                  className={`${active ? "hidden" : "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"}`}
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(27,71,114,0.10), rgba(44,82,130,0.10), rgba(27,71,114,0.10))",
                  }}
                />
                <div className="relative z-1 flex items-center gap-3">
                  <div className={`${active ? "bg-white/20" : "bg-[#1b4772]/10"} w-8 h-8 rounded-full flex items-center justify-center`}>
                    <span className={active ? "text-white" : "text-[#1b4772]"}>{s.icon}</span>
                  </div>
                  <span className={`text-sm font-semibold leading-snug ${active ? "text-white" : "text-[#1b4772]"}`}>
                    {s.titulo}
                  </span>
                </div>
                <div className={`${active ? "bg-white/70" : "bg-transparent"} absolute -bottom-2 left-4 right-4 h-1 rounded-full`} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicioNav;
