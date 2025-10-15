"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, CheckCircle2 } from "lucide-react";

const Formulario = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👉 Tu endpoint de Formspree
  const FORMSPREE_URL = "https://formspree.io/f/mldpnvbg";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("❌ Hubo un error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-start space-x-4 mb-10 md:mb-16 lg:mb-20">
        <div className="flex-shrink-0">
          <h1 className="text-4xl font-bold text-[#1b4772]">Contacto</h1>
          <p className="text-slate-900 mt-1 md:text-lg">
            Tu mensaje es importante para nosotros.
          </p>
        </div>
        <div className="hidden md:block flex-grow h-1 bg-[#1b4772] rounded-full"></div>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Sección izquierda */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-5 md:p-6 bg-white">
          <div className="absolute inset-0 bg-white">
            <div
              className="absolute w-full h-full rounded-br-[150px] md:rounded-br-[200px]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 80%)" }}
            ></div>
          </div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/historia.jpg"
                alt="Persona de Contacto"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Sección derecha: formulario */}
        <div className="w-full md:w-1/2 md:-6 p-5 md:p-10 space-y-6 flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-gray-800">Déjanos tu Contacto</h2>

          {submitted ? (
            <div className="p-8 bg-green-50 border border-green-300 rounded-xl shadow-md text-center animate-fade-in">
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-3 animate-bounce" />
              <h3 className="text-xl font-bold text-green-800">
                ¡Gracias por tu mensaje!
              </h3>
              <p className="text-green-700 mt-2">
                Nos pondremos en contacto contigo lo antes posible. ✨
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombres y Apellidos
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-lg py-3 px-4 
                    focus:ring-2 focus:ring-[#1b4772] focus:border-[#1b4772] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                    Empresa o RUC
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    className="mt-1 block w-full border border-gray-200 rounded-lg py-3 px-4 
                    focus:ring-2 focus:ring-[#1b4772] focus:border-[#1b4772] shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    required
                    className="mt-1 block w-full border border-gray-200 rounded-lg py-3 px-4 
                    focus:ring-2 focus:ring-[#1b4772] focus:border-[#1b4772] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    pattern="9[0-9]{8}" 
                    maxLength={9}
                    placeholder=""
                    className="mt-1 block w-full border border-gray-200 rounded-lg py-3 px-4 
                    focus:ring-2 focus:ring-[#1b4772] focus:border-[#1b4772] shadow-sm transition-all"
                  />
                
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  className="mt-1 block w-full border border-gray-200 rounded-lg py-3 px-4 
                  resize-none focus:ring-2 focus:ring-[#1b4772] focus:border-[#1b4772] shadow-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#1b4772] text-white font-bold rounded-lg shadow-md  cursor-pointer
                hover:bg-[#E8B340] transition-colors disabled:opacity-60"
              >
                {loading ? "Enviando..." : "ENVIAR"}
              </button>
            </form>
          )}

          {/* Info de contacto */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contáctanos también en:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex text-[12px] items-center space-x-3 md:text-base">
                <Phone className="md:w-5 md:h-5 text-[#1b4772]" />
                <span>(+51) 945 513 323 | comercial@casagrandegeotecnia.com.pe</span>
              </li>
              <li className="flex items-center text-[12px] md:text-base space-x-3">
                <Phone className="md:w-5 md:h-5 text-[#1b4772]" />
                <span>(+51) 962 835 652 | gerenciageneral@casagrandegeotecnia.com.pe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
