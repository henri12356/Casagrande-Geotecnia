import React from "react";
import Image from "next/image";

const Trayectoria = () => {
  const hitos = [
    {
      fecha: "Dic 2020",
      descripcion:
        "Inicio de operaciones de Casagrande Geotecnia como empresa especializada en estudios geotécnicos, ensayos de laboratorio y consultoría en ingeniería civil.",
    },
    {
      fecha: "Jul 2021",
      descripcion:
        "Obtención de las certificaciones ISO 9001, ISO 14001 e ISO 37001, consolidando la gestión de calidad, sostenibilidad y ética empresarial.",
    },
    {
      fecha: "Ago 2022",
      descripcion:
        "Adquisición de nuevos equipos geotécnicos y de laboratorio, incrementando la capacidad técnica para el control de calidad en obras y proyectos de infraestructura.",
    },
    {
      fecha: "May 2023",
      descripcion:
        "Acreditación oficial de métodos de ensayo ante INACAL, fortaleciendo la confiabilidad técnica y cumplimiento de estándares nacionales e internacionales.",
    },
    {
      fecha: "Nov 2024",
      descripcion:
        "Ampliación del alcance de acreditación del laboratorio e implementación de un sistema de gestión integral enfocado en mejora continua y resultados verificables.",
    },
    {
      fecha: "Oct 2025",
      descripcion:
        "Modernización del laboratorio con tecnología avanzada, automatización de procesos y fortalecimiento del equipo profesional para afrontar nuevos desafíos en ingeniería geotécnica.",
    },
  ];

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 md:pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Columna izquierda: Título e Imagen */}
          <div className="flex-1 flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1b4772]">
                Nuestra línea de tiempo
              </h2>
            </div>
            <p className="text-gray-500 mb-8 text-lg text-center lg:text-left">
              Un recorrido por nuestra historia y logros
            </p>
            <div className="relative w-full max-w-sm h-auto overflow-hidden rounded-lg">
              <Image
                src="/historia.jpg"
                alt="Imagen de equipo de Geofal S.A.C."
                width={500}
                height={500}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Columna derecha: Línea de tiempo */}
          <div className="relative flex-1 w-full lg:w-auto md:pt-20">
            <div className="space-y-9">
              {hitos.map((hito, index) => (
                <div key={index} className="flex relative items-center">
                  {/* Círculo */}
                  <div className="absolute -left-1.5 w-3 h-3 bg-[#1b4772] rounded-full z-10 hidden lg:block"></div>

                  {/* Contenido del hito */}
                  <div className="flex flex-col space-y-2 lg:pl-8">
                    <p className="text-[#1b4772] font-bold text-lg">
                      {hito.fecha}
                    </p>
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
