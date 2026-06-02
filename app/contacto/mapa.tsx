"use client";

const Mapa = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 py-20 bg-white">
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1b4772]">
          Encuéntranos
        </h2>
        <p className="text-gray-600 mt-2">
          Contamos con presencia en Ayacucho y Lima
        </p>
      </div>

      {/* Contenedor mapas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        
        {/* === LIMA === */}
        <div className="w-full cursor-pointer">
          <h3 className="text-center text-2xl font-semibold text-[#1b4772] mb-4">
            Sede Lima
          </h3>

          <a
            href="https://www.google.com/maps/place/Plaza+2+de+Mayo,+Av.+Alfonso+Ugarte+595,+Bre%C3%B1a+5001"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform duration-300"
          >
            <iframe
              src="https://www.google.com/maps?q=-12.0474336,-77.0424062&z=17&output=embed"
              width="100%"
              height="420"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
              title="Ubicación Lima - Casagrande Geotecnia"
              className="w-full"
            ></iframe>
          </a>

          <p className="text-center mt-3 text-sm text-gray-600">
            📍 Jr. Santa Carolina 513, Palao - S.M.P - Lima
          </p>
        </div>

        {/* === AYACUCHO === */}
        <div className="w-full cursor-pointer">
          <h3 className="text-center text-2xl font-semibold text-[#1b4772] mb-4">
            Sede Ayacucho
          </h3>

          <a
            href="https://maps.app.goo.gl/ZLD7hVDrudfbnSTd6"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform duration-300"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d803.9765567853118!2d-74.22131504820005!3d-13.15595629108529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91127d8bfa4ecc4d%3A0x69dc04eda5da9649!2sCasagrande%20Consultor%C3%ADa%20y%20Construcci%C3%B3n!5e0!3m2!1ses!2spe!4v1756942919228!5m2!1ses!2spe"
              width="100%"
              height="420"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
              title="Ubicación Ayacucho - Casagrande Geotecnia"
              className="w-full"
            ></iframe>
          </a>

          <p className="text-center mt-3 text-sm text-gray-600">
            📍 Jr. Quinua 570, Ayacucho – Perú
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mapa;