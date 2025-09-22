/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaAward } from 'react-icons/fa';
import { LuMapPin } from "react-icons/lu";

const imageSrc = "/sobrenosotros.png";

const Sobrenosotros = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Imagen */}
          <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={imageSrc}
              alt="Equipo de Casagrande"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Texto y contenido */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-[#2c3e50] tracking-tight mb-4">
              Sobre nosotros
            </h2>
            <h3 className="text-3xl font-bold text-[#2c3e50] mb-6">
              Casagrande S.A.C.
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Casagrande es una empresa consultora de ingeniería civil especializada en estudios técnicos y de calidad que se realizan antes, durante y después de una obra de construcción. Garantizamos que todo lo que se construye tenga bases seguras, materiales adecuados y estudios previos confiables.
            </p>

            {/* Certificaciones */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaAward className="text-[#e74c3c] text-2xl flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">ISO 9001 – Sistema de Gestión de Calidad:</span> garantiza procesos claros y eficientes, asegurando confiabilidad en nuestros informes técnicos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <LuMapPin className="text-[#e74c3c] text-2xl flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">ISO 37001 – Sistema de Gestión Antisoborno:</span> protege la transparencia y ética en contratos y supervisiones.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaAward className="text-[#e74c3c] text-2xl flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-800">ISO 14001 – Sistema de Gestión Ambiental:</span> asegura que todos nuestros estudios y ensayos respeten el medio ambiente y cumplan regulaciones.
                </p>
              </div>
            </div>

      

            {/* Botón de acción */}
            <button className='px-6 py-3 bg-[#e74c3c] text-white font-semibold rounded-lg shadow-md hover:bg-[#c0392b] transition duration-200'>
              Descargar nuestro brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobrenosotros;
