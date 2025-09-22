import React from 'react';
import Image from 'next/image';
import ubicacionImg from '@/public/hero07.jpg'; // Imagen de referencia
import Link from 'next/link';

const Mapa = () => {
  return (
    <section className="w-full mt-16 flex flex-col items-center px-4">
      {/* Título */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b4772]">Encuéntranos</h2>
        <p className="text-gray-600 mt-2">Tu mensaje es importante para nosotros</p>
      </div>

      {/* Contenedor de mapa con imagen flotante */}
      <div className="relative w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">
        {/* Imagen de referencia más grande y con texto */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
        <Link href="https://www.google.com/maps/place/Casagrande+Consultor%C3%ADa+y+Construcci%C3%B3n/@-13.1558258,-74.2216806,19z/data=!3m1!4b1!4m6!3m5!1s0x91127d8bfa4ecc4d:0x69dc04eda5da9649!8m2!3d-13.1558271!4d-74.2210355!16s%2Fg%2F11swgy9k3w?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
          <div className="bg-white p-3 rounded-full shadow-2xl hover:scale-105 transition transform">
            <Image 
              src={ubicacionImg} 
              alt="Ubicación Casagrande" 
              width={100} 
              height={100} 
              className="rounded-full object-cover"
            />
          </div>
         </Link>
        </div>

        {/* Iframe del mapa */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d803.9765567853118!2d-74.22131504820005!3d-13.15595629108529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91127d8bfa4ecc4d%3A0x69dc04eda5da9649!2sCasagrande%20Consultor%C3%ADa%20y%20Construcci%C3%B3n!5e0!3m2!1ses!2spe!4v1756942919228!5m2!1ses!2spe"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
          title="Ubicación de Casagrande Consultoría y Construcción"
        ></iframe>
      </div>
    </section>
  );
}

export default Mapa;
