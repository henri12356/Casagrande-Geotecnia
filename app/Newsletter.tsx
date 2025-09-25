/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Newsletter.tsx
"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }
      
      setMessage(data.message || "✅ ¡Gracias por suscribirte!");
      setEmail("");
      setIsSubmitted(true);
      
      // Ocultar el mensaje después de 4 segundos
      setTimeout(() => {
        setMessage("");
        setIsSubmitted(false);
      }, 4000);
      
    } catch (error: any) {
      setMessage(error.message || "❌ Error al procesar la suscripción");
    } finally {
      setLoading(false);
    }
  };

  // Si el formulario fue enviado exitosamente, mostrar confirmación
  if (isSubmitted && message.includes("✅")) {
    return (
      <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl transform transition-all duration-500 scale-100">
        <div className="text-center animate-pulse-slow">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            ¡Éxito!
          </h3>
          <p className="text-emerald-100 text-lg">
            Te has suscrito correctamente
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Efecto de partículas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-75"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-150"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/10 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-6 transform transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Únete a Nuestro Newsletter
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            Recibe contenido exclusivo y actualizaciones importantes directamente en tu email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 transform focus:scale-105"
              required
              disabled={loading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-white to-blue-100 text-blue-600 font-bold py-4 px-6 rounded-2xl hover:from-blue-100 hover:to-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Suscribirse Gratis
                </>
              )}
            </span>
            
            {/* Efecto de onda al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-2xl text-center backdrop-blur-sm border-2 transition-all duration-500 transform ${
            message.includes("✅") 
              ? "bg-green-500/20 text-green-100 border-green-400/30 scale-100" 
              : "bg-red-500/20 text-red-100 border-red-400/30 scale-100"
          } ${message ? 'animate-fade-in-up' : 'animate-fade-out-down'}`}>
            <div className="flex items-center justify-center space-x-2">
              {message.includes("✅") ? (
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        <p className="text-xs text-blue-200/80 text-center mt-6 leading-relaxed">
          🔒 Tu privacidad es importante. No compartiremos tu información con terceros. Puedes cancelar tu suscripción en cualquier momento.
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-out-down {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        
        .animate-fade-out-down {
          animation: fade-out-down 0.5s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}