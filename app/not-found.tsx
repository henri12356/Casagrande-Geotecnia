// components/notfound-page.tsx
"use client";

import Link from "next/link";
import { FaArrowLeft, FaHome, FaEnvelope } from "react-icons/fa";
import Navbar from "./navbar";
import Footer from "./footer";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        {/* Contenedor principal */}
        <div className="relative z-10 p-10 max-w-2xl w-full text-center">
          
          <h1 className="text-9xl font-extrabold text-gray-800 tracking-tight mb-4">
            404
          </h1>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Página no encontrada
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg mx-auto">
            La URL que ingresaste parece no existir. Lo sentimos por el inconveniente. Por favor, revisa la dirección o utiliza las opciones de navegación a continuación.
          </p>

          {/* Opciones de navegación */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              <FaHome className="text-lg" /> 
              Volver al inicio
            </Link>
            
            <Link
              href="/servicios"
              className="flex items-center justify-center gap-3 border border-gray-300 text-gray-800 px-6 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300"
            >
              <FaArrowLeft className="text-lg" /> 
              Ver nuestros servicios
            </Link>
          </div>

          {/* Contacto */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-500 mb-3">Si crees que esto es un error, por favor, contáctanos.</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              <FaEnvelope className="text-sm" />
              Enviar un mensaje
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}