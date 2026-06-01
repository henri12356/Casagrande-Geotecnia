/* eslint-disable @next/next/no-img-element */
import { FaAward } from "react-icons/fa";

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
              alt="Equipo de Casagrande Geotecnia"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Texto */}
          <div className="w-full lg:w-1/2">

            <h3 className="text-4xl md:text-5xl font-black text-[#182C45] mb-6">
              Casagrande Geotecnia
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Casagrande Geotecnia</strong> es una empresa peruana de 
              ingeniería y construcción, especializada en <strong>estudios técnicos, 
              control de calidad y servicios geotécnicos integrales</strong> para obras 
              de infraestructura, edificaciones y proyectos públicos y privados 
              en todo el país.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Con más de <strong>6 años de experiencia</strong> y más de 
              <strong> 130 ensayos de calidad realizados</strong>, garantizamos 
              resultados precisos, trazables y confiables en cada proyecto.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Nuestros equipos, adquiridos a <strong>Pinzuar</strong>, proveedor 
              acreditado por <strong>INACAL</strong>, cuentan con certificaciones 
              y calibraciones oficiales que respaldan la precisión de cada medición.
            </p>

            {/* Certificaciones */}
            <div className="space-y-4 mb-8">

              <div className="flex items-start gap-3">
                <FaAward className="text-[#C9A66B] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">
                    ISO 9001:2015 – Sistema de Gestión de la Calidad
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaAward className="text-[#C9A66B] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">
                    ISO 37001:2016 – Sistema de Gestión Antisoborno
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FaAward className="text-[#C9A66B] text-2xl flex-shrink-0 mt-1" />
                <p className="text-black">
                  <span className="font-bold text-[#182C45]">
                    ISO 14001:2015 – Sistema de Gestión Ambiental
                  </span>
                </p>
              </div>

            </div>

            {/* Botón */}
            <button className="px-6 py-3 bg-[#182C45] text-white hover:text-[#182C45] font-semibold rounded-lg shadow-md hover:bg-[#C9A66B] transition duration-200 cursor-pointer">
              Descargar nuestro brochure
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobrenosotros;