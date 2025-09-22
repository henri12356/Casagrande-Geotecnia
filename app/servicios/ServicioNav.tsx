// src/app/servicios/ServicioNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define el tipo para un solo elemento de navegación
interface NavItem {
  slug: string;
  titulo: string;
}

// Define los datos para los elementos de navegación
const serviciosNav: NavItem[] = [
  { slug: "geologia", titulo: "Servicios de Geología" },
  { slug: "geotecnia", titulo: "Servicios de Geotecnia" },
  { slug: "laboratorio-geotecnico", titulo: "Laboratorio Geotécnico" },
  { slug: "geofisica", titulo: "Servicios de Geofísica" },
  { slug: "geomecanica", titulo: "Servicios de Geomecánica" },
  { slug: "hidrogeologia", titulo: "Servicios de Hidrogeología" }
];

const ServicioNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 -mt-6 md:-mt-12 relative z-10 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm text-[#1b4772] font-bold mb-3 uppercase tracking-wider text-center">
          Explorar nuestros servicios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {serviciosNav.map((servicio) => {
            const isActive = pathname.includes(servicio.slug);

            return (
              <Link
                key={servicio.slug}
                href={`/servicios/${servicio.slug}`}
                className={`
                  group relative overflow-hidden rounded-lg p-4 transition-all duration-300
                  border-l-4 hover:shadow-md
                  ${
                    isActive
                      ? "bg-[#1b4772] text-white border-[#1b4772] shadow-lg"
                      : "bg-white text-[#1b4772] border-gray-300 hover:border-[#1b4772] hover:bg-blue-50"
                  }
                `}
              >
                <div className="flex items-start">
                  <div
                    className={`
                    flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-3 transition-all duration-300
                    ${
                      isActive
                        ? "bg-white"
                        : "bg-[#2c3e50] group-hover:bg-[#1b4772]"
                    }
                  `}
                  ></div>
                  <span className="text-sm font-medium leading-tight">
                    {servicio.titulo}
                  </span>
                </div>

                {/* Efecto de fondo sutil */}
                <div
                  className={`
                  absolute inset-0 opacity-5 transition-all duration-300
                  ${
                    isActive
                      ? "bg-white"
                      : "bg-blue-500 group-hover:bg-blue-600"
                  }
                `}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicioNav;
