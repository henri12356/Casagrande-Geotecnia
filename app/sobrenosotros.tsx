/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaAward } from 'react-icons/fa';

const imageSrc = "/nosotros.webp";

const Sobrenosotros = () => {
  return (
    <div className="bg-white md:py-28 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Imagen */}
          <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={imageSrc}
              alt="Equipo de Casagrande"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Texto y contenido */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-5xl font-black text-[#182C45] mb-4">
              Casagrande Geotecnia
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Casagrande Geotecnia</strong> es una empresa peruana de ingeniería y construcción 
              especializada en <strong>estudios técnicos, control de calidad y servicios geotécnicos integrales</strong> 
              para obras de infraestructura, edificación y proyectos públicos y privados en todo el país. 
              Con más de <strong>6 años de experiencia</strong> y más de <strong>130 ensayos de calidad</strong>, 
              garantizamos resultados precisos, trazables y confiables en cada proyecto.  
              Nuestros equipos, adquiridos a <strong>PIZUAR</strong> proveedor acreditado por <strong>INACAL</strong>, 
              cuentan con certificaciones y calibraciones oficiales que respaldan la precisión de cada medición.
            </p>

            {/* Certificaciones */}
            <div className="space-y-4 mb-4">
              <div className="flex items-start gap-3">
                <FaAward className="text-[#182C45] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">ISO 9001 – Sistema de Gestión de Calidad:</span> 
                 
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaAward className="text-[#182C45] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">ISO 37001 – Sistema de Gestión Antisoborno:</span> 
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaAward className="text-[#182C45] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">ISO 14001 – Sistema de Gestión Ambiental:</span> 
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            <button className="px-6 py-3 bg-[#182C45] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a6cad] transition duration-200 cursor-pointer">
              Descargar nuestro brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobrenosotros;
