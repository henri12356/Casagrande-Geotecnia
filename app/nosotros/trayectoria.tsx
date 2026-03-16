import Image from "next/image";

const Trayectoria = () => {
  const hitos = [
    {
      fecha: "Dic 2020",
      descripcion:
        "Fundación de Casagrande Geotecnia e inicio de operaciones como empresa especializada en estudios geotécnicos, geología aplicada, control de calidad y ensayos de laboratorio para proyectos de ingeniería civil e infraestructura.",
    },
    {
      fecha: "Jul 2021",
      descripcion:
        "Implementación del Sistema de Gestión Integrado y obtención de certificaciones ISO 9001, ISO 14001 e ISO 37001, fortaleciendo la gestión de calidad, sostenibilidad ambiental y transparencia institucional.",
    },
    {
      fecha: "Ago 2022",
      descripcion:
        "Ampliación de la infraestructura técnica mediante la adquisición de nuevos equipos de campo y laboratorio, incrementando la capacidad operativa para ensayos geotécnicos, control de calidad y supervisión de obras.",
    },
    {
      fecha: "May 2023",
      descripcion:
        "Equipos calibrados y certificados por el laboratorio Pinzuar, acreditado ante INACAL bajo la norma ISO/IEC 17025, garantizando trazabilidad metrológica y resultados confiables en los ensayos.",
    },
    {
      fecha: "Nov 2024",
      descripcion:
        "Fortalecimiento del sistema de gestión técnica mediante la ampliación de servicios de laboratorio y la optimización de procesos orientados a la mejora continua y a la confiabilidad de los resultados.",
    },
    {
      fecha: "Oct 2025",
      descripcion:
        "Modernización del laboratorio con tecnología avanzada, automatización de procesos y consolidación del equipo profesional para afrontar proyectos de mayor complejidad en geotecnia e ingeniería civil.",
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
                src="/conctacto.webp"
                alt="Historia casagrande geotecnia"
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
