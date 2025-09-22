import React from "react";

const Brochure = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#1b4b52] to-[#2c3e50] py-10 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-around gap-8 rounded-t-2xl shadow-lg">
      
      {/* Contenedor del Texto */}
      <div className="flex-1 text-center md:text-left max-w-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
          Descarga nuestro <span className="text-red-400">Archivos</span>
        </h2>
        <p className="text-gray-300 opacity-90 text-base md:text-lg max-w-md mx-auto md:mx-0">
          Accede a nuestra experiencia y proyectos destacados en ingeniería
          geotécnica.
        </p>
      </div>

      {/* Contenedor de los Botones */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-3">
        <a
          href="/path/to/curriculum-corporativo.pdf"
          download="Curriculum-Corporativo.pdf"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
        >
          Ver brochure
        </a>

        <a
          href="/path/to/curriculum-pilas.pdf"
          download="Curriculum-Hincado-de-Pilas.pdf"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
        >
          Documento de calidad
        </a>
      </div>
    </div>
  );
};

export default Brochure;