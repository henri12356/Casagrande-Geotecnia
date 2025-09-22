import React from 'react';
import Image from 'next/image';

const Trayectoria = () => {
 const hitos = [
    { fecha: 'Ago 2012', descripcion: 'Constitución de Casagrande S.A.C. como consultora de ingeniería civil especializada en estudios geotécnicos y de calidad.' },
    { fecha: 'Ago 2017', descripcion: 'Primera homologación de proveedores con SGS del Perú (Calificación Nivel A), asegurando calidad en procesos y materiales.' },
    { fecha: 'Nov 2020', descripcion: 'Auditorías internas y externas para preparación de certificaciones ISO y acreditaciones de laboratorio.' },
    { fecha: 'Oct 2021', descripcion: 'Obtención del Certificado ISO 9001 – Sistema de Gestión de Calidad, garantizando confiabilidad en estudios y ensayos.' },
    { fecha: 'Jul 2022', descripcion: 'Obtención del Certificado de Acreditación de 10 métodos de ensayo con INACAL, reforzando la credibilidad técnica del laboratorio.' },
    { fecha: 'Nov 2024', descripcion: 'Auditorías para ampliación del alcance de acreditación (10 métodos adicionales con INACAL) y fortalecimiento de procedimientos de calidad.' },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 md:pt-56">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Columna izquierda: Título e Imagen */}
          <div className="flex-1 flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1b4772]">Nuestra línea de tiempo</h2>
            </div>
            <p className="text-gray-500 mb-8 text-lg text-center lg:text-left">
              Un recorrido por nuestra historia y logros
            </p>
            <div className="relative w-full max-w-sm h-auto overflow-hidden rounded-lg">
              <Image
                src="/hero.jpg" 
                alt="Imagen de equipo de Geofal S.A.C."
                width={500}
                height={500}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Columna derecha: Línea de tiempo */}
          <div className="relative flex-1 w-full lg:w-auto pt-20">            
            <div className="space-y-9">
              {hitos.map((hito, index) => (
                <div key={index} className="flex relative items-center">
                  {/* Círculo */}
                  <div className="absolute -left-1.5 w-3 h-3 bg-[#1b4772] rounded-full z-10 hidden lg:block"></div>

                  {/* Contenido del hito */}
                  <div className="flex flex-col space-y-2 lg:pl-8">
                    <p className="text-[#1b4772] font-bold text-lg">{hito.fecha}</p>
                    <p className="text-gray-700">{hito.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trayectoria;