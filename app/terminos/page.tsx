import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const Terms: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#1b4772] pt-40 pb-20 p-2">
        <div className="max-w-4xl  mx-auto bg-white rounded-2xl shadow-lg  p-6 md:p-12 border border-[#1b4772]/20">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Términos de Servicio
            </h1>
            <p className="mt-2 text-sm text-[#1b4772]/80">
              Casagrande — Servicios de consultoría geotécnica y laboratorio
            </p>
          </header>

          <section className="space-y-6">
            <p>
              Estos Términos de Servicio regulan el uso de los servicios, la
              contratación de trabajos técnicos y el acceso al sitio web de{" "}
              <strong>Casagrande</strong>. Al interactuar con nosotros, aceptas
              estos términos.
            </p>

            <h2 className="text-2xl font-semibold">1. Objeto</h2>
            <p>
              Casagrande ofrece investigación geológica, geotécnica, ensayos de
              laboratorio, geofísica, geomecánica, hidrogeología, diseño de
              cimentaciones y supervisión técnica.
            </p>

            <h2 className="text-2xl font-semibold">
              2. Obligaciones del cliente
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveer información veraz sobre el proyecto y el sitio.</li>
              <li>Asegurar accesibilidad para trabajos de campo.</li>
              <li>
                Cumplir con pagos y condiciones establecidas en el contrato.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold">3. Propiedad intelectual</h2>
            <p>
              Los informes y documentos técnicos son propiedad de Casagrande. El
              cliente obtiene una licencia de uso limitada para el proyecto
              acordado. Queda prohibida la difusión sin autorización.
            </p>

            <h2 className="text-2xl font-semibold">4. Responsabilidad</h2>
            <p>
              Nuestra responsabilidad se limita a los montos cobrados por el
              servicio afectado, salvo negligencia grave. No asumimos
              responsabilidad por daños indirectos o lucro cesante.
            </p>

            <h2 className="text-2xl font-semibold">5. Ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes del Perú. Las controversias
              serán resueltas por los tribunales competentes donde se ejecute el
              servicio.
            </p>

            <footer className="pt-8 text-sm text-[#1b4772]/60">
              Última actualización: {new Date().toLocaleDateString("es-PE")} ·
              Casagrande.
            </footer>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
