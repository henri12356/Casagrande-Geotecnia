// src/app/politica/page.tsx
import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const Politica: React.FC = () => {
  return (
    <>
     <Navbar  />
    <main className="min-h-screen  bg-white text-[#1b4772] pt-40 pb-20 p-2 ">
      <div className="max-w-4xl  mx-auto bg-white rounded-2xl shadow-lg  p-6 md:p-12 border border-[#1b4772]/20">
        <header className="mb-6 ">
          <h1 className="text-3xl md:text-4xl font-extrabold">Política de Privacidad</h1>
          <p className="mt-2 text-sm text-[#1b4772]/80">
            Casagrande — Empresa consultora de ingeniería civil
          </p>
        </header>

        <section className="space-y-6">
          <p>
            En <strong>Casagrande</strong> valoramos la privacidad y seguridad de la información de
            nuestros clientes, colaboradores y visitantes. Esta política explica qué datos
            recolectamos, por qué lo hacemos y cómo los protegemos.
          </p>

          <h2 className="text-2xl font-semibold">1. Responsable del tratamiento</h2>
          <p>
            Responsable: <strong>Casagrande</strong>. Para consultas sobre datos personales, escribe a{" "}
            <a href="mailto:u19217724@gmail.com" className="underline hover:text-[#16385c]">
              u19217724@gmail.com
            </a>.
          </p>

          <h2 className="text-2xl font-semibold">2. Datos que recolectamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Información de contacto: nombre, correo electrónico, teléfono.</li>
            <li>Datos técnicos: empresa, cargo, requerimientos técnicos.</li>
            <li>
              Uso del sitio web: IP, logs, páginas visitadas y comportamiento dentro del sitio.
            </li>
            <li>
              Datos voluntarios enviados: archivos, planos o documentos para cotizaciones o servicios.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold">3. Finalidades del tratamiento</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestación y gestión de servicios geotécnicos y de laboratorio.</li>
            <li>Responder solicitudes y comunicaciones comerciales.</li>
            <li>Manejo administrativo y contable.</li>
            <li>Mejorar y analizar el uso del sitio web.</li>
          </ul>

          <h2 className="text-2xl font-semibold">4. Conservación de datos</h2>
          <p>
            Los datos se conservarán solo el tiempo necesario para cumplir sus finalidades y conforme
            a la legislación peruana.
          </p>

          <h2 className="text-2xl font-semibold">5. Derechos del titular</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión u oposición enviando una
            solicitud a{" "}
            <a href="mailto:u19217724@gmail.com" className="underline hover:text-[#16385c]">
              u19217724@gmail.com
            </a>.
          </p>

          <footer className="pt-8 text-sm text-[#1b4772]/60">
            Última actualización: {new Date().toLocaleDateString("es-PE")} · Casagrande.
          </footer>
        </section>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default Politica;
