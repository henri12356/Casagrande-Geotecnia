"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function UpdateModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 12000); // 12 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.45, type: "spring" }}
            className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8 w-[90%] max-w-md text-center text-white relative"
          >
            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center mb-4"
            >
              <AlertTriangle className="w-14 h-14 text-yellow-300 drop-shadow-lg" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-3 drop-shadow-lg">
              Página en Actualización
            </h2>

            <p className="text-white/90 text-[16px] leading-relaxed">
              Estamos actualizando la información de nuestros servicios de ingeniería geotécnica,
              ensayos de laboratorio, control de calidad y proyectos en ejecución.  
              Es posible que algunos contenidos no estén disponibles momentáneamente.
            </p>

            <motion.button
              onClick={() => setShow(false)}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full py-3 rounded-2xl bg-yellow-400 text-gray-900 font-semibold shadow-md hover:bg-yellow-300 transition-all"
            >
              Entendido
            </motion.button>

            {/* Barra animada inferior (12 segundos) */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 12, ease: "linear" }} // sincronizado con el modal
              className="h-[3px] bg-yellow-300 rounded-full mt-6"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
