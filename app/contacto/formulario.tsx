"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const Formulario = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header section with line */}
      <div className="max-w-7xl mx-auto flex items-center justify-start space-x-4 mb-10 md:mb-16 lg:mb-20">
        <div className="flex-shrink-0">
          <h1 className="text-4xl font-bold text-gray-800">Contacto</h1>
          <p className="text-gray-600 mt-1 md:text-lg">Tu mensaje es importante para nosotros.</p>
        </div>
        <div className="hidden md:block flex-grow h-1 bg-[#1b4772] rounded-full"></div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left section: Image with orange background */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
          <div className="absolute inset-0 bg-white">
            {/* Orange background with clip-path for the angled shape */}
            <div
              className="absolute w-full h-full rounded-br-[150px] md:rounded-br-[200px]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 80%)' }}
            ></div>
          </div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/hero.jpg" // Update this path to your image
                alt="Persona de Contacto"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right section: Form and contact information */}
        <div className="w-full md:w-1/2 p-6 md:p-10 space-y-6 flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-gray-800">Dejanos tu Contacto</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombres y Apellidos</label>
                <input
                  type="text"
                  id="nombre"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[#1b4772] focus:border-[#1b4772] transition-all"
                />
              </div>
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Empresa o Ruc</label>
                <input
                  type="text"
                  id="empresa"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[#1b4772] focus:border-[#1b4772] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                  type="email"
                  id="correo"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[#1b4772] focus:border-[#1b4772] transition-all"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-[#1b4772] focus:border-[#1b4772] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="mensaje"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 resize-none focus:ring-1 focus:ring-[#1b4772] focus:border-[#1b4772] transition-all"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1b4772] text-white font-bold rounded-md shadow-lg hover:bg-[#d64a1e] transition-colors"
            >
              ENVIAR
            </button>
          </form>

          {/* Contact information section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dejanos tu Contacto</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1b4772]" />
                <span>(+51) 945 513 323 | comercial@casagrandegeotecnia.com.pe</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1b4772]" />
                <span>(+51) 945 513 323 | comercial@casagrandegeotecnia.com.pe</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#1b4772]" />
                <span>(01) 9051911</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;